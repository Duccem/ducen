"use client";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useTranslations } from "next-intl";

export const ExperienceSection = () => {
  const t = useTranslations("experience");
  const jobs = t.raw("items") as Array<{
    role: string;
    company: string;
    location: string;
    period: string;
    highlights: string[];
    metrics?: Array<{ value: string; label: string }>;
  }>;
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section
      id="experience"
      className="section-container bg-background relative overflow-hidden"
    >
      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div ref={ref} className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            className="text-4xl md:text-5xl font-display font-semibold mb-6"
          >
            {t("title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-xl"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        {/* Experience List */}
        <div className="space-y-12">
          {jobs.map((job, index) => (
            <motion.div
              key={`${job.company}-${job.period}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start pb-12 border-b border-border last:border-b-0 last:pb-0"
            >
              {/* Period, Role & Company */}
              <div className="lg:col-span-4">
                <span className="text-accent font-mono text-sm">
                  {job.period}
                </span>
                <h3 className="text-2xl font-display font-semibold mt-2 mb-1">
                  {job.role}
                </h3>
                <p className="text-muted-foreground">
                  {job.company} · {job.location}
                </p>
              </div>

              {/* Highlights */}
              <div className="lg:col-span-8">
                <ul className="space-y-3">
                  {job.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-muted-foreground leading-relaxed"
                    >
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                {/* Metrics */}
                {job.metrics && (
                  <div className="flex flex-wrap gap-x-12 gap-y-6 mt-8">
                    {job.metrics.map((metric) => (
                      <div key={metric.label}>
                        <div className="text-3xl font-display font-semibold text-foreground">
                          {metric.value}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
