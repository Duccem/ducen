'use client';
import logo from '@/assets/lumen-dark.png';
import Github from '@/lib/ducen/components/icons/github';
import { Badge } from '@/lib/shadcn/components/ui/badge';
import { Button } from '@/lib/shadcn/components/ui/button';
import { CalendarDays, Phone } from 'lucide-react';
import Link from 'next/link';
import { HeroImage } from './hero-image';

export default function HeroSection() {
  return (
    <div className="min-h-screen bg-background" id="home">
      <header className="sticky mt-4 top-4 z-50  md:flex container mx-auto">
        <nav className="px-4 flex justify-between w-full  backdrop-filter backdrop-blur-xl bg-opacity-70 h-[50px] z-20 relative gap-20">
          <div className="flex items-center gap-4">
            <Link className="flex items-center gap-2" href="/">
              <img src={logo.src} alt="" className="w-10 rounded-none" />
            </Link>
            <Badge
              variant="secondary"
              className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 flex justify-start items-center gap-2"
            >
              <div className="size-3 bg-emerald-600 animate-pulse rounded-full"></div>
              Open for work
            </Badge>
            <div className="hidden items-center gap-6 md:flex">
              <Link className="text-sm font-medium" href="#process">
                Process
              </Link>
              <Link className="text-sm font-medium" href="#services">
                Services
              </Link>
              {/* <Link className="text-sm font-medium" href="#">
                Clients
              </Link> */}
              <Link className="text-sm font-medium" href="#price">
                Pricing
              </Link>
            </div>
          </div>
          <div className="flex justify-between items-center gap-2  pl-3">
            <Link href={'https://cal.com/jose-manuel-veliz/15min'}>
              <Button size={'icon'}>
                <Github />
              </Button>
            </Link>
            <Link href={'https://cal.com/jose-manuel-veliz/15min'}>
              <Button>
                <Phone />
                Book a 20 min call
              </Button>
            </Link>
          </div>
        </nav>
      </header>
      <main className="relative flex min-h-screen flex-col mx-auto justify-center pt-16 container">
        <div className="flex flex-col gap-8  w-full">
          <h1 className="text-6xl font-bold w-1/2">
            Lumen your development and design partner
            <br />
            for early tech startup
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Imagine and realize your digital product seamlessly.
            <br />
            Beautiful, remarkable, consistent and scalable.
          </p>
          <div className="mt-8 md:mt-10">
            <div className="flex items-center space-x-4">
              <Link
                href="https://cal.com/jose-manuel-veliz/15min"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="gap-2 bg-primary hover:bg-background hover:text-foreground hover:border-primary border transition-all duration-500 hover:shadow-md"
                >
                  <CalendarDays className="h-4 w-4" />
                  Schedule a 20-minute call
                </Button>
              </Link>

              <a href="#process">
                <Button className="h-11 px-5 text-primary bg-color-brand-primary hover:bg-background hover:text-foreground hover:border-primary border transition-all duration-500 hover:shadow-md">
                  View our process
                </Button>
              </a>
            </div>
          </div>
        </div>
        <HeroImage />
      </main>
    </div>
  );
}

