import AboutUs from '@/components/sections/about-us';
import Hero from '@/components/sections/hero';
import Process from '@/components/sections/process';
import Services from '@/components/sections/services';
import Work from '@/components/sections/work';

export default function Home() {
  return (
    <div className="bg-neutral-900 p-4">
      <Hero />
      <AboutUs />
      <Work />
      <Services />
      <Process />
    </div>
  );
}

