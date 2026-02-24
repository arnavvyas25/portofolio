'use client';

/**
 * Work Page - Streamlined
 */

import { useState, useMemo } from 'react';
import PageHeader from '@/components/PageHeader';
import ProjectCard from '@/components/ProjectCard';
import ProjectFilter from '@/components/ProjectFilter';
import { projects } from '@/lib/data';

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <>
      <PageHeader
        title="Work"
        description="Selected projects across pharma R&D, healthcare analytics, and ML systems."
      />

      <section className="section-padding">
        <div className="container-custom">
          <ProjectFilter
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          <div className="grid gap-6 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <p className="py-12 text-center text-neutral-500">
              No projects in this category.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
