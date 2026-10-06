---
title: "Domain-Driven Design applied to AI agent development"
description: "How to apply DDD, hexagonal architecture and TDD to build AI agents that are testable, auditable and able to evolve"
date: 2024-06-21
---

_By Jose Veliz, Senior Full Stack Engineer · AI Agents, SaaS & Fintech_

---

Most AI agents that reach production start the same way: a long prompt, a couple of functions exposed as tools and a loop that calls the model. It works in the demo. Three months later it is a monolith of strings and conditionals where nobody knows which part of the prompt contains business rules, which tool can execute what, or why the agent decided what it decided.

The problem is not the model. It is that the **business domain has no explicit place in the code**. That is where **Domain-Driven Design (DDD)**, together with hexagonal architecture and TDD, contributes more than it seems: an agent is, in the end, software with a non-deterministic component at its center, and that component needs very clear boundaries.

This article lays out how to model AI agents with DDD: what is domain, what is infrastructure, where the LLM lives and how to make it all testable. The examples are in TypeScript, but the approach is language-independent.

---

## 1. The problem: domain mixed with infrastructure

A typical "naive" agent looks like this:

```ts
async function handleMessage(msg: string) {
  const res = await llm.chat({
    system: `You are a retention agent. You can offer up to a 20% discount
             if the customer has been with us for more than 6 months. Never
             offer discounts to customers with overdue payments. Use the
             available tools...`,
    messages: [{ role: "user", content: msg }],
    tools: [crmTool, discountTool, emailTool],
  });
  // ... execute tool calls, retry, return the response
}
```

There are at least four problems here:

1. **Business rules live in a prompt.** "Up to 20%", "more than 6 months", "never with overdue payments" are domain invariants, but now they depend on the model obeying them.
2. **The model decides and executes.** There is no layer validating that the action is legal before applying it.
3. **Vendor coupling.** The LLM SDK, the tool call format and the CRM are mixed in the same function.
4. **Impossible to test without calling the model.** Every test is slow, expensive and non-deterministic.

DDD attacks exactly this: separating **what is true in the business** from **how it is technically implemented**.

---

## 2. Guiding principle: the LLM is infrastructure, not domain

This is the central idea of the article:

> **The model proposes; the domain disposes.**

The LLM interprets natural language, reasons and _suggests_ intentions. But the rules that determine whether an action is valid belong to the domain, are written in deterministic code and are tested without AI.

In hexagonal architecture terms:

```
                 ┌───────────────────────────────────────┐
                 │              APPLICATION              │
  Inbound        │   Use cases / Orchestration           │   Outbound
  adapters       │   (RetainCustomer, QualifyLead)       │   adapters
 ┌───────────┐   │  ┌─────────────────────────────────┐  │  ┌────────────┐
 │ Webhook   │──►│  │            DOMAIN               │  │─►│ CRM (REST) │
 │ Chat      │   │  │ Entities · Value Objects ·      │  │  │ Postgres   │
 │ Queue/Cron│   │  │ Aggregates · Policies · Events  │  │  │ Email      │
 └───────────┘   │  └─────────────────────────────────┘  │  │ LLM (port) │
                 │                                       │  └────────────┘
                 └───────────────────────────────────────┘
```

The LLM shows up as **just another outbound port**, the same as a database. The domain does not know which provider is behind it.

---

## 3. Ubiquitous language: the shared vocabulary (and the prompt's)

DDD starts with the **ubiquitous language**: a single vocabulary shared by business, product and code. In agents, this vocabulary has an additional benefit: **it is also the vocabulary of the prompt and of the tools**.

If the business talks about "at-risk account", "retention offer" and "escalation", those same terms should appear as:

- Class and method names in the domain.
- Names and descriptions of the agent's tools.
- Labels in logs and metrics.

When the model, the code and the sales team use the same words, interpretation errors go down and debugging becomes much simpler.

---

## 4. Bounded contexts: where each agent ends

A common mistake is to build "one agent that does everything". DDD suggests the opposite: split by **bounded contexts**, each with its own model and its own language.

