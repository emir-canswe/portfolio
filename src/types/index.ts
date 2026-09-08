export type Language = 'en' | 'tr';

export type ProjectCategory = 'All' | 'Web' | 'Mobile' | 'AI & Data' | 'Security';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  featured?: boolean;
  award?: {
    en: string;
    tr: string;
  };
  shortDesc: {
    en: string;
    tr: string;
  };
  longDesc?: {
    en: string;
    tr: string;
  };
  tech: string[];
  githubUrl?: string;
  demoUrl?: string;
  metrics?: {
    label: { en: string; tr: string };
    value: string;
  }[];
}

export interface Experiment {
  id: string;
  title: string;
  category: string;
  shortDesc: {
    en: string;
    tr: string;
  };
  tech: string[];
  githubUrl?: string;
}

export interface Experience {
  company: string;
  role: {
    en: string;
    tr: string;
  };
  period: {
    en: string;
    tr: string;
  };
  location: string;
  type: {
    en: string;
    tr: string;
  };
  highlights: {
    en: string[];
    tr: string[];
  };
  tech: string[];
}

export interface SkillCategory {
  id: string;
  name: {
    en: string;
    tr: string;
  };
  skills: {
    name: string;
    level?: string;
    highlight?: boolean;
  }[];
}

export interface Achievement {
  id: string;
  title: {
    en: string;
    tr: string;
  };
  event: {
    en: string;
    tr: string;
  };
  award: {
    en: string;
    tr: string;
  };
  projectRef?: string;
  date: string;
  icon: string;
  description: {
    en: string;
    tr: string;
  };
}

export interface SocialLinks {
  email: string;
  github: string;
  linkedin: string;
  instagram: string;
}
