/**
 * Home Page - Streamlined
 */

import Link from 'next/link';
import Hero from '@/components/Hero';
import SectionWrapper from '@/components/SectionWrapper';
import ProjectCard from '@/components/ProjectCard';
import { getFeaturedProjects } from '@/lib/data';

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <Hero />

      {/* Featured Work */}
      <SectionWrapper>
        <h2 className="mb-8 text-center text-2xl font-bold text-neutral-900">
          Featured Work
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.slice(0, 4).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/projects" className="btn-secondary">
            View All Work →
          </Link>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper className="bg-gradient-to-br from-primary-600 to-primary-700">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">Let&apos;s Connect</h2>
          <p className="mx-auto mt-2 max-w-lg text-primary-100">
            Seeking ML engineering and applied AI roles.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-lg bg-white px-5 py-2.5 font-medium text-primary-600 hover:bg-primary-50"
            >
              Get in Touch
            </Link>
            <a
              href="mailto:vyas31@purdue.edu"
              className="rounded-lg border border-white/30 px-5 py-2.5 font-medium text-white hover:bg-white/10"
            >
              vyas31@purdue.edu
            </a>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