An example for a SaaS business:

| Bounded Context | Responsibility                  | The concept "Customer" means…                       |
| --------------- | ------------------------------- | --------------------------------------------------- |
| **Sales**       | Qualify and convert leads       | A prospect with a score and a funnel stage          |
| **Retention**   | Detect risk and propose actions | An active account with health, usage and a contract |
| **Support**     | Resolve issues                  | A requester with tickets and a history              |
| **Billing**     | Charges and payments            | A payer with payment methods and debt               |

Each context can have its own agent, with its own tools, policies and prompts. Communication between them happens through **domain events** or explicit interfaces (an _anti-corruption layer_), not by sharing state or prompts.

Technical benefits:

- **Reduced tool surface:** each agent only sees the tools of its own context, which improves the model's accuracy and reduces risk.
- **Independent evolution:** changing the retention policy does not break the sales agent.
- **Clear permissions:** the support agent cannot, by construction, issue a Billing refund.

---

## 5. Modeling the domain: tactical building blocks

### 5.1 Value Objects: validation at the boundary

_Value objects_ are immutable, are compared by value and **validate in the constructor**. They are ideal for armoring the arguments the LLM proposes.

```ts
export class DiscountPercentage {
  private constructor(readonly value: number) {}

  static create(value: number): DiscountPercentage {
    if (!Number.isFinite(value) || value <= 0 || value > 100) {
      throw new InvalidDiscountError(value);
    }
    return new DiscountPercentage(value);
  }
}
```

If the model hallucinates `discount: 95`, the value object rejects it not through the prompt but through **code**. And that does not depend on the model's obedience.

### 5.2 Entities and aggregates: business invariants

An **aggregate** is a cluster of objects with a root that guarantees its invariants. This is where the rules that used to be in the prompt live.

```ts
export class CustomerAccount {
  constructor(
    readonly id: AccountId,
    private status: AccountStatus,
    private tenureMonths: number,
    private overduePayments: number,
    private offers: RetentionOffer[] = [],
  ) {}

  offerDiscount(
    pct: DiscountPercentage,
    policy: RetentionPolicy,
  ): RetentionOffer {
    if (this.overduePayments > 0) {
      throw new OfferNotAllowed("The account has overdue payments");
    }
    if (!policy.allows(pct, this.tenureMonths)) {
      throw new OfferNotAllowed("The discount exceeds the current policy");
    }
    const offer = RetentionOffer.create(this.id, pct);
    this.offers.push(offer);
    return offer;
  }
}
```

The rule "never discounts with overdue payments" is now **a line of code with a test**, not a sentence in a prompt.

### 5.3 Policies (Domain Services): rules that change

Rules that vary by business, region or campaign are modeled as interchangeable **policies**:

```ts
export interface RetentionPolicy {
  allows(pct: DiscountPercentage, tenureMonths: number): boolean;
}

export class StandardRetentionPolicy implements RetentionPolicy {
  allows(pct: DiscountPercentage, tenureMonths: number) {
    const cap = tenureMonths >= 6 ? 20 : 10;
    return pct.value <= cap;
  }
}
```

Marketing can change the cap without touching prompts or agent logic.

### 5.4 Domain events: traceability and decoupling

Every relevant fact is emitted as an immutable event:

```ts
export type RetentionOfferApplied = {
  type: "RetentionOfferApplied";
  accountId: string;
  percentage: number;
  decidedBy: "agent" | "human";
  occurredAt: Date;
};
```

Events enable:

- **Auditing:** who (or what) decided what, and when.
- **Decoupling:** the Billing context reacts to the event without Retention knowing about it.
- **Evaluation:** reconstructing the agent's behavior from facts, not from text logs.

---

## 6. The application layer: the agent as orchestrator

The **use case** coordinates; the domain decides. The agent lives here, behind a port.

### 6.1 The reasoning port

