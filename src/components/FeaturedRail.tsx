'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { personalInfo, projects, socialLinks, ui } from '@/data/content';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import ProjectCover from './ProjectCover';
import SplitReveal from './SplitReveal';

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const pad = (n: number) => String(n).padStart(2, '0');

interface RailProps {
  ready: boolean;
  onOpen: (id: string) => void;
}

function Card({ index, onOpen }: { index: number; onOpen: (id: string) => void }) {
  const { lang } = useLanguage();
  const p = projects[index];
  return (
    <button
      data-card
      data-cursor="view"
      onClick={() => onOpen(p.id)}
      className="group relative block aspect-[4/5] w-full flex-none overflow-hidden rounded-[16px] bg-smoke text-left transition-opacity duration-500 ease-expo will-change-transform s:h-[min(46svh,560px)] s:w-auto s:rounded-[20px]"
      aria-label={p.title}
    >
      <div data-inner className="absolute inset-0 will-change-transform">
        <ProjectCover id={p.id} className="h-full w-full scale-[1.12] transition-transform duration-[1.2s] ease-expo group-hover:scale-[1.18]" />
      </div>
      <div className="pointer-events-none absolute inset-x-3 top-3 flex justify-between text-[12px] mix-blend-difference s:inset-x-4 s:top-4">
        <span>{pad(index + 1)}</span>
        <span className="opacity-70">{p.category}</span>
      </div>
      <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-end justify-between s:inset-x-4 s:bottom-4">
        <span className="rounded-full bg-black px-3 py-1.5 text-[15px] tracking-tightest s:text-[17px]">{p.title}</span>
        <span className="inline-flex size-8 items-center justify-center rounded-full bg-black text-[15px] transition-transform duration-500 ease-expo group-hover:rotate-90">
          +
        </span>
      </div>
      {p.award && (
        <span className="pointer-events-none absolute left-3 top-10 rounded-full bg-white px-2.5 py-1 text-[11px] text-black s:left-4 s:top-11">
          {p.award[lang].replace(/^\S+\s/, '').replace(/\s*\(.*?\)/, '')}
        </span>
      )}
    </button>
  );
}

