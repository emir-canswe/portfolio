'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { personalInfo, socialLinks, uiText } from '@/data/content';
import { ArrowUp, Github, Linkedin, Mail, Instagram, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const { lang } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-slate-200 dark:border-cyan-500/20 bg-slate-100/90 dark:bg-[#070A12] py-12 px-4 sm:px-6 lg:px-8 text-slate-600 dark:text-slate-400 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: System Branding & Status */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex items-center justify-center w-9 h-9 rounded bg-white dark:bg-[#0f172a] border border-slate-300 dark:border-cyan-500/40 text-sky-600 dark:text-cyan-400 font-mono font-bold text-sm shadow-xs">
            {personalInfo.monogram}
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-sky-700 dark:text-cyan-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>{uiText.footer.systemStatus[lang]}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              © {new Date().getFullYear()} {personalInfo.name}. {uiText.footer.rights[lang]}
            </p>
          </div>
        </div>

        {/* Center: Engineering Stack Note */}
        <div className="text-center font-mono text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
          <div>{uiText.footer.builtWith[lang]}</div>
          <div className="text-sky-700 dark:text-cyan-400/80">{uiText.footer.designedFor[lang]}</div>
        </div>

        {/* Right: Socials & Back-to-Top */}
        <div className="flex items-center gap-3">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2 rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-400 hover:text-sky-600 dark:hover:text-cyan-400 hover:border-sky-400 dark:hover:border-cyan-500/40 transition-colors shadow-xs"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2 rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 dark:hover:border-blue-500/40 transition-colors shadow-xs"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${socialLinks.email}`}
            aria-label="Email"
            className="p-2 rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-400 hover:text-sky-600 dark:hover:text-cyan-400 hover:border-sky-400 dark:hover:border-cyan-500/40 transition-colors shadow-xs"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 dark:border-cyan-500/30 bg-white dark:bg-slate-900/80 hover:bg-slate-50 dark:hover:bg-cyan-500/10 hover:border-sky-400 dark:hover:border-cyan-400 text-sky-700 dark:text-cyan-300 font-mono text-xs shadow-xs transition-all"
            title="Scroll to Top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>{uiText.footer.backToTop[lang]}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
