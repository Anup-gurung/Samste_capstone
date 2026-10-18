'use client';

import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { INITIAL_CREATORS, getAllProjects } from '@/lib/projects';
import { StudentCreator } from '@/types/project';
import { Github, Linkedin, ExternalLink, X, ArrowUpRight, Award, BookOpen } from 'lucide-react';

export function StudentCreators() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedCreator, setSelectedCreator] = useState<StudentCreator | null>(null);

  const allProjects = getAllProjects();

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="py-16 sm:py-24 bg-[#FAFDFE] border-b border-[#E3ECF5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#4F9CF9] bg-[#EAF4FF] px-3 py-1 rounded-full border border-[#8AC7FF]/30 inline-block">
            Student Innovators
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#152238] tracking-tight">
            Meet the Minds Behind the Projects
          </h2>
          <p className="text-sm sm:text-base text-[#66758A]">
            Discover the engineers, researchers, and designers crafting open-source tools and solving real-world challenges during their academic journey.
          </p>
        </div>

        {/* 3-Column Profile Cards Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {INITIAL_CREATORS.map(creator => {
            const creatorProjects = allProjects.filter(p => p.student.name === creator.name);
            const count = creatorProjects.length || 1;

            return (
              <div
                key={creator.id}
                onClick={() => setSelectedCreator(creator)}
                className="group relative p-6 bg-white rounded-2xl border border-[#E3ECF5] hover:border-[#8AC7FF] transition-all hover:shadow-xl hover:shadow-[#4F9CF9]/5 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Top: Avatar & Meta */}
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-2xl object-cover border border-[#E3ECF5] group-hover:scale-105 transition-transform shrink-0"
                    />
                    <div className="space-y-1 min-w-0">
                      <h3 className="text-base font-bold text-[#152238] group-hover:text-[#4F9CF9] transition-colors truncate">
                        {creator.name}
                      </h3>
                      <div className="text-xs font-medium text-[#4F9CF9] truncate">
                        {creator.role}
                      </div>
                      <div className="text-xs text-[#66758A] truncate">
                        {creator.department}
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-[#66758A] line-clamp-3 leading-relaxed mb-4">
                    {creator.bio}
                  </p>
                </div>

                {/* Footer with clean unboxed metadata (anti-slop rule) */}
                <div className="pt-4 border-t border-[#E3ECF5] flex items-center justify-between text-xs text-[#66758A]">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#152238] font-mono tabular-nums">{count}</span>
                    <span>{count === 1 ? 'Project' : 'Projects'}</span>
                    <span aria-hidden="true">·</span>
                    <span>{creator.year}</span>
                  </div>

                  <span className="inline-flex items-center gap-1 font-semibold text-[#4F9CF9] group-hover:translate-x-0.5 transition-transform">
                    <span>View Profile</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Creator Detail Modal */}
      {selectedCreator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#152238]/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E3ECF5] overflow-hidden my-8 p-6 space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={selectedCreator.avatar}
                  alt={selectedCreator.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-2xl object-cover border border-[#E3ECF5]"
                />
                <div>
                  <h3 className="text-xl font-bold text-[#152238]">{selectedCreator.name}</h3>
                  <div className="text-xs font-semibold text-[#4F9CF9]">{selectedCreator.role}</div>
                  <div className="text-xs text-[#66758A]">{selectedCreator.department} · {selectedCreator.year}</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedCreator(null)}
                className="p-1.5 rounded-lg text-[#66758A] hover:text-[#152238] hover:bg-[#FAFDFE]"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#152238] uppercase tracking-wider">Biography</h4>
              <p className="text-xs text-[#66758A] leading-relaxed">
                {selectedCreator.bio}
              </p>
            </div>

            {/* Showcased Projects by Creator */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#152238] uppercase tracking-wider">Showcased Projects</h4>
              <div className="space-y-2">
                {allProjects
                  .filter(p => p.student.name === selectedCreator.name)
                  .map(p => (
                    <a
                      key={p.id}
                      href={`/projects/${p.slug}`}
                      className="block p-3 rounded-xl bg-[#FAFDFE] border border-[#E3ECF5] hover:border-[#4F9CF9] transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#152238] group-hover:text-[#4F9CF9]">{p.title}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#4F9CF9]" />
                      </div>
                      <p className="text-[11px] text-[#66758A] mt-0.5 line-clamp-1">{p.tagline}</p>
                    </a>
                  ))}
              </div>
            </div>

            <div className="pt-2 border-t border-[#E3ECF5] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <a
                  href={selectedCreator.github || 'https://github.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#FAFDFE] border border-[#E3ECF5] text-xs font-medium text-[#152238] hover:border-[#4F9CF9] flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={selectedCreator.linkedin || 'https://linkedin.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#FAFDFE] border border-[#E3ECF5] text-xs font-medium text-[#152238] hover:border-[#4F9CF9] flex items-center gap-1.5"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                  <span>LinkedIn</span>
                </a>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCreator(null)}
                className="px-4 py-1.5 text-xs font-medium text-[#66758A] hover:text-[#152238]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
