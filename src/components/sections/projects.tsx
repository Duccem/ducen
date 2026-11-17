"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";

type Project = {
  name: string;
  kind: string;
  description: string;
  href: string;
  image: string;
  alt: string;
};

export const ProjectsSection = () => {
  const t = useTranslations("work");
  const items = t.raw("items") as Project[];
  const [active, setActive] = useState(0);

  return (
    <section id="work" className="page-x pt-[clamp(120px,14vw,220px)]">
      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12 md:col-span-8">
          <h2
            data-reveal
            className="text-lead tracking-[-0.03em] leading-tight font-semibold"
          >
            {t("title")}
          </h2>
          <p
            data-reveal
            style={{ "--i": 1 } as React.CSSProperties}
            className="mt-2 text-soft"
          >
            {t("intro")}
          </p>

          <ul className="mt-12">
            {items.map((item, i) => (
              <li
                key={item.name}
                data-reveal
                style={{ "--i": i + 1 } as React.CSSProperties}
              >
                {/* Phone: picture then name */}
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="md:hidden block mb-10"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="100vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <span className="mt-4 block text-[9.5vw] font-semibold tracking-[-0.045em] leading-none">
                    {item.name}
                  </span>
                  <span className="mt-2 block text-body">
                    <span className="font-medium">{item.kind}.</span>{" "}
                    {item.description}
                  </span>
                </a>

                {/* Desktop: the names are the index */}
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-describedby={`work-desc-${i}`}
                  className="group hidden md:flex items-baseline gap-6 py-[10px]"
                >
                  <span
                    className={`text-[clamp(44px,5.6vw,92px)] font-semibold tracking-[-0.045em] leading-none transition-[color,transform] duration-300 ease-out ${
                      active === i ? "text-ink translate-x-3" : "text-soft"
                    }`}
                  >
                    {item.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`ml-auto text-lead transition-[opacity,transform] duration-300 ${
                      active === i
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-2"
                    }`}
                  >
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Fixed preview frame */}
        <div className="hidden md:block col-span-4">
          <div className="sticky top-[12vh]">
            <div className="relative aspect-[4/5] overflow-hidden bg-surface">
              {items.map((item, i) => (
                <Image
                  key={item.image}
                  src={item.image}
                  alt={item.alt}
                  fill
                  loading="eager"
                  sizes="34vw"
                  className={`object-cover object-top transition-[opacity,transform] duration-500 ease-out ${
                    active === i
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-[1.04]"
                  }`}
                />
              ))}
            </div>
            {items.map((item, i) => (
              <p
                key={item.name}
                id={`work-desc-${i}`}
                className={`mt-4 text-body ${active === i ? "block" : "hidden"}`}
              >
                <span className="font-medium">{item.kind}.</span>{" "}
                {item.description}{" "}
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-link"
                >
                  {t("visit")}
                </a>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
