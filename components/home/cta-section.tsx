'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ArrowRight, Plus, Sparkles, Layers } from 'lucide-react';
import { SubmissionModal } from '@/components/projects/submission-modal';

export function CtaSection() {
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }
  }, { scope: containerRef });

  return (
    <>
      <section
        ref={containerRef}
        className="py-20 sm:py-28 bg-gradient-to-b from-white via-[#EAF4FF]/40 to-[#D8EAFF]/40 relative overflow-hidden"
      >
        {/* Soft background accents */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#8AC7FF]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div
            ref={contentRef}
            className="p-8 sm:p-14 rounded-3xl bg-white/80 backdrop-blur-md border border-[#E3ECF5] shadow-xl shadow-[#4F9CF9]/5 space-y-6"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EAF4FF] text-[#4F9CF9] text-xs font-bold uppercase tracking-wider rounded-full border border-[#8AC7FF]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join The Exhibition</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#152238] tracking-tight text-balance">
              Your Next Big Idea Starts Here.
            </h2>

            <p className="text-base sm:text-lg text-[#66758A] max-w-2xl mx-auto leading-relaxed">
              You&apos;ve built something worth sharing. Give your work a place to be discovered by peers, faculty mentors, and industry collaborators.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <Link
                href="/projects"
                className="px-6 py-3.5 text-sm font-semibold text-white bg-[#4F9CF9] hover:bg-[#3A87E4] active:scale-[0.98] rounded-xl shadow-md shadow-[#4F9CF9]/25 transition-all flex items-center gap-2 group whitespace-nowrap"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <button
                type="button"
                onClick={() => setIsSubmitOpen(true)}
                className="px-5 py-3.5 text-sm font-semibold text-[#152238] bg-white hover:bg-[#FAFDFE] active:scale-[0.98] border border-[#E3ECF5] hover:border-[#8AC7FF] rounded-xl shadow-sm transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <Plus className="w-4 h-4 text-[#4F9CF9]" />
                <span>Submit a Project</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <SubmissionModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
      />
    </>
  );
}
