/**
 * ExperienceTimeline Component
 *
 * Displays work and education experience in a timeline format.
 */

import type { Experience, Education } from '@/lib/types';

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <div className="relative space-y-8 pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-neutral-200">
      {experiences.map((exp) => (
        <div key={exp.id} className="relative">
          {/* Timeline dot */}
          <div className="absolute -left-8 top-0 flex h-4 w-4 -translate-x-1/2 items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-primary-500" />
          </div>

          {/* Content */}
          <div className="rounded-xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:border-primary-200 hover:shadow-md">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                {exp.startDate} - {exp.endDate}
              </span>
            </div>

            <h3 className="text-lg font-bold text-neutral-900">{exp.title}</h3>
            <p className="mt-1 text-sm font-medium text-primary-600">
              {exp.company} · {exp.location}
            </p>

            <p className="mt-3 text-sm text-neutral-600">{exp.description}</p>

            {/* Responsibilities */}
            <ul className="mt-4 space-y-2">
              {exp.responsibilities.map((item, index) => (
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            {/* Tech Stack */}
            {exp.techStack && exp.techStack.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {exp.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

interface EducationTimelineProps {
  education: Education[];
}

export function EducationTimeline({ education }: EducationTimelineProps) {
  return (
    <div className="space-y-6">
      {education.map((edu) => (
        <div
          key={edu.id}
          className="rounded-xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:border-primary-200 hover:shadow-md"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-neutral-900">
                {edu.degree} in {edu.field}
              </h3>
              <p className="mt-1 text-sm font-medium text-primary-600">
                {edu.institution}
              </p>
              <p className="mt-1 text-sm text-neutral-500">
                {edu.location} · {edu.startDate} - {edu.endDate}
              </p>
            </div>
            {edu.gpa && (
              <span className="rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700">
                GPA: {edu.gpa}
              </span>
            )}
          </div>

          {/* Highlights */}
          {edu.highlights && edu.highlights.length > 0 && (
            <ul className="mt-4 space-y-2">
              {edu.highlights.map((item, index) => (
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
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
