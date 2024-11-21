'use client';
import { Button } from '@/lib/shadcn/components/ui/button';
import { CalendarDays } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Footer() {
  const socialLinks = [
    { name: 'Github', href: 'https://github.com/Duccem' },
    { name: 'Twitter/X', href: 'https://x.com/Ducen29' },
    { name: 'Cal.com', href: '#' },
  ];
  const containerRef1 = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: 'Dashboard Analytics',
      image: '/image/work/email.png',
    },
    {
      title: 'Mobile App Interface',
      image: '/image/work/academy.png',
    },
    {
      title: 'Design System',
      image: '/image/work/email.png',
    },
    {
      title: 'Template Gallery',
      image: '/image/work/academy.png',
    },
    {
      title: 'Data Visualization',
      image: '/image/work/email.png',
    },
    {
      title: 'Admin Panel',
      image: '/image/work/academy.png',
    },
  ];

  const allProjects = [...projects, ...projects, ...projects];

  useEffect(() => {
    let animationFrameId: number;
    let scrollPosition1 = 0;

    const animate = () => {
      if (containerRef1.current) {
        scrollPosition1 += 0.5;

        if (scrollPosition1 >= containerRef1.current.scrollWidth / 3) {
          scrollPosition1 = 0;
        }

        containerRef1.current.style.transform = `translateX(${-scrollPosition1}px)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <footer className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-6 mb-16">
          <div className="flex items-center justify-center gap-2">
            <div className="w-10 h-10 bg-brand-primary rounded-lg text-white flex justify-center items-center font-bold">
              D
            </div>
            <span className="text-2xl">×</span>
            <div className="w-10 h-10 bg-gray-200 rounded-lg flex justify-center items-center overflow-hidden">
              <img
                src={'/image/work/mi-foto.png'}
                alt=""
                width={40}
                height={40}
              />
            </div>
          </div>

          <h2 className="text-4xl font-bold">Ready now? Let&apos;s chat.</h2>

          <p className="text-muted-foreground">
            Book a call with me or drop an email to{' '}
            <Link
              href="mailto:hey@example.com"
              className="text-primary hover:underline"
            >
              hey@example.com
            </Link>
          </p>

          <Button
            size="lg"
            className="mt-4 gap-2 bg-brand-primary hover:bg-background hover:text-foreground hover:border-brand-primary border transition-all duration-500 hover:shadow-md"
          >
            <CalendarDays className="h-4 w-4" />
            Schedule a 20-minute call
          </Button>
        </div>

        <div className="space-y-8">
          {/* First row - moves right */}
          <div className="relative">
            <div ref={containerRef1} className="flex gap-6 whitespace-nowrap">
              {allProjects.map((project, idx) => (
                <img
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  key={idx}
                  className="rounded-lg mb-4 object-cover"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p>Startup Ducen labs. All rights reserved.</p>
          </div>

          <div className="flex gap-6">
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

