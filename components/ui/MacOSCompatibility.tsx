"use client";

// src/components/ui/MacOSCompatibility.tsx
import React, { useEffect } from 'react';

/**
 * Component to handle macOS-specific compatibility adjustments
 * This component doesn't render anything visible but applies
 * necessary adjustments for macOS systems
 */
export const MacOSCompatibility: React.FC = () => {
  useEffect(() => {
    // Detect if running on macOS
    const isMacOS = () => {
      if (typeof window !== 'undefined') {
        return navigator.platform.toUpperCase().indexOf('MAC') >= 0 ||
               navigator.userAgent.toUpperCase().indexOf('MAC') >= 0;
      }
      return false;
    };

    // Apply macOS specific adjustments
    if (isMacOS()) {
      // Add macOS class to body for specific styling
      document.body.classList.add('macos');
      
      // Fix for font rendering on macOS
      document.documentElement.style.setProperty('-webkit-font-smoothing', 'antialiased');
      document.documentElement.style.setProperty('-moz-osx-font-smoothing', 'grayscale');
      
      // Fix for scrollbar appearance on macOS
      const style = document.createElement('style');
      style.textContent = `
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `;
      document.head.appendChild(style);
    }
    
    // Handle macOS trackpad and mouse wheel behavior
    const handleWheel = (e: WheelEvent) => {
      // Adjust sensitivity for trackpad
      if (Math.abs(e.deltaX) < 10 && Math.abs(e.deltaY) < 10) {
        // Likely a trackpad with fine-grained control
        // No need to modify behavior
      } else {
        // Likely a mouse wheel, might need to prevent overscrolling
        if (Math.abs(e.deltaY) > 100) {
          // Prevent excessive scrolling
          e.preventDefault();
        }
      }
    };
    
    // Only add listener if we're in the browser
    if (typeof window !== 'undefined') {
      // Use passive: false to allow preventDefault
      window.addEventListener('wheel', handleWheel, { passive: false });
      
      // Cleanup
      return () => {
        window.removeEventListener('wheel', handleWheel);
      };
    }
  }, []);

  // This component doesn't render anything
  return null;
};

export default MacOSCompatibility;
