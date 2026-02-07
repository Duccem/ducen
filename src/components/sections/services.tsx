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

const services = [
  {
    icon: Globe,
    title: "Desarrollo Web",
    description:
      "Sitios web modernos y aplicaciones web que convierten visitantes en clientes.",
  },
  {
    icon: Database,
    title: "Software SaaS",
    description:
      "Plataformas de software como servicio escalables para tu modelo de negocio.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description:
      "Tiendas online completas con pagos integrados y gestión de inventario.",
  },
  {
    icon: Smartphone,
    title: "Apps Móviles",
    description:
      "Aplicaciones móviles híbridas que funcionan en iOS y Android.",
  },
  {
    icon: BarChart3,
    title: "Automatización",
    description:
      "Automatiza procesos y conecta tus herramientas para ahorrar tiempo.",
  },
  {
    icon: Cog,
    title: "Software a Medida",
    description:
      "Desarrollo personalizado para los desafíos únicos de tu negocio.",
  },
];

export const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

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
            Servicios
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            Soluciones tecnológicas para emprendedores y negocios que buscan
            crecer
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
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
                  <service.icon className="w-6 h-6" />
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
          ))}
        </div>
      </div>
    </section>
  );
};

