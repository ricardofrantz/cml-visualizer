// src/app/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{
      background: `linear-gradient(135deg, var(--bg-primary), var(--bg-secondary))`
    }}>
      <header className="p-6 border-b border-opacity-30" style={{
        borderColor: 'var(--border-primary)',
        backgroundColor: 'var(--bg-header)'
      }}>
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold" style={{ color: 'var(--text-accent)' }}>
              CML Visualizer
            </h1>
            <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
              Explore chaos and complexity through interactive visualizations
            </p>
          </div>
          <ThemeSwitcher />
        </div>
      </header>

      <main className="flex-grow container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Logistic Map Card */}
          <Link href="/maps/logistic" className="block">
            <div className="h-full p-6 rounded-lg transition-all duration-300 hover:scale-105" style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-primary)',
              borderWidth: '1px'
            }}>
              <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-accent)' }}>
                Logistic Map
              </h2>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                The simplest chaotic system, demonstrating period doubling and chaos.
              </p>
              <div className="h-40 rounded bg-opacity-20 flex items-center justify-center" style={{
                backgroundColor: 'var(--bg-secondary)'
              }}>
                <span className="text-5xl">🔄</span>
              </div>
            </div>
          </Link>

          {/* Henon Map Card */}
          <Link href="/maps/henon" className="block">
            <div className="h-full p-6 rounded-lg transition-all duration-300 hover:scale-105" style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-primary)',
              borderWidth: '1px'
            }}>
              <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-accent)' }}>
                Hénon Map
              </h2>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                A classic 2D discrete dynamical system with a strange attractor.
              </p>
              <div className="h-40 rounded bg-opacity-20 flex items-center justify-center" style={{
                backgroundColor: 'var(--bg-secondary)'
              }}>
                <span className="text-5xl">🌀</span>
              </div>
            </div>
          </Link>

          {/* Standard Map Card */}
          <Link href="/maps/standard" className="block">
            <div className="h-full p-6 rounded-lg transition-all duration-300 hover:scale-105" style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-primary)',
              borderWidth: '1px'
            }}>
              <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-accent)' }}>
                Standard Map
              </h2>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                A conservative system showing the transition to chaos in Hamiltonian systems.
              </p>
              <div className="h-40 rounded bg-opacity-20 flex items-center justify-center" style={{
                backgroundColor: 'var(--bg-secondary)'
              }}>
                <span className="text-5xl">🔄</span>
              </div>
            </div>
          </Link>

          {/* CML Diffusive Card */}
          <Link href="/cml/diffusive" className="block">
            <div className="h-full p-6 rounded-lg transition-all duration-300 hover:scale-105" style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-primary)',
              borderWidth: '1px'
            }}>
              <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-accent)' }}>
                Diffusive CML
              </h2>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                Coupled Map Lattice with diffusive coupling, showing pattern formation.
              </p>
              <div className="h-40 rounded bg-opacity-20 flex items-center justify-center" style={{
                backgroundColor: 'var(--bg-secondary)'
              }}>
                <span className="text-5xl">🌊</span>
              </div>
            </div>
          </Link>

          {/* CML Global Card */}
          <Link href="/cml/global" className="block">
            <div className="h-full p-6 rounded-lg transition-all duration-300 hover:scale-105" style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-primary)',
              borderWidth: '1px'
            }}>
              <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-accent)' }}>
                Global CML
              </h2>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                Coupled Map Lattice with global coupling, showing synchronization.
              </p>
              <div className="h-40 rounded bg-opacity-20 flex items-center justify-center" style={{
                backgroundColor: 'var(--bg-secondary)'
              }}>
                <span className="text-5xl">🔄</span>
              </div>
            </div>
          </Link>

          {/* About Card */}
          <Link href="/about" className="block">
            <div className="h-full p-6 rounded-lg transition-all duration-300 hover:scale-105" style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-primary)',
              borderWidth: '1px'
            }}>
              <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-accent)' }}>
                About
              </h2>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                Learn more about chaos theory, dynamical systems, and this application.
              </p>
              <div className="h-40 rounded bg-opacity-20 flex items-center justify-center" style={{
                backgroundColor: 'var(--bg-secondary)'
              }}>
                <span className="text-5xl">ℹ️</span>
              </div>
            </div>
          </Link>
        </div>
      </main>

      <footer className="p-6 border-t border-opacity-30" style={{
        borderColor: 'var(--border-primary)',
        backgroundColor: 'var(--bg-footer)'
      }}>
        <div className="container mx-auto text-center" style={{ color: 'var(--text-muted)' }}>
          CML Visualizer - A futuristic exploration of chaos and complexity
        </div>
      </footer>
    </div>
  );
}
