"use client";
import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Database,
  ShoppingCart,
  BarChart3,
  Cog,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useTranslations } from "next-intl";

export const ServicesSection = () => {
  const t = useTranslations("services");
  const services = t.raw("items") as Array<{
    title: string;
    description: string;
  }>;
  const { ref, isVisible } = useScrollAnimation(0.1);
  const icons = [Globe, Database, ShoppingCart, Smartphone, BarChart3, Cog];

  return (
    <section
      id="services"
      className="section-container bg-background relative overflow-hidden"
    >
      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div ref={ref} className="text-center mb-20">
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
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = icons[index % icons.length];

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="group"
              >
                <div className="elegant-card p-8 h-full hover:border-foreground transition-all duration-500">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-display font-semibold mb-3">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

