import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { getProjectBySlug, getRelatedProjects, getAllProjects } from '@/lib/projects';
import { ProjectDetailView } from '@/components/projects/project-detail-view';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: 'Project Not Found — ProjectSpace' };
  }
  return {
    title: `${project.title} — ProjectSpace Student Showcase`,
    description: project.shortDescription,
  };
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map(p => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(project.slug, project.category, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFDFE]">
      <Navbar />
      <main className="flex-1">
        <ProjectDetailView project={project} relatedProjects={relatedProjects} />
      </main>
      <Footer />
    </div>
  );
}
