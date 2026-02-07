"use client";
import { motion } from "framer-motion";
import { Mail, Linkedin, Twitter, Github, ArrowUpRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Button } from "../ui/button";

const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jose-manuel-veliz",
  },
  { icon: Twitter, label: "X", href: "https://x.com/_ducen29" },
  { icon: Github, label: "GitHub", href: "https://github.com/Duccem" },
  { icon: Mail, label: "Email", href: "mailto:ducen29@gmail.com" },
];

export const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section
      id="contact"
      className="section-container bg-background relative overflow-hidden"
    >
      <div className="container mx-auto relative z-10">
        <motion.div ref={ref} className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold mb-6">
              ¿Tienes un proyecto
              <br />
              <span className="italic font-normal">en mente?</span>
            </h2>

            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              Me encantaría escuchar sobre tu idea. Agenda una llamada gratuita
              y exploremos cómo puedo ayudarte.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          >
            <Button variant="hero" size="xl" className="group" asChild>
              <a
                href="https://cal.com/jose-manuel-veliz/15min"
                target="_blank"
                rel="noreferrer"
              >
                Agendar llamada
                <ArrowUpRight
                  className="ml-1 group-hover:rotate-45 transition-transform"
                  size={20}
                />
              </a>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <a href="mailto:ducen29@gmail.com">
                <Mail size={20} />
                Enviar email
              </a>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex justify-center gap-4"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-center mt-24 pt-10 border-t border-border"
          >
            <p className="text-muted-foreground text-sm">
              © 2024 José Manuel Véliz. Todos los derechos reservados.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

