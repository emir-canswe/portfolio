'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { experiments, projects, uiText } from '@/data/content';
import { Project, ProjectCategory } from '@/types';
import ProjectModal from './ProjectModal';
import {
  Star,
  ExternalLink,
  Github,
  Maximize2,
  FlaskConical,
  Award,
} from 'lucide-react';

export default function ProjectsSection() {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories: ProjectCategory[] = ['All', 'Web', 'Mobile', 'AI & Data', 'Security'];

  const filteredProjects = projects.filter((p) => {
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  });

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-sky-600 dark:text-cyan-400 tracking-wider mb-2 font-semibold">
              <span className="w-2 h-2 rounded-sm bg-sky-500 dark:bg-cyan-400" />
              {uiText.projects.sectionTag[lang]}
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {uiText.projects.title[lang]}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              {uiText.projects.subtitle[lang]}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-cyan-500/20 rounded-2xl backdrop-blur-md self-start md:self-auto shadow-xs">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-sans font-medium tracking-wide transition-all ${
                    isActive
                      ? 'bg-sky-600 dark:bg-cyan-500 text-white dark:text-slate-950 font-bold shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/80'
                  }`}
                >
                  {uiText.projects.filters[cat][lang]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`hud-glass hud-glass-hover rounded-2xl flex flex-col justify-between p-6 transition-all group ${
                project.featured
                  ? 'border-sky-300/80 dark:border-cyan-500/40 shadow-sm dark:shadow-[0_0_20px_rgba(0,242,255,0.1)]'
                  : 'border-slate-200/90 dark:border-slate-800'
              } hud-corner-brackets`}
            >
              <div>
                {/* Card Top: Category + Star/Award */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sky-700 dark:text-cyan-300 font-medium">
                    {project.category}
                  </span>

                  {project.featured && (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-500/30 font-semibold">
                      <Star className="w-3 h-3 fill-amber-500 dark:fill-amber-400 text-amber-500 dark:text-amber-400" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Award Banner if any */}
                {project.award && (
                  <div className="mb-3 text-[11px] font-sans font-medium text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/20 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span className="truncate">{project.award[lang]}</span>
                  </div>
                )}

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-cyan-300 transition-colors mb-2">
                  {project.title}
                </h3>

                {/* Short Description */}
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                  {project.shortDesc[lang]}
                </p>
              </div>

              <div>
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.slice(0, 5).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-700 dark:text-slate-300 group-hover:border-sky-300 dark:group-hover:border-cyan-500/30 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 5 && (
                    <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                      +{project.tech.length - 5}
                    </span>
                  )}
                </div>

                {/* Action Links */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-sky-400 dark:hover:border-cyan-400 transition-colors"
                        title={uiText.projects.viewRepo[lang]}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}

                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-sky-200 dark:border-cyan-500/30 bg-sky-50 dark:bg-cyan-500/10 text-sky-700 dark:text-cyan-300 hover:bg-sky-100 dark:hover:bg-cyan-500/20 text-xs font-mono transition-colors font-medium"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Demo</span>
                      </a>
                    )}
                  </div>

                  {/* Flagship Detail Modal Trigger */}
                  {project.longDesc ? (
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex items-center gap-1 text-xs font-mono font-medium text-sky-700 dark:text-cyan-300 hover:text-sky-800 dark:hover:text-cyan-200 bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-cyan-500/40 hover:border-sky-400 dark:hover:border-cyan-400 px-3 py-1.5 rounded-lg transition-all shadow-xs"
                    >
                      <span>{uiText.projects.viewDeepArchitecture[lang]}</span>
                      <Maximize2 className="w-3 h-3 text-sky-600 dark:text-cyan-400" />
                    </button>
                  ) : (
                    <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                      {project.category}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* More Experiments Section */}
        <div className="mt-16 pt-12 border-t border-slate-200 dark:border-cyan-500/15">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-violet-50 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-500/30 flex items-center justify-center">
                <FlaskConical className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {uiText.projects.experimentsTitle[lang]}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {uiText.projects.experimentsSubtitle[lang]}
                </p>
              </div>
            </div>
            <span className="font-mono text-xs text-violet-700 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 px-3 py-1 rounded-full border border-violet-200 dark:border-violet-500/30 self-start sm:self-auto font-medium">
              R&D // LAB LOGS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {experiments.map((exp) => (
              <div
                key={exp.id}
                className="hud-glass rounded-2xl p-4 border-slate-200 dark:border-slate-800 hover:border-violet-400 dark:hover:border-violet-500/40 transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-violet-700 dark:text-violet-300 uppercase font-semibold">
                    {exp.category}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 dark:bg-violet-400" />
                </div>
                <h4 className="font-sans font-bold text-sm text-slate-900 dark:text-white group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors mb-1.5">
                  {exp.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-3">
                  {exp.shortDesc[lang]}
                </p>
                <div className="flex flex-wrap gap-1">
                  {exp.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-[10px] font-mono text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Flagship Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
