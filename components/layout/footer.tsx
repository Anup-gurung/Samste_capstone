import Link from 'next/link';
import Image from 'next/image';
import { Github, ExternalLink, Heart } from 'lucide-react';
import { CATEGORIES } from '@/lib/projects';
import logoImage from '@/src/assets/images/logo-sce.png';

export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-[#E3ECF5] text-[#66758A] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 overflow-hidden rounded-xl bg-white shadow-sm">
                <Image
                  src={logoImage}
                  alt="ProjectSpace logo"
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <span className="text-lg font-extrabold text-[#152238] tracking-tight">
                Capstone<span className="text-[#4F9CF9]">Project</span>
              </span>
            </Link>
            <p className="text-xs text-[#66758A] leading-relaxed">
              A digital exhibition platform celebrating student technical innovation, creative engineering, and research projects across global university campuses.
            </p>
            <div className="text-xs text-[#66758A]/80 pt-1">
              <span>Built by students · Shared with the world</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#152238] uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/projects" className="hover:text-[#4F9CF9] transition-colors">
                  All Projects
                </Link>
              </li>
              <li>
                <Link href="/projects#featured" className="hover:text-[#4F9CF9] transition-colors">
                  Featured Innovations
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#4F9CF9] transition-colors">
                  About Platform
                </Link>
              </li>
              <li>
                <Link href="/about#guidelines" className="hover:text-[#4F9CF9] transition-colors">
                  Exhibition Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#152238] uppercase tracking-wider">
              Key Disciplines
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.slice(0, 5).map(cat => (
                <li key={cat}>
                  <Link
                    href={`/projects?category=${encodeURIComponent(cat)}`}
                    className="hover:text-[#4F9CF9] transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academic & Open Source */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#152238] uppercase tracking-wider">
              Student Community
            </h4>
            <p className="text-xs text-[#66758A] leading-relaxed">
              Open to undergraduate and graduate creators in software, hardware, AI, and design.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#FAFDFE] border border-[#E3ECF5] flex items-center justify-center text-[#66758A] hover:text-[#152238] hover:border-[#4F9CF9] transition-colors"
                aria-label="GitHub Community"
              >
                <Github className="w-4 h-4" />
              </a>
              <Link
                href="/about"
                className="w-8 h-8 rounded-lg bg-[#FAFDFE] border border-[#E3ECF5] flex items-center justify-center text-[#66758A] hover:text-[#152238] hover:border-[#4F9CF9] transition-colors"
                aria-label="Platform Documentation"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[#E3ECF5] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#66758A]">
          <p>© {new Date().getFullYear()} ProjectSpace. Empowering student creators worldwide.</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-[#152238] transition-colors">Terms of Showcase</Link>
            <span>·</span>
            <Link href="/about" className="hover:text-[#152238] transition-colors">Privacy & Integrity</Link>
            <span>·</span>
            <Link href="/about" className="hover:text-[#152238] transition-colors">Faculty Inquiries</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
