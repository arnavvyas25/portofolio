'use client';

/**
 * SectionWrapper Component
 *
 * Consistent section wrapper with optional animation.
 * Provides consistent padding, max-width, and optional scroll-triggered animations.
 */

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  animate?: boolean;
  delay?: number;
}

export default function SectionWrapper({
  children,
  className = '',
  id,
  animate = true,
  delay = 0,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  if (!animate) {
    return (
      <section id={id} className={`section-padding ${className}`}>
        <div className="container-custom">{children}</div>
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className={`section-padding ${className}`}
    >
      <div className="container-custom">{children}</div>
    </motion.section>
  );
}
