'use client';

import React, { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Project } from '@/types';
import { uiText } from '@/data/content';
import {
  X,
  ExternalLink,
  Github,
  Star,
  Activity,
  Layers,
  Award,
  Terminal,
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { lang } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0B0F1A] border border-slate-200 dark:border-cyan-500/40 rounded-3xl shadow-2xl dark:shadow-[0_0_50px_rgba(0,242,255,0.25)] p-5 sm:p-8 text-slate-800 dark:text-slate-200 hud-corner-brackets"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-cyan-500/20 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 dark:bg-cyan-400 animate-pulse" />
            <span className="font-mono text-xs text-sky-700 dark:text-cyan-400 tracking-widest uppercase font-semibold">
              MISSION ARCHITECTURE // {project.category.toUpperCase()}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Project Modal"
            className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-sky-400 dark:hover:border-cyan-400 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Award Badge if present */}
        {project.award && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 text-amber-800 dark:text-amber-300 font-sans text-xs sm:text-sm font-semibold mb-4">
            <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>{project.award[lang]}</span>
          </div>
        )}

        {/* Project Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3 flex items-center gap-3">
          {project.title}
          {project.featured && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-50 dark:bg-cyan-500/15 border border-sky-200 dark:border-cyan-500/40 text-sky-700 dark:text-cyan-300 font-mono text-xs font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-500 dark:fill-cyan-400 text-amber-500 dark:text-cyan-400" />
              {uiText.projects.featuredBadge[lang]}
            </span>
          )}
        </h2>

        {/* Short summary */}
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-sans">
          {project.shortDesc[lang]}
        </p>

        {/* Telemetry Metrics Grid */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs font-mono text-sky-700 dark:text-cyan-400 uppercase tracking-wider mb-3 font-semibold">
              <Activity className="w-3.5 h-3.5" />
              {uiText.modal.keyMetrics[lang]}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {project.metrics.map((m, mIdx) => (
                <div
                  key={mIdx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
                >
                  <span className="font-mono text-base sm:text-lg font-bold text-sky-700 dark:text-cyan-300">
                    {m.value}
                  </span>
                  <span className="font-sans text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    {m.label[lang]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Long Architectural Deep Dive */}
        {project.longDesc && (
          <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-sky-200 dark:border-cyan-500/20">
            <div className="flex items-center gap-2 text-xs font-mono text-sky-700 dark:text-cyan-300 uppercase tracking-wider mb-2 font-semibold">
              <Terminal className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
              {uiText.modal.deepDive[lang]}
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {project.longDesc[lang]}
            </p>
          </div>
        )}

        {/* Technologies Breakdown */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-3 font-semibold">
            <Layers className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
            {uiText.modal.technologies[lang]}
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, tIdx) => (
              <span
                key={tIdx}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-cyan-500/30 text-slate-700 dark:text-cyan-200 text-xs font-mono font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-bold font-sans text-xs sm:text-sm transition-all shadow-sm"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{uiText.modal.visitDemo[lang]}</span>
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 border border-slate-200 dark:border-cyan-500/30 dark:hover:border-cyan-400 text-slate-800 dark:text-white font-mono text-xs sm:text-sm transition-all"
            >
              <Github className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
              <span>{uiText.modal.visitRepo[lang]}</span>
            </a>
          )}

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-sans text-xs sm:text-sm transition-all"
          >
            {uiText.modal.close[lang]}
          </button>
        </div>
      </div>
    </div>
  );
}
