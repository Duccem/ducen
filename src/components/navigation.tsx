"use client";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import { CAL_URL } from "@/lib/site";

export const LocaleSwitch = ({ className = "" }: { className?: string }) => {
  const t = useTranslations("nav");
  const locale = useLocale();
  const options = t.raw("locales") as Array<{ value: string; label: string }>;

  const setLocale = (next: string) => {
    if (next === locale) return;
    document.cookie = `locale=${next}; path=/; max-age=31536000; samesite=lax`;
    window.location.reload();
  };

  return (
    <fieldset
      className={`flex items-center gap-3 text-small ${className}`}
      aria-label={t("switcherLabel")}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setLocale(option.value)}
          aria-pressed={option.value === locale}
          className={`transition-colors ${
            option.value === locale
              ? "text-ink underline underline-offset-4"
              : "text-soft hover:text-ink"
          }`}
        >
          {option.label}
        </button>
      ))}
    </fieldset>
  );
};

/**
 * A plain bar that sits on the page (not fixed): wordmark, a few links, one
 * action. On the home page it overlays the top of the hero.
 */
export const Navigation = () => {
  const t = useTranslations("nav");
  const items = t.raw("items") as Array<{ label: string; href: string }>;
  const [open, setOpen] = useState(false);

  return (
    <header className="page-x relative z-30 flex items-start justify-between gap-6 pt-6">
      <a
        href="/"
        className="font-medium tracking-tight text-body hover:text-soft transition-colors"
      >
        José Manuel Véliz
      </a>

      <nav className="hidden md:flex items-center gap-8" aria-label="Main">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-body text-ink hover:text-soft transition-colors"
          >
            {item.label}
          </a>
        ))}
        <LocaleSwitch />
      </nav>

      <button
        type="button"
        className="md:hidden text-body underline underline-offset-4"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? t("close") : t("menu")}
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="md:hidden fixed inset-0 z-40 bg-ground page-x pt-6 pb-10 flex flex-col"
        >
          <div className="flex justify-between">
            <span className="font-medium">José Manuel Véliz</span>
            <button
              type="button"
              className="text-body underline underline-offset-4"
              onClick={() => setOpen(false)}
            >
              {t("close")}
            </button>
          </div>
          <nav className="mt-16 flex flex-col gap-2" aria-label="Mobile">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-[2.75rem] font-semibold tracking-[-0.04em] leading-tight"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto flex items-center justify-between gap-4">
            <a className="btn" href={CAL_URL} target="_blank" rel="noreferrer">
              {t("cta")}
            </a>
            <LocaleSwitch />
          </div>
        </div>
      )}
    </header>
  );
};
