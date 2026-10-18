'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { Search, Plus, Menu, X } from 'lucide-react';
import { SubmissionModal } from '@/components/projects/submission-modal';
import logoImage from '@/src/assets/images/logo-sce.png';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navRef = useRef<HTMLElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);

  // GSAP entrance animation for navbar
  useGSAP(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }
      );
    }
  }, { scope: navRef });

  // GSAP animation for mobile menu drawer
  const toggleMobileMenu = () => {
    if (!mobileMenuOpen) {
      setMobileMenuOpen(true);
      setTimeout(() => {
        if (mobileDrawerRef.current) {
          gsap.fromTo(
            mobileDrawerRef.current,
            { y: -16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }
          );
        }
      }, 10);
    } else {
      if (mobileDrawerRef.current) {
        gsap.to(mobileDrawerRef.current, {
          y: -16,
          opacity: 0,
          duration: 0.25,
          ease: 'power2.in',
          onComplete: () => setMobileMenuOpen(false),
        });
      } else {
        setMobileMenuOpen(false);
      }
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/projects?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Explore Projects', href: '/projects' },
    { name: 'Categories', href: '/projects#categories' },
    { name: 'About', href: '/about' },
  ];

  return (
    <>
      <header
        ref={navRef}
        className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E3ECF5] transition-all"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Distinctive Logo Mark & Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-[#152238] whitespace-nowrap shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F9CF9] rounded-lg"
          >
            <div className="relative w-9 h-9 overflow-hidden rounded-xl bg-white shadow-sm shadow-[#4F9CF9]/20 transition-transform group-hover:scale-105">
              <Image
                src={logoImage}
                alt="ProjectSpace logo"
                fill
                priority
                sizes="36px"
                className="object-cover"
              />
            </div>
            <span className="text-xl font-extrabold text-[#152238] tracking-tight">
              Capstone<span className="text-[#4F9CF9]">Project</span>
            </span>
          </Link>

          {/* Zone 2: 4 Clean Single-Line Text Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#66758A]">
            {navLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 hover:text-[#152238] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F9CF9] rounded-md ${
                    isActive ? 'text-[#4F9CF9] font-semibold' : ''
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4F9CF9] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Search & Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Button / Bar */}
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search projects or skills..."
                  className="w-48 sm:w-64 pl-8 pr-7 py-1.5 text-xs bg-[#FAFDFE] border border-[#4F9CF9] rounded-xl text-[#152238] placeholder:text-[#66758A]/60 focus:outline-none focus:ring-2 focus:ring-[#4F9CF9]/20"
                />
                <Search className="w-3.5 h-3.5 text-[#4F9CF9] absolute left-2.5 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-2 text-[#66758A] hover:text-[#152238] text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search projects"
                className="p-2 text-[#66758A] hover:text-[#152238] hover:bg-[#FAFDFE] rounded-xl transition-colors border border-transparent hover:border-[#E3ECF5]"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            {/* Submit Project CTA */}
            <button
              type="button"
              onClick={() => setIsSubmitOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#4F9CF9] hover:bg-[#3A87E4] active:scale-[0.98] rounded-xl shadow-sm shadow-[#4F9CF9]/25 transition-all whitespace-nowrap shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Submit Project</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              className="md:hidden p-2 text-[#66758A] hover:text-[#152238] rounded-xl hover:bg-[#FAFDFE] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            ref={mobileDrawerRef}
            className="md:hidden border-t border-[#E3ECF5] bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'bg-[#EAF4FF] text-[#4F9CF9] font-semibold'
                      : 'text-[#152238] hover:bg-[#FAFDFE]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-[#E3ECF5] flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsSubmitOpen(true);
                }}
                className="w-full py-2.5 px-4 text-xs font-semibold text-center text-white bg-[#4F9CF9] rounded-xl shadow-sm flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Submit Project</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Submission Modal */}
      <SubmissionModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        onProjectCreated={() => {
          // If on project discovery page, trigger refresh
          if (pathname === '/projects') {
            window.location.reload();
          }
        }}
      />
    </>
  );
}
