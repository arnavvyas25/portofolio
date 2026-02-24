import type { MDXComponents } from 'mdx/types';

/**
 * MDX Component Customization
 * 
 * This file allows customizing how MDX elements are rendered.
 * Useful for styling markdown content consistently across the site.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings with proper styling
    h1: ({ children }) => (
      <h1 className="mb-6 mt-8 text-4xl font-bold tracking-tight text-neutral-900">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-8 text-3xl font-bold tracking-tight text-neutral-900">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-6 text-2xl font-semibold text-neutral-900">
        {children}
      </h3>
    ),
    // Paragraph styling
    p: ({ children }) => (
      <p className="mb-4 leading-relaxed text-neutral-700">{children}</p>
    ),
    // Link styling
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-primary-600 underline decoration-primary-300 underline-offset-2 transition-colors hover:text-primary-700 hover:decoration-primary-500"
      >
        {children}
      </a>
    ),
    // Code block styling
    code: ({ children }) => (
      <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm text-neutral-800">
        {children}
      </code>
    ),
    // Pre block styling
    pre: ({ children }) => (
      <pre className="my-4 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100">
        {children}
      </pre>
    ),
    // List styling
    ul: ({ children }) => (
      <ul className="mb-4 ml-6 list-disc space-y-2 text-neutral-700">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-2 text-neutral-700">
        {children}
      </ol>
    ),
    // Blockquote styling
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-primary-500 bg-primary-50 py-2 pl-4 italic text-neutral-700">
        {children}
      </blockquote>
    ),
    ...components,
  };
}
