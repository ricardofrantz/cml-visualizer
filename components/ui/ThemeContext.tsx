"use client";

// src/themes/ThemeContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { ThemeColors, ThemeContext as ThemeContextType } from '@/lib/theme-types';
import { allThemes, tronTheme } from '@/lib/theme-variants';

// Create the context with default values
const ThemeContext = createContext<ThemeContextType>({
  currentTheme: tronTheme, // Default to Tron theme
  setTheme: () => {},
  availableThemes: allThemes,
});

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to get the saved theme from localStorage, or use default
  const [currentTheme, setCurrentTheme] = useState<ThemeColors>(() => {
    if (typeof window !== 'undefined') {
      const savedThemeId = localStorage.getItem('themeId');
      if (savedThemeId) {
        const savedTheme = allThemes.find(theme => theme.id === savedThemeId);
        if (savedTheme) return savedTheme;
      }
    }
    return tronTheme; // Default to Tron theme
  });

  // Function to set the current theme
  const setTheme = (themeId: string) => {
    const newTheme = allThemes.find(theme => theme.id === themeId);
    if (newTheme) {
      setCurrentTheme(newTheme);
      if (typeof window !== 'undefined') {
        localStorage.setItem('themeId', themeId);
      }
    }
  };

  // Apply theme CSS variables to the document root
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      
      // Background colors
      root.style.setProperty('--bg-primary', currentTheme.background.primary);
      root.style.setProperty('--bg-secondary', currentTheme.background.secondary);
      root.style.setProperty('--bg-card', currentTheme.background.card);
      root.style.setProperty('--bg-header', currentTheme.background.header);
      root.style.setProperty('--bg-footer', currentTheme.background.footer);
      
      // Text colors
      root.style.setProperty('--text-primary', currentTheme.text.primary);
      root.style.setProperty('--text-secondary', currentTheme.text.secondary);
      root.style.setProperty('--text-accent', currentTheme.text.accent);
      root.style.setProperty('--text-muted', currentTheme.text.muted);
      
      // Border colors
      root.style.setProperty('--border-primary', currentTheme.border.primary);
      root.style.setProperty('--border-secondary', currentTheme.border.secondary);
      root.style.setProperty('--border-focus', currentTheme.border.focus);
      
      // Visualization colors
      root.style.setProperty('--viz-primary', currentTheme.visualization.primary);
      root.style.setProperty('--viz-secondary', currentTheme.visualization.secondary);
      root.style.setProperty('--viz-tertiary', currentTheme.visualization.tertiary);
      root.style.setProperty('--viz-accent', currentTheme.visualization.accent);
      root.style.setProperty('--viz-grid', currentTheme.visualization.grid);
      root.style.setProperty('--viz-point', currentTheme.visualization.point);
      root.style.setProperty('--viz-line', currentTheme.visualization.line);
      root.style.setProperty('--viz-area', currentTheme.visualization.area);
      
      // Button colors
      root.style.setProperty('--btn-primary-bg', currentTheme.button.primary.background);
      root.style.setProperty('--btn-primary-hover', currentTheme.button.primary.hover);
      root.style.setProperty('--btn-primary-text', currentTheme.button.primary.text);
      root.style.setProperty('--btn-secondary-bg', currentTheme.button.secondary.background);
      root.style.setProperty('--btn-secondary-hover', currentTheme.button.secondary.hover);
      root.style.setProperty('--btn-secondary-text', currentTheme.button.secondary.text);
      root.style.setProperty('--btn-outline-border', currentTheme.button.outline.border);
      root.style.setProperty('--btn-outline-hover', currentTheme.button.outline.hover);
      root.style.setProperty('--btn-outline-text', currentTheme.button.outline.text);
    }
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, availableThemes: allThemes }}>
      {children}
    </ThemeContext.Provider>
  );
};
