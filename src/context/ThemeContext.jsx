import { createContext, useContext, useState, useEffect } from 'react';

/**
 * Theme Context
 * Manages site-wide theme switching between:
 * - 'dark' (current gold/black aesthetic)
 * - 'glass' (Apple liquid glass aesthetic)
 * - 'light' (inverse/light mode)
 */

const ThemeContext = createContext();

export const THEMES = {
  dark: {
    id: 'dark',
    name: 'Dark Mode',
    icon: 'mdi:moon-waning-crescent',
    description: 'Classic dark with gold accents',
  },
  glass: {
    id: 'glass',
    name: 'Liquid Glass',
    icon: 'mdi:blur',
    description: 'Apple-inspired frosted glass',
  },
  light: {
    id: 'light',
    name: 'Light Mode',
    icon: 'mdi:white-balance-sunny',
    description: 'Clean light aesthetic',
  },
};

export const ThemeProvider = ({ children }) => {
  // Get initial theme from localStorage or default to 'dark'
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme');
      return saved && THEMES[saved] ? saved : 'glass';
    }
    return 'glass';
  });

  // Apply theme class to document root
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('theme-dark', 'theme-glass', 'theme-light');
    
    // Add current theme class
    root.classList.add(`theme-${theme}`);
    
    // Save to localStorage
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const cycleTheme = () => {
    const themeOrder = ['dark', 'glass', 'light'];
    const currentIndex = themeOrder.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    setTheme(themeOrder[nextIndex]);
  };

  const value = {
    theme,
    setTheme,
    cycleTheme,
    themeConfig: THEMES[theme],
    themes: THEMES,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;

