'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * Navbar - Glassmorphic navigation bar with scroll-triggered state transitions
 * Client Component - Required for scroll detection
 */

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-white font-bold text-xl hover:opacity-80 transition-opacity focus:ring-2 focus:ring-white/50 focus:outline-none rounded"
          >
            Kudo
          </Link>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-slate-300 hover:text-white transition-colors text-sm font-medium px-4 py-2 focus:ring-2 focus:ring-white/50 focus:outline-none rounded"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-white text-slate-900 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-white/90 transition-all hover:scale-105 focus:ring-2 focus:ring-white/50 focus:outline-none"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
