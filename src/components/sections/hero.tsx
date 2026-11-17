"use client";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { CAL_URL } from "@/lib/site";
import { Navigation } from "../navigation";

export const HeroSection = () => {
  const t = useTranslations("hero");
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.93]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "6%"]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-svh overflow-hidden flex flex-col"
    >
      <Navigation />

      <div className="page-x relative z-10 mt-16 md:mt-14 max-w-[55%] md:max-w-none">
        <p
          className="hero-rise text-body md:text-lead leading-[1.35] max-w-[34ch] text-ink"
          style={{ animationDelay: "120ms" }}
        >
          {t("sentence")}
        </p>
        <div
          className="hero-rise mt-8 flex flex-col md:flex-row md:items-center gap-5 md:gap-8"
          style={{ animationDelay: "220ms" }}
        >
          <a
            className="btn self-start"
            href={CAL_URL}
            target="_blank"
            rel="noreferrer"
          >
            <span className="md:hidden">{t("ctaShort")}</span>
            <span className="hidden md:inline">{t("cta")}</span>
            <span aria-hidden="true" className="btn-arrow">
              →
            </span>
          </a>
          <a href="#work" className="text-link text-body">
            {t("secondary")}
          </a>
        </div>
      </div>

      {/* The monument: one word, cropped by the edges of the screen */}
      <motion.div
        aria-hidden="true"
        style={{ scale, y }}
        className="pointer-events-none select-none origin-bottom
          absolute right-0 top-0 bottom-0 flex items-center justify-end
          md:static md:mt-auto md:block"
      >
        <span
          className="hero-rise block font-semibold text-ink whitespace-nowrap
            leading-[0.8] tracking-[-0.06em]
            text-[78vw] [writing-mode:vertical-rl] translate-x-[22%]
            md:[writing-mode:horizontal-tb] md:translate-x-0
            md:text-[clamp(300px,60vw,1100px)] md:-ml-[8vw] md:mb-[-0.17em]"
          style={{ animationDelay: "40ms" }}
        >
          {t("word")}
        </span>
      </motion.div>
      <h1 className="sr-only">José Manuel Véliz — {t("sentence")}</h1>
    </section>
  );
};
