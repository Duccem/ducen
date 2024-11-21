'use client';

import Github from '@/lib/ducen/components/icons/github';
import { Button } from '@/lib/shadcn/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function ProjectsShowcase() {
  const containerRef1 = useRef<HTMLDivElement>(null);
  const containerRef2 = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: 'Dashboard Analytics',
      image: '/image/work/email2.png',
    },
    {
      title: 'Design System',
      image: '/image/work/ryde2.png',
    },
    {
      title: 'Template Gallery',
      image: '/image/work/landing.png',
    },
    {
      title: 'Data Visualization',
      image: '/image/work/mobile2.png',
    },
    {
      title: 'Admin Panel',
      image: '/image/work/web-app.png',
    },
  ];

  // Duplicate projects for infinite scroll effect
  const allProjects = [...projects, ...projects, ...projects];

  useEffect(() => {
    let animationFrameId: number;
    let scrollPosition1 = 0;
    let scrollPosition2 = 0;

    const animate = () => {
      if (containerRef1.current && containerRef2.current) {
        scrollPosition1 += 0.5;
        scrollPosition2 -= 0.5;

        if (scrollPosition1 >= containerRef1.current.scrollWidth / 3) {
          scrollPosition1 = 0;
        }

        if (scrollPosition2 <= -containerRef2.current.scrollWidth / 3) {
          scrollPosition2 = 0;
        }

        containerRef1.current.style.transform = `translateX(${-scrollPosition1}px)`;
        containerRef2.current.style.transform = `translateX(${-scrollPosition2}px)`;
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
    <div className="w-[calc(100vw - 5%)] min-h-screen  py-20 overflow-hidden">
      <div className="mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 ">
          Featured Projects
        </h2>
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
          <div className="relative">
            <div
              ref={containerRef2}
              className="flex gap-6 whitespace-nowrap flex-row-reverse"
            >
              {[...projects, ...projects].map((project, idx) => (
                <img
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="rounded-lg mb-4 object-cover"
                  key={idx}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center mt-20">
          <Button
            className="gap-4 text-lg font-bold p-5  hover:-translate-y-2 transition-all duration-500 shadow-2xl"
            variant="outline"
          >
            <Github fill="black" />
            See my recent work
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

