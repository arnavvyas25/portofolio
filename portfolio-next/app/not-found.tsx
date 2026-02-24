/**
 * Not Found Page
 *
 * Custom 404 page for better UX.
 */

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-neutral-200">404</h1>
        <h2 className="mt-4 text-2xl font-bold text-neutral-900">
          Page Not Found
        </h2>
        <p className="mt-2 text-neutral-600">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/" className="btn-primary">
            Go Home
          </Link>
          <Link href="/contact" className="btn-secondary">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
