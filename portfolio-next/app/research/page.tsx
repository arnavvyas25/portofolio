/**
 * Research Page
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import SectionWrapper from '@/components/SectionWrapper';
import { publications, conferencePresentations } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Research',
  description: 'Published research on healthcare ML and neonatal mortality prediction.',
};

export default function ResearchPage() {
  const pub = publications[0];

  return (
    <>
      <PageHeader
        title="Research"
        description="Published work in healthcare machine learning."
      />

      {/* Publication */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-xl font-bold text-neutral-900">Publication</h2>
          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
                  Peer-Reviewed Journal
                </span>
                <h3 className="mt-3 text-lg font-semibold text-neutral-900">
                  {pub?.title}
                </h3>
                <p className="mt-1 text-sm text-neutral-500">
                  {pub?.conference} · {pub?.year}
                </p>
                <p className="mt-3 text-sm text-neutral-600">{pub?.abstract}</p>
              </div>
            </div>
            {pub?.link && (
              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                View Publication →
              </a>
            )}
          </div>
        </div>
      </SectionWrapper>

      {/* Conference Presentations */}
      <SectionWrapper className="bg-neutral-50">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-xl font-bold text-neutral-900">Conference Presentations</h2>
          <div className="space-y-4">
            {conferencePresentations.map((pres) => (
              <div
                key={pres.id}
                className="rounded-lg border border-neutral-200 bg-white p-5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-block rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-700">
                    {pres.presentationType}
                  </span>
                  <span className="inline-block rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700">
                    {pres.role}
                  </span>
                </div>
                <h3 className="mt-3 font-semibold text-neutral-900">
                  {pres.title}
                </h3>
                <p className="mt-1 text-sm text-neutral-500">
                  {pres.conference} · {pres.location} · {pres.year}
                </p>
                {pres.link && (
                  <a
                    href={pres.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
                  >
                    View Abstract →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl text-center">
          <Link href="/contact" className="btn-primary">
            Interested in Collaborating? →
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}
