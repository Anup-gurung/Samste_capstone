import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Layers, Sparkles, BookOpen, Users, ShieldCheck, Heart, Award, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About ProjectSpace — Student Exhibition Platform',
  description: 'Learn about the mission behind ProjectSpace and how we celebrate student technical innovation, engineering capstones, and creative research.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFDFE]">
      <Navbar />
      <main className="flex-1 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Hero Header */}
          <div className="text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4F9CF9] bg-[#EAF4FF] px-3 py-1 rounded-full border border-[#8AC7FF]/30 inline-block">
              Our Academic Mission
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#152238] tracking-tight">
              Giving Great Student Work a Permanent Stage
            </h1>
            <p className="text-base sm:text-lg text-[#66758A] max-w-2xl mx-auto leading-relaxed">
              Every semester, thousands of remarkable software applications, machine learning tools, and physical computing prototypes are finished for grading—only to languish in forgotten private repositories. ProjectSpace is here to change that.
            </p>
          </div>

          {/* Core Values 3-Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#E3ECF5] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF4FF] text-[#4F9CF9] flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#152238]">Celebration of Effort</h3>
              <p className="text-xs text-[#66758A] leading-relaxed">
                We believe capstone projects and semester prototypes represent months of grit, late nights, and creative problem-solving worthy of public recognition.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E3ECF5] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF4FF] text-[#4F9CF9] flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#152238]">Interdisciplinary Teaming</h3>
              <p className="text-xs text-[#66758A] leading-relaxed">
                Connecting computer scientists, designers, mechanical engineers, and domain researchers to create holistic, production-grade systems.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E3ECF5] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF4FF] text-[#4F9CF9] flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#152238]">Open Pedagogical Resource</h3>
              <p className="text-xs text-[#66758A] leading-relaxed">
                Incoming students can study architectural approaches, code repositories, and lessons learned by senior cohorts, accelerating collective knowledge.
              </p>
            </div>
          </div>

          {/* Exhibition Guidelines Section */}
          <section id="guidelines" className="p-8 rounded-3xl bg-white border border-[#E3ECF5] space-y-6">
            <h2 className="text-2xl font-bold text-[#152238] tracking-tight">
              Exhibition Guidelines for Students & Mentors
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-[#66758A]">
              <div className="p-4 rounded-xl bg-[#FAFDFE] border border-[#E3ECF5] space-y-1">
                <div className="font-bold text-[#152238]">1. Authentic Authorship</div>
                <p>All projects showcased on ProjectSpace must be created by enrolled students as coursework, research, hackathon submissions, or extracurricular initiatives.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAFDFE] border border-[#E3ECF5] space-y-1">
                <div className="font-bold text-[#152238]">2. Transparent Technical Attribution</div>
                <p>Clearly distinguish team member responsibilities, open-source libraries utilized, and dataset citations to uphold academic integrity.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAFDFE] border border-[#E3ECF5] space-y-1">
                <div className="font-bold text-[#152238]">3. Live or Verifiable Proof</div>
                <p>Whenever feasible, provide a live demo URL, interactive prototype sandbox, or accessible code repository so visitors can inspect the real implementation.</p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-[#66758A]">Have questions about showcasing your capstone?</span>
              <Link
                href="/projects"
                className="px-4 py-2 bg-[#4F9CF9] text-white text-xs font-semibold rounded-xl hover:bg-[#3A87E4] transition-colors"
              >
                Browse Projects
              </Link>
            </div>
          </section>

          {/* Frequently Asked Questions */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-[#152238] tracking-tight text-center">
              Frequently Asked Questions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-[#E3ECF5] space-y-2">
                <h3 className="text-sm font-bold text-[#152238]">Who can submit a project?</h3>
                <p className="text-xs text-[#66758A] leading-relaxed">
                  Any enrolled undergraduate or graduate student, as well as alumni who completed projects during their degree programme.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E3ECF5] space-y-2">
                <h3 className="text-sm font-bold text-[#152238]">Does it cost anything to be featured?</h3>
                <p className="text-xs text-[#66758A] leading-relaxed">
                  No. ProjectSpace is a 100% free, community-curated academic exhibition platform.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E3ECF5] space-y-2">
                <h3 className="text-sm font-bold text-[#152238]">What project formats are accepted?</h3>
                <p className="text-xs text-[#66758A] leading-relaxed">
                  Web apps, mobile apps, AI/ML models, IoT firmware, computer vision tools, UI/UX case studies, and scientific research datasets.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E3ECF5] space-y-2">
                <h3 className="text-sm font-bold text-[#152238]">How do faculty members participate?</h3>
                <p className="text-xs text-[#66758A] leading-relaxed">
                  Professors can endorse course capstones, recommend student honors theses, and reference past project architectures in current syllabi.
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}
