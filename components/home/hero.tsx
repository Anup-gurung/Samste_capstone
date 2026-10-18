'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { ArrowRight, Plus, Sparkles, Layers, Code, Cpu, Smartphone, Activity } from 'lucide-react';
import { SubmissionModal } from '@/components/projects/submission-modal';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const supportingLineRef = useRef<HTMLDivElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);

  // Floating card refs for parallax and continuous float
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mobileCardRef = useRef<HTMLDivElement>(null);
  const badgeCardRef = useRef<HTMLDivElement>(null);
  const statCardRef = useRef<HTMLDivElement>(null);

  const [isSubmitOpen, setIsSubmitOpen] = useState(false);

  // GSAP Coordinated Master Timeline
  useGSAP(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Just ensure visible without motion
      gsap.set([eyebrowRef.current, headlineRef.current, paragraphRef.current, ctaRef.current, supportingLineRef.current, collageRef.current], {
        opacity: 1,
        y: 0,
      });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Initial setup
    gsap.set([eyebrowRef.current, paragraphRef.current, ctaRef.current, supportingLineRef.current], {
      opacity: 0,
      y: 20,
    });

    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll('.hero-word');
      gsap.set(words, { opacity: 0, y: 30 });
    }

    if (collageRef.current) {
      gsap.set(collageRef.current, { opacity: 0, scale: 0.94, y: 30 });
    }

    // Sequence
    tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.6, delay: 0.1 })
      .to('.hero-word', {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
      }, '-=0.3')
      .to(paragraphRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.4')
      .to(supportingLineRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
      .to(collageRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
      }, '-=0.7');

    // Continuous subtle floating motion for floating elements
    if (mobileCardRef.current) {
      gsap.to(mobileCardRef.current, {
        y: -10,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    if (badgeCardRef.current) {
      gsap.to(badgeCardRef.current, {
        y: 8,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5,
      });
    }

    if (statCardRef.current) {
      gsap.to(statCardRef.current, {
        y: -6,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
      });
    }

    // Desktop pointer parallax response
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const moveX = (clientX - centerX) / 45;
        const moveY = (clientY - centerY) / 45;

        if (mainCardRef.current) {
          gsap.to(mainCardRef.current, { x: moveX * 0.5, y: moveY * 0.5, duration: 0.8, ease: 'power1.out' });
        }
        if (mobileCardRef.current) {
          gsap.to(mobileCardRef.current, { x: -moveX * 1.2, y: -moveY * 1.2, duration: 0.9, ease: 'power1.out' });
        }
        if (badgeCardRef.current) {
          gsap.to(badgeCardRef.current, { x: moveX * 1.5, y: moveY * 1.5, duration: 0.7, ease: 'power1.out' });
        }
        if (statCardRef.current) {
          gsap.to(statCardRef.current, { x: -moveX * 0.8, y: moveY * 0.8, duration: 0.8, ease: 'power1.out' });
        }
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    });

  }, { scope: containerRef });

  return (
    <>
      <section
        ref={containerRef}
        className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-[#EAF4FF]/70 via-[#FAFDFE] to-white border-b border-[#E3ECF5]/60"
      >
        {/* Subtle background ambient mesh */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#8AC7FF]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#4F9CF9]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Typographic Hierarchy */}
            <div className="lg:col-span-6 space-y-6 max-w-xl">
              {/* Eyebrow Label */}
              <div ref={eyebrowRef} className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#4F9CF9] bg-[#EAF4FF] px-3 py-1 rounded-full border border-[#8AC7FF]/30 inline-flex items-center gap-1.5 shadow-sm shadow-[#4F9CF9]/10">
                  <Sparkles className="w-3.5 h-3.5 text-[#4F9CF9]" />
                  STUDENT INNOVATION • CREATIVE MINDS
                </span>
              </div>

              {/* Main Headline */}
              <h1
                ref={headlineRef}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#152238] tracking-tight leading-[1.1] text-balance"
              >
                <span className="hero-word inline-block mr-3">Samtse</span>
                <span className="hero-word inline-block mr-3">College</span>
                <span className="hero-word inline-block mr-3">Of</span>
                <span className="hero-word inline-block mr-3">Education</span>
              </h1>

              {/* Supporting Text */}
              <p
                ref={paragraphRef}
                className="text-base sm:text-lg text-[#66758A] leading-relaxed font-normal"
              >
Celebrating student innovation by showcasing capstone projects, sharing knowledge, and turning ideas into inspiration for others.              </p>

              {/* Action Buttons */}
              <div
                ref={ctaRef}
                className="flex flex-wrap items-center gap-3 pt-2"
              >
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
                  <span>Showcase Your Work</span>
                </button>
              </div>

              {/* Supporting Line */}
              <div
                ref={supportingLineRef}
                className="pt-2 flex items-center gap-3 text-xs text-[#66758A]"
              >
                <div className="flex -space-x-1.5">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Student"
                    className="w-6 h-6 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                    alt="Student"
                    className="w-6 h-6 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
                    alt="Student"
                    className="w-6 h-6 rounded-full border-2 border-white object-cover"
                  />
                </div>
                <span>Built by students · Shared with the world</span>
              </div>
            </div>

            {/* Right Column: Layered Visual Composition of Project Previews */}
            <div className="lg:col-span-6 relative">
              <div
                ref={collageRef}
                className="relative w-full max-w-lg lg:max-w-none mx-auto h-[420px] sm:h-[480px] flex items-center justify-center"
              >
                {/* Background decorative soft glow card */}
                <div className="absolute w-[85%] h-[85%] rounded-3xl bg-gradient-to-tr from-[#EAF4FF] to-[#D8EAFF]/60 -rotate-3 border border-[#E3ECF5]/60 pointer-events-none" />

                {/* Primary Card: Web App Dashboard (EcoTrack) */}
                <div
                  ref={mainCardRef}
                  className="absolute w-[80%] sm:w-[78%] left-4 sm:left-6 top-8 sm:top-6 bg-white rounded-2xl shadow-2xl border border-[#E3ECF5] overflow-hidden transition-shadow hover:shadow-2xl z-20 group"
                >
                  <div className="px-3.5 py-2.5 bg-[#FAFDFE] border-b border-[#E3ECF5] flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[10px] font-mono text-[#66758A]">ecotrack.campus.edu</span>
                    <span className="text-[10px] font-semibold text-[#4F9CF9] bg-[#EAF4FF] px-2 py-0.5 rounded">Live Demo</span>
                  </div>
                  <div className="aspect-[16/10] overflow-hidden bg-[#FAFDFE]">
                    <img
                      src="/images/ecotrack.jpg"
                      alt="EcoTrack Dashboard"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Overlapping Mobile App Card (NamZoed) */}
                <div
                  ref={mobileCardRef}
                  className="absolute -right-2 sm:right-2 bottom-4 sm:bottom-6 w-[42%] sm:w-[38%] bg-white rounded-2xl shadow-2xl border border-[#E3ECF5] overflow-hidden z-30 group"
                >
                  <div className="p-2 bg-[#152238] text-white flex items-center justify-between text-[10px]">
                    <span className="font-semibold truncate">NamZoed Mobile</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="aspect-[9/14] overflow-hidden bg-slate-100">
                    <img
                      src="/images/namzoed.jpg"
                      alt="NamZoed Mobile Marketplace"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Floating Tech Stack Badge */}
                <div
                  ref={badgeCardRef}
                  className="absolute -top-3 right-6 sm:right-10 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-lg border border-[#E3ECF5] z-30 flex items-center gap-2.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#EAF4FF] text-[#4F9CF9] flex items-center justify-center font-bold">
                    <Code className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-[#152238]">Active Tech Stacks</div>
                    <div className="text-[10px] text-[#66758A]">Next.js · PyTorch · Flutter</div>
                  </div>
                </div>

                {/* Floating Metric Card */}
                <div
                  ref={statCardRef}
                  className="absolute bottom-2 left-2 sm:left-4 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-lg border border-[#E3ECF5] z-30 flex items-center gap-2.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-[#152238]">100% Peer Verified</div>
                    <div className="text-[10px] text-[#66758A]">Academic Capstone & Research</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Submission Modal */}
      <SubmissionModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
      />
    </>
  );
}
