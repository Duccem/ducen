import { Badge } from '@/lib/shadcn/components/ui/badge';
import { Button } from '@/lib/shadcn/components/ui/button';
import { Card } from '@/lib/shadcn/components/ui/card';
import {
  Clock,
  CopyCheck,
  MessageSquareText,
  Network,
  Settings,
  SquareMousePointer,
} from 'lucide-react';

export default function KeyValues() {
  return (
    <section className="py-16 px-4 md:py-24 min-h-screen flex justify-center items-center">
      <div className="max-w-7xl flex flex-col justify-center items-center">
        <div className="text-center space-y-4 mb-12">
          <div className="flex justify-center items-center">
            <Badge
              variant="secondary"
              className="bg-gray-200 text-gray-600 hover:bg-emerald-50 flex justify-start items-center gap-2"
            >
              <div className="size-3 bg-gray-600 animate-pulse rounded-full"></div>
              Key values
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Fundamental qualities
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Great partner comes with great foundational characteristics.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="space-y-4  p-4 rounded-2xl">
            <div className="w-12 h-12 border rounded-lg flex items-center justify-center shadow-sm">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Fast and quality</h3>
            <p className="text-muted-foreground">
              No need to draw manual sketches anymore, just drop your
              description and get the full interface within few hours.
            </p>
          </Card>

          <Card className="space-y-4  p-4 rounded-2xl">
            <div className="w-12 h-12 border rounded-lg flex items-center justify-center shadow-sm">
              <Network className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Design systems</h3>
            <p className="text-muted-foreground">
              Get your design system built quickly and professionally so you can
              scale your interface fast and consistent.
            </p>
          </Card>

          <Card className="space-y-4  p-4 rounded-2xl">
            <div className="w-12 h-12 border rounded-lg flex items-center justify-center shadow-sm">
              <SquareMousePointer className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Modern and simple</h3>
            <p className="text-muted-foreground">
              Clean and straight-forward design makes your users fall in love
              with your product at the very first sight.
            </p>
          </Card>
          <Card className="space-y-4  p-4 rounded-2xl">
            <div className="w-12 h-12 border rounded-lg flex items-center justify-center shadow-sm">
              <MessageSquareText className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Seamless syncing</h3>
            <p className="text-muted-foreground">
              Instant communication via Slack, dedicated workspace on ClickUp or
              other project management apps.
            </p>
          </Card>
          <Card className="space-y-4  p-4 rounded-2xl">
            <div className="w-12 h-12 border rounded-lg flex items-center justify-center shadow-sm">
              <Settings className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Systematic thinking</h3>
            <p className="text-muted-foreground">
              Everything must has a reason to exist, the same apply with every
              element created inside your product.
            </p>
          </Card>
          <Card className="space-y-4  p-4 rounded-2xl">
            <div className="w-12 h-12 border rounded-lg flex items-center justify-center shadow-sm">
              <CopyCheck className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Direct workflow</h3>
            <p className="text-muted-foreground">
              Fast & uninterrupted process from communication to final result,
              with nothing stands in between.
            </p>
          </Card>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-brand-primary hover:-translate-y-1 transition-all duration-500 w-full"
          >
            See plans
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="font-medium hover:-translate-y-1 transition-all duration-500 w-full"
          >
            Book a call
          </Button>
        </div>
      </div>
    </section>
  );
}

