'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { Hammer, Share2, Sparkles, Code2, Rocket, Users } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Build Something',
    description: 'Turn an idea, classroom assignment, or research question into a working project, prototype, or paper.',
    icon: Hammer,
    accent: 'bg-[#EAF4FF] text-[#4F9CF9]',
    meta: 'Ideate · Code · Prototype',
  },
  {
    step: '02',
    title: 'Share Your Work',
    description: 'Present your project with screenshots, architecture diagrams, clear problem statements, and the technologies used.',
    icon: Share2,
    accent: 'bg-[#EAF4FF] text-[#4F9CF9]',
    meta: 'Document · Publish · Tag',
  },
  {
    step: '03',
    title: 'Inspire Others',
    description: 'Let other students discover your approach, learn from your technical choices, and build on your innovations.',
    icon: Sparkles,
    accent: 'bg-[#EAF4FF] text-[#4F9CF9]',
    meta: 'Connect · Collaborate · Grow',
  },
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (stepsRef.current) {
      gsap.fromTo(
        stepsRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stepsRef.current,
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
      className="py-16 sm:py-24 bg-white border-b border-[#E3ECF5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#4F9CF9] bg-[#EAF4FF] px-3 py-1 rounded-full border border-[#8AC7FF]/30 inline-block">
            Simple 3-Step Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#152238] tracking-tight">
            How ProjectSpace Works
          </h2>
          <p className="text-sm sm:text-base text-[#66758A]">
            A frictionless platform built for students to celebrate effort, share knowledge, and foster multidisciplinary collaboration.
          </p>
        </div>

        <div
          ref={stepsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative p-7 rounded-2xl bg-[#FAFDFE] border border-[#E3ECF5] hover:border-[#8AC7FF] transition-all hover:shadow-lg hover:shadow-[#4F9CF9]/5 flex flex-col justify-between"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-black font-mono text-[#4F9CF9]/40 tracking-tight">
                      {item.step}
                    </span>
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${item.accent} border border-[#8AC7FF]/20`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-lg font-bold text-[#152238] mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#66758A] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E3ECF5] text-xs font-medium text-[#4F9CF9]">
                  {item.meta}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
