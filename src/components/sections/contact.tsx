import { getTranslations } from "next-intl/server";
import { CAL_URL, EMAIL } from "@/lib/site";

const social = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jose-manuel-veliz" },
  { label: "GitHub", href: "https://github.com/Duccem" },
  { label: "X", href: "https://x.com/_ducen29" },
];

/** The close: the page's colours flip, and the idea returns. */
export const ContactSection = async () => {
  const t = await getTranslations("contact");

  return (
    <section
      id="contact"
      className="bg-paper text-paper-ink page-x min-h-[80svh] md:min-h-[90svh] flex flex-col pt-[clamp(72px,10vw,140px)] pb-10"
    >
      <h2
        data-reveal
        className="text-[15vw] md:text-[clamp(72px,9.5vw,170px)] tracking-[-0.055em] leading-[0.9] max-w-[9ch]"
      >
        {t("title")}
      </h2>
      <div className="mt-auto pt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <p
          data-reveal
          style={{ "--i": 1 } as React.CSSProperties}
          className="text-body leading-[1.4] max-w-[40ch]"
        >
          {t("sentence")}
        </p>
        <a
          data-reveal
          style={{ "--i": 2 } as React.CSSProperties}
          href={CAL_URL}
          target="_blank"
          rel="noreferrer"
          className="btn min-h-14 w-full md:w-auto"
        >
          {t("cta")}
          <span aria-hidden="true" className="btn-arrow">
            →
          </span>
        </a>
      </div>
    </section>
  );
};

export const SiteFooter = async () => {
  const t = await getTranslations("contact");
  const nav = await getTranslations("nav");
  const items = nav.raw("items") as Array<{ label: string; href: string }>;

  const head = "block text-ink font-medium";
  const link = "block text-soft hover:text-ink transition-colors";

  return (
    <footer className="page-x min-h-svh grid grid-rows-[auto_1fr_auto] pt-10 pb-6 overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-8 text-body leading-relaxed">
        <div className="md:col-span-3">
          <span className={head}>{t("columns.contact")}</span>
          <a className={link} href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          <a className={link} href={CAL_URL} target="_blank" rel="noreferrer">
            {t("book")}
          </a>
        </div>
        <div className="md:col-span-3">
          <span className={head}>{t("columns.nav")}</span>
          {items.map((item) => (
            <a key={item.href} className={link} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="md:col-span-3">
          <span className={head}>{t("columns.social")}</span>
          {social.map((s) => (
            <a
              key={s.label}
              className={link}
              href={s.href}
              target="_blank"
              rel="noreferrer"
            >
              {s.label}
            </a>
          ))}
        </div>
        <div className="md:col-span-3">
          <span className={head}>{t("columns.more")}</span>
          <a
            className={link}
            href="/docs/jose-veliz-cv.pdf"
            target="_blank"
            rel="noreferrer"
          >
            {t("cv")}
          </a>
        </div>
      </div>
      <div />
      <div>
        <p
          aria-hidden="true"
          className="font-semibold whitespace-nowrap text-[23vw] tracking-[-0.06em] leading-[0.8] -ml-[0.04em]"
        >
          José Véliz
        </p>
        <p className="mt-5 text-small text-soft">{t("rights")}</p>
      </div>
    </footer>
  );
};
