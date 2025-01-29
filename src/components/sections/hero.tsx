import { Button } from '@/lib/shadcn/components/ui/button';
import { ArrowRight, Phone } from 'lucide-react';
import Navbar from '../internal/navbar';

const Hero = () => {
  return (
    <div className="w-full flex flex-col h-[calc(100vh-15px)] box-border relative bg-hero rounded-t-2xl py-4 px-[80px] gap-4">
      <Navbar />
      <div className="flex h-full w-ful">
        <div className="flex flex-col justify-center items-start lg:w-1/2 gap-4">
          <p className="text-6xl font-semibold text-white">
            Lumen your development and design partner for early tech startup
          </p>
          <p className="text-xl font-semibold text-gray-300 w-3/4">
            Imagine and realize your digital product seamlessly. Beautiful,
            remarkable, consistent and scalable.
          </p>
          <div className="flex items-center gap-3 w-2/3 flex-wrap">
            <div className="py-2 px-4 rounded-full border border-white bg-white/10 text-white">
              Web sites
            </div>
            <div className="py-2 px-4 rounded-full border border-white bg-white/10 text-white">
              App móviles
            </div>
            <div className="py-2 px-4 rounded-full border border-white bg-white/10 text-white">
              Landings
            </div>
            <div className="py-2 px-4 rounded-full border border-white bg-white/10 text-white">
              Branding
            </div>
            <div className="py-2 px-4 rounded-full border border-white bg-white/10 text-white">
              Logo design
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-end items-center lg:w-1/2 gap-4 h-2/3">
          <div className="flex justify-between items-center gap-4">
            <Button
              className="bg-neutral-900 text-2xl p-5 h-16 font-extralight [&_svg]:size-8 hover:bg-neutral-700 hover:-translate-x-1 hover:-translate-y-1 transition-all"
              size={'lg'}
            >
              View our process
              <ArrowRight />
            </Button>
            <Button
              className="bg-neutral-900 text-2xl p-5 h-16 font-extralight [&_svg]:size-8 hover:bg-neutral-700 hover:-translate-x-1 hover:-translate-y-1 transition-all"
              size={'lg'}
            >
              Book a 15 min call
              <Phone />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

