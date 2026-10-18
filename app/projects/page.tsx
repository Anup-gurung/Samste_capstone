import { Suspense } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ProjectExplorer } from '@/components/projects/project-explorer';

export const metadata = {
  title: 'Explore Projects — ProjectSpace',
  description: 'Browse student software applications, machine learning tools, mobile apps, and research innovations.',
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFDFE]">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={
          <div className="max-w-7xl mx-auto px-4 py-16 text-center text-xs text-[#66758A]">
            Loading student projects...
          </div>
        }>
          <ProjectExplorer />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
