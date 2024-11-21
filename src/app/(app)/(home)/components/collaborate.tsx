import { Badge } from '@/lib/shadcn/components/ui/badge';
import { Card, CardContent } from '@/lib/shadcn/components/ui/card';
import { AppWindow, Monitor, Smartphone } from 'lucide-react';

export default function Collaborate() {
  return (
    <section
      className="py-16 px-4 bg-[#F9FAFB] md:py-24 min-h-screen flex justify-center items-start"
      id="services"
    >
      <div className="max-w-7xl flex flex-col justify-start items-center">
        <div className="text-center space-y-4 mb-12">
          <div className="flex justify-center items-center">
            <Badge
              variant="secondary"
              className="bg-gray-200 text-gray-600 hover:bg-emerald-50 flex justify-start items-center gap-2"
            >
              <div className="size-3 bg-gray-600 animate-pulse rounded-full"></div>
              Services
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            What will we collaborate on?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Help you with my best expertise and focus on delivering results.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="max-w-2xl mx-auto overflow-hidden rounded-2xl shadow-[0_5px_8px_-4px_#1018281f]">
            <CardContent className="p-6 space-y-6">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border  rounded-2xl flex items-center justify-center mx-auto">
                  <Monitor className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Web Apps</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Work on your application to produce a significant redesign or
                  launch a new MVP without spending much time and effort.
                </p>
              </div>

              <div className="relative rounded-xl overflow-hidden">
                <img
                  src="/image/work/web-app.png"
                  alt="Web application interface demonstration"
                  className="w-full h-auto rounded shadow-lg"
                />
              </div>
            </CardContent>
          </Card>
          <Card className="max-w-2xl mx-auto overflow-hidden rounded-2xl shadow-[0_5px_8px_-4px_#1018281f]">
            <CardContent className="p-6 space-y-6">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border  rounded-2xl flex items-center justify-center mx-auto">
                  <Smartphone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Mobile Apps</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Work on your application to produce a significant redesign or
                  launch a new MVP without spending much time and effort.
                </p>
              </div>

              <div className="relative rounded-xl overflow-hidden">
                <img
                  src="/image/work/mobile2.png"
                  alt="Web application interface demonstration"
                  className="w-full h-auto rounded shadow-lg"
                />
              </div>
            </CardContent>
          </Card>
          <Card className="max-w-2xl mx-auto overflow-hidden rounded-2xl shadow-[0_5px_8px_-4px_#1018281f]">
            <CardContent className="p-6 space-y-6">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border  rounded-2xl flex items-center justify-center mx-auto">
                  <AppWindow className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Landing pages</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Work on your application to produce a significant redesign or
                  launch a new MVP without spending much time and effort.
                </p>
              </div>

              <div className="relative rounded-xl overflow-hidden">
                <img
                  src="/image/work/landing.png"
                  alt="Web application interface demonstration"
                  className="w-full h-auto rounded shadow-lg"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-center gap-4"></div>
      </div>
    </section>
  );
}

