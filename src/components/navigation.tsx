"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useLocale, useTranslations } from "next-intl";

export const Navigation = () => {
  const t = useTranslations("nav");
  const locale = useLocale();
  const navItems = t.raw("items") as Array<{ label: string; href: string }>;
  const localeOptions = t.raw("locales") as Array<{
    value: string;
    label: string;
  }>;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Check which section we're in for nav color
      const sections = [
        "#hero",
        "#about",
        "#projects",
        "#services",
        "#contact",
      ];
      const darkSections = ["#projects"];

      for (const sectionId of sections) {
        const section = document.querySelector(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom > 100) {
            setIsDarkSection(darkSections.includes(sectionId));
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileOpen(false);
  };

  const setLocale = (nextLocale: string) => {
    if (nextLocale === locale) {
      return;
    }

    document.cookie = `locale=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    window.location.reload();
  };

  const getLocaleButtonClass = (value: string) => {
    const base =
      "text-xs font-medium px-2.5 py-1 rounded-full border transition-colors";
    const active = isDarkSection
      ? "bg-background text-foreground border-background"
      : "bg-foreground text-background border-foreground";
    const inactive = isDarkSection
      ? "border-background/50 text-background/80 hover:text-background hover:border-background"
      : "border-border text-muted-foreground hover:text-foreground hover:border-foreground";

    return `${base} ${value === locale ? active : inactive}`;
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? isDarkSection
            ? "bg-foreground/90 backdrop-blur-xl"
            : "bg-background/90 backdrop-blur-xl border-b border-border"
          : ""
      }`}
    >
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#hero");
            }}
            className={`text-xl font-display font-semibold transition-colors ${
              isDarkSection && !isScrolled
                ? "text-background"
                : isScrolled && isDarkSection
                  ? "text-background"
                  : "text-foreground"
            }`}
            whileHover={{ scale: 1.02 }}
          >
            José Manuel Véliz<span className="text-accent">.</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className={`text-sm font-medium transition-colors duration-300 ${
                  isDarkSection && !isScrolled
                    ? "text-background/70 hover:text-background"
                    : isScrolled && isDarkSection
                      ? "text-background/70 hover:text-background"
                      : "text-muted-foreground hover:text-foreground"
                }`}
                whileHover={{ y: -2 }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant={isDarkSection ? "heroLight" : "hero"}
              size="sm"
              asChild
            >
              <a
                href="https://cal.com/jose-manuel-veliz/15min"
                target="_blank"
                rel="noreferrer"
              >
                {t("cta")}
              </a>
            </Button>
            <div
              className="flex items-center gap-2"
              aria-label={t("switcherLabel")}
            >
              {localeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setLocale(option.value)}
                  className={getLocaleButtonClass(option.value)}
                  aria-pressed={option.value === locale}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 ${isDarkSection && !isScrolled ? "text-background" : ""}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-6 border-t border-border bg-background"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {item.label}
                </a>
              ))}
              <Button variant="hero" className="mt-4" asChild>
                <a
                  href="https://cal.com/jose-manuel-veliz/15min"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("cta")}
                </a>
              </Button>
              <div
                className="flex items-center gap-2 pt-2"
                aria-label={t("switcherLabel")}
              >
                {localeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setLocale(option.value)}
                    className={getLocaleButtonClass(option.value)}
                    aria-pressed={option.value === locale}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

