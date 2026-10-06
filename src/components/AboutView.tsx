'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { achievements, experiences, personalInfo, skillCategories, socialLinks, ui } from '@/data/content';

const ease = [0.19, 1, 0.22, 1] as const;

function Row({ label, children, delay = 0 }: { label: string; children: React.ReactNode; delay?: number }) {
  return (
    <motion.section
      className="grid gap-5 border-t border-white/15 py-8 s:grid-cols-[minmax(10rem,1fr)_3fr] s:gap-x-10 s:py-10"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1, delay, ease }}
    >
      <h2 className="text-[12px] opacity-50">{label}</h2>
      <div>{children}</div>
    </motion.section>
  );
}

export default function AboutView() {
  const { lang } = useLanguage();
  const [copied, setCopied] = useState(false);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(socialLinks.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${socialLinks.email}`;
    }
  };

  return (
    <div className="scrollbar-none h-full overflow-y-auto px-5 pb-32 pt-[96px] s:px-10 s:pt-[22vh]">
      <motion.p
        className="max-w-[22ch] text-[clamp(30px,4.6vw,72px)] font-normal leading-[1.02] tracking-tightest s:max-w-[24ch]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease }}
      >
        {ui.about.statement[lang]}
      </motion.p>

      <div className="mt-20 s:mt-32">
        <Row label={ui.about.profile[lang]}>
          <div className="grid gap-6 s:grid-cols-2 s:gap-10">
            <p className="max-w-[42ch] leading-[1.5] opacity-80">{personalInfo.bio[lang]}</p>
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
              <dt className="opacity-50">{lang === 'en' ? 'Studying' : 'Eğitim'}</dt>
              <dd>
                {personalInfo.university[lang]}
                <br />
                <span className="opacity-60">{personalInfo.department[lang]}</span>
              </dd>
              <dt className="opacity-50">{lang === 'en' ? 'Based in' : 'Konum'}</dt>
              <dd>{personalInfo.location[lang]}</dd>
              <dt className="opacity-50">{lang === 'en' ? 'Roles' : 'Roller'}</dt>
              <dd>{personalInfo.roles[lang].join(', ')}</dd>
            </dl>
          </div>
        </Row>

        <Row label={ui.about.experience[lang]}>
          <ul className="flex flex-col gap-10">
            {experiences.map((x) => (
              <li key={x.company} className="grid gap-4 s:grid-cols-2 s:gap-10">
                <div>
                  <p className="text-[clamp(22px,2vw,30px)] leading-none tracking-tightest">{x.company}</p>
                  <p className="mt-2">{x.role[lang]}</p>
                  <p className="opacity-50">
                    {x.period[lang]} · {x.type[lang]} · {x.location}
                  </p>
                </div>
                <ul className="flex flex-col gap-2 opacity-70">
                  {x.highlights[lang].map((h) => (
                    <li key={h} className="leading-[1.5]">{h}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Row>

        <Row label={ui.about.capabilities[lang]}>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 s:grid-cols-4">
            {skillCategories.map((c) => (
              <div key={c.id}>
                <p className="mb-3 opacity-50">{c.name[lang]}</p>
                <ul className="flex flex-col gap-1">
                  {c.skills.map((sk) => (
                    <li key={sk.name} className={sk.highlight ? '' : 'opacity-50'}>{sk.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Row>

        <Row label={ui.about.recognition[lang]}>
          <ul className="flex flex-col">
            {achievements.map((a, i) => (
              <li key={a.id} className={`grid gap-3 py-4 s:grid-cols-[5rem_1fr_1fr] s:gap-10 ${i ? 'border-t border-white/10' : 'pt-0'}`}>
                <span className="tabular-nums opacity-50">{a.date}</span>
                <div>
                  <p className="text-[18px] tracking-tightest">{a.title[lang]}</p>
                  <p className="opacity-50">{a.event[lang]}</p>
                </div>
                <p className="leading-[1.5] opacity-70">{a.description[lang]}</p>
              </li>
            ))}
          </ul>
        </Row>

        <Row label={ui.about.contact[lang]}>
          <p className="opacity-60">{ui.about.contactLine[lang]}</p>
          <a
            href={`mailto:${socialLinks.email}`}
            className="mt-4 block break-all text-[clamp(28px,4.6vw,72px)] leading-none tracking-tightest transition-opacity duration-500 hover:opacity-60"
          >
            {socialLinks.email}
          </a>
          <div className="mt-8 flex flex-wrap gap-2">
            <button onClick={copy} className="rounded-full bg-white px-4 py-2 text-black transition-opacity hover:opacity-80">
              {copied ? ui.about.copied[lang] : ui.about.copy[lang]}
            </button>
            <a href={`${basePath}/cv.pdf`} download="Emircan_Can_CV.pdf" className="rounded-full border border-white/25 px-4 py-2 transition-colors hover:border-white">
              {ui.about.download[lang]} ↓
            </a>
            <a href={socialLinks.github} target="_blank" rel="noreferrer" className="rounded-full border border-white/25 px-4 py-2 transition-colors hover:border-white">GitHub</a>
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-white/25 px-4 py-2 transition-colors hover:border-white">LinkedIn</a>
          </div>
        </Row>
      </div>
    </div>
  );
}
