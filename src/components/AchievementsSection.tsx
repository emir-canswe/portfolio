'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { achievements, uiText } from '@/data/content';
import { Trophy, GraduationCap, Award, Calendar, ExternalLink } from 'lucide-react';

export default function AchievementsSection() {
  const { lang } = useLanguage();

  return (
    <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-sky-600 dark:text-cyan-400 tracking-wider mb-2 font-semibold">
            <span className="w-2 h-2 rounded-sm bg-sky-500 dark:bg-cyan-400" />
            {uiText.achievements.sectionTag[lang]}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {uiText.achievements.title[lang]}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            {uiText.achievements.subtitle[lang]}
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className="hud-glass hud-glass-hover rounded-2xl p-6 sm:p-7 border border-amber-300/80 dark:border-amber-500/30 flex flex-col justify-between hud-corner-brackets shadow-sm dark:shadow-[0_0_25px_rgba(245,158,11,0.08)]"
            >
              <div>
                {/* Card Top */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-500/15 border border-amber-300 dark:border-amber-500/40 flex items-center justify-center shrink-0">
                    {ach.icon === 'trophy' ? (
                      <Trophy className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    ) : (
                      <GraduationCap className="w-6 h-6 text-sky-600 dark:text-cyan-400" />
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-xs text-amber-800 dark:text-amber-300/90 bg-amber-100 dark:bg-amber-500/10 px-3 py-1 rounded-full border border-amber-300 dark:border-amber-500/30 font-medium">
                    <Award className="w-3.5 h-3.5" />
                    <span>{ach.award[lang]}</span>
                  </div>
                </div>

                {/* Title & Event */}
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1">
                  {ach.title[lang]}
                </h3>
                <div className="text-xs font-mono text-sky-700 dark:text-cyan-300/80 mb-4 font-medium">
                  {ach.event[lang]}
                </div>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {ach.description[lang]}
                </p>
              </div>

              {/* Card Footer: Project Associated + Year */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
                {ach.projectRef && (
                  <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                    Project: <span className="text-sky-700 dark:text-cyan-300 font-semibold">{ach.projectRef}</span>
                  </span>
                )}
                <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  {ach.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
