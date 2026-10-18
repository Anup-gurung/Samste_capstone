'use client';

import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { FolderGit2, Users, Cpu, GraduationCap } from 'lucide-react';

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  description: string;
  icon: typeof FolderGit2;
}

const STATS: StatItem[] = [
  {
    label: 'Projects Showcased',
    value: 15,
    suffix: '+',
    description: 'Active capstones, prototypes & live tools',
    icon: FolderGit2,
  },
  {
    label: 'Student Creators',
    value: 130,
    suffix: '+',
    description: 'Undergraduate & graduate innovators',
    icon: Users,
  },
  {
    label: 'Technologies Explored',
    value: 45,
    suffix: '+',
    description: 'Frameworks, ML models & cloud tools',
    icon: Cpu,
  },
  {
    label: 'Academic Disciplines',
    value: 9,
    suffix: '',
    description: 'Engineering, sciences, and design',
    icon: GraduationCap,
  },
];

export function Statistics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        countersRef.current.forEach((el, index) => {
          if (!el) return;
          const targetValue = STATS[index].value;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: targetValue,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = Math.floor(obj.val).toString();
            },
          });
        });
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="py-12 bg-white border-b border-[#E3ECF5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="p-5 rounded-2xl bg-[#FAFDFE] border border-[#E3ECF5] hover:border-[#8AC7FF] transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[#66758A]">{stat.label}</span>
                  <div className="w-7 h-7 rounded-lg bg-[#EAF4FF] text-[#4F9CF9] flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="text-3xl sm:text-4xl font-extrabold text-[#152238] font-mono tabular-nums tracking-tight">
                  <span
                    ref={el => {
                      countersRef.current[i] = el;
                    }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-[#4F9CF9]">{stat.suffix}</span>
                </div>

                <p className="text-xs text-[#66758A] mt-2 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-4">
          <span className="text-[11px] text-[#66758A]/70">
            * Curated sample exhibition metrics representing university cohort achievements
          </span>
        </div>
      </div>
    </section>
  );
}
