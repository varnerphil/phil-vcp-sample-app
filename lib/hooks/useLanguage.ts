"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export type Language = 'en' | 'es';

export const languageLinks: Record<Language, string> = {
  en: "/en/home",
  es: "/es/home",
};

const LANGUAGE_KEY = 'preferred_language';

export function useLanguage() {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>('en');

  // Load saved language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_KEY) as Language;
    if (savedLanguage && Object.keys(languageLinks).includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Function to change language and save preference
  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem(LANGUAGE_KEY, newLanguage);
    // Also set a cookie for SSR/middleware
    Cookies.set(LANGUAGE_KEY, newLanguage, { path: '/' });
    router.push(languageLinks[newLanguage]);
  };

  return {
    language,
    changeLanguage,
    languageLinks
  };
}
