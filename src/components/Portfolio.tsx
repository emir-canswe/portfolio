'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { projects } from '@/data/content';
import Frame, { View } from './Frame';
import FeaturedRail from './FeaturedRail';
import ProjectIndex from './ProjectIndex';
import AboutView from './AboutView';
import ProjectDetail from './ProjectDetail';
import Preloader from './Preloader';
import Cursor from './Cursor';

function parseHash(hash: string): { view: View; project: string | null } {
  const h = hash.replace(/^#\/?/, '');
  if (h === 'index') return { view: 'index', project: null };
  if (h === 'about') return { view: 'about', project: null };
  if (h.startsWith('work/')) {
    const id = h.slice(5);
    if (projects.some((p) => p.id === id)) return { view: 'featured', project: id };
  }
  return { view: 'featured', project: null };
}

export default function Portfolio() {
  const [view, setView] = useState<View>('featured');
  const [project, setProject] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      const next = parseHash(window.location.hash);
      setProject(next.project);
      if (!next.project) setView(next.view);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const go = useCallback((next: View) => {
    window.location.hash = next === 'featured' ? '' : next;
    if (next === 'featured') {
      // Clearing the hash leaves a bare "#"; tidy the URL.
      history.replaceState(null, '', window.location.pathname + window.location.search);
      setView('featured');
      setProject(null);
    }
  }, []);

  const open = useCallback((id: string) => {
    window.location.hash = `work/${id}`;
  }, []);

  const close = useCallback(() => {
    setProject(null);
    history.replaceState(null, '', window.location.pathname + window.location.search + (view === 'featured' ? '' : `#${view}`));
  }, [view]);

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Frame view={view} onNavigate={go} ready={ready} />

      <AnimatePresence mode="wait">
        <motion.main
          key={view}
          className="fixed inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
        >
          {view === 'featured' && <FeaturedRail ready={ready} onOpen={open} />}
          {view === 'index' && <ProjectIndex onOpen={open} />}
          {view === 'about' && <AboutView />}
        </motion.main>
      </AnimatePresence>

      <ProjectDetail id={project} onClose={close} onOpen={open} />
      <Cursor />
    </>
  );
}