export default function FeaturedRail({ ready, onOpen }: RailProps) {
  const { lang } = useLanguage();
  const desktop = useMediaQuery('(min-width: 768px)');
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const mobileRef = useRef<HTMLDivElement>(null);
  const mobileBarRef = useRef<HTMLDivElement>(null);
  const [mobileActive, setMobileActive] = useState(-1);

  // Mobile: scroll-linked cover parallax, progress bar and "now viewing" pill.
  useEffect(() => {
    if (desktop || !ready) return;
    const el = mobileRef.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let last = -2;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const max = el.scrollHeight - el.clientHeight;
      if (mobileBarRef.current) mobileBarRef.current.style.transform = `scaleX(${max > 0 ? el.scrollTop / max : 0})`;
      let current = -1;
      el.querySelectorAll<HTMLElement>('[data-card]').forEach((card, i) => {
        const r = card.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const ratio = (r.top + r.height / 2 - vh / 2) / vh;
        const inner = card.querySelector<HTMLElement>('[data-inner]');
        if (inner && !reduced) inner.style.transform = `translate3d(0, ${ratio * -36}px, 0)`;
        if (el.scrollTop > 120 && r.top < vh * 0.55 && r.bottom > vh * 0.45) current = i;
      });
      if (current !== last) {
        last = current;
        setMobileActive(current);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [desktop, ready]);

  useEffect(() => {
    if (!desktop) return;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>('[data-card]'));
    const inners = cards.map((c) => c.querySelector<HTMLElement>('[data-inner]'));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const s = { target: 0, current: 0, max: 0, dragging: false, startX: 0, startTarget: 0, moved: 0, active: -1 };
    let centers: number[] = [];
    let step = 0;

    const measure = () => {
      s.max = Math.max(0, track.scrollWidth - window.innerWidth);
      s.target = clamp(s.target, 0, s.max);
      // Measure the motion wrappers: they're transformed, so they're the cards' offsetParent.
      const slots = cards.map((c) => c.parentElement ?? c);
      centers = slots.map((el) => el.offsetLeft + el.offsetWidth / 2);
      step = slots.length > 1 ? slots[1].offsetLeft - slots[0].offsetLeft : 0;
    };
    measure();

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      s.target = clamp(s.target + d * (e.deltaMode === 1 ? 30 : 1), 0, s.max);
    };
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      s.dragging = true;
      s.startX = e.clientX;
      s.startTarget = s.target;
      s.moved = 0;
      viewport.style.cursor = 'grabbing';
    };
    const onMove = (e: PointerEvent) => {
      if (!s.dragging) return;
      const dx = e.clientX - s.startX;
      s.moved = Math.max(s.moved, Math.abs(dx));
      s.target = clamp(s.startTarget - dx * 1.6, 0, s.max);
    };
    const onUp = () => {
      s.dragging = false;
      viewport.style.cursor = '';
    };
    // Swallow the click that ends a drag so cards don't open by accident.
    const onClick = (e: MouseEvent) => {
      if (s.moved > 6) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') s.target = clamp(s.target + step, 0, s.max);
      if (e.key === 'ArrowLeft') s.target = clamp(s.target - step, 0, s.max);
    };

    viewport.addEventListener('wheel', onWheel, { passive: false });
    viewport.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    viewport.addEventListener('click', onClick, true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', measure);

    let raf = 0;
    const loop = () => {
      const prev = s.current;
      s.current += (s.target - s.current) * (reduced ? 1 : 0.085);
      if (Math.abs(s.target - s.current) < 0.05) s.current = s.target;
      const vel = s.current - prev;
      const vw = window.innerWidth;

      track.style.transform = `translate3d(${-s.current}px,0,0)`;
      const skew = reduced ? 0 : clamp(vel * -0.06, -6, 6);
      const scale = reduced ? 1 : 1 - clamp(Math.abs(vel) * 0.0015, 0, 0.06);

      cards.forEach((card, i) => {
        const c = centers[i] - s.current;
        card.style.transform = `skewX(${skew}deg) scale(${scale})`;
        const inner = inners[i];
        if (inner && !reduced) inner.style.transform = `translate3d(${((c - vw / 2) / vw) * -36}px,0,0)`;
      });
      const progress = s.max ? s.current / s.max : 0;
      const nearest = Math.round(progress * (cards.length - 1));

      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      if (nearest !== s.active) {
        s.active = nearest;
        setActive(nearest);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      viewport.removeEventListener('wheel', onWheel);
      viewport.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      viewport.removeEventListener('click', onClick, true);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', measure);
      track.style.transform = '';
      cards.forEach((c) => (c.style.transform = ''));
    };
  }, [desktop]);

  const cards = projects.map((p, i) => (
    <motion.div
      key={p.id}
      className="s:h-[min(46svh,560px)]"
      initial={{ opacity: 0, y: 80 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ duration: 1.4, delay: 0.15 + Math.min(i, 6) * 0.07, ease: [0.19, 1, 0.22, 1] }}
    >
      <Card index={i} onOpen={onOpen} />
    </motion.div>
  ));

  if (!desktop) {
    return (
      <div ref={mobileRef} className="scrollbar-none h-full overflow-y-auto overscroll-contain px-5 pb-28 pt-[76px]">
        <SplitReveal
          as="h1"
          text={personalInfo.name}
          play={ready}
          stagger={0.08}
          duration={1.3}
          className="text-[clamp(56px,18vw,96px)] font-normal leading-[0.88] tracking-tightest"
        />
        <SplitReveal text={personalInfo.roles[lang].join(' · ')} play={ready} delay={0.35} stagger={0.03} className="mt-4 opacity-50" />
        <SplitReveal text={ui.intro[lang]} play={ready} delay={0.5} stagger={0.01} className="mt-6 leading-[1.45] opacity-70" />

        <motion.div
          className="mt-12 flex items-center justify-between border-t border-white/15 pt-3 text-[12px] opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 0.5 : 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <span>{ui.nav.featured[lang]}</span>
          <span>{pad(projects.length)}</span>
        </motion.div>

        {ready && (
          <div className="rail mt-3 flex flex-col gap-3">
            {projects.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ clipPath: 'inset(14% 5% 0% 5% round 16px)', y: 60, opacity: 0.2 }}
                whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 16px)', y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '0px 0px -12% 0px' }}
                transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                className="active:scale-[0.98] transition-transform duration-300"
              >
                <Card index={i} onOpen={onOpen} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-20 border-t border-white/15 pt-6">
          <span className="flex items-center gap-2 opacity-70">
            <span className="pulse-dot size-1.5 rounded-full bg-[#3ddc84]" />
            {personalInfo.status[lang]}
          </span>
          <a href={`mailto:${socialLinks.email}`} className="mt-4 block break-all text-[clamp(26px,8vw,40px)] leading-none tracking-tightest">
            <SplitReveal as="span" text={socialLinks.email} inView stagger={0} className="block" />
          </a>
          <div className="mt-6 flex gap-5 opacity-60">
            <a href={socialLinks.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={socialLinks.instagram} target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>

        {/* Floating "now viewing" pill + scroll progress */}
        <AnimatePresence>
          {mobileActive >= 0 && (
            <motion.div
              className="pointer-events-none fixed inset-x-0 bottom-5 z-30 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            >
              <span className="flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[13px] text-black shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                <span className="tabular-nums opacity-50">{pad(mobileActive + 1)}/{pad(projects.length)}</span>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={mobileActive}
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {projects[mobileActive].title}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="fixed inset-x-0 bottom-0 z-30 h-[2px] bg-white/10">
          <div ref={mobileBarRef} className="h-full origin-left bg-white" style={{ transform: 'scaleX(0)' }} />
        </div>
      </div>
    );
  }

  return (
    <div ref={viewportRef} className="absolute inset-0 flex cursor-grab select-none items-center overflow-hidden pt-[7vh]">
      <div ref={trackRef} className="rail flex w-max flex-none gap-2.5 px-10 will-change-transform">
        {cards}
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3 text-[12px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <span className="w-5 text-right tabular-nums">{pad(active + 1)}</span>
        <span className="relative h-px w-24 overflow-hidden bg-white/20">
          <span ref={barRef} className="absolute inset-0 origin-left bg-white" style={{ transform: 'scaleX(0)' }} />
        </span>
        <span className="w-5 tabular-nums opacity-50">{pad(projects.length)}</span>
        <span
          className="absolute left-1/2 top-[-22px] -translate-x-1/2 whitespace-nowrap opacity-40 transition-opacity duration-700"
          style={{ opacity: active === 0 ? 0.4 : 0 }}
        >
          {ui.dragHint[lang]} →
        </span>
      </motion.div>
    </div>
  );
}
