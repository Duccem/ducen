"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useTranslations } from "next-intl";

export const ProcessSection = () => {
  const t = useTranslations("process");
  const steps = t.raw("items") as Array<{
    title: string;
    description: string;
    label: string;
    deliverables: string[];
  }>;
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section
      id="process"
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

        {/* Steps List */}
        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start pb-12 border-b border-border last:border-b-0 last:pb-0"
            >
              {/* Number, Title & Description */}
              <div className="lg:col-span-5">
                <span className="text-accent font-mono text-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-2xl font-display font-semibold mt-2 mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Deliverables */}
              <div className="lg:col-span-7">
                <div className="elegant-card p-8">
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    {step.label}
                  </span>
                  <ul className="space-y-3 mt-4">
                    {step.deliverables.map((deliverable) => (
                      <li
                        key={deliverable}
                        className="flex gap-3 leading-relaxed"
                      >
                        <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
