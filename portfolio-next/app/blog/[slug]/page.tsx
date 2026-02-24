/**
 * Blog Post Page
 *
 * Dynamic page for individual blog posts.
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllBlogPosts, getBlogPost } from '@/lib/blog';
import { formatDate } from '@/lib/utils';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Article Header */}
      <header className="border-b border-neutral-200 bg-neutral-50 pb-12 pt-24 md:pb-16 md:pt-28">
        <div className="container-custom">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-primary-600"
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
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            Back to Blog
          </Link>

          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-neutral-600">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
            <span>·</span>
            <span>By {post.author}</span>
          </div>

          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Article Content */}
      <article className="section-padding">
        <div className="container-custom">
          <div className="prose prose-lg mx-auto max-w-3xl">
            <MDXRemote source={post.content} />
          </div>
        </div>
      </article>

      {/* Post Footer */}
      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="container-custom py-12">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-lg font-semibold text-neutral-900">
              Thanks for reading!
            </h3>
            <p className="mt-2 text-neutral-600">
              If you found this post helpful, feel free to share it or{' '}
              <Link
                href="/contact"
                className="text-primary-600 hover:text-primary-700"
              >
                get in touch
              </Link>
              .
            </p>
            <Link
              href="/blog"
              className="btn-secondary mt-6 inline-flex items-center"
            >
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
