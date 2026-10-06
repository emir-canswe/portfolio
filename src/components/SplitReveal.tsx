'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SplitRevealProps {
  text: string;
  as?: 'p' | 'h1' | 'h2' | 'span';
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  /** Animate when scrolled into view instead of on mount. */
  inView?: boolean;
  /** When false (and not inView), words stay hidden until it flips to true. */
  play?: boolean;
}

const ease = [0.19, 1, 0.22, 1] as const;

// Each word rises out of its own mask, staggered.
export default function SplitReveal({
  text,
  as: Tag = 'p',
  className,
  delay = 0,
  stagger = 0.03,
  duration = 1.1,
  inView = false,
  play = true,
}: SplitRevealProps) {
  const words = text.split(' ');
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const word = {
    hidden: { y: '110%' },
    show: { y: '0%', transition: { duration, ease } },
  };

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        key={text}
        className="block"
        aria-hidden="true"
        variants={container}
        initial="hidden"
        animate={inView ? undefined : play ? 'show' : 'hidden'}
        whileInView={inView ? 'show' : undefined}
        viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      >
        {words.map((w, i) => (
          <React.Fragment key={i}>
            <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-top">
              <motion.span className="inline-block will-change-transform" variants={word}>
                {w}
              </motion.span>
            </span>
            {i < words.length - 1 && ' '}
          </React.Fragment>
        ))}
      </motion.span>
    </Tag>
  );
}
