'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { personalInfo, uiText, socialLinks } from '@/data/content';
import {
  Terminal,
  ArrowRight,
  Download,
  Mail,
  Cpu,
  ShieldCheck,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

export default function HeroSection() {
  const { lang } = useLanguage();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const roles = personalInfo.roles[lang];

  useEffect(() => {
    // Reset index when language changes
    setCurrentText('');
    setIsDeleting(false);
  }, [lang]);

  useEffect(() => {
    const handleType = () => {
      const fullRole = roles[currentRoleIndex % roles.length];

      if (isDeleting) {
        setCurrentText((prev) => prev.slice(0, -1));
        setTypingSpeed(45);
      } else {
        setCurrentText((prev) => fullRole.slice(0, prev.length + 1));
        setTypingSpeed(90);
      }

      if (!isDeleting && currentText === fullRole) {
        // Pause at full word
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        setTypingSpeed(300);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, roles, typingSpeed]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full relative z-10 text-center flex flex-col items-center">
        {/* Top HUD Telemetry Chip */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 font-mono text-xs tracking-wider mb-8 shadow-[0_0_15px_rgba(0,242,255,0.15)] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[11px] font-semibold tracking-widest uppercase">
            {uiText.hero.badge[lang]}
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400 text-[11px]">MALATYA, TR (38.3552° N, 38.3095° E)</span>
        </div>

        {/* Main Name & Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4">
          <span className="block text-slate-400 font-mono text-base sm:text-xl font-normal tracking-wide mb-2">
            {uiText.hero.headingPrefix[lang]}
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-300 drop-shadow-sm">
            {personalInfo.name}
          </span>
        </h1>

        {/* Typewriter Role HUD Console */}
        <div className="my-3 sm:my-5 flex items-center justify-center">
          <div className="inline-flex items-center gap-2.5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg bg-[#0F172A]/90 border border-cyan-500/40 text-cyan-300 shadow-[0_0_20px_rgba(0,242,255,0.2)] font-mono text-base sm:text-2xl md:text-3xl font-semibold hud-corner-brackets">
            <Terminal className="w-4 h-4 sm:w-6 sm:h-6 text-cyan-400 shrink-0" />
            <span className="min-w-[200px] sm:min-w-[320px] text-left">
              {currentText}
              <span className="inline-block w-2.5 h-5 sm:h-7 bg-cyan-400 ml-1 animate-pulse align-middle" />
            </span>
          </div>
        </div>

        {/* Tagline */}
        <p className="max-w-2xl text-base sm:text-xl text-slate-300 font-sans mt-3 mb-8 leading-relaxed">
          &ldquo;{personalInfo.tagline[lang]}&rdquo;
        </p>

        {/* University & Degree Quick Tag */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 text-xs font-mono text-slate-400">
          <span className="px-3 py-1 rounded bg-slate-900/60 border border-slate-700/60 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            {personalInfo.university[lang]}
          </span>
          <span className="px-3 py-1 rounded bg-slate-900/60 border border-slate-700/60 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            {personalInfo.department[lang]}
          </span>
          <span className="px-3 py-1 rounded bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 flex items-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {personalInfo.status[lang]}
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
          {/* View Projects CTA */}
          <button
            onClick={scrollToProjects}
            className="w-full sm:w-auto group flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold font-sans text-sm tracking-wide shadow-[0_0_25px_rgba(0,242,255,0.4)] hover:shadow-[0_0_35px_rgba(0,242,255,0.6)] hover:brightness-110 active:scale-[0.98] transition-all"
          >
            <span>{uiText.hero.viewProjects[lang]}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Download CV CTA */}
          <a
            href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/cv.pdf`}
            download="Emircan_Can_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto group flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#0F172A]/90 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white hover:bg-slate-800/80 font-mono text-sm tracking-wide shadow-md hover:shadow-[0_0_20px_rgba(0,242,255,0.25)] active:scale-[0.98] transition-all"
          >
            <Download className="w-4 h-4 text-cyan-400 group-hover:-translate-y-0.5 transition-transform" />
            <span>{uiText.hero.downloadCv[lang]}</span>
          </a>

          {/* Contact CTA */}
          <button
            onClick={scrollToContact}
            className="w-full sm:w-auto group flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-lg bg-slate-900/60 border border-slate-700/80 hover:border-slate-500 text-slate-300 hover:text-white font-sans text-sm tracking-wide hover:bg-slate-800/70 transition-all"
          >
            <Mail className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
            <span>{uiText.hero.contactMe[lang]}</span>
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 sm:mt-20 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
          <span className="font-mono text-[10px] tracking-widest text-cyan-400">
            {uiText.hero.scrollDown[lang]}
          </span>
          <ChevronDown className="w-4 h-4 text-cyan-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
