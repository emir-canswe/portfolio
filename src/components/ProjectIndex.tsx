'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { experiments, projects, ui } from '@/data/content';
import ProjectCover from './ProjectCover';

const ease = [0.19, 1, 0.22, 1] as const;
const pad = (n: number) => String(n).padStart(2, '0');

export default function ProjectIndex({ onOpen }: { onOpen: (id: string) => void }) {
  const { lang } = useLanguage();
  const [hovered, setHovered] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Preview card trails the pointer with a little lag.
  useEffect(() => {
    const pos = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      pos.tx = e.clientX;
      pos.ty = e.clientY;
    };
    let raf = 0;
    const loop = () => {
      pos.x += (pos.tx - pos.x) * 0.12;
      pos.y += (pos.ty - pos.y) * 0.12;
      if (previewRef.current) {
        previewRef.current.style.transform = `translate3d(${pos.x + 32}px, ${pos.y - 120}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="scrollbar-none h-full overflow-y-auto px-5 pb-32 pt-[96px] s:px-10 s:pt-[28vh]">
      <div className="grid grid-cols-[2.5rem_1fr_auto] gap-x-4 border-b border-white/15 pb-3 text-[12px] opacity-50 s:grid-cols-[4rem_1.2fr_1fr_1.4fr_2rem]">
        <span>{ui.index.no[lang]}</span>
        <span>{ui.index.project[lang]}</span>
        <span className="hidden s:block">{ui.index.category[lang]}</span>
        <span className="hidden s:block">{ui.index.stack[lang]}</span>
        <span className="text-right">{projects.length}</span>
      </div>

      <ul className="index-list" onMouseLeave={() => setHovered(null)}>
        {projects.map((p, i) => (
          <motion.li
            key={p.id}
            className="index-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 + i * 0.04, ease }}
          >
            <button
              onClick={() => onOpen(p.id)}
              onMouseEnter={() => setHovered(p.id)}
              data-cursor="view"
              className="grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline transition-opacity duration-500 ease-expo gap-x-4 border-b border-white/15 py-4 text-left s:grid-cols-[4rem_1.2fr_1fr_1.4fr_2rem] s:py-5"
            >
              <span className="text-[12px] tabular-nums opacity-50">{pad(i + 1)}</span>
              <span className="text-[22px] leading-none tracking-tightest s:text-[clamp(22px,2.4vw,36px)]">{p.title}</span>
              <span className="hidden opacity-60 s:block">{p.category}</span>
              <span className="hidden truncate opacity-60 s:block">{p.tech.slice(0, 3).join(', ')}</span>
              <span className="text-right opacity-60">{p.demoUrl || p.githubUrl ? '↗' : '+'}</span>
            </button>
          </motion.li>
        ))}
      </ul>

      <div className="mt-24 grid gap-6 s:grid-cols-[4rem_1fr] s:gap-x-4">
        <span className="text-[12px] opacity-50">{ui.about.lab[lang]}</span>
        <ul className="grid gap-px overflow-hidden rounded-[16px] bg-white/10 s:grid-cols-3">
          {experiments.map((e) => (
            <li key={e.id} className="bg-black p-5">
              <div className="flex justify-between text-[12px] opacity-50">
                <span>{e.category}</span>
              </div>
              <p className="mt-8 text-[18px] tracking-tightest">{e.title}</p>
              <p className="mt-2 opacity-60">{e.shortDesc[lang]}</p>
            </li>
          ))}
        </ul>
      </div>

      <div
        ref={previewRef}
        className="pointer-events-none fixed left-0 top-0 z-30 hidden w-[240px] s:block"
        aria-hidden="true"
      >
        {projects.map((p) => (
          <div
            key={p.id}
            className="absolute inset-x-0 top-0 aspect-[4/5] overflow-hidden rounded-[16px] transition-[opacity,transform] duration-500 ease-expo"
            style={{
              opacity: hovered === p.id ? 1 : 0,
              transform: hovered === p.id ? 'scale(1) rotate(0deg)' : 'scale(0.85) rotate(-4deg)',
            }}
          >
            <ProjectCover id={p.id} className="h-full w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
