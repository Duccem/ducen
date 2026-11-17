"use client";
import { useTranslations } from "next-intl";

type Job = {
  company: string;
  role: string;
  location: string;
  period: string;
  highlight: string;
};

export const ExperienceSection = () => {
  const t = useTranslations("experience");
  const jobs = t.raw("items") as Job[];
  const stats = t.raw("stats") as Array<{ value: string; label: string }>;
  const names = jobs.map((job) => job.company);

  const line = (
    <span className="flex shrink-0 items-center">
      {names.map((name) => (
        <span key={name} className="flex items-center">
          <span className="px-[0.35em]">{name}</span>
          <span
            aria-hidden="true"
            className="inline-block size-[0.24em] rounded-full bg-current"
          />
        </span>
      ))}
    </span>
  );

  return (
    <section id="experience">
      {/* Names running off the edges */}
      <div
        aria-hidden="true"
        className="bg-surface overflow-hidden h-[22vh] md:h-[34vh] flex items-center"
      >
        <div className="marquee-track flex w-max whitespace-nowrap text-[15vw] md:text-[8vw] font-semibold tracking-[-0.045em] leading-none">
          {line}
          {line}
          {line}
          {line}
        </div>
      </div>
      <p data-reveal className="page-x mt-6 text-body max-w-[60ch]">
        {t("band")}
      </p>

      {/* The line-up */}
      <div className="page-x pt-[clamp(96px,12vw,180px)]">
        <h2 data-reveal className="text-head tracking-[-0.04em]">
          {t("title")}
        </h2>

        <table className="mt-12 w-full text-left [font-variant-numeric:tabular-nums]">
          <caption className="sr-only">{t("title")}</caption>
          <tbody>
            {jobs.map((job, i) => (
              <tr
                key={job.company}
                data-reveal
                style={{ "--i": i } as React.CSSProperties}
                className="group block md:table-row align-top"
              >
                <td className="block md:table-cell md:w-[30%] pt-6 md:py-4 text-lead font-semibold tracking-[-0.03em] leading-tight">
                  {job.company}
                </td>
                <td className="block md:table-cell md:w-[40%] md:py-4 pr-6">
                  <span className="block text-body md:text-lead md:tracking-[-0.03em] md:leading-tight">
                    {job.role}
                  </span>
                  <span className="mt-1 block text-body text-soft max-w-[52ch]">
                    {job.highlight}
                  </span>
                </td>
                <td className="inline md:table-cell md:py-4 text-small md:text-lead md:tracking-[-0.03em] text-soft md:text-ink">
                  {job.location}
                  <span className="md:hidden"> · </span>
                </td>
                <td className="inline md:table-cell md:py-4 text-small md:text-lead md:tracking-[-0.03em] md:text-right text-soft md:text-ink whitespace-nowrap">
                  {job.period}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* What that work produced */}
        <dl className="mt-[clamp(80px,10vw,140px)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-[clamp(44px,5.6vw,92px)] font-semibold tracking-[-0.05em] leading-none">
                {stat.value}
              </dd>
              <dd className="mt-3 text-body max-w-[24ch]">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
