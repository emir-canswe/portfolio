'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const DURATION = 1300;
const ease = [0.76, 0, 0.24, 1] as const;
const NAME = 'Emircan Can';

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const barRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setVisible(false);
      doneRef.current();
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (barRef.current) barRef.current.style.transform = `scaleX(${eased})`;
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setVisible(false);
        // Let the curtain start lifting before the page animates in underneath.
        window.setTimeout(() => doneRef.current(), 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[99] flex flex-col justify-end bg-black px-5 py-5 s:px-10 s:py-8"
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 1, ease }}
        >
          <div className="flex items-end justify-between gap-6">
            <span className="flex overflow-hidden text-[clamp(28px,5vw,64px)] leading-[1] tracking-tightest">
              {NAME.split('').map((ch, i) => (
                <motion.span
                  key={i}
                  className="inline-block whitespace-pre"
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.9, delay: 0.05 + i * 0.035, ease: [0.19, 1, 0.22, 1] }}
                >
                  {ch}
                </motion.span>
              ))}
            </span>
            <span className="text-[clamp(28px,5vw,64px)] leading-[1] tracking-tightest tabular-nums opacity-40">
              {String(count).padStart(3, '0')}
            </span>
          </div>
          <div className="mt-4 h-px w-full bg-white/15">
            <div ref={barRef} className="h-full origin-left bg-white" style={{ transform: 'scaleX(0)' }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
