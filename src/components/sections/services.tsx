"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";

type Group = { title: string; description: string; items: string[] };

export const ServicesSection = () => {
  const t = useTranslations("services");
  const groups = t.raw("groups") as Group[];
  const [focus, setFocus] = useState(0);

  const starts = ["md:col-start-1", "md:col-start-4", "md:col-start-7"];

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: hover only resets a decorative read-out
    <section
      id="services"
      className="page-x py-[clamp(120px,20vh,240px)]"
      onMouseLeave={() => setFocus(0)}
    >
      <h2 data-reveal className="text-head tracking-[-0.04em] max-w-[14ch]">
        {t("title")}
      </h2>

      <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-12">
        {groups.map((group, g) => (
          // biome-ignore lint/a11y/noStaticElementInteractions: hover/focus preview; the same text is in the list
          <div
            key={group.title}
            data-reveal
            style={{ "--i": g + 1 } as React.CSSProperties}
            className={`md:col-span-3 ${starts[g]}`}
            onMouseEnter={() => setFocus(g)}
            onFocus={() => setFocus(g)}
          >
            <h3 className="text-lead tracking-[-0.02em] leading-tight font-semibold">
              {group.title}
            </h3>
            <ul className="mt-6 space-y-1.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className={`text-body leading-[1.3] transition-colors duration-200 ${
                    focus === g ? "text-ink" : "text-soft"
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="md:hidden mt-5 text-body text-soft">
              {group.description}
            </p>
          </div>
        ))}

        {/* The fixed spot that reads out the hovered group */}
        <div
          className="hidden md:block md:col-start-10 md:col-span-3"
          aria-live="polite"
        >
          <p className="text-body text-ink min-h-[7lh]">
            {groups[focus]?.description}
          </p>
          <p className="mt-4 text-small text-soft">{t("hint")}</p>
        </div>
      </div>
    </section>
  );
};
