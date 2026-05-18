'use client';

import { useEffect, useState } from 'react';

type AppTheme = 'dark' | 'light';

export function useAppTheme(defaultTheme: AppTheme = 'light') {
  const [theme, setTheme] = useState<AppTheme>(() => {
    if (typeof window === 'undefined') {
      return defaultTheme;
    }

    const storedTheme = window.localStorage.getItem('rb-theme');
    if (storedTheme === 'dark' || storedTheme === 'light') {
      return storedTheme;
    }
    return defaultTheme;
  });

  useEffect(() => {
    window.localStorage.setItem('rb-theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, setTheme, toggleTheme };
}
