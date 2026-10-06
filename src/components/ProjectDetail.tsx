'use client';

import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { projects, ui } from '@/data/content';
import ProjectCover from './ProjectCover';

const ease = [0.19, 1, 0.22, 1] as const;
const pad = (n: number) => String(n).padStart(2, '0');

interface DetailProps {
  id: string | null;
  onClose: () => void;
  onOpen: (id: string) => void;
}

export default function ProjectDetail({ id, onClose, onOpen }: DetailProps) {
  const { lang } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const index = projects.findIndex((p) => p.id === id);
  const p = index >= 0 ? projects[index] : null;
  const next = projects[(index + 1) % projects.length];

  useEffect(() => {
    if (!p) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    scrollRef.current?.scrollTo({ top: 0 });
    return () => window.removeEventListener('keydown', onKey);
  }, [p, onClose]);

  return (
    <AnimatePresence>
      {p && (
        <motion.div
          key="detail"
          className="fixed inset-0 z-50 bg-black"
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.9, ease }}
          role="dialog"
          aria-modal="true"
          aria-label={p.title}
        >
          <div ref={scrollRef} className="scrollbar-none h-full overflow-y-auto">
            <div className="sticky top-0 z-10 flex items-start justify-between bg-gradient-to-b from-black via-black/80 to-transparent px-5 pb-10 pt-5 s:px-10 s:pt-8">
              <span className="opacity-50">
                {pad(index + 1)} / {pad(projects.length)} — {p.category}
              </span>
              <button onClick={onClose} className="group flex items-center gap-2" autoFocus>
                {ui.close[lang]}
                <span className="inline-flex size-7 items-center justify-center rounded-full bg-white text-black transition-transform duration-500 ease-expo group-hover:rotate-90">
                  ×
                </span>
              </button>
            </div>

            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.25, ease }}
              className="grid gap-10 px-5 pb-16 s:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] s:gap-16 s:px-10"
            >
              <div className="s:sticky s:top-24 s:self-start">
                <div className="aspect-[4/5] overflow-hidden rounded-[20px]">
                  <ProjectCover id={p.id} className="h-full w-full" />
                </div>
              </div>

              <div className="s:pt-4">
                <h1 className="text-[clamp(44px,7vw,120px)] font-normal leading-[0.9] tracking-tightest">{p.title}</h1>
                {p.award && <p className="mt-5 inline-block rounded-full bg-white px-3 py-1 text-[12px] text-black">{p.award[lang]}</p>}
                <p className="mt-8 max-w-[34ch] text-[clamp(20px,1.8vw,26px)] leading-[1.25] tracking-snug">{p.shortDesc[lang]}</p>

                {p.longDesc && (
                  <section className="mt-14 border-t border-white/15 pt-6">
                    <h2 className="mb-4 text-[12px] opacity-50">{ui.overview[lang]}</h2>
                    <p className="max-w-[62ch] leading-[1.6] opacity-75">{p.longDesc[lang]}</p>
                  </section>
                )}

                {p.metrics && (
                  <section className="mt-14 border-t border-white/15 pt-6">
                    <h2 className="mb-6 text-[12px] opacity-50">{ui.metrics[lang]}</h2>
                    <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
                      {p.metrics.map((m) => (
                        <div key={m.label.en}>
                          <dd className="text-[clamp(24px,2.4vw,36px)] leading-none tracking-tightest">{m.value}</dd>
                          <dt className="mt-2 opacity-50">{m.label[lang]}</dt>
                        </div>
                      ))}
                    </dl>
                  </section>
                )}

                <section className="mt-14 border-t border-white/15 pt-6">
                  <h2 className="mb-4 text-[12px] opacity-50">{ui.stack[lang]}</h2>
                  <ul className="flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <li key={t} className="rounded-full border border-white/20 px-3 py-1">{t}</li>
                    ))}
                  </ul>
                </section>

                <section className="mt-14 border-t border-white/15 pt-6">
                  <h2 className="mb-4 text-[12px] opacity-50">{ui.links[lang]}</h2>
                  {p.demoUrl || p.githubUrl ? (
                    <div className="flex flex-wrap gap-2">
                      {p.demoUrl && (
                        <a href={p.demoUrl} target="_blank" rel="noreferrer" className="rounded-full bg-white px-4 py-2 text-black transition-opacity hover:opacity-80">
                          {ui.live[lang]} ↗
                        </a>
                      )}
                      {p.githubUrl && (
                        <a href={p.githubUrl} target="_blank" rel="noreferrer" className="rounded-full border border-white/25 px-4 py-2 transition-colors hover:border-white">
                          {ui.source[lang]} ↗
                        </a>
                      )}
                    </div>
                  ) : (
                    <p className="opacity-50">{ui.noLinks[lang]}</p>
                  )}
                </section>
              </div>
            </motion.div>

            <button
              onClick={() => onOpen(next.id)}
              data-cursor="view"
              className="group block w-full border-t border-white/15 px-5 pb-16 pt-8 text-left s:px-10 s:pb-24"
            >
              <span className="opacity-50">{ui.next[lang]}</span>
              <span className="mt-3 flex items-end justify-between gap-6">
                <span className="text-[clamp(40px,8vw,140px)] leading-[0.9] tracking-tightest transition-opacity duration-500 group-hover:opacity-60">
                  {next.title}
                </span>
                <span className="mb-2 hidden h-28 w-[5.6rem] flex-none overflow-hidden rounded-[12px] s:block">
                  <ProjectCover id={next.id} className="h-full w-full transition-transform duration-700 ease-expo group-hover:scale-110" />
                </span>
              </span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
