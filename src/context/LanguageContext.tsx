'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language } from '@/types';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    // Check localStorage or browser language
    try {
      const savedLang = localStorage.getItem('emircan_lang') as Language | null;
      if (savedLang === 'en' || savedLang === 'tr') {
        setLangState(savedLang);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('emircan_lang', newLang);
    } catch {
      // Ignore localStorage errors
    }
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'tr' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
