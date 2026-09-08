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
  Globe,
  Radio,
  ExternalLink,
  Layers,
  Briefcase,
  FolderGit2,
  Cpu,
  Trophy,
  Mail,
  Download,
  X,
  Crosshair,
  Terminal,
  Activity,
  Compass,
} from 'lucide-react';

export default function Header() {
  const { lang, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');
  const [telemetryTime, setTelemetryTime] = useState<string>('');

  const navItems = [
    { id: 'about', index: '01', label: uiText.nav.about[lang], icon: Layers },
    { id: 'experience', index: '02', label: uiText.nav.experience[lang], icon: Briefcase },
    { id: 'projects', index: '03', label: uiText.nav.projects[lang], icon: FolderGit2 },
    { id: 'skills', index: '04', label: uiText.nav.skills[lang], icon: Cpu },
    { id: 'achievements', index: '05', label: uiText.nav.achievements[lang], icon: Trophy },
    { id: 'contact', index: '06', label: uiText.nav.contact[lang], icon: Mail },
  ];

  // Real-time UTC telemetry clock for tactical feel
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const mins = String(now.getUTCMinutes()).padStart(2, '0');
      const secs = String(now.getUTCSeconds()).padStart(2, '0');
      setTelemetryTime(`${hours}:${mins}:${secs} UTC`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll listener to highlight active section and apply elevation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);

      const sections = ['about', 'experience', 'projects', 'skills', 'achievements', 'contact'];
      const scrollPosition = window.scrollY + 250;

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
      const offset = 80;
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
    <>
      {/* =========================================================================
          DESKTOP & TOP HUD CAPSULE
          ========================================================================= */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none py-3 sm:py-4 px-3 sm:px-6 lg:px-8 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          
          {/* LEFT: Futuristic Monogram Radar Module */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group relative flex items-center gap-3 px-3.5 py-2 rounded-xl bg-[#090D16]/90 border border-cyan-500/30 backdrop-blur-xl shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,242,255,0.35)] transition-all"
          >
            {/* Spinning Radar Ring */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-lg border border-cyan-500/40 group-hover:border-cyan-400 transition-colors" />
              <div className="absolute inset-[-2px] rounded-lg border border-cyan-400/30 border-t-cyan-400 border-r-transparent animate-[spin_8s_linear_infinite]" />
              <span className="font-mono font-black text-sm text-cyan-300 tracking-tighter">
                {personalInfo.monogram}
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-sans font-extrabold text-sm text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                  {personalInfo.name}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#10b981]" />
              </div>
              <div className="flex items-center gap-1.5 text-[9px] font-mono text-cyan-400/75 tracking-wider">
                <span>SYS // ACTIVE</span>
                {telemetryTime && (
                  <>
                    <span className="text-slate-600">|</span>
                    <span className="hidden sm:inline text-slate-400">{telemetryTime}</span>
                  </>
                )}
              </div>
            </div>

            {/* Corner Bracket Accents */}
            <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
            <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />
          </a>

          {/* CENTER: Segmented Mission Deck Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-2xl bg-[#090D16]/85 border border-cyan-500/25 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] relative overflow-hidden">
            {/* Ambient Top Scanline */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-mono text-xs tracking-wider transition-all z-10 ${
                    isActive
                      ? 'text-cyan-200 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  {/* Floating active pill behind the active button */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-xl bg-cyan-500/20 border border-cyan-400/60 shadow-[0_0_15px_rgba(0,242,255,0.3)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  <span className="text-[9px] text-cyan-400/60 font-mono">
                    {item.index}
                  </span>
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* RIGHT: Tactical Matrix Controls (Desktop & Mobile trigger) */}
          <div className="flex items-center gap-2">
            {/* TR / EN Frequency Selector */}
            <button
              onClick={toggleLang}
              aria-label="Toggle Language"
              className="relative group flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#090D16]/90 border border-cyan-500/30 backdrop-blur-xl text-xs font-mono text-cyan-300 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,242,255,0.25)] transition-all"
              title="Switch Language (TR / EN)"
            >
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="font-bold tracking-wider">
                {lang === 'en' ? 'EN' : 'TR'}
              </span>
              <span className="text-[10px] text-slate-500 hidden sm:inline">// 433MHz</span>
            </button>

            {/* Night / Day Optics Sensor (Theme Toggle) */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Optics Mode"
              className="p-2 rounded-xl bg-[#090D16]/90 border border-cyan-500/30 backdrop-blur-xl text-slate-300 hover:text-cyan-300 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,242,255,0.25)] transition-all"
              title={theme === 'dark' ? 'Optics: Night Vision Active (Switch to Light)' : 'Optics: Day Vision Active (Switch to Dark)'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-cyan-400 hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* Direct GitHub Node */}
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile Node"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#090D16]/90 border border-cyan-500/30 backdrop-blur-xl text-xs font-mono text-slate-300 hover:text-cyan-300 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,242,255,0.25)] transition-all"
            >
              <Github className="w-3.5 h-3.5 text-cyan-400" />
              <span>GITHUB</span>
            </a>

            {/* Mobile Holographic Menu Trigger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Holographic Command Matrix"
              className="lg:hidden relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500/15 border border-cyan-400 text-cyan-300 font-mono text-xs font-bold backdrop-blur-xl shadow-[0_0_20px_rgba(0,242,255,0.3)] hover:bg-cyan-500/25 transition-all active:scale-95"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>{mobileMenuOpen ? 'CLOSE' : 'MATRIX'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MOBILE FLOATING THUMB DOCK (Bottom Center)
          An ergonomic, thumb-accessible futuristic quick dock on mobile!
          ========================================================================= */}
      <div className="lg:hidden fixed bottom-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
        <nav className="pointer-events-auto flex items-center gap-1 px-3 py-2 rounded-2xl bg-[#0B0F1A]/90 border border-cyan-500/40 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(0,242,255,0.2)]">
          {navItems.slice(0, 4).map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative flex flex-col items-center justify-center w-14 py-1.5 rounded-xl text-[10px] font-mono transition-all ${
                  isActive
                    ? 'text-cyan-300 font-bold bg-cyan-500/20 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,242,255,0.3)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 mb-0.5" />
                <span className="tracking-tighter">{item.label}</span>
              </button>
            );
          })}

          {/* Quick Trigger for full matrix */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col items-center justify-center w-14 py-1.5 rounded-xl text-[10px] font-mono text-cyan-400 bg-slate-900 border border-cyan-500/30 hover:border-cyan-400"
          >
            <Crosshair className="w-4 h-4 mb-0.5 animate-spin-slow" />
            <span className="tracking-tighter font-bold">ALL (6)</span>
          </button>
        </nav>
      </div>

      {/* =========================================================================
          FULL-SCREEN HOLOGRAPHIC HUD COMMAND MATRIX (Mobile Drawer)
          ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="lg:hidden fixed inset-0 z-50 bg-[#070A12]/95 backdrop-blur-2xl flex flex-col justify-between p-5 overflow-y-auto"
          >
            {/* Top Bar of the Command Matrix */}
            <div className="flex items-center justify-between pb-4 border-b border-cyan-500/30">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                <span>HOLOGRAPHIC FLIGHT DECK // MENU</span>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Menu"
                className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Matrix Tile Grid (2 columns of 3 high-tech HUD cards) */}
            <div className="grid grid-cols-2 gap-3 my-6">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative p-4 rounded-xl text-left border flex flex-col justify-between h-28 transition-all ${
                      isActive
                        ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_20px_rgba(0,242,255,0.25)] text-white'
                        : 'bg-[#0B0F1A] border-slate-800 hover:border-cyan-500/40 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-mono text-xs text-cyan-400 font-bold">
                        // {item.index}
                      </span>
                      <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                    </div>

                    <div>
                      <div className="font-sans font-bold text-sm text-white">
                        {item.label}
                      </div>
                      <div className="font-mono text-[10px] text-cyan-300/70 mt-0.5">
                        SECTOR_{item.id.toUpperCase()}
                      </div>
                    </div>

                    {/* Active marker line */}
                    {isActive && (
                      <span className="absolute bottom-0 inset-x-3 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions Matrix inside Mobile Drawer */}
            <div className="space-y-3 pt-4 border-t border-slate-800/80 font-mono text-xs">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={toggleLang}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-cyan-300 font-bold"
                >
                  <Globe className="w-4 h-4" />
                  <span>LANG: {lang.toUpperCase()}</span>
                </button>

                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-slate-200"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="w-4 h-4 text-amber-400" />
                      <span>LIGHT MODE</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 text-cyan-400" />
                      <span>DARK MODE</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href={`${basePath}/cv.pdf`}
                download="Emircan_Can_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold font-sans tracking-wide shadow-[0_0_20px_rgba(0,242,255,0.3)]"
              >
                <Download className="w-4 h-4" />
                <span>{uiText.hero.downloadCv[lang]}</span>
              </a>

              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300"
              >
                <Github className="w-4 h-4 text-cyan-400" />
                <span>github.com/emir-canswe</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
