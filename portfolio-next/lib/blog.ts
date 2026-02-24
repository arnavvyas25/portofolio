/**
 * Blog Utilities
 *
 * Functions for reading and processing MDX blog posts.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { BlogPostMeta, BlogPost } from './types';
import { calculateReadingTime } from './utils';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

/**
 * Gets all blog post metadata.
 */
export async function getAllBlogPosts(): Promise<BlogPostMeta[]> {
  // Ensure directory exists
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);
  const posts = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace('.mdx', '');
      const filePath = path.join(BLOG_DIR, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        description: data.description || '',
        date: data.date || new Date().toISOString(),
        author: data.author || 'Arnav Vyas',
        tags: data.tags || [],
        readingTime: calculateReadingTime(content),
        published: data.published !== false,
      } as BlogPostMeta;
    })
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

/**
 * Gets a single blog post by slug.
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || slug,
    description: data.description || '',
    date: data.date || new Date().toISOString(),
    author: data.author || 'Arnav Vyas',
    tags: data.tags || [],
    readingTime: calculateReadingTime(content),
    published: data.published !== false,
    content,
  };
}

/**
 * Gets all unique tags from blog posts.
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllBlogPosts();
  const tagSet = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}
