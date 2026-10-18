'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Eye,
  ThumbsUp,
  Share2,
  Maximize2,
  X,
  Sparkles,
} from 'lucide-react';
import { Project } from '@/types/project';
import { ProjectCard } from '@/components/projects/project-card';

interface ProjectDetailViewProps {
  project: Project;
  relatedProjects: Project[];
}

export function ProjectDetailView({ project, relatedProjects }: ProjectDetailViewProps) {
  const [likes, setLikes] = useState(project.likesCount);
  const [hasLiked, setHasLiked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    if (heroRef.current) {
      tl.fromTo(
        heroRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7 }
      );
    }

    if (contentRef.current) {
      tl.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
        '-=0.4'
      );
    }
  }, { scope: containerRef });

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    } else {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    }
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div ref={containerRef} className="py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#66758A] hover:text-[#4F9CF9] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all projects</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLike}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                hasLiked
                  ? 'bg-[#EAF4FF] border-[#4F9CF9] text-[#4F9CF9]'
                  : 'bg-white border-[#E3ECF5] text-[#66758A] hover:border-[#8AC7FF]'
              }`}
            >
              <ThumbsUp className={`w-3.5 h-3.5 ${hasLiked ? 'fill-[#4F9CF9]' : ''}`} />
              <span className="font-mono tabular-nums">{likes}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="px-3 py-1.5 bg-white border border-[#E3ECF5] hover:border-[#8AC7FF] rounded-xl text-xs font-semibold text-[#66758A] hover:text-[#152238] flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div ref={heroRef} className="space-y-6 mb-12">
          {/* Header Metadata */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-[#4F9CF9] bg-[#EAF4FF] px-2.5 py-1 rounded-lg border border-[#8AC7FF]/30">
                {project.category}
              </span>
              <span className="text-[#66758A]">·</span>
              <span className="font-semibold text-[#152238] bg-white px-2.5 py-1 rounded-lg border border-[#E3ECF5]">
                {project.status}
              </span>
              <span className="text-[#66758A]">·</span>
              <span className="text-[#66758A]">{project.academicYear}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#152238] tracking-tight leading-tight">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg text-[#66758A] max-w-3xl leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Action Row & External Links */}
          <div className="flex flex-wrap items-center gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-[#4F9CF9] hover:bg-[#3A87E4] text-white text-xs font-semibold rounded-xl shadow-sm transition-all flex items-center gap-2"
              >
                <span>Launch Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-white border border-[#E3ECF5] hover:border-[#8AC7FF] text-[#152238] text-xs font-semibold rounded-xl transition-colors flex items-center gap-2"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source Repository</span>
              </a>
            )}
          </div>

          {/* Large Hero Cover Image */}
          <div className="relative rounded-3xl overflow-hidden border border-[#E3ECF5] shadow-xl bg-[#FAFDFE] group">
            <img
              src={project.coverImage}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full max-h-[550px] object-cover object-top"
            />
            <button
              type="button"
              onClick={() => setActiveLightboxImg(project.coverImage)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/90 backdrop-blur-md border border-[#E3ECF5] text-[#152238] opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
              aria-label="View full resolution"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Content Grid: Case Study Breakdown + Creator Sidebar */}
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Case Study Column (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Overview / Full Description */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#152238] tracking-tight">
                Project Overview & Vision
              </h2>
              <p className="text-sm text-[#66758A] leading-relaxed">
                {project.fullDescription}
              </p>
            </section>

            {/* Problem & Solution Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-[#E3ECF5] space-y-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#152238]">The Problem</h3>
                <p className="text-xs text-[#66758A] leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E3ECF5] space-y-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#152238]">The Solution</h3>
                <p className="text-xs text-[#66758A] leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Key Features */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-[#152238] tracking-tight">
                Key Technical Features
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {project.keyFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-[#E3ECF5] flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#EAF4FF] text-[#4F9CF9] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm text-[#152238] font-medium leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Screenshots Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-[#152238] tracking-tight">
                  Interface & System Gallery
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.gallery.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveLightboxImg(img)}
                      className="group relative aspect-[16/10] rounded-2xl overflow-hidden border border-[#E3ECF5] cursor-pointer bg-slate-100"
                    >
                      <img
                        src={img}
                        alt={`${project.title} screenshot ${i + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[#152238]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-3 py-1.5 bg-white/90 rounded-lg text-xs font-semibold text-[#152238] shadow-sm flex items-center gap-1.5">
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>Expand</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Challenges & Learning Outcomes */}
            <section className="p-6 rounded-2xl bg-[#FAFDFE] border border-[#E3ECF5] space-y-5">
              <h2 className="text-lg font-bold text-[#152238] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#4F9CF9]" />
                <span>Challenges & Learning Outcomes</span>
              </h2>

              <div className="space-y-3">
                <h3 className="text-xs font-bold text-[#152238] uppercase tracking-wider">
                  Engineering Challenges Faced
                </h3>
                <ul className="space-y-2 text-xs text-[#66758A]">
                  {project.challenges.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#4F9CF9] font-bold">·</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-[#E3ECF5] space-y-3">
                <h3 className="text-xs font-bold text-[#152238] uppercase tracking-wider">
                  Key Academic Takeaways
                </h3>
                <ul className="space-y-2 text-xs text-[#66758A]">
                  {project.learningOutcomes.map((o, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

          </div>

          {/* Sidebar: Student Creator & Tech Specs (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Student Creator Profile Card */}
            <div className="p-6 bg-white rounded-2xl border border-[#E3ECF5] shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-[#152238] uppercase tracking-wider">
                Student Creator
              </h3>
              
              <div className="flex items-start gap-3.5">
                <img
                  src={project.student.avatar}
                  alt={project.student.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-2xl object-cover border border-[#E3ECF5]"
                />
                <div className="space-y-0.5">
                  <h4 className="text-base font-bold text-[#152238]">{project.student.name}</h4>
                  <div className="text-xs font-medium text-[#4F9CF9]">{project.student.role}</div>
                  <div className="text-xs text-[#66758A]">{project.student.department}</div>
                </div>
              </div>

              <p className="text-xs text-[#66758A] leading-relaxed pt-1">
                {project.student.bio}
              </p>

              <div className="pt-3 border-t border-[#E3ECF5] flex items-center gap-2">
                {project.student.github && (
                  <a
                    href={project.student.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-[#FAFDFE] border border-[#E3ECF5] text-[#66758A] hover:text-[#152238] hover:border-[#4F9CF9] transition-colors"
                    aria-label="Student GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {project.student.linkedin && (
                  <a
                    href={project.student.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-[#FAFDFE] border border-[#E3ECF5] text-[#66758A] hover:text-[#0A66C2] hover:border-[#4F9CF9] transition-colors"
                    aria-label="Student LinkedIn"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Technologies Stack */}
            <div className="p-6 bg-white rounded-2xl border border-[#E3ECF5] shadow-sm space-y-3">
              <h3 className="text-xs font-bold text-[#152238] uppercase tracking-wider">
                Technologies & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 bg-[#FAFDFE] border border-[#E3ECF5] text-xs font-medium text-[#152238] rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Academic Metadata */}
            <div className="p-6 bg-white rounded-2xl border border-[#E3ECF5] shadow-sm space-y-3 text-xs text-[#66758A]">
              <h3 className="text-xs font-bold text-[#152238] uppercase tracking-wider">
                Academic Context
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between py-1 border-b border-[#E3ECF5]/60">
                  <span>Academic Period:</span>
                  <span className="font-semibold text-[#152238]">{project.academicYear}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E3ECF5]/60">
                  <span>Semester / Capstone:</span>
                  <span className="font-semibold text-[#152238]">{project.semester || 'Final Term'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Exhibition Date:</span>
                  <span className="font-semibold text-[#152238]">{project.createdAt}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Related Projects Section */}
        {relatedProjects.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#E3ECF5]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-[#152238]">
                  More Student Projects in {project.category}
                </h3>
                <p className="text-xs text-[#66758A] mt-1">
                  Explore peer work from other engineering and design cohorts.
                </p>
              </div>
              <Link
                href={`/projects?category=${encodeURIComponent(project.category)}`}
                className="text-xs font-semibold text-[#4F9CF9] hover:underline"
              >
                View category
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map(rel => (
                <div key={rel.id} className="h-full">
                  <ProjectCard project={rel} />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {activeLightboxImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#152238]/90 backdrop-blur-md"
          onClick={() => setActiveLightboxImg(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <img
              src={activeLightboxImg}
              alt="Screenshot full size"
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
            <button
              onClick={() => setActiveLightboxImg(null)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white"
              aria-label="Close image"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
