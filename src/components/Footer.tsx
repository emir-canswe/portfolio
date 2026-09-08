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
    <footer className="relative z-10 border-t border-cyan-500/20 bg-[#070A12] py-12 px-4 sm:px-6 lg:px-8 text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: System Branding & Status */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex items-center justify-center w-9 h-9 rounded bg-[#0f172a] border border-cyan-500/40 text-cyan-400 font-mono font-bold text-sm">
            {personalInfo.monogram}
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{uiText.footer.systemStatus[lang]}</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              © {new Date().getFullYear()} {personalInfo.name}. {uiText.footer.rights[lang]}
            </p>
          </div>
        </div>

        {/* Center: Engineering Stack Note */}
        <div className="text-center font-mono text-[11px] text-slate-400 space-y-1">
          <div>{uiText.footer.builtWith[lang]}</div>
          <div className="text-cyan-400/80">{uiText.footer.designedFor[lang]}</div>
        </div>

        {/* Right: Socials & Back-to-Top */}
        <div className="flex items-center gap-3">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2 rounded-lg border border-slate-800 bg-slate-900/60 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2 rounded-lg border border-slate-800 bg-slate-900/60 hover:text-blue-400 hover:border-blue-500/40 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${socialLinks.email}`}
            aria-label="Email"
            className="p-2 rounded-lg border border-slate-800 bg-slate-900/60 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-cyan-500/30 bg-slate-900/80 hover:bg-cyan-500/10 hover:border-cyan-400 text-cyan-300 font-mono text-xs transition-all"
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
