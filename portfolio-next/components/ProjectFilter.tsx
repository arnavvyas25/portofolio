'use client';

/**
 * ProjectFilter Component
 *
 * Filter buttons for projects page.
 */

import type { ProjectCategory } from '@/lib/types';

interface ProjectFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters: { label: string; value: string }[] = [
  { label: 'All', value: 'all' },
  { label: 'Machine Learning', value: 'machine-learning' },
  { label: 'Data Science', value: 'data-science' },
  { label: 'Web Development', value: 'web-development' },
  { label: 'Cloud', value: 'cloud' },
  { label: 'Research', value: 'research' },
];

export default function ProjectFilter({
  activeFilter,
  onFilterChange,
}: ProjectFilterProps) {
  return (
    <div className="mb-8 flex flex-wrap justify-center gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
            activeFilter === filter.value
              ? 'bg-primary-600 text-white'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
