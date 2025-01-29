import AboutUs from '@/components/sections/about-us';
import Hero from '@/components/sections/hero';

export default function Home() {
  return (
    <div className="bg-neutral-900 p-4">
      <Hero />
      <AboutUs />
    </div>
  );
}

