/**
 * Contact Page - Streamlined
 */

import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Arnav Vyas for ML engineering roles or collaborations.',
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact"
        description="Seeking ML engineering roles. Let's talk."
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-xl">
            <div className="rounded-xl border border-neutral-200 bg-white p-8">
              <ContactForm />
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
              <a
                href="mailto:vyas31@purdue.edu"
                className="text-primary-600 hover:underline"
              >
                vyas31@purdue.edu
              </a>
              <a
                href="https://linkedin.com/in/arnavvyas"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/arnavvyas"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
