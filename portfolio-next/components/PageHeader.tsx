/**
 * PageHeader Component
 *
 * Consistent header for internal pages.
 */

interface PageHeaderProps {
  title: string;
  description?: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="border-b border-neutral-200 bg-neutral-50 pt-24 pb-12 md:pt-28 md:pb-16">
      <div className="container-custom">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg text-neutral-600">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
