/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Facebook, Twitter, Instagram, Youtube, Award, Phone, Mail, MapPin, ArrowUp, Heart } from 'lucide-react';
import { MENU_ITEMS } from '../data';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-white relative pt-12 pb-6 border-t border-slate-900 overflow-hidden text-left">
      {/* Decorative colored glow */}
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#1e3a8a]/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 font-sans">
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-8">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <span className="bg-[#fbbf24] p-2.5 rounded-full text-blue-950 inline-block shadow">
                <Award size={20} className="stroke-[2.5]" />
              </span>
              <div>
                <h3 className="font-sans font-black text-sm uppercase tracking-tight leading-tight">
                  Guru Nanak Dev
                </h3>
                <p className="text-xs text-[#fbbf24] font-bold tracking-wider uppercase">
                  Academy, Batala
                </p>
              </div>
            </div>
            <p className="text-gray-450 text-xs leading-relaxed max-w-sm text-gray-400">
              A premium co-educational nurturing nursery and primary school where playful methodologies meet safe campus infrastructure.
            </p>

            {/* Social media connections */}
            <div className="flex space-x-2 pt-1">
              {[
                { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
                { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
              ].map((sc, scIdx) => (
                <a
                  key={scIdx}
                  href={sc.href}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white/5 hover:bg-[#fbbf24] hover:text-blue-950 p-2 rounded-xl text-gray-300 transition-all"
                  aria-label={sc.label}
                >
                  <sc.icon size={14} className="fill-current" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick scroll links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#fbbf24] uppercase tracking-widest border-l-2 border-[#fbbf24] pl-2.5">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              {MENU_ITEMS.map(item => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="hover:text-amber-400 transition-all flex items-center space-x-1"
                  >
                    <span>&rsaquo;</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Academic Accreditations */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#fbbf24] uppercase tracking-widest border-l-2 border-[#fbbf24] pl-2.5">
              Accreditation
            </h4>
            <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
              <div>
                <p className="font-bold text-gray-200">GNDA PLAYGROUP</p>
                <p className="text-[10px]">Playgroup to Class V</p>
              </div>
              <div className="bg-[#fbbf24]/10 border border-[#fbbf24]/30 p-2 rounded-xl text-[10px] text-[#fbbf24] inline-flex items-center gap-1 font-bold">
                <Heart size={10} className="fill-current text-red-500" /> Safe Gated Campus
              </div>
            </div>
          </div>

          {/* Col 4: Reach Us directly */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#fbbf24] uppercase tracking-widest border-l-2 border-[#fbbf24] pl-2.5">
              Contact Desk
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li className="flex items-start space-x-2">
                <MapPin size={13} className="text-[#fbbf24] shrink-0 mt-0.5" />
                <span className="leading-snug text-[11px]">Guru Nanak Dev Academy, Batala, Punjab, India</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={13} className="text-[#fbbf24] shrink-0" />
                <span className="font-sans font-semibold">+91 98765-43210</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={13} className="text-[#fbbf24] shrink-0" />
                <span className="font-mono text-[10px]">gndacademybatala@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright segment */}
        <div className="pt-6 mt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-sans">
          <p className="text-center sm:text-left text-[11px]">
            &copy; {new Date().getFullYear()} Guru Nanak Dev Academy, Batala. All Rights Reserved. Designed with premium safety specs.
          </p>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleScrollToTop}
              className="bg-white/5 hover:bg-[#fbbf24] hover:text-blue-950 p-2 rounded-xl text-gray-300 transition-all flex items-center space-x-1 cursor-pointer font-bold text-[10px] uppercase tracking-wider"
              aria-label="Scroll back to top of screen"
            >
              <span>Scroll to Top</span>
              <ArrowUp size={12} className="stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
