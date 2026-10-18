'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ArrowRight, Compass } from 'lucide-react';
import { getFeaturedProjects } from '@/lib/projects';
import { ProjectCard } from '@/components/projects/project-card';

export function FeaturedProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const featured = getFeaturedProjects();

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (gridRef.current) {
      const cards = gridRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <section
      id="featured"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-[#FAFDFE] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4F9CF9]">
              <Compass className="w-3.5 h-3.5" />
              <span>Project Showcases</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#152238] tracking-tight">
              Discover What Students Are Building
            </h2>
            <p className="text-sm sm:text-base text-[#66758A] leading-relaxed">
              From ambitious ideas to working prototypes, explore the projects turning classroom learning into real-world solutions.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4F9CF9] hover:text-[#3A87E4] group whitespace-nowrap self-start md:self-end"
          >
            <span>View all projects</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3-Column Responsive Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {featured.map(project => (
            <div key={project.id} className="h-full">
              <ProjectCard project={project} featured />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
