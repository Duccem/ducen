"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const skills = [
  "HTML5",
  "CSS",
  "Git",
  "GitHub",
  "Node.js",
  "React",
  "JavaScript",
  "TypeScript",
];

export const AboutSection = () => {
  const t = useTranslations("about");
  const stats = t.raw("stats") as Array<{ value: string; label: string }>;
  const { ref, isVisible } = useScrollAnimation(0.2);
  const portraitSources = useMemo(
    () => [
      "/images/portrait-3.jpg",
      "/images/portrait.jpg",
      "/images/portrait-2.jpg",
    ],
    [],
  );
  const [portraitIndex, setPortraitIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setPortraitIndex((current) => (current + 1) % portraitSources.length);
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, [portraitSources.length]);

  return (
    <section
      id="about"
      className="section-container bg-background relative overflow-hidden"
    >
      <div className="container mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          className="grid lg:grid-cols-2 gap-20 items-center"
        >
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={portraitSources[portraitIndex]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full"
                  >
                    <Image
                      src={portraitSources[portraitIndex]}
                      width={1000}
                      height={1000}
                      alt={t("imageAlt")}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Skill tags floating around image */}
              <div className="absolute -right-16 top-20 flex flex-wrap gap-2 max-w-[160px]">
                {skills.slice(0, 4).map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-medium bg-primary text-white  rounded-full shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="absolute -left-4 bottom-20 flex flex-wrap gap-2 max-w-[160px]">
                {skills.slice(4).map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-medium bg-primary text-white  shadow-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-semibold mb-8"
            >
              {t("title")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg leading-relaxed mb-6"
            >
              {t("paragraph1")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25 }}
              className="text-muted-foreground leading-relaxed mb-10"
            >
              {t("paragraph2")}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="flex gap-12"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl md:text-4xl font-display font-semibold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

