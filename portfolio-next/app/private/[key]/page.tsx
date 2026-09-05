/**
 * Fantasy draft console — unlisted.
 *
 * Reachable only at /private/<DRAFT_KEY>, where DRAFT_KEY is an environment
 * variable set in the hosting dashboard and never committed. Any other value
 * renders the site's ordinary 404, so the route is indistinguishable from a
 * typo to anyone who does not already know the key.
 *
 * Three things keep it off the open internet:
 *   1. the key check below, which runs on the server before any board data is
 *      serialised into the response;
 *   2. `robots: noindex, nofollow` on this page, plus the site's existing
 *      robots.txt rule disallowing /private/ (no change was needed there);
 *   3. the board itself living in `content/`, not `public/` — files under
 *      `public/` are served verbatim at a guessable URL with no access check,
 *      which would defeat the point of gating the page.
 *
 * Nothing outside this directory is modified. The console renders as a
 * fixed-position overlay so it covers the site chrome without the root layout
 * needing to know it exists.
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import bundle from '@/content/draft/draft-bundle.json';
import DraftConsole from './DraftConsole';
import type { Bundle } from './types';

// Rendered on demand rather than prerendered: the key is compared against an
// environment variable at request time, and there is no set of params worth
// baking at build time.
export const dynamicParams = true;
export const revalidate = 0;

/**
 * Metadata is generated per request so that a wrong key gives nothing away.
 * A module-level `metadata` export is applied before the component runs, so
 * the 404 returned for a bad guess would still have carried the title
 * "Draft" — enough to tell someone probing /private/* that they had found
 * the right prefix and only needed the suffix.
 */
export async function generateMetadata({
  params,
}: {
  params: { key: string };
}): Promise<Metadata> {
  const authorised = Boolean(process.env.DRAFT_KEY) && params.key === process.env.DRAFT_KEY;
  return {
    title: authorised ? 'Draft' : 'Not Found',
    robots: { index: false, follow: false, nocache: true },
  };
}

export default function DraftPage({ params }: { params: { key: string } }) {
  const expected = process.env.DRAFT_KEY;

  // An unset key disables the route rather than opening it. Failing closed
  // matters more than convenience here: a misconfigured deploy should look
  // like the page was never added.
  if (!expected || params.key !== expected) {
    notFound();
  }

  return <DraftConsole bundle={bundle as unknown as Bundle} />;
}
