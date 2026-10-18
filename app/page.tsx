import { Navbar } from '@/components/layout/navbar';
import { Hero } from '@/components/home/hero';
import { Statistics } from '@/components/home/statistics';
import { FeaturedProjects } from '@/components/home/featured-projects';
import { HowItWorks } from '@/components/home/how-it-works';
import { StudentCreators } from '@/components/home/student-creators';
import { CtaSection } from '@/components/home/cta-section';
import { Footer } from '@/components/layout/footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFDFE]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Statistics />
        <FeaturedProjects />
        <HowItWorks />
        <StudentCreators />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
