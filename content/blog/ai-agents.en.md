---
title: "AI agents in business processes: how to sell more and retain better by building your own agents"
description: "AI agents are a new layer of software capable of executing work in sales, support and retention. Their value depends less on the model you choose than on the quality of the engineering around it: well-designed APIs, robust orchestration, guardrails, observability and continuous evaluation."
author: "Jose Veliz"
date: 2024-06-20
---

_By Jose Veliz, Senior Full Stack Engineer · AI Agents, SaaS & Fintech_

---

For years, automating a business process meant writing rules: "if the customer does X, send email Y". It worked as long as the world was predictable. But sales and customer retention are not: every lead asks something different, every customer leaves for a different reason, and the data that matters is scattered across the CRM, support, billing and the product.

**AI agents** change this picture. In this article I explain, from a technical point of view, what they are, how they are built and why developing your own agents can give you a real advantage. I write it from my experience building agents and automated processes in production, at Disso and at Rappi, on top of eight years developing web and mobile products for startups and scale-ups.

---

## 1. What is an AI agent, really?

An AI agent is a system that, given a goal, **decides which steps to take, executes actions on other systems and adjusts its behavior based on the results**. It does not just answer with text.

|                     | Classic automation | Chatbot            | AI agent                               |
| ------------------- | ------------------ | ------------------ | -------------------------------------- |
| Logic               | Fixed rules        | Conversation       | Reasoning + actions                    |
| Handles new cases   | No                 | Partially          | Yes, within its limits                 |
| Uses tools and APIs | Yes, predefined    | Rarely             | Yes, it decides when and how           |
| Keeps context       | No                 | Within the session | Session + memory + business data       |
| Closes the loop     | Only if programmed | No                 | Yes: it acts, verifies and retries     |

The key difference is that the agent **acts**. A chatbot tells you how to reschedule a meeting; an agent reschedules it, updates the CRM and notifies the team.

---

## 2. Technical anatomy of an agent

Although every implementation varies, almost all business agents share the same components.

### 2.1 The language model as the reasoning engine

The LLM interprets intent, plans and decides the next action. Choosing the model is an engineering decision: a large model reasons better but costs more and takes longer; a small one is fast and cheap for narrow tasks. In practice it pays to **route**: lightweight models for classification and extraction, powerful models for complex decisions.

### 2.2 Tools (tool use / function calling)

Tools are what turn a model into an agent. Each tool is a function with a clear contract (name, description, input and output schema) that the model can invoke:

```ts
const tools = [
  {
    name: "find_customer",
    description: "Looks up a customer in the CRM by email or ID",
    input_schema: {
      type: "object",
      properties: { email: { type: "string" } },
      required: ["email"],
    },
  },
  {
    name: "create_retention_offer",
    description: "Generates a retention offer within the approved limits",
    input_schema: {
      type: "object",
      properties: {
        customer_id: { type: "string" },
        type: { enum: ["discount", "trial_extension", "free_upgrade"] },
      },
      required: ["customer_id", "type"],
    },
  },
];
```

This is where backend experience carries weight: an agent is only as good as the APIs it has at its disposal. Designing idempotent endpoints, with strict validation and clear errors (something common when integrating payment services and financial systems) makes the agent far more reliable.

### 2.3 Memory and context

There are three levels:

- **Short-term memory:** the history of the conversation or of the task in progress.
- **Long-term memory:** preferences, previous interactions and customer state, stored in a database (PostgreSQL, for example, or a vector store).
- **Business knowledge:** policies, catalog, pricing, support guides. It is brought in with **RAG** (_Retrieval-Augmented Generation_): the agent retrieves the relevant fragments before answering, instead of relying on what the model "remembers".

### 2.4 Orchestration

The agent rarely solves everything in a single step. Orchestration defines the work loop:

1. Perceive (message, event, webhook).
2. Plan (what needs to be known or done).
3. Act (call tools).
4. Observe (read the result).
5. Decide whether it is done, retries or escalates to a human.

Long flows are best modeled as **state machines** with queues and background processes, so that every step is resumable and auditable. A production agent is, to a large extent, distributed systems engineering with an LLM at the center.

### 2.5 Guardrails and human oversight

An agent with access to real actions needs limits:

- **Least privilege:** each tool exposes only what is necessary.
- **Output validation:** strict schemas before executing any action.
- **Confidence thresholds:** if the agent is unsure, it escalates.
- **Human-in-the-loop** for sensitive actions (large discounts, refunds, contract changes).
- **Full traceability:** every decision and call is logged.

---

## 3. Use case: sales

A well-designed sales agent can cover a good part of the funnel:

**Lead qualification.** It receives the lead from the form or the chat, enriches the data, asks discovery questions and scores it against defined criteria (budget, need, urgency, size).

**Smart follow-up.** Instead of generic sequences, it writes messages based on each prospect's context and detects signals of interest: visits to the pricing page, replies, opened proposals.

**Scheduling.** It checks the sales team's calendar, proposes time slots and confirms the meeting without any manual back-and-forth over email.

