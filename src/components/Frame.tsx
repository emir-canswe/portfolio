'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { personalInfo, socialLinks, ui } from '@/data/content';

export type View = 'featured' | 'index' | 'about';

const ease = [0.19, 1, 0.22, 1] as const;

function Clock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Istanbul' });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time || '--:--'}</span>;
}

interface FrameProps {
  view: View;
  onNavigate: (view: View) => void;
  ready: boolean;
}

export default function Frame({ view, onNavigate, ready }: FrameProps) {
  const { lang, toggleLang } = useLanguage();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 8 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 },
    transition: { duration: 1, delay, ease },
  });

  return (
    <div className="pointer-events-none fixed inset-0 z-40 flex flex-col justify-between px-5 py-5 s:px-10 s:py-8">
      {/* Fades keep corner text legible over scrolling content */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black via-black/70 to-transparent s:h-36" />


      {/* Top row */}
      <div className="relative flex items-start justify-between gap-6">
        <motion.div {...reveal(0.05)} className="max-w-[30rem]">
          <button
            onClick={() => onNavigate('featured')}
            className="pointer-events-auto text-left text-[15px] font-medium"
          >
            {personalInfo.name} <span className="hidden opacity-50 s:inline">— {ui.role[lang]}</span>
          </button>
          <AnimatePresence initial={false}>
            {view === 'featured' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.6, ease }}
                className="hidden overflow-hidden s:block"
              >
                <p className="mt-3 max-w-[27rem] leading-[1.45] opacity-60">{ui.intro[lang]}</p>
                <p className="mt-3 opacity-60">{ui.credits[lang]}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.nav {...reveal(0.12)} className="flex shrink-0 items-start gap-x-5 s:gap-x-8">
          <div className="flex gap-x-1.5">
            <button className="link-dim pointer-events-auto" aria-current={view === 'featured'} onClick={() => onNavigate('featured')}>
              {ui.nav.featured[lang]}
            </button>
            <span className="opacity-30">/</span>
            <button className="link-dim pointer-events-auto" aria-current={view === 'index'} onClick={() => onNavigate('index')}>
              {ui.nav.index[lang]}
            </button>
          </div>
          <button className="link-dim pointer-events-auto" aria-current={view === 'about'} onClick={() => onNavigate('about')}>
            {ui.nav.about[lang]}
          </button>
          <a className="link-dim pointer-events-auto hidden s:inline" href={`${basePath}/cv.pdf`} download="Emircan_Can_CV.pdf">
            {ui.nav.cv[lang]} ↓
          </a>
          <button className="pointer-events-auto flex gap-x-1" onClick={toggleLang} aria-label="Switch language">
            <span className={lang === 'en' ? '' : 'opacity-40'}>EN</span>
            <span className="opacity-30">/</span>
            <span className={lang === 'tr' ? '' : 'opacity-40'}>TR</span>
          </button>
        </motion.nav>
      </div>

      {/* Bottom row — only on the rail; index & about carry their own contact info */}
      <div
        className={`relative hidden items-end justify-between transition-[opacity,visibility] duration-500 s:flex ${
          view === 'featured' ? '' : 'invisible opacity-0'
        }`}
      >
        <motion.div {...reveal(0.2)} className="flex flex-col gap-1">
          <span className="flex items-center gap-2">
            <span className="pulse-dot size-1.5 rounded-full bg-[#3ddc84]" />
            {personalInfo.status[lang]}
          </span>
          <span className="opacity-50">
            {personalInfo.location[lang]} — <Clock /> GMT+3
          </span>
        </motion.div>

        <motion.div {...reveal(0.28)} className="flex gap-x-6">
          <a className="link-dim pointer-events-auto" href={socialLinks.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="link-dim pointer-events-auto" href={socialLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="link-dim pointer-events-auto" href={socialLinks.instagram} target="_blank" rel="noreferrer">Instagram</a>
          <a className="pointer-events-auto transition-opacity duration-300 hover:opacity-60" href={`mailto:${socialLinks.email}`}>
            {socialLinks.email}
          </a>
        </motion.div>
      </div>
    </div>
  );
}
