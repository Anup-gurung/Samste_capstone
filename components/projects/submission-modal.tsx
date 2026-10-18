'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { CATEGORIES, saveNewProject } from '@/lib/projects';
import { ProjectCategory, ProjectStatus } from '@/types/project';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectCreated?: (slug: string) => void;
}

export function SubmissionModal({ isOpen, onClose, onProjectCreated }: SubmissionModalProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successSlug, setSuccessSlug] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('Web Development');
  const [status, setStatus] = useState<ProjectStatus>('Live Demo');
  const [studentName, setStudentName] = useState('');
  const [department, setDepartment] = useState('');
  const [academicYear, setAcademicYear] = useState('2025-2026');
  const [technologies, setTechnologies] = useState('Next.js, TypeScript, Tailwind CSS');
  const [coverImage, setCoverImage] = useState('/images/hero-showcase.jpg');
  const [demoUrl, setDemoUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [keyFeatures, setKeyFeatures] = useState('Responsive modern UI\nReal-time telemetry\nOffline capability');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !studentName.trim() || !shortDesc.trim()) {
      return;
    }

    setIsSubmitting(true);

    const techArray = technologies
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const featuresArray = keyFeatures
      .split('\n')
      .map(f => f.trim())
      .filter(Boolean);

    const newProject = saveNewProject({
      title: title.trim(),
      tagline: tagline.trim() || title.trim(),
      shortDescription: shortDesc.trim(),
      fullDescription: fullDesc.trim() || shortDesc.trim(),
      category,
      status,
      coverImage: coverImage.trim() || '/images/hero-showcase.jpg',
      gallery: [coverImage.trim() || '/images/hero-showcase.jpg'],
      technologies: techArray.length ? techArray : ['Web Development', 'TypeScript'],
      student: {
        id: 'user-' + Date.now(),
        name: studentName.trim(),
        role: 'Creator & Developer',
        department: department.trim() || 'Computer Science',
        year: academicYear,
        bio: `${studentName.trim()} is a student researcher and builder in ${department.trim() || 'Computer Science'}.`,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      },
      academicYear,
      semester: 'Current Term',
      featured: false,
      demoUrl: demoUrl.trim() || undefined,
      repoUrl: repoUrl.trim() || undefined,
      problem: problem.trim() || 'Students and researchers need accessible tools to collaborate and share solutions to real-world challenges.',
      solution: solution.trim() || 'Engineered an accessible, high-performance web platform utilizing modern design patterns and performant data structures.',
      keyFeatures: featuresArray.length ? featuresArray : ['Modular architecture', 'Responsive interface', 'Fast execution'],
      challenges: ['Optimizing performance across diverse devices', 'Iterating user feedback loops with peer students'],
      learningOutcomes: ['Full-lifecycle software delivery', 'Modern web systems engineering'],
    });

    setIsSubmitting(false);
    setSuccessSlug(newProject.slug);
    if (onProjectCreated) {
      onProjectCreated(newProject.slug);
    }
  };

  const handleGoToProject = () => {
    if (successSlug) {
      onClose();
      router.push(`/projects/${successSlug}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#152238]/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E3ECF5] overflow-hidden my-8 max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E3ECF5] flex items-center justify-between bg-gradient-to-r from-[#FAFDFE] to-[#EAF4FF]/50 shrink-0">
          <div>
            <h2 id="modal-title" className="text-xl font-bold text-[#152238] tracking-tight">
              Showcase Your Project
            </h2>
            <p className="text-xs text-[#66758A] mt-0.5">
              Share your academic work, prototype, or research with the student community.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-[#66758A] hover:text-[#152238] hover:bg-white border border-transparent hover:border-[#E3ECF5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {successSlug ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 bg-[#EAF4FF] text-[#4F9CF9] rounded-2xl flex items-center justify-center mx-auto border border-[#8AC7FF]/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#152238]">Project Submitted Successfully!</h3>
                <p className="text-sm text-[#66758A] max-w-md mx-auto mt-1">
                  Your project has been recorded in the catalogue and is ready to be explored by peers and faculty.
                </p>
              </div>
              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleGoToProject}
                  className="px-5 py-2.5 bg-[#4F9CF9] hover:bg-[#3A87E4] text-white text-sm font-semibold rounded-xl shadow-sm transition-all flex items-center gap-2"
                >
                  <span>View Project Page</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSuccessSlug(null);
                    setTitle('');
                    onClose();
                  }}
                  className="px-4 py-2.5 bg-white border border-[#E3ECF5] hover:bg-[#FAFDFE] text-[#152238] text-sm font-medium rounded-xl transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="p-3.5 bg-[#EAF4FF]/60 rounded-xl border border-[#8AC7FF]/30 text-xs text-[#152238] flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#4F9CF9] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#152238]">Student Exhibition Prototype:</span> Submissions instantly update your local ProjectSpace catalogue so you can experience how your project appears live on the showcase.
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#152238] mb-1.5">
                    Project Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g., PulseGrid Sensor Network"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-[#E3ECF5] rounded-xl text-[#152238] placeholder:text-[#66758A]/60 focus:outline-none focus:ring-2 focus:ring-[#4F9CF9]/30 focus:border-[#4F9CF9] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#152238] mb-1.5">
                    One-line Tagline
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={e => setTagline(e.target.value)}
                    placeholder="e.g., Decentralized smart grid telemetry"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-[#E3ECF5] rounded-xl text-[#152238] placeholder:text-[#66758A]/60 focus:outline-none focus:ring-2 focus:ring-[#4F9CF9]/30 focus:border-[#4F9CF9] transition-all"
                  />
                </div>
              </div>

              {/* Category & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#152238] mb-1.5">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as ProjectCategory)}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-[#E3ECF5] rounded-xl text-[#152238] focus:outline-none focus:ring-2 focus:ring-[#4F9CF9]/30 focus:border-[#4F9CF9] transition-all"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#152238] mb-1.5">
                    Project Status
                  </label>
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value as ProjectStatus)}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-[#E3ECF5] rounded-xl text-[#152238] focus:outline-none focus:ring-2 focus:ring-[#4F9CF9]/30 focus:border-[#4F9CF9] transition-all"
                  >
                    <option value="Live Demo">Live Demo</option>
                    <option value="Prototype">Prototype</option>
                    <option value="Research">Research Paper</option>
                    <option value="Open Source">Open Source</option>
                  </select>
                </div>
              </div>

              {/* Student Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#152238] mb-1.5">
                    Student / Team Lead <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={e => setStudentName(e.target.value)}
                    placeholder="e.g., Alex Morgan"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-[#E3ECF5] rounded-xl text-[#152238] placeholder:text-[#66758A]/60 focus:outline-none focus:ring-2 focus:ring-[#4F9CF9]/30 focus:border-[#4F9CF9] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#152238] mb-1.5">
                    Department / Programme
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                    placeholder="e.g., Electrical & Computer Eng"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-[#E3ECF5] rounded-xl text-[#152238] placeholder:text-[#66758A]/60 focus:outline-none focus:ring-2 focus:ring-[#4F9CF9]/30 focus:border-[#4F9CF9] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#152238] mb-1.5">
                    Academic Year
                  </label>
                  <input
                    type="text"
                    value={academicYear}
                    onChange={e => setAcademicYear(e.target.value)}
                    placeholder="e.g., Class of 2026"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-[#E3ECF5] rounded-xl text-[#152238] placeholder:text-[#66758A]/60 focus:outline-none focus:ring-2 focus:ring-[#4F9CF9]/30 focus:border-[#4F9CF9] transition-all"
                  />
                </div>
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-xs font-semibold text-[#152238] mb-1.5">
                  Technologies Used (comma separated)
                </label>
                <input
                  type="text"
                  value={technologies}
                  onChange={e => setTechnologies(e.target.value)}
                  placeholder="e.g., Next.js, Python, OpenCV, Docker"
                  className="w-full px-3.5 py-2 text-sm bg-white border border-[#E3ECF5] rounded-xl text-[#152238] placeholder:text-[#66758A]/60 focus:outline-none focus:ring-2 focus:ring-[#4F9CF9]/30 focus:border-[#4F9CF9] transition-all"
                />
              </div>

              {/* Short & Full Description */}
              <div>
                <label className="block text-xs font-semibold text-[#152238] mb-1.5">
                  Short Description (Card Summary) <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={shortDesc}
                  onChange={e => setShortDesc(e.target.value)}
                  placeholder="A two-sentence summary describing what your project achieves..."
                  className="w-full px-3.5 py-2 text-sm bg-white border border-[#E3ECF5] rounded-xl text-[#152238] placeholder:text-[#66758A]/60 focus:outline-none focus:ring-2 focus:ring-[#4F9CF9]/30 focus:border-[#4F9CF9] transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#152238] mb-1.5">
                  Full Description & Architecture
                </label>
                <textarea
                  rows={3}
                  value={fullDesc}
                  onChange={e => setFullDesc(e.target.value)}
                  placeholder="Detailed breakdown of system implementation, technical stack decisions, and methodology..."
                  className="w-full px-3.5 py-2 text-sm bg-white border border-[#E3ECF5] rounded-xl text-[#152238] placeholder:text-[#66758A]/60 focus:outline-none focus:ring-2 focus:ring-[#4F9CF9]/30 focus:border-[#4F9CF9] transition-all resize-none"
                />
              </div>

              {/* Problem & Solution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#152238] mb-1.5">
                    Problem Statement
                  </label>
                  <textarea
                    rows={2}
                    value={problem}
                    onChange={e => setProblem(e.target.value)}
                    placeholder="What specific issue does this project address?"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-[#E3ECF5] rounded-xl text-[#152238] placeholder:text-[#66758A]/60 focus:outline-none focus:ring-2 focus:ring-[#4F9CF9]/30 focus:border-[#4F9CF9] transition-all resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#152238] mb-1.5">
                    Proposed Solution
                  </label>
                  <textarea
                    rows={2}
                    value={solution}
                    onChange={e => setSolution(e.target.value)}
                    placeholder="How does your technical implementation solve it?"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-[#E3ECF5] rounded-xl text-[#152238] placeholder:text-[#66758A]/60 focus:outline-none focus:ring-2 focus:ring-[#4F9CF9]/30 focus:border-[#4F9CF9] transition-all resize-none"
                  />
                </div>
              </div>

              {/* Cover Image Preset Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#152238] mb-1.5">
                  Cover Image
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                  {[
                    { label: 'Mobile UI', path: '/images/namzoed.jpg' },
                    { label: 'Web Dashboard', path: '/images/ecotrack.jpg' },
                    { label: 'AI Vision', path: '/images/smart-attendance.jpg' },
                    { label: 'Telemetry/Map', path: '/images/agrivision.jpg' },
                  ].map(preset => (
                    <button
                      key={preset.path}
                      type="button"
                      onClick={() => setCoverImage(preset.path)}
                      className={`px-2.5 py-2 text-xs rounded-xl border text-center transition-all ${
                        coverImage === preset.path
                          ? 'border-[#4F9CF9] bg-[#EAF4FF] text-[#4F9CF9] font-medium'
                          : 'border-[#E3ECF5] bg-white text-[#66758A] hover:border-[#8AC7FF]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={coverImage}
                  onChange={e => setCoverImage(e.target.value)}
                  placeholder="Or custom image URL (/images/...)"
                  className="w-full px-3.5 py-2 text-xs bg-white border border-[#E3ECF5] rounded-xl text-[#152238] placeholder:text-[#66758A]/60 focus:outline-none focus:ring-2 focus:ring-[#4F9CF9]/30 focus:border-[#4F9CF9]"
                />
              </div>

              {/* Demo & Repo URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#152238] mb-1.5">
                    Live Demo Link (Optional)
                  </label>
                  <input
                    type="url"
                    value={demoUrl}
                    onChange={e => setDemoUrl(e.target.value)}
                    placeholder="https://my-demo-app.com"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-[#E3ECF5] rounded-xl text-[#152238] placeholder:text-[#66758A]/60 focus:outline-none focus:ring-2 focus:ring-[#4F9CF9]/30 focus:border-[#4F9CF9] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#152238] mb-1.5">
                    Repository URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={repoUrl}
                    onChange={e => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/myusername/my-project"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-[#E3ECF5] rounded-xl text-[#152238] placeholder:text-[#66758A]/60 focus:outline-none focus:ring-2 focus:ring-[#4F9CF9]/30 focus:border-[#4F9CF9] transition-all"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-[#E3ECF5] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-[#66758A] hover:text-[#152238] hover:bg-[#FAFDFE] rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-sm font-semibold text-white bg-[#4F9CF9] hover:bg-[#3A87E4] active:scale-[0.98] rounded-xl shadow-sm transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Publishing...' : 'Publish to Showcase'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
