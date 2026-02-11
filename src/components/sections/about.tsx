"use client";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useTranslations } from "next-intl";

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
                <img
                  src={"/images/portrait-2.jpeg"}
                  alt={t("imageAlt")}
                  className="w-full h-full object-cover"
                />
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

