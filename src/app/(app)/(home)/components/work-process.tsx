import { Badge } from '@/lib/shadcn/components/ui/badge';
import { Button } from '@/lib/shadcn/components/ui/button';
import { Card } from '@/lib/shadcn/components/ui/card';
import { Clock, Send, SmilePlus } from 'lucide-react';

export default function WorkProcess() {
  return (
    <section
      className="py-16 px-4 md:py-24 min-h-screen flex justify-center items-center"
      id="process"
    >
      <div className="max-w-7xl flex flex-col justify-center items-center">
        <div className="text-center space-y-4 mb-12">
          <div className="flex justify-center items-center">
            <Badge
              variant="secondary"
              className="bg-gray-200 text-gray-600 hover:bg-emerald-50 flex justify-start items-center gap-2"
            >
              <div className="size-3 bg-gray-600 animate-pulse rounded-full"></div>
              Work process
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Simple steps toward product launch
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our work process is crafted to optimize for speedy and quality
            product outcomes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="space-y-4  p-4 rounded-2xl">
            <div className="w-12 h-12 border rounded-lg flex items-center justify-center shadow-sm">
              <Send className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Request & specify</h3>
            <p className="text-muted-foreground">
              Send me your design request, and explain your requirements,
              objectives, and deadlines for us to get on board.
            </p>
          </Card>

          <Card className="space-y-4  p-4 rounded-2xl">
            <div className="w-12 h-12 border rounded-lg flex items-center justify-center shadow-sm">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Communicate & deliver</h3>
            <p className="text-muted-foreground">
              We will communicate daily and deliver the complete designs in the
              most organized manner as soon as possible.
            </p>
          </Card>

          <Card className="space-y-4  p-4 rounded-2xl">
            <div className="w-12 h-12 border rounded-lg flex items-center justify-center shadow-sm">
              <SmilePlus className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Refine & launch</h3>
            <p className="text-muted-foreground">
              We understand that every detail matters, so we will work and
              refine until we are both satisfied with the outputs.
            </p>
          </Card>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button
            size="lg"
            className="font-medium bg-brand-primary hover:-translate-y-1 transition-all duration-500 w-fully"
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

