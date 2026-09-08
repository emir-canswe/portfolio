'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { personalInfo, socialLinks, uiText } from '@/data/content';
import {
  Menu,
  X,
  Sun,
  Moon,
  Github,
  Globe,
  Radio,
  ExternalLink,
} from 'lucide-react';

export default function Header() {
  const { lang, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  const navItems = [
    { id: 'about', label: uiText.nav.about[lang] },
    { id: 'experience', label: uiText.nav.experience[lang] },
    { id: 'projects', label: uiText.nav.projects[lang] },
    { id: 'skills', label: uiText.nav.skills[lang] },
    { id: 'achievements', label: uiText.nav.achievements[lang] },
    { id: 'contact', label: uiText.nav.contact[lang] },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['about', 'experience', 'projects', 'skills', 'achievements', 'contact'];
      const scrollPosition = window.scrollY + 200;

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
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B0F1A]/85 dark:bg-[#0B0F1A]/90 light:bg-white/90 backdrop-blur-md border-b border-cyan-500/20 py-3 shadow-lg shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Monogram Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-sm"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded bg-[#0f172a] border border-cyan-500/40 text-cyan-400 font-mono font-bold tracking-tighter text-base group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,242,255,0.4)] transition-all">
            <span className="relative z-10">{personalInfo.monogram}</span>
            <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded" />
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-bold text-sm sm:text-base text-slate-100 group-hover:text-cyan-400 transition-colors tracking-tight flex items-center gap-1.5">
              {personalInfo.name}
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </span>
            <span className="font-mono text-[10px] text-cyan-400/80 tracking-widest uppercase">
              SWE // {uiText.nav.status[lang]}
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0f172a]/60 border border-cyan-500/15 rounded-full px-3 py-1.5 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-1 text-xs font-mono tracking-wide rounded-full transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40 shadow-[0_0_10px_rgba(0,242,255,0.2)]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Language, Theme, GitHub */}
        <div className="hidden sm:flex items-center gap-2">
          {/* TR / EN Toggle Button */}
          <button
            onClick={toggleLang}
            aria-label="Toggle Language"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono font-medium rounded border border-cyan-500/25 bg-slate-900/60 hover:border-cyan-400 hover:bg-slate-800/80 text-cyan-300 hover:text-cyan-200 transition-all shadow-sm"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span className={lang === 'en' ? 'font-bold text-cyan-300' : 'text-slate-400'}>EN</span>
            <span className="text-slate-500">/</span>
            <span className={lang === 'tr' ? 'font-bold text-cyan-300' : 'text-slate-400'}>TR</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 text-slate-300 hover:text-cyan-300 rounded border border-cyan-500/25 bg-slate-900/60 hover:border-cyan-400 hover:bg-slate-800/80 transition-all"
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-cyan-400" />
            )}
          </button>

          {/* GitHub Link */}
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 text-slate-300 hover:text-cyan-300 rounded border border-cyan-500/25 bg-slate-900/60 hover:border-cyan-400 hover:bg-slate-800/80 transition-all"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Controls & Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Mobile TR / EN Toggle */}
          <button
            onClick={toggleLang}
            aria-label="Toggle Language"
            className="px-2 py-1 text-xs font-mono font-bold rounded border border-cyan-500/30 bg-slate-900/80 text-cyan-300"
          >
            {lang.toUpperCase()}
          </button>

          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-1.5 rounded border border-cyan-500/30 bg-slate-900/80 text-slate-300"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-cyan-400" />
            )}
          </button>

          {/* Hamburger Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 rounded border border-cyan-500/40 bg-slate-900/90 text-cyan-300 hover:bg-cyan-950/40 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B0F1A]/95 backdrop-blur-xl border-b border-cyan-500/30 px-5 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-mono text-cyan-400">
            <span className="flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              SYSTEM NAVIGATION
            </span>
            <span>HUD v1.0</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-left px-3 py-2.5 text-xs font-mono rounded border transition-all ${
                  activeSection === item.id
                    ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 font-bold shadow-[0_0_10px_rgba(0,242,255,0.2)]'
                    : 'border-slate-800/80 bg-slate-900/60 text-slate-300 hover:border-cyan-500/40 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 flex items-center justify-between border-t border-slate-800/80">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-cyan-300"
            >
              <Github className="w-4 h-4" />
              github.com/emir-canswe
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
