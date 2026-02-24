/**
 * BlogCard Component
 *
 * Card component for displaying blog post previews.
 */

import Link from 'next/link';
import type { BlogPostMeta } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPostMeta;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group rounded-xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg">
      {/* Date and Reading Time */}
      <div className="mb-3 flex items-center gap-3 text-sm text-neutral-500">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>·</span>
        <span>{post.readingTime}</span>
      </div>

      {/* Title */}
      <Link href={`/blog/${post.slug}`}>
        <h3 className="text-xl font-bold text-neutral-900 transition-colors group-hover:text-primary-600">
          {post.title}
        </h3>
      </Link>

      {/* Description */}
      <p className="mt-2 text-neutral-600 line-clamp-3">{post.description}</p>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Read More Link */}
      <Link
        href={`/blog/${post.slug}`}
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-600 transition-colors hover:text-primary-700"
      >
        Read more
        <svg
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </Link>
    </article>
  );
}
