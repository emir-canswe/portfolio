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
} from 'lucide-react';

export default function HeroSection() {
  const { lang } = useLanguage();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const roles = personalInfo.roles[lang];
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const videoSrc = `${basePath}/hero-bg.mp4`;

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
      {/* =========================================================================
          3D IMMERSIVE VIDEO BACKGROUND (Hero Only)
          ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Looping 3D Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center scale-105 filter contrast-125 brightness-[0.55] opacity-70 transition-opacity duration-1000"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>


        {/* 3D Vignette & Atmospheric Depth Mask */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(11, 15, 26, 0.2) 0%, rgba(11, 15, 26, 0.75) 75%, #0B0F1A 100%)',
          }}
        />

        {/* Top and Bottom Gradient Blends for Seamless Section Transitions */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#0B0F1A] to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A]/80 to-transparent" />

        {/* Ambient Cyan / Electric Blue Neon Haze */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      </div>

      {/* =========================================================================
          HERO CONTENT (HUD Foreground)
          ========================================================================= */}
      <div className="max-w-5xl mx-auto w-full relative z-10 text-center flex flex-col items-center">
        {/* Top HUD Telemetry Chip */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/85 border border-cyan-500/40 text-cyan-300 font-mono text-xs tracking-wider mb-8 shadow-[0_0_20px_rgba(0,242,255,0.2)] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[11px] font-semibold tracking-widest uppercase">
            {uiText.hero.badge[lang]}
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300 text-[11px]">MALATYA, TR (38.3552° N, 38.3095° E)</span>
        </div>

        {/* Main Name & Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4">
          <span className="block text-slate-400 font-mono text-base sm:text-xl font-normal tracking-wide mb-2">
            {uiText.hero.headingPrefix[lang]}
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-300 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            {personalInfo.name}
          </span>
        </h1>

        {/* Typewriter Role HUD Console */}
        <div className="my-3 sm:my-5 flex items-center justify-center">
          <div className="inline-flex items-center gap-2.5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg bg-[#090D16]/90 border border-cyan-500/50 text-cyan-300 shadow-[0_0_25px_rgba(0,242,255,0.25)] font-mono text-base sm:text-2xl md:text-3xl font-semibold backdrop-blur-xl hud-corner-brackets">
            <Terminal className="w-4 h-4 sm:w-6 sm:h-6 text-cyan-400 shrink-0" />
            <span className="min-w-[200px] sm:min-w-[320px] text-left">
              {currentText}
              <span className="inline-block w-2.5 h-5 sm:h-7 bg-cyan-400 ml-1 animate-pulse align-middle" />
            </span>
          </div>
        </div>

        {/* Tagline */}
        <p className="max-w-2xl text-base sm:text-xl text-slate-200 font-sans mt-3 mb-8 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          &ldquo;{personalInfo.tagline[lang]}&rdquo;
        </p>

        {/* University & Degree Quick Tag */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 text-xs font-mono text-slate-300">
          <span className="px-3 py-1 rounded bg-[#090D16]/80 border border-slate-700/80 backdrop-blur-md flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            {personalInfo.university[lang]}
          </span>
          <span className="px-3 py-1 rounded bg-[#090D16]/80 border border-slate-700/80 backdrop-blur-md flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            {personalInfo.department[lang]}
          </span>
          <span className="px-3 py-1 rounded bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 backdrop-blur-md flex items-center gap-1.5 font-medium">
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
            href={`${basePath}/cv.pdf`}
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
            className="w-full sm:w-auto group flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-lg bg-slate-900/80 border border-slate-700/80 hover:border-slate-500 text-slate-200 hover:text-white font-sans text-sm tracking-wide hover:bg-slate-800/80 backdrop-blur-md transition-all"
          >
            <Mail className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
            <span>{uiText.hero.contactMe[lang]}</span>
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 sm:mt-20 flex flex-col items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
          <span className="font-mono text-[10px] tracking-widest text-cyan-400">
            {uiText.hero.scrollDown[lang]}
          </span>
          <ChevronDown className="w-4 h-4 text-cyan-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
