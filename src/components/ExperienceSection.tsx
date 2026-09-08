'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { experiences, uiText } from '@/data/content';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';

export default function ExperienceSection() {
  const { lang } = useLanguage();

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-sky-600 dark:text-cyan-400 tracking-wider mb-2 font-semibold">
            <span className="w-2 h-2 rounded-sm bg-sky-500 dark:bg-cyan-400" />
            {uiText.experience.sectionTag[lang]}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {uiText.experience.title[lang]}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            {uiText.experience.subtitle[lang]}
          </p>
        </div>

        {/* Vertical HUD Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-sky-500/30 dark:border-cyan-500/30 space-y-12">
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative group">
              {/* Glowing Timeline Node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-white dark:bg-[#0B0F1A] border-2 border-sky-500 dark:border-cyan-400 flex items-center justify-center group-hover:scale-110 shadow-sm transition-all">
                <span className="w-2 h-2 rounded-full bg-sky-500 dark:bg-cyan-400 group-hover:animate-ping" />
              </div>

              {/* Experience Card */}
              <div className="hud-glass hud-glass-hover rounded-2xl p-5 sm:p-7 hud-corner-brackets">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-sky-50 dark:bg-cyan-500/10 text-sky-700 dark:text-cyan-300 border border-sky-200 dark:border-cyan-500/30 mb-2">
                      {exp.type[lang]}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      {exp.role[lang]}
                      <span className="text-sky-600 dark:text-cyan-400 font-normal">@</span>
                      <span className="text-sky-700 dark:text-cyan-300">{exp.company}</span>
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
                      {exp.period[lang]}
                    </span>
                    <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="mt-4 space-y-2.5">
                  {exp.highlights[lang].map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      <ChevronRight className="w-4 h-4 text-sky-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Badges */}
                <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap gap-1.5">
                  {exp.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 text-[11px] font-mono hover:border-sky-400 dark:hover:border-cyan-500/50 hover:text-sky-700 dark:hover:text-cyan-300 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
