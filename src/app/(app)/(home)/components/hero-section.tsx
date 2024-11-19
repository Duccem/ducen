
import Link from "next/link"
import { CalendarDays } from 'lucide-react'
import { Button } from "@/lib/shadcn/components/ui/button"
import { Badge } from "@/lib/shadcn/components/ui/badge"
import Github from "@/lib/ducen/components/icons/github"

export default function HeroSection() {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <nav className="container flex h-16 items-center justify-between px-10">
          <div className="flex items-center gap-8">
            <Link className="flex items-center gap-2" href="/">
              <div className="h-8 w-8 rounded-lg bg-brand-primary text-white flex justify-center items-center text-xl font-bold" >D</div>
            </Link>
            <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 flex justify-start items-center gap-2">
              <div className="size-3 bg-emerald-600 animate-pulse rounded-full">

              </div>
              Open for work
            </Badge>
            <div className="hidden items-center gap-6 md:flex">
              <Link className="text-sm font-medium" href="#">
                Process
              </Link>
              <Link className="text-sm font-medium" href="#">
                Services
              </Link>
              <Link className="text-sm font-medium" href="#">
                Clients
              </Link>
              <Link className="text-sm font-medium" href="#">
                Pricing
              </Link>
            </div>
          </div>
          <div className="flex justify-between items-center gap-2">
            <Button size='icon' className="bg-brand-primary">
              <Link href={'https://github.com/Duccem'} target="_blank">
                <Github />
              </Link>
            </Button>
            <Button className="gap-2 bg-brand-primary">
              <CalendarDays className="h-4 w-4" />
              Book a 20-min call
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <main className="container relative flex min-h-screen flex-col items-center justify-center pt-16">
        {/* Location Badges */}

        {/* Hero Content */}
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="flex items-center gap-2 bg-emerald-50 rounded-full px-3 py-1 justify-start">
            <Badge variant="secondary" className="shadow-md text-emerald-700 flex justify-center items-center gap-2">
              <div className="size-3 bg-emerald-600 animate-pulse rounded-full">

              </div>
              Available
            </Badge>
            <p className="text-emerald-500 text-sm font-semibold">
              New project available in November
            </p>
          </div>
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
          <Button size="lg" className="mt-4 gap-2 bg-brand-primary">
            <CalendarDays className="h-4 w-4" />
            Schedule a 20-minute call
          </Button>
        </div>
      </main>
    </div>
  )
}