'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import {
  achievements,
  experiences,
  personalInfo,
  projects,
  skillCategories,
  socialLinks,
  stats,
  ui,
} from '@/data/content';
import ParticleMonogram from './ParticleMonogram';
import ProjectCover from './ProjectCover';
import SplitReveal from './SplitReveal';

const ease = [0.19, 1, 0.22, 1] as const;
const pad = (n: number) => String(n).padStart(2, '0');
const rise = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -10% 0px' },
  transition: { duration: 1, ease },
};

function SectionHead({ index, label }: { index: number; label: string }) {
  return (
    <div className="relative mb-10 flex justify-between pt-3 text-[12px] s:mb-14">
      <motion.span
        className="absolute inset-x-0 top-0 h-px origin-left bg-white/20"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease }}
      />
      <motion.span {...rise} className="opacity-50">{label}</motion.span>
      <motion.span {...rise} className="tabular-nums opacity-50">({pad(index)})</motion.span>
    </div>
  );
}

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : value;
  const numeric = !!match;
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || !numeric) return;
    const controls = animate(0, target, { duration: 1.8, ease, onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, target, numeric]);

  return (
    <span ref={ref} className="tabular-nums">
      {numeric ? n : ''}
      <span className="opacity-40">{suffix}</span>
    </span>
  );
}

function Marquee({ items }: { items: string[] }) {
  const row = (
    <div className="flex shrink-0 items-center gap-8 pr-8 s:gap-12 s:pr-12">
      {items.map((t, i) => (
        <React.Fragment key={i}>
          <span className="whitespace-nowrap">{t}</span>
          <span className="text-[0.5em] opacity-40">✦</span>
        </React.Fragment>
      ))}
    </div>
  );
  return (
    <div className="-mx-5 overflow-hidden border-y border-white/15 py-5 text-[clamp(30px,5vw,72px)] leading-none tracking-tightest s:-mx-10 s:py-7">
      <div className="marquee flex w-max">
        {row}
        {row}
      </div>
    </div>
  );
}

