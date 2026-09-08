'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { personalInfo, stats, uiText } from '@/data/content';
import {
  Cpu,
  Eye,
  CheckCircle2,
  Globe,
  Database,
  Smartphone,
  GraduationCap,
  MapPin,
  Sparkles,
  Layers,
} from 'lucide-react';

export default function AboutSection() {
  const { lang } = useLanguage();

  const interestIcons = [
    <Cpu key="ai" className="w-4 h-4 text-cyan-400" />,
    <Eye key="cv" className="w-4 h-4 text-blue-400" />,
    <CheckCircle2 key="test" className="w-4 h-4 text-emerald-400" />,
    <Globe key="web" className="w-4 h-4 text-indigo-400" />,
    <Database key="db" className="w-4 h-4 text-amber-400" />,
    <Smartphone key="mobile" className="w-4 h-4 text-violet-400" />,
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider mb-2">
            <span className="w-2 h-2 rounded-sm bg-cyan-400" />
            {uiText.about.sectionTag[lang]}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {uiText.about.title[lang]}
          </h2>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="hud-glass hud-glass-hover rounded-xl p-4 sm:p-5 flex flex-col justify-between hud-corner-brackets"
            >
              <div className="font-mono text-3xl sm:text-4xl font-black text-cyan-300 mb-1 tracking-tight">
                {stat.value}
              </div>
              <div>
                <div className="font-sans font-semibold text-xs sm:text-sm text-slate-200">
                  {stat.label[lang]}
                </div>
                <div className="font-mono text-[11px] text-slate-400 mt-0.5">
                  {stat.sub[lang]}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid: Bio & Focus Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Detailed Bio Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="hud-glass rounded-xl p-6 sm:p-8 space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
              <p>{uiText.about.bioP1[lang]}</p>
              <p>{uiText.about.bioP2[lang]}</p>
            </div>

            {/* Quick Education Spec Card */}
            <div className="hud-glass rounded-xl p-5 border-cyan-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="font-sans font-bold text-sm text-white">
                    {personalInfo.university[lang]}
                  </div>
                  <div className="font-mono text-xs text-cyan-300">
                    {personalInfo.department[lang]}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-xs text-slate-400 bg-slate-900/60 px-3 py-1.5 rounded border border-slate-800 self-stretch sm:self-auto justify-center">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                {personalInfo.location[lang]}
              </div>
            </div>
          </div>

          {/* Right: Technical Focus Modules */}
          <div className="lg:col-span-5 space-y-4">
            <div className="hud-glass rounded-xl p-6 border-cyan-500/20">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
                <h3 className="font-sans font-bold text-base text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  {uiText.about.interestsTitle[lang]}
                </h3>
                <span className="font-mono text-[10px] text-cyan-400/80 uppercase">
                  ACTIVE_DOMAINS
                </span>
              </div>

              <div className="space-y-2.5">
                {uiText.about.interests.map((interest, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-800/50 transition-all group"
                  >
                    <div className="w-8 h-8 rounded bg-slate-800/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {interestIcons[idx]}
                    </div>
                    <span className="font-sans text-xs sm:text-sm font-medium text-slate-200 group-hover:text-cyan-200 transition-colors">
                      {interest[lang]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
