'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { skillCategories, uiText } from '@/data/content';
import {
  Code2,
  Box,
  Server,
  BrainCircuit,
  CheckCircle,
  Zap,
} from 'lucide-react';

export default function SkillsSection() {
  const { lang } = useLanguage();

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'languages':
        return <Code2 className="w-5 h-5 text-sky-600 dark:text-cyan-400" />;
      case 'frameworks':
        return <Box className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'tools-db':
        return <Server className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'ml-cv':
        return <BrainCircuit className="w-5 h-5 text-violet-600 dark:text-violet-400" />;
      default:
        return <Zap className="w-5 h-5 text-sky-600 dark:text-cyan-400" />;
    }
  };

  const getBorderColor = (id: string) => {
    switch (id) {
      case 'languages':
        return 'border-sky-300/60 dark:border-cyan-500/30';
      case 'frameworks':
        return 'border-blue-300/60 dark:border-blue-500/30';
      case 'tools-db':
        return 'border-emerald-300/60 dark:border-emerald-500/30';
      case 'ml-cv':
        return 'border-violet-300/60 dark:border-violet-500/30';
      default:
        return 'border-slate-200 dark:border-cyan-500/30';
    }
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-sky-600 dark:text-cyan-400 tracking-wider mb-2 font-semibold">
            <span className="w-2 h-2 rounded-sm bg-sky-500 dark:bg-cyan-400" />
            {uiText.skills.sectionTag[lang]}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {uiText.skills.title[lang]}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            {uiText.skills.subtitle[lang]}
          </p>
        </div>

        {/* 4 Grouped HUD Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat) => (
            <div
              key={cat.id}
              className={`hud-glass hud-glass-hover rounded-2xl p-6 sm:p-7 border ${getBorderColor(
                cat.id
              )} hud-corner-brackets flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 flex items-center justify-center shadow-xs">
                      {getCategoryIcon(cat.id)}
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                        {cat.name[lang]}
                      </h3>
                      <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-medium">
                        SYS // {cat.id.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-sky-700 dark:text-cyan-400 font-semibold bg-slate-100 dark:bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800">
                    {cat.skills.length} Items
                  </span>
                </div>

                {/* Skills Badges Grid */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        skill.highlight
                          ? 'bg-sky-50 dark:bg-slate-900/90 text-sky-800 dark:text-cyan-200 border border-sky-300 dark:border-cyan-500/40 hover:border-sky-500 dark:hover:border-cyan-400 shadow-xs dark:hover:shadow-[0_0_12px_rgba(0,242,255,0.25)] font-semibold'
                          : 'bg-slate-100/80 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {skill.highlight && (
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 dark:bg-cyan-400" />
                      )}
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom telemetry status bar */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                  Production Ready
                </span>
                <span>Active Stack</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
