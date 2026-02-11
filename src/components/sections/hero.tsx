"use client";
import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";

const skills = [
  "React",
  "Node.js",
  "TypeScript",
  "Python",
  "PostgreSQL",
  "AWS",
];

export const HeroSection = () => {
  const t = useTranslations("hero");

  const scrollToProjects = () => {
    const element = document.querySelector("#projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center bg-background relative overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-20 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-muted-foreground font-medium mb-4"
            >
              {t("greeting")}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-semibold leading-[1.1] mb-6"
            >
              José Manuel
              <br />
              <span className="italic font-normal">Véliz</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-foreground font-medium mb-2"
            >
              {t("role")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-muted-foreground text-lg mb-8 max-w-md leading-relaxed"
            >
              {t("description")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Button variant="hero" size="lg" asChild>
                <a
                  href="https://cal.com/jose-manuel-veliz/15min"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("ctaPrimary")}
                </a>
              </Button>
              <Link
                href="/files/Jose Veliz CV - 2026.pdf"
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="heroOutline" size="lg">
                  <Download size={18} />
                  {t("ctaSecondary")}
                </Button>
              </Link>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              {skills.map((skill) => (
                <span key={skill} className="skill-tag">
                  {skill}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative w-72 h-96 md:w-80 md:h-[28rem] lg:w-96 lg:h-[32rem] overflow-hidden rounded-3xl">
                <img
                  src={"/images/portrait.jpg"}
                  alt={t("imageAlt")}
                  className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-stone-400 rounded-3xl" />
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-neutral-900 rounded-2xl" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground cursor-pointer"
          onClick={scrollToProjects}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};

