"use client";
import { useLocale, useTranslations } from "next-intl";
import { useId, useMemo, useState } from "react";
import { CAL_URL, EMAIL } from "@/lib/site";

type Option = { id: string; label: string };
type Stage = { title: string; deliverables: string };

// Sample durations in weeks: definition, design, development, delivery.
// Confirm with José before launch.
const BASE: Record<string, [number, number, number, number]> = {
  web: [0.5, 1, 1.5, 0.5],
  store: [1, 1, 3, 0.5],
  saas: [1, 1.5, 4, 1],
  agent: [1, 0.5, 3, 0.5],
  mobile: [1, 1.5, 4, 1],
};
const EXTRA_DEV: Record<string, number> = {
  payments: 1,
  admin: 1,
  ai: 1.5,
  i18n: 0.5,
};

export const ProcessSection = () => {
  const t = useTranslations("process");
  const locale = useLocale();
  const types = t.raw("types") as Option[];
  const extras = t.raw("extras") as Option[];
  const stages = t.raw("stages") as Stage[];
  const [type, setType] = useState("saas");
  const [chosen, setChosen] = useState<string[]>([]);
  const groupId = useId();

  const fmt = useMemo(
    () => new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }),
    [locale],
  );

  const plan = useMemo(() => {
    const durations = [...BASE[type]];
    durations[2] += chosen.reduce((sum, id) => sum + (EXTRA_DEV[id] ?? 0), 0);
    let cursor = 0;
    const rows = durations.map((weeks, i) => {
      const from = Math.floor(cursor) + 1;
      cursor += weeks;
      const to = Math.max(from, Math.ceil(cursor));
      return { ...stages[i], weeks, from, to };
    });
    return { rows, total: Math.ceil(cursor) };
  }, [type, chosen, stages]);

  const toggle = (id: string) =>
    setChosen((list) =>
      list.includes(id) ? list.filter((x) => x !== id) : [...list, id],
    );

  const typeLabel = types.find((x) => x.id === type)?.label ?? "";
  const extrasLabel =
    extras
      .filter((x) => chosen.includes(x.id))
      .map((x) => x.label)
      .join(", ") || t("none");
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(
    t("emailSubject", { type: typeLabel }),
  )}&body=${encodeURIComponent(
    t("emailBody", { type: typeLabel, extras: extrasLabel, total: plan.total }),
  )}`;

  const chip = (on: boolean) =>
    `min-h-11 px-4 text-body transition-[background-color,color,transform] duration-200 active:scale-95 ${
      on
        ? "bg-paper text-paper-ink"
        : "bg-white/12 text-white hover:bg-white/20"
    }`;

  return (
    <section
      id="process"
      className="bg-accent text-white page-x py-[clamp(96px,12vw,180px)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-14">
        {/* Heading, intro and the controls */}
        <div className="lg:col-span-5">
          <h2
            data-reveal
            className="text-head tracking-[-0.045em] leading-[0.95]"
          >
            {t("title")}
          </h2>
          <p
            data-reveal
            style={{ "--i": 1 } as React.CSSProperties}
            className="mt-6 text-lead leading-[1.35] max-w-[30ch]"
          >
            {t("intro")}
          </p>

          <fieldset
            data-reveal
            style={{ "--i": 2 } as React.CSSProperties}
            className="mt-12"
          >
            <legend className="text-body font-medium">{t("typeLabel")}</legend>
            <div className="mt-4 flex flex-wrap gap-2" role="radiogroup">
              {types.map((option) => (
                // biome-ignore lint/a11y/useSemanticElements: button-styled radio chips with aria-checked
                <button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={type === option.id}
                  name={groupId}
                  onClick={() => setType(option.id)}
                  className={chip(type === option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset
            data-reveal
            style={{ "--i": 3 } as React.CSSProperties}
            className="mt-8"
          >
            <legend className="text-body font-medium">
              {t("extrasLabel")}
            </legend>
            <div className="mt-4 flex flex-wrap gap-2">
              {extras.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={chosen.includes(option.id)}
                  onClick={() => toggle(option.id)}
                  className={chip(chosen.includes(option.id))}
                >
                  {chosen.includes(option.id) ? "− " : "+ "}
                  {option.label}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        {/* The slip */}
        <div className="lg:col-start-7 lg:col-span-6 xl:col-start-8 xl:col-span-5">
          <div
            data-reveal
            style={
              {
                "--i": 2,
                clipPath:
                  "polygon(0 0,100% 0,100% calc(100% - 14px),95% 100%,90% calc(100% - 14px),85% 100%,80% calc(100% - 14px),75% 100%,70% calc(100% - 14px),65% 100%,60% calc(100% - 14px),55% 100%,50% calc(100% - 14px),45% 100%,40% calc(100% - 14px),35% 100%,30% calc(100% - 14px),25% 100%,20% calc(100% - 14px),15% 100%,10% calc(100% - 14px),5% 100%,0 calc(100% - 14px))",
              } as React.CSSProperties
            }
            className="bg-paper text-paper-ink px-6 sm:px-8 pt-8 pb-14 [font-variant-numeric:tabular-nums]"
            aria-live="polite"
          >
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-lead font-semibold tracking-[-0.02em]">
                {t("slipTitle")}
              </p>
              <p className="text-body text-paper-soft text-right">
                {typeLabel}
              </p>
            </div>

            {plan.rows.map((row) => (
              <div key={row.title} className="mt-7">
                <p className="text-body font-semibold">
                  {row.from === row.to
                    ? t("week", { from: row.from })
                    : t("weeks", { from: row.from, to: row.to })}
                </p>
                <div className="mt-2 flex items-baseline gap-2 text-body">
                  <span className="shrink-0">{row.title}</span>
                  <span
                    aria-hidden="true"
                    className="flex-1 overflow-hidden whitespace-nowrap text-paper-soft tracking-[0.2em]"
                  >
                    {"·".repeat(80)}
                  </span>
                  <span className="shrink-0">
                    {t("unit", { n: fmt.format(row.weeks) })}
                  </span>
                </div>
                <p className="mt-1 text-small text-paper-soft leading-snug max-w-[48ch]">
                  {row.deliverables}
                </p>
              </div>
            ))}

            <div className="mt-7">
              <p className="text-body font-semibold">{t("after")}</p>
              <div className="mt-2 flex items-baseline gap-2 text-body">
                <span className="shrink-0">{t("support")}</span>
                <span
                  aria-hidden="true"
                  className="flex-1 overflow-hidden whitespace-nowrap text-paper-soft tracking-[0.2em]"
                >
                  {"·".repeat(80)}
                </span>
                <span className="shrink-0">{t("supportValue")}</span>
              </div>
              <p className="mt-1 text-small text-paper-soft">
                {t("supportDetail")}
              </p>
            </div>

            <div className="-mx-6 sm:-mx-8 mt-8 min-h-11 px-6 sm:px-8 py-3 bg-paper-ink text-paper flex items-center justify-between gap-4 text-body">
              <span>{t("total")}</span>
              <span className="shrink-0 font-semibold">
                ≈ {t("unit", { n: plan.total })}
              </span>
            </div>
          </div>

          <p className="mt-6 text-small text-white">{t("note")}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={mailto}
              className="btn bg-paper-ink! text-paper! hover:bg-black!"
            >
              {t("send")}
              <span aria-hidden="true" className="btn-arrow">
                →
              </span>
            </a>
            <a
              href={CAL_URL}
              target="_blank"
              rel="noreferrer"
              className="text-link text-body"
            >
              {t("book")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
