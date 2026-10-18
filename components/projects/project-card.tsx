'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink, Github, Eye, ThumbsUp } from 'lucide-react';
import { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <article
      className="group relative flex flex-col bg-white rounded-2xl border border-[#E3ECF5] hover:border-[#8AC7FF] transition-all duration-300 hover:shadow-xl hover:shadow-[#4F9CF9]/5 hover:-translate-y-1 overflow-hidden h-full"
    >
      {/* Cover Image Container */}
      <Link
        href={`/projects/${project.slug}`}
        className="relative block w-full aspect-[16/10] overflow-hidden bg-[#EAF4FF] shrink-0"
        aria-label={`View details of ${project.title}`}
      >
        {!imageError ? (
          <img
            src={project.coverImage}
            alt={project.title}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#EAF4FF] to-[#D8EAFF]">
            <span className="text-sm font-semibold text-[#152238]">{project.title}</span>
            <span className="text-xs text-[#66758A] mt-1">{project.category}</span>
          </div>
        )}

        {/* Status Badge overlay */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-lg border border-[#E3ECF5] text-[11px] font-semibold text-[#152238] shadow-sm">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              project.status === 'Live Demo'
                ? 'bg-emerald-500'
                : project.status === 'Prototype'
                ? 'bg-amber-500'
                : 'bg-[#4F9CF9]'
            }`}
          />
          <span>{project.status}</span>
        </div>

        {/* Category Badge overlay */}
        <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#152238]/75 backdrop-blur-md rounded-lg text-[11px] font-medium text-white shadow-sm">
          {project.category}
        </div>
      </Link>

      {/* Card Content Area */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div className="space-y-2.5">
          {/* Creator & Academic Year info */}
          <div className="flex items-center justify-between text-xs text-[#66758A]">
            <div className="flex items-center gap-2">
              {project.student.avatar ? (
                <img
                  src={project.student.avatar}
                  alt={project.student.name}
                  className="w-5 h-5 rounded-full object-cover border border-[#E3ECF5]"
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-[#EAF4FF] text-[#4F9CF9] text-[10px] font-bold flex items-center justify-center">
                  {project.student.name[0]}
                </div>
              )}
              <span className="font-medium text-[#152238] truncate max-w-[140px]">
                {project.student.name}
              </span>
            </div>
            <span>{project.academicYear}</span>
          </div>

          {/* Project Title */}
          <h3 className="text-base font-bold text-[#152238] group-hover:text-[#4F9CF9] transition-colors line-clamp-1">
            <Link href={`/projects/${project.slug}`}>
              {project.title}
            </Link>
          </h3>

          {/* Short Description */}
          <p className="text-xs text-[#66758A] leading-relaxed line-clamp-2">
            {project.shortDescription}
          </p>

          {/* Technology Badges (Unboxed / Clean subtle tags) */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {project.technologies.slice(0, 3).map(tech => (
              <span
                key={tech}
                className="px-2 py-0.5 bg-[#FAFDFE] border border-[#E3ECF5] text-[11px] font-medium text-[#66758A] rounded-md"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-[11px] text-[#66758A] pl-1 font-medium">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Footer Area: Stats & CTA affordance */}
        <div className="mt-5 pt-3.5 border-t border-[#E3ECF5] flex items-center justify-between text-xs text-[#66758A]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-mono tabular-nums text-[11px]">
              <Eye className="w-3.5 h-3.5 text-[#66758A]" />
              {project.viewsCount}
            </span>
            <span className="flex items-center gap-1 font-mono tabular-nums text-[11px]">
              <ThumbsUp className="w-3.5 h-3.5 text-[#66758A]" />
              {project.likesCount}
            </span>
          </div>

          <Link
            href={`/projects/${project.slug}`}
            className="flex items-center gap-1 text-xs font-semibold text-[#4F9CF9] group-hover:translate-x-0.5 transition-transform"
          >
            <span>View Project</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
