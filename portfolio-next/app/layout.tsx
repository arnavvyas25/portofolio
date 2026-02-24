/**
 * Root Layout
 *
 * The root layout component that wraps all pages.
 * Includes global styles, fonts, and persistent UI elements.
 */

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { siteMetadata } from '@/lib/data';
import '@/styles/globals.css';

// Load Inter font with variable font support
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Site metadata for SEO
export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: `${siteMetadata.title} | Applied AI Engineer`,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  keywords: [
    'Applied AI Engineer',
    'Machine Learning Engineer',
    'Healthcare Machine Learning',
    'ML Systems Engineering',
    'Cost-of-Care Modeling',
    'Pharmaceutical Data Science',
    'Python',
    'Production ML',
    'Healthcare Analytics',
    'Data Mine Purdue',
  ],
  authors: [{ name: siteMetadata.author }],
  creator: siteMetadata.author,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteMetadata.siteUrl,
    title: `${siteMetadata.title} | Applied AI Engineer`,
    description: siteMetadata.description,
    siteName: siteMetadata.title,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteMetadata.title} | Applied AI Engineer`,
    description: siteMetadata.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Viewport configuration
export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col bg-white antialiased">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>

        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        <main id="main-content" className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
