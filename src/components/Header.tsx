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
            1. LEFT FLOATING PILL: IDENTITY & STATUS (Exact "Av. Zülfükar CAN / Danışma Açık" structure)
            ========================================================================= */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 px-3.5 sm:px-4 py-2 rounded-full bg-white text-slate-900 border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_10px_35px_rgba(0,0,0,0.18)] transition-all shrink-0 group"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-mono font-bold text-xs sm:text-sm shadow-inner shrink-0 group-hover:scale-105 transition-transform">
            <Terminal className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex flex-col text-left pr-1">
            <span className="font-sans font-bold text-xs sm:text-sm text-slate-900 tracking-tight leading-tight">
              Emircan CAN
            </span>
            <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium text-emerald-600 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>{lang === 'tr' ? 'Danışma Açık' : 'Available for Work'}</span>
            </span>
          </div>
        </a>

        {/* =========================================================================
            2. CENTER FLOATING PILL: NAVIGATION CAPSULE (with green dot below active item)
            ========================================================================= */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 px-7 py-3 rounded-full bg-white text-slate-700 border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative font-sans text-xs sm:text-[13px] py-0.5 transition-colors ${
                  isActive
                    ? 'text-slate-950 font-bold'
                    : 'text-slate-600 hover:text-slate-950 font-medium'
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
            3. RIGHT FLOATING PILLS: (1) WHITE CONTACT/CONTROLS PILL + (2) DARK "RANDEVU AL" PILL
            ========================================================================= */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* White Pill: Green Icon + Contact + Controls (Matches 0507 016 18 13 capsule) */}
          <div className="flex items-center gap-3 px-3.5 sm:px-4 py-2 rounded-full bg-white text-slate-900 border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
            <a
              href={`mailto:${socialLinks.email}`}
              className="flex items-center gap-2 text-xs font-mono font-medium text-slate-800 hover:text-emerald-600 transition-colors"
              title="Email"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="hidden sm:inline">{socialLinks.email}</span>
            </a>

            <span className="hidden sm:inline text-slate-300">|</span>

            {/* Language & Theme Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setLang(lang === 'en' ? 'tr' : 'en')}
                className="text-[11px] font-sans font-bold text-slate-600 hover:text-slate-950 uppercase transition-colors"
                title="Switch Language"
              >
                {lang === 'en' ? 'TR' : 'EN'}
              </button>

              <button
                onClick={toggleTheme}
                className="text-slate-600 hover:text-amber-500 transition-colors p-0.5"
                title="Toggle Theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-sky-600" />
                )}
              </button>
            </div>
          </div>

          {/* Dark Pill: Exact "📅 RANDEVU AL" Action Button */}
          <button
            onClick={() => scrollToSection('contact')}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B101D] hover:bg-[#141C30] text-white font-sans font-bold text-xs tracking-wider uppercase border border-slate-700/80 shadow-[0_4px_16px_rgba(0,0,0,0.35)] hover:scale-105 active:scale-95 transition-all shrink-0"
          >
            <Calendar className="w-3.5 h-3.5 text-white" />
            <span>{lang === 'tr' ? 'RANDEVU AL' : 'GET IN TOUCH'}</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-white border border-slate-200/90 text-slate-800 shadow-md"
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