export default function AboutView({ onOpen }: { onOpen: (id: string) => void }) {
  const { lang } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [openExp, setOpenExp] = useState(0);
  const [cat, setCat] = useState(0);
  const [touch, setTouch] = useState(false);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  useEffect(() => setTouch(!window.matchMedia('(hover: hover)').matches), []);

  const { scrollY } = useScroll({ container: scrollRef });
  const heroY = useTransform(scrollY, [0, 700], [0, -140]);
  const heroFade = useTransform(scrollY, [0, 600], [1, 0.2]);
  const monoY = useTransform(scrollY, [0, 700], [0, 90]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(socialLinks.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${socialLinks.email}`;
    }
  };

  const current = experiences[0];
  const marqueeItems = [
    ...personalInfo.roles[lang],
    'Edge AI',
    'Computer Vision',
    'Mesh Networks',
    'Kotlin',
    'FastAPI',
    'Next.js',
  ];
  const activeCat = skillCategories[cat];
  const pill = 'rounded-full border border-white/25 px-4 py-2 transition-colors duration-300 hover:border-white hover:bg-white hover:text-black';

  return (
    <div ref={scrollRef} className="scrollbar-none h-full overflow-y-auto px-5 pb-10 s:px-10">
      {/* ---------- Hero ---------- */}
      <section className="grid min-h-[100svh] content-end gap-8 pb-14 pt-[96px] s:grid-cols-12 s:items-end s:gap-10 s:pb-20">
        <motion.div style={{ y: monoY }} className="relative s:order-2 s:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease }}
            className="relative"
          >
            <ParticleMonogram className="aspect-[5/4] w-full s:aspect-square" />
            <span className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap text-[12px] opacity-40">
              {touch ? ui.about.hintTouch[lang] : ui.about.hint[lang]}
            </span>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: heroY, opacity: heroFade }} className="s:order-1 s:col-span-7">
          <SplitReveal
            as="h1"
            text={ui.about.statement[lang]}
            delay={0.15}
            stagger={0.022}
            duration={1.2}
            className="text-[clamp(30px,4vw,64px)] font-normal leading-[1.02] tracking-tightest"
          />
          <motion.dl
            className="mt-10 grid grid-cols-1 gap-4 border-t border-white/15 pt-4 s:grid-cols-3 s:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease }}
          >
            <div>
              <dt className="flex items-center gap-2 text-[12px] opacity-50">
                <span className="pulse-dot size-1.5 rounded-full bg-[#3ddc84]" />
                {ui.about.now[lang]}
              </dt>
              <dd className="mt-1">
                {current.role[lang]} <span className="opacity-50">@ {current.company}</span>
              </dd>
            </div>
            <div>
              <dt className="text-[12px] opacity-50">{ui.about.studying[lang]}</dt>
              <dd className="mt-1">
                {personalInfo.university[lang]} <span className="opacity-50">· {lang === 'en' ? 'Senior' : '4. sınıf'}</span>
              </dd>
            </div>
            <div>
              <dt className="text-[12px] opacity-50">{ui.about.based[lang]}</dt>
              <dd className="mt-1">{personalInfo.location[lang]}</dd>
            </div>
          </motion.dl>
        </motion.div>
      </section>

      <Marquee items={marqueeItems} />

      {/* ---------- Numbers ---------- */}
      <section className="pt-24 s:pt-36">
        <SectionHead index={1} label={ui.about.numbers[lang]} />
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 s:grid-cols-4 s:gap-x-10">
          {stats.map((st, i) => (
            <motion.div key={st.value} {...rise} transition={{ duration: 1, delay: i * 0.08, ease }}>
              <p className="text-[clamp(56px,8vw,128px)] leading-[0.85] tracking-tightest">
                <CountUp value={st.value} />
              </p>
              <p className="mt-4">{st.label[lang]}</p>
              <p className="opacity-50">{st.sub[lang]}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------- Profile ---------- */}
      <section className="pt-24 s:pt-36">
        <SectionHead index={2} label={ui.about.profile[lang]} />
        <div className="grid gap-10 s:grid-cols-12">
          <SplitReveal
            text={personalInfo.bio[lang]}
            inView
            stagger={0.006}
            className="text-[clamp(20px,2vw,30px)] leading-[1.25] tracking-snug s:col-span-8"
          />
          <motion.ul {...rise} className="flex flex-col gap-2 s:col-span-3 s:col-start-10">
            {personalInfo.roles[lang].map((r, i) => (
              <li key={r} className="flex gap-3 border-b border-white/10 pb-2">
                <span className="tabular-nums opacity-40">{pad(i + 1)}</span>
                {r}
              </li>
            ))}
            <li className="pt-2 opacity-50">{personalInfo.department[lang]}</li>
          </motion.ul>
        </div>
      </section>

      {/* ---------- Experience ---------- */}
      <section className="pt-24 s:pt-36">
        <SectionHead index={3} label={ui.about.experience[lang]} />
        <ul>
          {experiences.map((x, i) => {
            const open = openExp === i;
            const isNow = /present|günümüz/i.test(x.period[lang]);
            return (
              <motion.li key={x.company} {...rise} className="border-b border-white/15">
                <button
                  onClick={() => setOpenExp(open ? -1 : i)}
                  className="group grid w-full grid-cols-[1fr_auto] items-end gap-x-6 gap-y-2 py-6 text-left s:grid-cols-[12rem_1fr_16rem_2.5rem] s:py-8"
                  aria-expanded={open}
                >
                  <span className="order-3 col-span-2 flex items-center gap-2 text-[12px] opacity-60 s:order-none s:col-span-1 s:text-[14px]">
                    {isNow && <span className="pulse-dot size-1.5 rounded-full bg-[#3ddc84]" />}
                    {x.period[lang]}
                  </span>
                  <span className="text-[clamp(40px,7vw,112px)] leading-[0.85] tracking-tightest transition-transform duration-700 ease-expo s:group-hover:translate-x-4">
                    {x.company}
                  </span>
                  <span className="order-4 col-span-2 s:order-none s:col-span-1">
                    {x.role[lang]}
                    <span className="block opacity-50">
                      {x.type[lang]} · {x.location}
                    </span>
                  </span>
                  <span
                    className={`inline-flex size-9 items-center justify-center self-center rounded-full border border-white/25 text-[18px] transition-all duration-500 ease-expo group-hover:border-white ${
                      open ? 'rotate-45 bg-white text-black' : ''
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.7, ease }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-10 s:grid-cols-[12rem_1fr_16rem_2.5rem] s:gap-x-6">
                        <ol className="flex flex-col gap-4 s:col-start-2">
                          {x.highlights[lang].map((h, k) => (
                            <motion.li
                              key={h}
                              className="flex gap-4 leading-[1.5]"
                              initial={{ opacity: 0, y: 14 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.8, delay: 0.1 + k * 0.07, ease }}
                            >
                              <span className="tabular-nums opacity-40">{pad(k + 1)}</span>
                              <span className="max-w-[60ch] opacity-80">{h}</span>
                            </motion.li>
                          ))}
                        </ol>
                        <ul className="flex flex-wrap content-start gap-1.5">
                          {x.tech.map((t) => (
                            <li key={t} className="rounded-full border border-white/20 px-3 py-1 text-[12px]">{t}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </section>

      {/* ---------- Capabilities ---------- */}
      <section className="pt-24 s:pt-36">
        <SectionHead index={4} label={ui.about.capabilities[lang]} />
        <div className="grid gap-10 s:grid-cols-12">
          <ul className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 s:col-span-5 s:mx-0 s:flex-col s:gap-0 s:overflow-visible s:px-0">
            {skillCategories.map((c, i) => (
              <li key={c.id} className="flex-none">
                <button
                  onClick={() => setCat(i)}
                  onMouseEnter={() => !touch && setCat(i)}
                  className={`group flex w-full items-baseline gap-4 whitespace-nowrap rounded-full border px-4 py-2 text-left transition-all duration-500 ease-expo s:rounded-none s:border-0 s:border-b s:border-white/10 s:px-0 s:py-4 ${
                    cat === i ? 'border-white bg-white text-black s:bg-transparent s:text-white' : 'border-white/20 s:opacity-35 s:hover:opacity-70'
                  }`}
                >
                  <span className="hidden text-[12px] tabular-nums opacity-50 s:inline">{pad(i + 1)}</span>
                  <span className="s:text-[clamp(22px,2.2vw,34px)] s:leading-none s:tracking-tightest">{c.name[lang]}</span>
                  <span className="ml-auto hidden text-[12px] opacity-50 s:inline">
                    {c.skills.length} {ui.about.skillsCount[lang]}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div className="min-h-[16rem] s:col-span-7">
            <AnimatePresence mode="wait">
              <motion.ul
                key={activeCat.id}
                className="flex flex-wrap gap-x-[0.35em] text-[clamp(30px,4vw,60px)] leading-[1.05] tracking-tightest"
                initial="hidden"
                animate="show"
                exit="exit"
                variants={{ show: { transition: { staggerChildren: 0.04 } }, exit: { transition: { staggerChildren: 0.015 } } }}
              >
                {activeCat.skills.map((sk, i) => (
                  <li key={sk.name} className="-mb-[0.1em] overflow-hidden pb-[0.18em]">
                    <motion.span
                      className={`inline-block ${sk.highlight ? '' : 'opacity-35'}`}
                      variants={{
                        hidden: { y: '110%' },
                        show: { y: '0%', transition: { duration: 0.8, ease } },
                        exit: { y: '-110%', transition: { duration: 0.35, ease } },
                      }}
                    >
                      {sk.name}
                      {i < activeCat.skills.length - 1 && <span className="opacity-30">,</span>}
                    </motion.span>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ---------- Recognition ---------- */}
      <section className="pt-24 s:pt-36">
        <SectionHead index={5} label={ui.about.recognition[lang]} />
        <div className="grid gap-3 s:grid-cols-2">
          {achievements.map((a, i) => {
            const proj = projects.find((p) => p.title === a.projectRef);
            return (
              <motion.button
                key={a.id}
                {...rise}
                transition={{ duration: 1, delay: i * 0.1, ease }}
                onClick={() => proj && onOpen(proj.id)}
                data-cursor="view"
                className="group relative flex min-h-[26rem] flex-col justify-between overflow-hidden rounded-[20px] border border-white/15 p-5 text-left s:min-h-[32rem] s:p-7"
              >
                {proj && (
                  <span className="absolute inset-0 opacity-30 transition-[opacity,transform] duration-1000 ease-expo group-hover:scale-105 group-hover:opacity-70">
                    <ProjectCover id={proj.id} className="h-full w-full" />
                  </span>
                )}
                <span className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                <span className="relative flex justify-between text-[12px]">
                  <span className="opacity-60">{a.date}</span>
                  <span className="rounded-full bg-white px-2.5 py-1 text-black">{a.award[lang]}</span>
                </span>
                <span className="relative">
                  <span className="block text-[clamp(30px,3.4vw,52px)] leading-[0.95] tracking-tightest">{a.title[lang]}</span>
                  <span className="mt-2 block opacity-60">{a.event[lang]}</span>
                  <span className="mt-5 block max-w-[52ch] leading-[1.5] opacity-80">{a.description[lang]}</span>
                  {proj && (
                    <span className="mt-6 inline-flex items-center gap-2">
                      {ui.about.seeProject[lang]}
                      <span className="transition-transform duration-500 ease-expo group-hover:translate-x-2">→</span>
                    </span>
                  )}
                </span>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* ---------- Contact ---------- */}
      <section className="pt-24 s:pt-36">
        <SectionHead index={6} label={ui.about.contact[lang]} />
        <SplitReveal
          as="h2"
          text={ui.about.letsTalk[lang]}
          inView
          stagger={0.08}
          duration={1.3}
          className="text-[clamp(72px,16vw,260px)] font-normal leading-[0.82] tracking-tightest"
        />
        <div className="mt-10 grid gap-8 s:grid-cols-12 s:items-end">
          <div className="s:col-span-7">
            <p className="max-w-[40ch] opacity-60">{ui.about.contactLine[lang]}</p>
            <a href={`mailto:${socialLinks.email}`} className="group mt-4 block break-all text-[clamp(24px,3.4vw,52px)] leading-none tracking-tightest">
              {socialLinks.email}
              <span className="mt-3 block h-px origin-left scale-x-[0.15] bg-white transition-transform duration-700 ease-expo group-hover:scale-x-100" />
            </a>
          </div>
          <div className="flex flex-wrap gap-2 s:col-span-5 s:justify-end">
            <button onClick={copy} className="rounded-full bg-white px-4 py-2 text-black transition-opacity hover:opacity-80">
              {copied ? ui.about.copied[lang] : ui.about.copy[lang]}
            </button>
            <a href={`${basePath}/cv.pdf`} download="Emircan_Can_CV.pdf" className={pill}>
              {ui.about.download[lang]} ↓
            </a>
            <a href={socialLinks.github} target="_blank" rel="noreferrer" className={pill}>GitHub</a>
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className={pill}>LinkedIn</a>
            <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className={pill}>Instagram</a>
          </div>
        </div>

        <div className="mt-24 flex items-end justify-between border-t border-white/15 pt-4 text-[12px] opacity-50">
          <span>© {new Date().getFullYear()} {personalInfo.name}</span>
          <button onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })} className="transition-opacity hover:opacity-100">
            ↑ {lang === 'en' ? 'Back to top' : 'Başa dön'}
          </button>
        </div>
      </section>
    </div>
  );
}
