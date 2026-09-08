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
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 pointer-events-auto">
        {/* =========================================================================
            1. LEFT FLOATING ISLAND: BRAND / PROFILE (Clean, no subtitle)
            ========================================================================= */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-full bg-white/85 dark:bg-[#080C16]/85 backdrop-blur-2xl border border-slate-200/90 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(0,242,255,0.06)] hover:border-sky-500/30 dark:hover:border-cyan-500/25 transition-all group shrink-0"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500/15 via-blue-600/15 to-violet-500/15 dark:from-cyan-500/20 dark:via-blue-600/20 dark:to-violet-500/20 border border-sky-500/40 dark:border-cyan-400/40 flex items-center justify-center text-sky-600 dark:text-cyan-300 font-mono font-bold text-xs tracking-tight group-hover:scale-105 transition-all shadow-[0_0_12px_rgba(2,132,199,0.15)] dark:shadow-[0_0_12px_rgba(0,242,255,0.2)] shrink-0">
            {personalInfo.monogram}
          </div>
          <div className="flex items-center gap-2 pr-1">
            <span className="font-sans font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-cyan-300 transition-colors tracking-tight whitespace-nowrap">
              {personalInfo.name}
            </span>
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
          </div>
        </a>

        {/* =========================================================================
            2. CENTER FLOATING ISLAND: NAVIGATION CAPSULE (Dark glass with active indicator)
            ========================================================================= */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 px-7 py-2.5 rounded-full bg-white/85 dark:bg-[#080C16]/85 backdrop-blur-2xl border border-slate-200/90 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(0,242,255,0.06)] hover:border-sky-500/30 dark:hover:border-cyan-500/25 transition-all">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative font-sans text-xs sm:text-[13px] py-1 transition-colors ${
                  isActive
                    ? 'text-sky-600 dark:text-cyan-300 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeDot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-sky-500 dark:bg-cyan-400 shadow-[0_0_8px_rgba(0,242,255,0.8)]"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* =========================================================================
            3. RIGHT FLOATING ISLAND: LANGUAGE + THEME + GITHUB CONTROLS
            ========================================================================= */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/85 dark:bg-[#080C16]/85 backdrop-blur-2xl border border-slate-200/90 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(0,242,255,0.06)] hover:border-sky-500/30 dark:hover:border-cyan-500/25 transition-all">
          {/* Segmented TR / EN Switch */}
          <div className="flex items-center p-0.5 rounded-full bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 text-xs font-sans">
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                lang === 'en'
                  ? 'text-sky-700 dark:text-cyan-300 bg-white dark:bg-cyan-500/20 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('tr')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
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
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-300 hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-200 dark:border-white/5 transition-all"
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
            className="w-8 h-8 rounded-full hidden sm:flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-200 dark:border-white/5 transition-all"
          >
            <Github className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="lg:hidden w-8 h-8 rounded-full flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
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
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-sky-500 dark:bg-cyan-400" />}
                      <span>{item.label}</span>
                    </span>
                    <ArrowUpRight className={`w-3.5 h-3.5 ${isActive ? 'text-sky-600 dark:text-cyan-400' : 'text-slate-400 dark:text-slate-600'}`} />
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
              <a
                href={`${basePath}/cv.pdf`}
                download="Emircan_Can_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-sky-500/15 dark:bg-cyan-500/20 border border-sky-500/30 dark:border-cyan-400/40 text-sky-700 dark:text-cyan-300 font-sans text-xs font-semibold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{uiText.hero.downloadCv[lang]}</span>
              </a>

              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
