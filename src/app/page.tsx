import { AboutSection } from "@/components/sections/about";
import { ContactSection, SiteFooter } from "@/components/sections/contact";
import { ExperienceSection } from "@/components/sections/experience";
import { HeroSection } from "@/components/sections/hero";
import { NotesSection } from "@/components/sections/notes";
import { ProcessSection } from "@/components/sections/process";
import { ProjectsSection } from "@/components/sections/projects";
import { ServicesSection } from "@/components/sections/services";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <ProjectsSection />
        <ServicesSection />
        <ProcessSection />
        <ExperienceSection />
        <AboutSection />
        <NotesSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
