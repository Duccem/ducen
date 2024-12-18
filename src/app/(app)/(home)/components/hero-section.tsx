'use client';
import Github from '@/lib/ducen/components/icons/github';
import { Badge } from '@/lib/shadcn/components/ui/badge';
import { Button } from '@/lib/shadcn/components/ui/button';
import { CalendarDays } from 'lucide-react';
import Link from 'next/link';
import StatusButton from './atoms/status-button';

export default function HeroSection() {
  return (
    <div className="min-h-screen bg-background" id="home">
      <header className="fixed top-0 left-0 right-0 z-50  bg-background backdrop-blur-sm w-full flex justify-center">
        <nav className="container flex h-16 items-center justify-between px-10 w-[1280px]">
          <div className="flex items-center gap-8">
            <Link className="flex items-center gap-2" href="#home">
              <div className="h-8 w-8 rounded-lg bg-brand-primary text-white flex justify-center items-center text-xl font-bold">
                D
              </div>
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
          <div className="flex justify-between items-center gap-2">
            <Button
              size="icon"
              className=" bg-brand-primary hover:bg-background hover:text-foreground hover:border-brand-primary border transition-all duration-500 hover:shadow-md"
            >
              <Link href={'https://github.com/Duccem'} target="_blank">
                <Github />
              </Link>
            </Button>
            <Button className="gap-2 bg-brand-primary hover:bg-background hover:text-foreground hover:border-brand-primary border transition-all duration-500 hover:shadow-md">
              <CalendarDays className="h-4 w-4" />
              Book a 20-min call
            </Button>
          </div>
        </nav>
      </header>
      <main className="relative flex min-h-screen flex-col items-center justify-center pt-16">
        <div className="flex flex-col items-center gap-8 text-center w-full">
          <StatusButton />
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Development and design partner
            <br />
            for early tech startup
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Imagine and realize your digital product seamlessly.
            <br />
            Beautiful, remarkable, consistent and scalable.
          </p>
          <Button
            size="lg"
            className="mt-4 gap-2 bg-brand-primary hover:bg-background hover:text-foreground hover:border-brand-primary border transition-all duration-500 hover:shadow-md"
          >
            <CalendarDays className="h-4 w-4" />
            Schedule a 20-minute call
          </Button>
        </div>
      </main>
    </div>
  );
}

