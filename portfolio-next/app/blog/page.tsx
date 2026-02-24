/**
 * Blog Page - Streamlined
 */

import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import BlogCard from '@/components/BlogCard';
import { getAllBlogPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Technical writing on ML systems and production challenges.',
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <>
      <PageHeader title="Blog" description="Technical writing on ML." />

      <section className="section-padding">
        <div className="container-custom">
          {posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="py-12 text-center text-neutral-500">
              Posts coming soon.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
