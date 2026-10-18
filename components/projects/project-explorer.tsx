'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  Layers,
  Sparkles,
  RefreshCw,
  FolderSearch,
} from 'lucide-react';
import { getAllProjects, CATEGORIES, ALL_TECHNOLOGIES } from '@/lib/projects';
import { Project, ProjectCategory } from '@/types/project';
import { ProjectCard } from '@/components/projects/project-card';
import { SubmissionModal } from '@/components/projects/submission-modal';

type SortOption = 'trending' | 'likes' | 'newest' | 'title';

export function ProjectExplorer() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') as ProjectCategory | null;

  const [projects, setProjects] = useState<Project[]>(() => getAllProjects());
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory && CATEGORIES.includes(initialCategory) ? initialCategory : 'All'
  );
  const [selectedTech, setSelectedTech] = useState<string>('All Technologies');
  const [sortBy, setSortBy] = useState<SortOption>('trending');
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);

  const gridRef = useRef<HTMLDivElement>(null);

  // Synchronize if storage changes
  useEffect(() => {
    const handleStorage = () => {
      setProjects(getAllProjects());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Filter & Sort
  const filteredProjects = useMemo(() => {
    return projects
      .filter(project => {
        // Category check
        if (selectedCategory !== 'All' && project.category !== selectedCategory) {
          return false;
        }

        // Technology check
        if (selectedTech !== 'All Technologies' && !project.technologies.some(t => t.toLowerCase() === selectedTech.toLowerCase())) {
          return false;
        }

        // Search query check
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = project.title.toLowerCase().includes(q);
          const matchDesc = project.shortDescription.toLowerCase().includes(q) || project.fullDescription.toLowerCase().includes(q);
          const matchStudent = project.student.name.toLowerCase().includes(q);
          const matchTech = project.technologies.some(t => t.toLowerCase().includes(q));
          const matchCat = project.category.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchStudent && !matchTech && !matchCat) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'trending') return b.viewsCount - a.viewsCount;
        if (sortBy === 'likes') return b.likesCount - a.likesCount;
        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [projects, selectedCategory, selectedTech, searchQuery, sortBy]);

  // Subtle GSAP entrance animation on filter change
  useGSAP(() => {
    if (gridRef.current && gridRef.current.children.length > 0) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: 'power2.out' }
      );
    }
  }, [selectedCategory, selectedTech, sortBy, searchQuery]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedTech('All Technologies');
    setSortBy('trending');
  };

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'All' || selectedTech !== 'All Technologies';

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4F9CF9] mb-1">
              <FolderSearch className="w-4 h-4" />
              <span>Project Directory</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#152238] tracking-tight">
              Explore Student Innovations
            </h1>
            <p className="text-sm text-[#66758A] mt-1">
              Showing <span className="font-semibold text-[#152238] font-mono">{filteredProjects.length}</span> {filteredProjects.length === 1 ? 'project' : 'projects'} across software, AI, and research.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsSubmitOpen(true)}
            className="px-4 py-2.5 bg-[#4F9CF9] hover:bg-[#3A87E4] text-white text-xs font-semibold rounded-xl shadow-sm transition-all self-start md:self-end flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>Submit a Project</span>
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E3ECF5] shadow-sm mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-[#66758A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by title, student, or technology..."
                className="w-full pl-9 pr-9 py-2.5 text-xs sm:text-sm bg-[#FAFDFE] border border-[#E3ECF5] rounded-xl text-[#152238] placeholder:text-[#66758A]/60 focus:outline-none focus:ring-2 focus:ring-[#4F9CF9]/25 focus:border-[#4F9CF9] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#66758A] hover:text-[#152238]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Technology Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedTech}
                onChange={e => setSelectedTech(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm bg-[#FAFDFE] border border-[#E3ECF5] rounded-xl text-[#152238] focus:outline-none focus:ring-2 focus:ring-[#4F9CF9]/25 focus:border-[#4F9CF9] transition-all"
              >
                {ALL_TECHNOLOGIES.map(tech => (
                  <option key={tech} value={tech}>{tech}</option>
                ))}
              </select>
            </div>

            {/* Sort Selector */}
            <div className="md:col-span-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#66758A] whitespace-nowrap hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as SortOption)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm bg-[#FAFDFE] border border-[#E3ECF5] rounded-xl text-[#152238] focus:outline-none focus:ring-2 focus:ring-[#4F9CF9]/25 focus:border-[#4F9CF9] transition-all"
                >
                  <option value="trending">Most Viewed (Trending)</option>
                  <option value="likes">Highest Rated / Likes</option>
                  <option value="newest">Most Recent</option>
                  <option value="title">Alphabetical (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Clear button if active */}
            {hasActiveFilters && (
              <div className="md:col-span-1 flex justify-end">
                <button
                  type="button"
                  onClick={clearAllFilters}
                  title="Clear all filters"
                  className="p-2.5 rounded-xl text-[#66758A] hover:text-[#152238] bg-[#FAFDFE] hover:bg-slate-100 border border-[#E3ECF5] text-xs transition-colors flex items-center justify-center w-full"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Category Tabs (Segmented interactive buttons) */}
          <div id="categories" className="pt-2 border-t border-[#E3ECF5] flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === 'All'
                  ? 'bg-[#4F9CF9] text-white shadow-sm'
                  : 'text-[#66758A] hover:text-[#152238] hover:bg-[#FAFDFE]'
              }`}
            >
              All Categories
            </button>
            {CATEGORIES.map(cat => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-[#4F9CF9] text-white shadow-sm'
                      : 'text-[#66758A] hover:text-[#152238] hover:bg-[#FAFDFE]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Grid / Empty State */}
        {filteredProjects.length > 0 ? (
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredProjects.map(project => (
              <div key={project.id} className="h-full">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-3xl border border-[#E3ECF5] p-8 max-w-xl mx-auto space-y-4">
            <div className="w-14 h-14 bg-[#EAF4FF] text-[#4F9CF9] rounded-2xl flex items-center justify-center mx-auto border border-[#8AC7FF]/30">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#152238]">No projects found</h3>
              <p className="text-xs sm:text-sm text-[#66758A] max-w-sm mx-auto">
                No projects matched your active filters. Try searching for different keywords, resetting filters, or submit a new project!
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={clearAllFilters}
                className="px-4 py-2 bg-[#FAFDFE] border border-[#E3ECF5] text-xs font-semibold text-[#152238] hover:border-[#4F9CF9] rounded-xl transition-colors"
              >
                Clear Filters
              </button>
              <button
                type="button"
                onClick={() => setIsSubmitOpen(true)}
                className="px-4 py-2 bg-[#4F9CF9] text-white text-xs font-semibold rounded-xl hover:bg-[#3A87E4] shadow-sm transition-all"
              >
                Submit Project
              </button>
            </div>
          </div>
        )}

      </div>

      <SubmissionModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        onProjectCreated={() => {
          setProjects(getAllProjects());
        }}
      />
    </div>
  );
}
