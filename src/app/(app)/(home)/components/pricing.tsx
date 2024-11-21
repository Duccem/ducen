import { Badge } from '@/lib/shadcn/components/ui/badge';
import { Button } from '@/lib/shadcn/components/ui/button';
import { Card, CardContent, CardFooter } from '@/lib/shadcn/components/ui/card';
import { Briefcase, BriefcaseMedical, Check, Clock } from 'lucide-react';
import StatusButton from './atoms/status-button';

export default function Pricing() {
  const features = [
    'Milestone invoice',
    'Figma workspace',
    'Daily async via Slack',
    'Project management space',
    'Design system & custom kit',
    'Interactive prototypes',
    'Fast delivery + revisions',
  ];
  return (
    <section
      className="py-16 px-4 md:py-24 min-h-screen flex justify-center items-center"
      id="price"
    >
      <div className="max-w-7xl flex flex-col gap-10 justify-center items-center">
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center">
            <Badge
              variant="secondary"
              className="bg-gray-200 text-gray-600 hover:bg-emerald-50 flex justify-start items-center gap-2"
            >
              <div className="size-3 bg-gray-600 animate-pulse rounded-full"></div>
              Pricing formulas
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Straight-forward formulas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Design is for passion, with an useful purpose in my product outputs.
          </p>
        </div>
        <StatusButton />

        <div className="grid md:grid-cols-3 gap-8 w-full">
          <Card className="p-4 shadow-md ">
            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="w-10 h-10 border shadow-md rounded-lg flex items-center justify-center mb-4">
                  <BriefcaseMedical className="w-5 h-5 text-primary" />
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  Project based
                </div>
                <p className="my-3 text-muted-foreground text-sm">
                  Ideal for startups, small businesses and entrepreneurs looking
                  to build a product from scratch.
                </p>
                <div className="text-3xl font-semibold mb-2">From $4000</div>
                <div className="text-muted-foreground">
                  For project {'>'} 7 weeks
                </div>
              </div>

              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="pt-6">
              <Button
                size="lg"
                className="gap-2 bg-brand-primary hover:-translate-y-1 transition-all duration-500 w-full"
              >
                Book a discovery call
              </Button>
            </CardFooter>
          </Card>
          <Card className="p-4 shadow-md ">
            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="w-10 h-10 border shadow-md rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  Hourly based (limited)
                </div>
                <p className="my-3 text-muted-foreground text-sm">
                  Ideal for short-term projects, like landing pages, marketing
                  websites, or small features. Limited availability.
                </p>
                <div className="text-3xl font-semibold mb-2">From $20/h</div>
                <div className="text-muted-foreground">
                  For short-term projects
                </div>
              </div>

              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="pt-6">
              <Button
                size="lg"
                className="gap-2 bg-brand-primary hover:-translate-y-1 transition-all duration-500 w-full"
              >
                Book a discovery call
              </Button>
            </CardFooter>
          </Card>
          <Card className="p-4 shadow-md ">
            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  Monthly based
                </div>
                <p className="my-3 text-muted-foreground text-sm">
                  Ideal for long-term collaborations, like product design
                  maintenance, feature development, or design system creation.
                </p>
                <div className="text-3xl font-semibold mb-2">From $2000/m</div>
                <div className="text-muted-foreground">
                  For mid-term collaborations
                </div>
              </div>

              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="pt-6">
              <Button
                size="lg"
                className="gap-2 bg-brand-primary hover:-translate-y-1 transition-all duration-500 w-full"
              >
                Book a discovery call
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}

