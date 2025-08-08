// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ui/ThemeContext';
import MacOSCompatibility from '@/components/ui/MacOSCompatibility';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CML Visualizer - Explore Chaos and Complexity',
  description: 'Interactive visualization of coupled map lattices and iterative maps',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <MacOSCompatibility />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