**CRM hygiene.** It logs notes, updates stages and fills in fields. This is an underrated benefit: the data no longer depends on each salesperson's discipline.

**Typical architecture:**

```
Lead comes in (web / WhatsApp / email)
        │
        ▼
    Sales agent ──► RAG (catalog, pricing, FAQs)
        │
        ├──► Tool: CRM (find / create / update)
        ├──► Tool: Calendar (availability / booking)
        ├──► Tool: Email / messaging
        │
        ▼
 Qualified lead? ── yes ──► Assigns a human salesperson with a summary
        │
        no
        ▼
   Automated nurturing
```

The human salesperson does not disappear: they receive leads that are already qualified, with summarized context, and spend their time closing.

---

## 4. Use case: customer retention

Retaining is usually more profitable than acquiring, and it is where an agent contributes a lot because it works **proactively and continuously**.

**Risk detection.** A background process analyzes signals: a drop in usage, unresolved tickets, failed payments, changes in behavior. It combines rules, scoring models and LLM reasoning over ambiguous cases.

**Personalized intervention.** When a customer is at risk, the agent reviews their history, identifies the likely cause and proposes the right action: help with a feature, an offer within the approved limits or a call with the customer success team.

**Support that resolves.** Many cancellations stem from problems that were not solved in time. A support agent with access to the right tools resolves most repetitive requests and escalates only the complex ones.

### A real example of impact

At Rappi I led the migration of the restaurant support area to artificial intelligence models, on top of an infrastructure of more than 1,000 microservices. The result was **86% of tickets automated and savings of more than USD 30,000 per month**. That experience confirms something I repeat on every project: the value does not come from the model alone, but from integrating it well with existing systems and measuring the outcome.

At Disso, I built agents and background processes for the analysis and management of human risk, working as a founding engineer. The technical principle is the same as in retention: **detect signals early, reason about them and act before the problem grows**.

---

## 5. Why build your own agents?

There are platforms that promise "ready-to-use" agents. They are useful for validating an idea quickly, but building your own agents brings advantages that compound over time.

### 5.1 Deep integration with your business

Your processes have their particularities: pricing rules, exceptions, legacy systems. Your own agent connects directly to your APIs, databases and workflows, instead of adapting your operation to the limitations of a generic tool.

### 5.2 Data control and security

You decide what data the model sees, where it is stored, what gets masked and which provider is used. For sectors like fintech, healthcare or security, this is not a luxury, it is a requirement.

### 5.3 Predictable costs at scale

With your own architecture you can optimize: route between models, cache frequent responses, process in batches and limit context. At high volume, the difference compared to per-conversation or per-seat pricing is considerable.

### 5.4 Measurable, improvable quality

If you control the system, you can build **your own evaluations**: sets of real cases, resolution metrics, escalation rate and satisfaction. That lets you improve systematically rather than by intuition.

### 5.5 A competitive advantage that is hard to copy

An agent trained on your context, with your data, your policies and your integrations, becomes an asset of your own. A subscription to the same tool your competitors use does not.

### 5.6 Vendor independence

An abstraction layer over the models lets you switch providers or combine several without rewriting the product. The model market moves fast; your architecture should not be tied to a single one.

---

## 6. Risks and best practices

Building agents also means managing real risks:

- **Hallucinations:** reduce them with RAG, output validation and tools instead of the model's "memory".
- **Improper actions:** least privilege, per-tool limits and human approval for anything sensitive.
- **Silent regressions:** a change of prompt or model can degrade results. You need automated evaluations on every change, just as TDD is done in traditional software.
- **Runaway costs:** monitor tokens, latency and calls per task.
- **Privacy:** minimize the personal data sent to the model and log access.
- **Internal adoption:** the team has to trust the agent. Starting with a narrow process, measuring and expanding gives better results than a massive rollout.

**A practical path to get started:**

1. Pick **one** process with high volume, clear rules and measurable impact (for example, lead qualification or frequent support replies).
2. Define the success metric before you build.
3. Build a first version with few tools and human oversight.
4. Log everything and create an evaluation set with real cases.
5. Iterate, expand the tools and reduce oversight where the data justifies it.

---

## 7. Conclusion

AI agents are neither a passing fad nor simply a better chatbot: they are a new layer of software capable of executing work in sales, support and retention. Their value depends less on the model you choose than on the **quality of the engineering around it**: well-designed APIs, robust orchestration, guardrails, observability and continuous evaluation.

Companies that build that capability in-house, even if they start with a single process, will accumulate data, learning and automation that their competitors will take a long time to match.

---

### About the author

**Jose Veliz** is a Senior Full Stack Engineer with 8 years of experience building web and mobile products for startups and scale-ups. He has developed AI agents, payment integrations and systems on platforms with more than 1,000 microservices. He works with TypeScript, Python, React/Next.js, Node.js and AWS, and is available for freelance projects during hours compatible with the US East Coast.

📩 ducen29@gmail.com · 🌐 ducen.dev
