// src/components/ui/ThemeSwitcher.tsx
"use client";

import React from 'react';
import { useTheme } from '@/components/ui/ThemeContext';

export const ThemeSwitcher: React.FC = () => {
  const { currentTheme, setTheme, availableThemes } = useTheme();

  return (
    <div className="theme-switcher">
      <select 
        value={currentTheme.id} 
        onChange={(e) => setTheme(e.target.value)}
        className="w-[180px] px-3 py-2 rounded-lg bg-opacity-30 border border-opacity-30"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-primary)',
          color: 'var(--text-primary)'
        }}
      >
        {availableThemes.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSwitcher;