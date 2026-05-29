/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Menu, X, Award, Sparkles } from 'lucide-react';
import { MENU_ITEMS } from '../data';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('home');

  // Tracks scroll to change background opacity
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = MENU_ITEMS.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveItem(MENU_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string, id: string) => {
    setIsOpen(false);
    setActiveItem(id);
    const element = document.querySelector(href);
    if (element) {
      // Calculate header offset
      const offset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-305">
      {/* Top Secondary Announcement Bar */}
      <div className="bg-[#1e3a8a] text-white text-[11px] py-1.5 px-4 shadow-sm border-b border-blue-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center font-sans font-medium">
          <div className="flex items-center space-x-5">
            <a href="tel:+919876543210" className="flex items-center space-x-1 hover:text-amber-400 transition-colors">
              <Phone size={11} className="text-amber-400" />
              <span>+91 98765-43210</span>
            </a>
            <span className="flex items-center space-x-1 text-slate-200">
              <MapPin size={11} className="text-amber-400" />
              <span>Batala, Punjab, India</span>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="bg-amber-400 text-blue-980 text-[9.5px] px-2.5 py-0.5 rounded-full font-extrabold uppercase animate-pulse flex items-center gap-1">
              <Sparkles size={9} className="fill-current" /> Admissions Active 2026-27
            </span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-md py-2 border-b border-gray-100'
            : 'bg-white md:bg-black/20 backdrop-blur-md md:text-white text-[#1e3a8a] py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          
          {/* Logo & School Name */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home', 'home'); }}
            className="flex items-center space-x-2.5 group cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-[#fbbf24] text-blue-950 shadow group-hover:scale-105 transition-transform">
              <Award size={18} className="stroke-[2.5]" />
            </div>
            <div className="text-left">
              <h1 className="font-sans font-black text-xs md:text-sm tracking-tight leading-none uppercase">
                Guru Nanak Dev
              </h1>
              <p className={`text-[9.5px] font-bold tracking-wider uppercase transition-colors ${
                isScrolled ? 'text-[#1e3a8a]' : 'text-[#fbbf24]'
              }`}>
                Academy, Batala
              </p>
            </div>
          </a>

          {/* Desktop Navbar Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {MENU_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href, item.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all hover:bg-black/5 cursor-pointer relative ${
                  activeItem === item.id
                    ? isScrolled
                      ? 'text-[#1e3a8a]'
                      : 'text-white md:bg-white/20'
                    : isScrolled
                    ? 'text-gray-650 hover:text-[#1e3a8a]'
                    : 'text-blue-950 md:text-slate-100'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact', 'contact'); }}
              className="ml-3 bg-[#fbbf24] hover:bg-amber-400 text-blue-950 font-extrabold px-4.5 py-2 rounded-xl shadow text-[10px] tracking-wider uppercase transition-all hover:scale-105"
            >
              Admissions
            </a>
          </div>

          {/* Mobile Menu Button - OPTIMIZED FOR PHONES */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <X size={20} className={isScrolled ? 'text-gray-800' : 'text-blue-950 md:text-white'} />
            ) : (
              <Menu size={20} className={isScrolled ? 'text-gray-800' : 'text-blue-950 md:text-white'} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden w-full bg-white border-b border-gray-150 shadow-xl overflow-hidden"
          >
            <div className="px-5 py-4 space-y-1.5">
              {MENU_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href, item.id);
                  }}
                  className={`block px-4 py-2.5 rounded-lg text-xs font-bold tracking-wide text-left ${
                    activeItem === item.id
                      ? 'bg-[#1e3a8a] text-white'
                      : 'text-gray-750 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-3 border-t border-gray-100 flex flex-col space-y-2">
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); handleNavClick('#contact', 'contact'); }}
                  className="bg-[#1e3a8a] hover:bg-blue-850 text-white font-extrabold text-center py-2.5 rounded-lg text-xs tracking-wider uppercase"
                >
                  Connect admissions
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
