import React from 'react';
import Link from 'next/link';
import { Twitter, Github } from 'lucide-react';

/**
 * Footer - Minimalist dark footer
 * Server Component (default)
 */

const footerLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

const socialLinks = [
  { platform: "Twitter", icon: Twitter, href: "https://twitter.com", ariaLabel: "Visit our Twitter" },
  { platform: "GitHub", icon: Github, href: "https://github.com", ariaLabel: "Visit our GitHub" },
];

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Main footer row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          {/* Left: Branding */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-1">Kudu</h3>
            <p className="text-slate-500 text-sm">Task Management Made Simple</p>
          </div>

          {/* Center: Navigation Links */}
          <nav className="flex items-center gap-6">
            {footerLinks.map((link, index) => (
              <React.Fragment key={link.href}>
                <Link
                  href={link.href}
                  className="text-slate-400 hover:text-white transition-colors text-sm focus:ring-2 focus:ring-white/50 focus:outline-none rounded"
                >
                  {link.label}
                </Link>
                {index < footerLinks.length - 1 && (
                  <span className="text-slate-700">|</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Right: Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg focus:ring-2 focus:ring-white/50 focus:outline-none"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="text-center pt-8 border-t border-slate-800/50">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Kudu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
