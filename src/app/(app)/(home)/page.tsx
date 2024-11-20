import Collaborate from './components/collaborate';
import Footer from './components/footer';
import HeroSection from './components/hero-section';
import Pricing from './components/pricing';
import ProjectsShowcase from './components/projects-showcase';
import KeyValues from './components/values';
import WorkProcess from './components/work-process';

export default function Home() {
  return (
    <div className="w-full h-full">
      <HeroSection />
      <ProjectsShowcase />
      <WorkProcess />
      <Collaborate />
      <KeyValues />
      <Pricing />
      <Footer />
    </div>
  );
}

