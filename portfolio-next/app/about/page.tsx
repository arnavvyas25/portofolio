/**
 * About Page - Streamlined
 */

import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import SectionWrapper from '@/components/SectionWrapper';
import SkillsSection from '@/components/SkillsSection';
import { ExperienceTimeline, EducationTimeline } from '@/components/ExperienceTimeline';
import { skillCategories, experiences, education } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Applied AI Engineer with three years of Fortune 500 data science experience across healthcare, pharmaceutical R&D, and enterprise ML.',
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About"
        description="Three years of client-facing data science at Viasat, Merck, and Elevance Health. Shipping ML systems from research to production."
      />

      {/* Experience */}
      <SectionWrapper>
        <h2 className="mb-6 text-xl font-bold text-neutral-900">Experience</h2>
        <ExperienceTimeline experiences={experiences} />
      </SectionWrapper>

      {/* Skills */}
      <SectionWrapper className="bg-neutral-50">
        <h2 className="mb-6 text-xl font-bold text-neutral-900">Skills</h2>
        <SkillsSection categories={skillCategories} />
      </SectionWrapper>

      {/* Education */}
      <SectionWrapper>
        <h2 className="mb-6 text-xl font-bold text-neutral-900">Education</h2>
        <EducationTimeline education={education} />
      </SectionWrapper>
    </>
  );
}
