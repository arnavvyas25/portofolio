/**
 * SkillsSection Component
 *
 * Displays skills organized by category.
 */

import type { SkillCategory } from '@/lib/types';

interface SkillsSectionProps {
  categories: SkillCategory[];
}

export default function SkillsSection({ categories }: SkillsSectionProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {categories.map((category) => (
        <div
          key={category.name}
          className="rounded-xl border border-neutral-200 bg-white p-6"
        >
          <h3 className="mb-4 text-lg font-bold text-neutral-900">
            {category.name}
          </h3>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-lg bg-neutral-100 px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-primary-50 hover:text-primary-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