```ts
export interface ReasonerPort {
  proposeAction(context: DecisionContext): Promise<ProposedAction>;
}

export type ProposedAction =
  | { type: "offer_discount"; percentage: number; rationale: string }
  | { type: "escalate_to_human"; reason: string }
  | { type: "do_nothing"; reason: string };
```

Notice two design decisions:

- The model's output is a **typed, discriminated union**, not free text. It is validated with a schema (Zod, for example) before entering the domain.
- The port does not mention any provider. The concrete adapter (Claude, another model, a test _stub_) lives in infrastructure.

### 6.2 The use case

```ts
export class EvaluateAtRiskAccount {
  constructor(
    private accounts: AccountRepository,
    private reasoner: ReasonerPort,
    private policy: RetentionPolicy,
    private events: EventBus,
  ) {}

  async execute(accountId: AccountId) {
    const account = await this.accounts.get(accountId);
    const context = DecisionContext.from(account);

    const proposal = await this.reasoner.proposeAction(context);

    switch (proposal.type) {
      case "offer_discount": {
        try {
          const pct = DiscountPercentage.create(proposal.percentage);
          const offer = account.offerDiscount(pct, this.policy);
          await this.accounts.save(account);
          await this.events.publish(
            RetentionOfferApplied.from(offer, "agent"),
          );
        } catch (e) {
          if (e instanceof DomainError) {
            await this.events.publish(
              ProposalRejected.from(accountId, proposal, e),
            );
            return this.escalate(accountId, e.message);
          }
          throw e;
        }
        break;
      }
      case "escalate_to_human":
        return this.escalate(accountId, proposal.reason);
      case "do_nothing":
        return;
    }
  }
}
```

Note the pattern: **proposal → validation by the domain → effect or escalation**. If the model gets it wrong, the domain stops it and the system escalates to a human. The model's failure becomes a handled business case, not an incident.

---

## 7. Agent tools as adapters

When the agent uses _tool calling_, each tool should be a **thin adapter** to a use case, never a function with business logic of its own.

```ts
export const offerDiscountTool = {
  name: "offer_retention_discount",
  description: "Proposes a retention discount for an at-risk account",
  schema: z.object({
    accountId: z.string(),
    percentage: z.number(),
  }),
  handler: async (args: unknown) => {
    const { accountId, percentage } = schema.parse(args);
    return offerDiscount.execute(AccountId.of(accountId), percentage);
  },
};
```

Practical rules:

- **One tool = one use case.** No logic of its own.
- **Strict schema** on the input and **readable domain errors** on the output: the error message goes back to the model and lets it correct its next step.
- **Idempotency:** the model may retry. A tool with side effects has to tolerate that (idempotency keys, state checks).
- **Reads and writes kept separate:** read-only tools are exposed freely; write tools go through policies and, where appropriate, human approval.

---

## 8. Repositories and memory

The **agent's memory** is persistence, and DDD already has a pattern for that: the **repository**.

- **Business state** (accounts, offers, leads) → aggregate repositories on top of PostgreSQL or another database.
- **Conversation and decision history** → its own repository, often as an _event store_ or an events table.
- **Retrievable knowledge (RAG)** → a `KnowledgeBase` port with a method along the lines of `search(query, context)`. The vector store is an interchangeable infrastructure detail.

```ts
export interface KnowledgeBase {
  search(query: string, limit: number): Promise<KnowledgeFragment[]>;
}
```

That way, switching vector stores or retrieval strategies does not affect the domain or the use cases.

---

## 9. Testing: TDD with a non-deterministic component

This is probably the biggest practical advantage. By isolating the LLM behind a port, **three levels of tests** emerge, each with a different purpose.

### Level 1: Domain (deterministic, fast, no AI)

Invariants and policies are tested with classic TDD:

```ts
it("rejects discounts on accounts with overdue payments", () => {
  const account = AccountBuilder.withOverduePayments(1).build();
  expect(() =>
    account.offerDiscount(DiscountPercentage.create(10), standardPolicy),
  ).toThrow(OfferNotAllowed);
});
```

Thousands of cases run in milliseconds and cost no tokens.

### Level 2: Use cases with a fake reasoner

