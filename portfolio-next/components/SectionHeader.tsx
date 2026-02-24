/**
 * SectionHeader Component
 *
 * Consistent header for page sections with title and optional description.
 */

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export default function SectionHeader({
  title,
  description,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 text-center ${className}`}>
      <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
          {description}
        </p>
      )}
    </div>
  );
}
