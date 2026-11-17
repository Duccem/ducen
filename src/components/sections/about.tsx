"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";

type Photo = {
  src: string;
  title: string;
  role: string;
  text: string;
  alt: string;
};

export const AboutSection = () => {
  const t = useTranslations("about");
  const photos = t.raw("photos") as Photo[];
  const offsets = ["md:mr-[30%]", "md:ml-[30%]", "md:mr-[24%]"];

  return (
    <section
      id="about"
      className="page-x pt-[clamp(120px,16vw,240px)] pb-[clamp(80px,10vw,160px)]"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6">
        {/* Pinned title */}
        <div className="md:col-span-5">
          <div className="md:sticky md:top-0 md:h-svh md:flex md:flex-col md:justify-center">
            <h2
              data-reveal
              className="text-[17vw] md:text-[clamp(72px,9.5vw,170px)] tracking-[-0.055em] leading-[0.85] whitespace-nowrap"
            >
              {t("title")}
            </h2>
            <p
              data-reveal
              style={{ "--i": 1 } as React.CSSProperties}
              className="mt-8 text-lead leading-[1.35] max-w-[30ch]"
            >
              {t("intro")}
            </p>
            <a
              data-reveal
              style={{ "--i": 2 } as React.CSSProperties}
              href="/docs/jose-veliz-cv.pdf"
              target="_blank"
              rel="noreferrer"
              className="mt-8 self-start text-link text-body"
            >
              {t("cv")}
            </a>
          </div>
        </div>

        {/* Portraits pass */}
        <div className="md:col-start-7 md:col-span-6 mt-16 md:mt-[12vh] flex flex-col gap-12 md:gap-[10vh]">
          {photos.map((photo, i) => (
            <figure
              key={photo.src}
              data-reveal
              className={`w-[72%] md:w-auto ${i % 2 ? "self-end" : "self-start"} ${offsets[i % offsets.length]}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 768px) 30vw, 72vw"
                  className="object-cover drift"
                  style={{ animationDelay: `${i * -6}s` }}
                />
              </div>
              <figcaption className="mt-4 max-w-[34ch]">
                <span className="block text-lead font-semibold tracking-[-0.02em] leading-tight">
                  {photo.title}
                </span>
                <span className="block text-small text-soft mt-1">
                  {photo.role}
                </span>
                <span className="block text-body mt-3">{photo.text}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
