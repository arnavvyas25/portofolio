/**
 * ProjectCard Component
 *
 * Card component for displaying project information.
 * Server component for optimal performance.
 */

import Link from 'next/link';
import type { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group rounded-xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg">
      {/* Category Badge */}
      <div className="mb-4">
        <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
          {formatCategory(project.category)}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-neutral-900 transition-colors group-hover:text-primary-600">
        {project.title}
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm text-neutral-600">{project.description}</p>

      {/* Tech Stack */}
      <div className="mt-4 flex flex-wrap gap-2">
        {project.techStack.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600"
          >
            {tech}
          </span>
        ))}
        {project.techStack.length > 4 && (
          <span className="rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-500">
            +{project.techStack.length - 4} more
          </span>
        )}
      </div>

      {/* Links */}
      <div className="mt-6 flex items-center gap-4">
        <Link
          href={`/blog/${project.slug}`}
          className="flex items-center gap-1.5 text-sm font-medium text-primary-600 transition-colors hover:text-primary-700"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Read More
        </Link>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-neutral-600 transition-colors hover:text-primary-600"
            aria-label={`View ${project.title} on GitHub`}
          >
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            GitHub
          </a>
        )}
      </div>
    </article>
  );
}

// Helper function to format category for display
function formatCategory(category: string): string {
  return category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