The port is replaced by a _stub_ that returns controlled proposals, including the **bad** ones:

```ts
it("escalates to a human when the model proposes an out-of-policy discount", async () => {
  const reasoner = new FakeReasoner({
    type: "offer_discount",
    percentage: 95,
    rationale: "…",
  });
  const uc = new EvaluateAtRiskAccount(
    repo,
    reasoner,
    standardPolicy,
    events,
  );

  await uc.execute(accountId);

  expect(events.published).toContainEqual(
    expect.objectContaining({ type: "ProposalRejected" }),
  );
  expect(escalations).toHaveLength(1);
});
```

Something crucial is verified here: **the system is safe even when the model fails**.

### Level 3: Model evaluations (non-deterministic, with real data)

This is where the real model does get called, over a set of labeled cases, and aggregate metrics are measured: accuracy of the proposed action, escalation rate, proposals rejected by the domain, latency and cost per case. These evaluations run in CI on prompt, model or tool changes, and catch regressions no unit test would see.

The separation is key: **levels 1 and 2 guarantee safety and correctness; level 3 measures quality.**

---

## 10. Suggested folder structure

```
src/
├── retention/                     # Bounded context
│   ├── domain/
│   │   ├── customer-account.ts    # Aggregate
│   │   ├── retention-offer.ts     # Entity
│   │   ├── discount-percentage.ts # Value Object
│   │   ├── retention-policy.ts    # Policy
│   │   └── events/
│   ├── application/
│   │   ├── evaluate-at-risk-account.ts   # Use case
│   │   └── ports/
│   │       ├── reasoner.port.ts
│   │       └── knowledge-base.port.ts
│   ├── infrastructure/
│   │   ├── reasoner-llm.adapter.ts       # Adapter to the LLM provider
│   │   ├── account.repository.pg.ts
│   │   └── tools/                        # The agent's tool adapters
│   └── interfaces/
│       └── webhooks / cron / http
└── sales/                         # Another bounded context
    └── ...
```

This structure fits naturally with frameworks like NestJS, where modules, dependency injection and providers make it easy to register interchangeable adapters for each port.

---

## 11. Common mistakes when applying DDD to agents

1. **Putting business rules in the prompt "for convenience".** The prompt guides; the domain guarantees. If a rule is critical, it must exist in code.
2. **A single giant agent.** It breaks the idea of bounded contexts and multiplies the risk surface.
3. **Tools with logic of their own.** They duplicate rules, let them drift apart and make them hard to test.
4. **Trusting free text as output.** Without schemas and types, the domain receives garbage.
5. **Over-modeling from day one.** DDD does not demand aggregates for everything. Start with the context that has the most rules and the most risk, and model what hurts.
6. **Ignoring events.** Without them, you lose the traceability that makes it possible to audit and evaluate the agent.

---

## 12. When it is not worth it

DDD has a cost. For an afternoon prototype, a trivial automation or an agent with no effects on real systems, it is probably overkill. It starts to pay off when:

- The agent **executes actions with consequences** (money, data, customer communications).
- There are **complex or changing business rules**.
- **Several teams or contexts** are involved.
- You need to **audit, evaluate and improve** behavior continuously.

---

## Conclusion

Building AI agents in production is, to a large extent, a classic software engineering problem with a new, non-deterministic piece at its center. DDD, hexagonal architecture and TDD offer a proven answer: **keep the domain explicit and deterministic, and treat the model as a collaborator that proposes, never as the authority that decides.**

When that boundary is well drawn, the agent becomes testable, auditable and able to evolve: you can switch models, adjust policies or add tools without fear of breaking the rules that hold the business up.

---

### About the author

**Jose Veliz** is a Senior Full Stack Engineer with 8 years of experience building web and mobile products. He works with TypeScript, Python, Node.js and NestJS, with a focus on DDD, TDD and clean and hexagonal architecture. He has developed AI agents and systems on platforms with more than 1,000 microservices, and is available for freelance projects.

📩 ducen29@gmail.com · 🌐 ducen.dev
