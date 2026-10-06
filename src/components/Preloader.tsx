'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { projects } from '@/data/content';
import ProjectCover from './ProjectCover';

const DECK = 1500; // ms spent flipping through covers
const expo = [0.19, 1, 0.22, 1] as const;
const inOut = [0.76, 0, 0.24, 1] as const;
const NAME = 'Emircan Can';
// Flip through in reverse so the flagship project lands last and fills the screen.
const deck = [...projects].reverse();

type Phase = 'deck' | 'expand';

// Opening sequence: covers flip past like a flip-book while the counter runs,
// then the last card swells to fill the screen and lifts away as a curtain.
export default function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(0);
  const [phase, setPhase] = useState<Phase>('deck');
  const [scale, setScale] = useState(1);
  const [visible, setVisible] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;
  const finished = useRef(false);

  useEffect(() => {
    const timers: number[] = [];
    const finish = () => {
      if (finished.current) return;
      finished.current = true;
      setVisible(false);
      timers.push(window.setTimeout(() => doneRef.current(), 200));
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish();
      return;
    }

    const expand = () => {
      const r = cardRef.current?.getBoundingClientRect();
      if (r) setScale(Math.max(window.innerWidth / r.width, window.innerHeight / r.height) * 1.08);
      setPhase('expand');
      timers.push(window.setTimeout(finish, 900));
    };

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      if (finished.current) return;
      const t = Math.min(1, (now - start) / DECK);
      const eased = 1 - Math.pow(1 - t, 2.2);
      setCount(Math.round(eased * 100));
      setCurrent(Math.min(deck.length - 1, Math.floor(eased * deck.length)));
      if (barRef.current) barRef.current.style.transform = `scaleX(${eased})`;
      if (t < 1) raf = requestAnimationFrame(tick);
      else timers.push(window.setTimeout(expand, 180));
    };
    raf = requestAnimationFrame(tick);

    // Any click or key skips the intro.
    const skip = () => finish();
    window.addEventListener('pointerdown', skip);
    window.addEventListener('keydown', skip);
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(window.clearTimeout);
      window.removeEventListener('pointerdown', skip);
      window.removeEventListener('keydown', skip);
    };
  }, []);

  const p = deck[current];
  const fade = { opacity: phase === 'expand' ? 0 : 1, transition: { duration: 0.4 } };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[99] overflow-hidden bg-black"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.95, ease: inOut }}
        >
          {/* Corners */}
          <motion.div animate={fade} className="absolute inset-x-5 top-5 flex justify-between text-[12px] s:inset-x-10 s:top-8 s:text-[14px]">
            <span className="opacity-50">Portfolio ©{new Date().getFullYear()}</span>
            <span className="opacity-50">Malatya, TR</span>
          </motion.div>

          {/* Flip-book deck */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              ref={cardRef}
              className="relative aspect-[4/5] w-[clamp(150px,16vw,230px)] overflow-hidden bg-smoke"
              initial={{ y: 40, opacity: 0, borderRadius: 16 }}
              animate={
                phase === 'expand'
                  ? { y: 0, opacity: 1, scale, borderRadius: 0 }
                  : { y: 0, opacity: 1, scale: 1, borderRadius: 16 }
              }
              transition={phase === 'expand' ? { duration: 0.95, ease: inOut } : { duration: 0.9, ease: expo }}
            >
              {deck.slice(0, current + 1).map((proj) => (
                <motion.div
                  key={proj.id}
                  className="absolute inset-0"
                  initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                  animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                  transition={{ duration: 0.32, ease: expo }}
                >
                  <motion.div className="h-full w-full" initial={{ scale: 1.35 }} animate={{ scale: 1 }} transition={{ duration: 0.6, ease: expo }}>
                    <ProjectCover id={proj.id} className="h-full w-full" />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div animate={fade} className="mt-4 flex h-5 w-[clamp(150px,16vw,230px)] justify-between overflow-hidden text-[12px]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={p.id}
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  exit={{ y: '-100%' }}
                  transition={{ duration: 0.25, ease: expo }}
                >
                  {p.title}
                </motion.span>
              </AnimatePresence>
              <span className="tabular-nums opacity-50">
                {String(projects.indexOf(p) + 1).padStart(2, '0')}/{String(projects.length).padStart(2, '0')}
              </span>
            </motion.div>
          </div>

          {/* Name + counter */}
          <motion.div animate={fade} className="absolute inset-x-5 bottom-5 s:inset-x-10 s:bottom-8">
            <div className="flex items-end justify-between gap-6">
              <span className="flex overflow-hidden text-[clamp(32px,6vw,84px)] leading-[1] tracking-tightest">
                {NAME.split('').map((ch, i) => (
                  <motion.span
                    key={i}
                    className="inline-block whitespace-pre"
                    initial={{ y: '105%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 1, delay: 0.1 + i * 0.04, ease: expo }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
              <span className="text-[clamp(32px,6vw,84px)] leading-[1] tracking-tightest tabular-nums opacity-40">
                {String(count).padStart(3, '0')}
              </span>
            </div>
            <div className="mt-4 h-px w-full bg-white/15">
              <div ref={barRef} className="h-full origin-left bg-white" style={{ transform: 'scaleX(0)' }} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
