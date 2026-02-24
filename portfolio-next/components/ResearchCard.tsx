/**
 * ResearchCard Component
 *
 * Card component for displaying research publications and experiences.
 */

import type { Publication, ResearchExperience } from '@/lib/types';

interface PublicationCardProps {
  publication: Publication;
}

export function PublicationCard({ publication }: PublicationCardProps) {
  return (
    <article className="rounded-xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:border-primary-200 hover:shadow-md">
      {/* Year Badge */}
      <div className="mb-3">
        <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
          {publication.year}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-neutral-900">
        {publication.title}
      </h3>

      {/* Authors */}
      <p className="mt-2 text-sm text-neutral-600">
        {publication.authors.join(', ')}
      </p>

      {/* Venue */}
      {(publication.journal || publication.conference) && (
        <p className="mt-1 text-sm italic text-neutral-500">
          {publication.journal || publication.conference}
        </p>
      )}

      {/* Abstract */}
      {publication.abstract && (
        <p className="mt-3 text-sm text-neutral-600 line-clamp-3">
          {publication.abstract}
        </p>
      )}

      {/* Links */}
      <div className="mt-4 flex items-center gap-4">
        {publication.paperUrl && (
          <a
            href={publication.paperUrl}
            target="_blank"
            rel="noopener noreferrer"
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
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            View Paper
          </a>
        )}
        {publication.doi && (
          <a
            href={`https://doi.org/${publication.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-neutral-600 transition-colors hover:text-primary-600"
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
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            DOI
          </a>
        )}
      </div>
    </article>
  );
}

interface ResearchExperienceCardProps {
  experience: ResearchExperience;
}

export function ResearchExperienceCard({
  experience,
}: ResearchExperienceCardProps) {
  return (
    <article className="relative rounded-xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:border-primary-200 hover:shadow-md">
      {/* Duration Badge */}
      <div className="mb-3">
        <span className="inline-block rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
          {experience.duration}
        </span>
      </div>

      {/* Title & Institution */}
      <h3 className="text-lg font-bold text-neutral-900">{experience.title}</h3>
      <p className="mt-1 text-sm font-medium text-primary-600">
        {experience.institution}
      </p>

      {/* Description */}
      <p className="mt-3 text-sm text-neutral-600">{experience.description}</p>

      {/* Highlights */}
      {experience.highlights && experience.highlights.length > 0 && (
        <ul className="mt-4 space-y-2">
          {experience.highlights.map((highlight, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-neutral-600"
            >
              <svg
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {highlight}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
