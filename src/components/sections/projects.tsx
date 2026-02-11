"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useTranslations } from "next-intl";

export const ProjectsSection = () => {
  const t = useTranslations("projects");
  const projects = t.raw("items") as Array<{
    number: string;
    title: string;
    subtitle: string;
    description: string;
    tech: string[];
    role: string;
    href: string;
  }>;
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section
      id="projects"
      className="py-32 bg-foreground text-background relative overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-20">
        {/* Header */}
        <motion.div ref={ref} className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-semibold tracking-tight"
          >
            {t("title")}
            <br />
            <span className="italic font-normal">{t("titleEmphasis")}</span>
          </motion.h2>
        </motion.div>

        {/* Projects List */}
        <div className="space-y-20">
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.15 }}
              className="group cursor-pointer block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-foreground"
            >
              <div className="grid lg:grid-cols-12 gap-8 items-start pb-16 border-b border-background/20">
                {/* Number */}
                <div className="lg:col-span-1">
                  <span className="text-accent font-mono text-sm">
                    &lt;{project.number}&gt;
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div className="lg:col-span-4">
                  <h3 className="text-3xl md:text-4xl font-display font-semibold mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-background/60">{project.subtitle}</p>
                </div>

                {/* Description */}
                <div className="lg:col-span-5">
                  <p className="text-background/70 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Role */}
                  <div className="mb-4">
                    <span className="text-xs uppercase tracking-wider text-background/50">
                      {t("roleLabel")}
                    </span>
                    <p className="text-accent font-medium">{project.role}</p>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="skill-tag-dark">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="lg:col-span-2 flex justify-end">
                  <div className="w-12 h-12 rounded-full border border-background/30 flex items-center justify-center group-hover:bg-background group-hover:text-foreground transition-all duration-300">
                    <ArrowUpRight
                      size={20}
                      className="group-hover:rotate-45 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

