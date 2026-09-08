'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { personalInfo, socialLinks, uiText } from '@/data/content';
import {
  Sun,
  Moon,
  Github,
  Menu,
  X,
  ArrowUpRight,
  Download,
  Calendar,
  Mail,
  Terminal,
} from 'lucide-react';

export default function Header() {
  const { lang, setLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');

  const navItems = [
    { id: 'about', label: uiText.nav.about[lang] },
    { id: 'experience', label: uiText.nav.experience[lang] },
    { id: 'projects', label: uiText.nav.projects[lang] },
    { id: 'skills', label: uiText.nav.skills[lang] },
    { id: 'achievements', label: uiText.nav.achievements[lang] },
    { id: 'contact', label: uiText.nav.contact[lang] },
  ];

  // Scroll spy to highlight current section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['about', 'experience', 'projects', 'skills', 'achievements', 'contact'];
      const scrollPosition = window.scrollY + 280;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 sm:py-4 px-3 sm:px-6 pointer-events-none transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 pointer-events-auto">
        {/* =========================================================================
            1. LEFT FLOATING ISLAND: IDENTITY & STATUS (Matches "Av. Zülfükar CAN / Danışma Açık")
            ========================================================================= */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 px-3.5 sm:px-4 py-2 rounded-full bg-white/95 dark:bg-[#080C16]/90 backdrop-blur-2xl border border-slate-200/90 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:border-sky-500/40 dark:hover:border-cyan-500/40 transition-all shrink-0 group"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0F172A] border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-mono font-black text-xs sm:text-sm shadow-inner shrink-0 group-hover:scale-105 transition-transform">
            {personalInfo.monogram}
          </div>
          <div className="flex flex-col text-left pr-1">
            <span className="font-sans font-bold text-xs sm:text-sm text-slate-900 dark:text-white tracking-tight leading-tight">
              Emircan CAN
            </span>
            <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>{lang === 'tr' ? 'Danışma Açık' : 'Available for Work'}</span>
            </span>
          </div>
        </a>

        {/* =========================================================================
            2. CENTER FLOATING ISLAND: NAVIGATION PILL (with active green dot below item)
            ========================================================================= */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 px-7 py-3 rounded-full bg-white/95 dark:bg-[#080C16]/90 backdrop-blur-2xl border border-slate-200/90 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative font-sans text-xs sm:text-[13px] py-0.5 transition-colors ${
                  isActive
                    ? 'text-slate-950 dark:text-white font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white font-medium'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeDot"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.9)]"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* =========================================================================
            3. RIGHT FLOATING ISLAND: CONTACT, CONTROLS & "RANDEVU AL" ACTION
            ========================================================================= */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Email Capsule (Light pill with green icon - like 0507 016 18 13 in ref) */}
          <a
            href={`mailto:${socialLinks.email}`}
            className="hidden xl:flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white/95 dark:bg-[#080C16]/90 backdrop-blur-2xl border border-slate-200/90 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            title="Direct Email"
          >
            <Mail className="w-3.5 h-3.5 text-emerald-500" />
            <span className="font-medium">{socialLinks.email}</span>
          </a>

          {/* Controls Capsule: Language + Theme + GitHub */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-white/95 dark:bg-[#080C16]/90 backdrop-blur-2xl border border-slate-200/90 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            {/* Segmented TR / EN Switch */}
            <div className="flex items-center p-0.5 rounded-full bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 text-xs font-sans">
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 rounded-full text-[11px] font-semibold transition-all ${
                  lang === 'en'
                    ? 'text-sky-700 dark:text-cyan-300 bg-white dark:bg-cyan-500/20 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('tr')}
                className={`px-2 py-0.5 rounded-full text-[11px] font-semibold transition-all ${
                  lang === 'tr'
                    ? 'text-sky-700 dark:text-cyan-300 bg-white dark:bg-cyan-500/20 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                TR
              </button>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="w-7 h-7 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-sky-600" />
              )}
            </button>

            {/* GitHub Icon Link */}
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-7 h-7 rounded-full hidden sm:flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Dark Pill CTA: Matching "📅 RANDEVU AL" in reference */}
          <button
            onClick={() => scrollToSection('contact')}
            className="hidden sm:flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-[#0B101D] hover:bg-[#141C30] text-white font-sans font-bold text-xs tracking-wider uppercase border border-slate-700/80 hover:border-cyan-400/50 shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(0,242,255,0.25)] active:scale-95 transition-all shrink-0"
          >
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang === 'tr' ? 'RANDEVU AL' : 'GET IN TOUCH'}</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-white/95 dark:bg-[#080C16]/90 border border-slate-200/90 dark:border-white/10 text-slate-800 dark:text-slate-200 shadow-md"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* =========================================================================
          MOBILE SLIDE-DOWN DRAWER
          ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="lg:hidden max-w-md mx-auto mt-2 p-4 rounded-3xl bg-white/95 dark:bg-[#080C16]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.8)] space-y-3 pointer-events-auto"
          >
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-2xl text-left font-sans text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-sky-500/10 text-sky-600 dark:bg-cyan-500/15 dark:text-cyan-300 font-semibold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                      <span>{item.label}</span>
                    </span>
                    <ArrowUpRight className={`w-3.5 h-3.5 ${isActive ? 'text-sky-600 dark:text-cyan-400' : 'text-slate-400 dark:text-slate-600'}`} />
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2">
              <a
                href={`mailto:${socialLinks.email}`}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 text-xs font-mono text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-500" />
                <span>{socialLinks.email}</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B101D] text-white font-sans font-bold text-xs tracking-wider uppercase border border-slate-700"
                >
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{lang === 'tr' ? 'RANDEVU AL' : 'GET IN TOUCH'}</span>
                </button>

                <a
                  href={`${basePath}/cv.pdf`}
                  download="Emircan_Can_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-sky-500/15 dark:bg-cyan-500/20 border border-sky-500/30 dark:border-cyan-400/40 text-sky-700 dark:text-cyan-300 font-sans text-xs font-semibold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CV</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
