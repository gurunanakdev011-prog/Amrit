/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Heart, Sparkles, ChevronLeft, Calendar } from 'lucide-react';
import schoolHeroBuilding from '../assets/images/school_hero_building_1779696676451.png';

const SLIDES = [
  {
    image: schoolHeroBuilding,
    tagline: 'GNDA Nursery & Primary Wing',
    motto: 'Where Learning is a Beautiful Adventure',
    description: 'Nurturing academic progress with play-based methodologies, digital smart rooms, and caring educator guides in Batala.',
  },
  {
    image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=1200',
    tagline: 'Innovative Cognitive Learning',
    motto: 'Nurturing Curious Minds & Gentle Hearts',
    description: 'Equipping our children with advanced activity kits, interactive toys, safety, and modern primary foundations.',
  },
  {
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200',
    tagline: 'Vibrant Childhood Development',
    motto: 'Every Child Is Specially Gifted & Loved',
    description: 'Providing premium playgrounds, active security supervision, and beautiful artistic spaces to bloom fully.',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  // Auto-scroll slides (resets automatically when currentSlide changes)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(e.targetTouches[0].clientX); // Reset end coordinates
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    const threshold = 50;
    const diff = touchStartX - touchEndX;
    if (diff > threshold) {
      // Swiped left - show next slide
      handleNext();
    } else if (diff < -threshold) {
      // Swiped right - show previous slide
      handlePrev();
    }
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeSlide = SLIDES[currentSlide];

  return (
    <section
      id="home"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-[60vh] sm:min-h-[75vh] lg:min-h-[90vh] flex items-center justify-center pt-8 overflow-hidden bg-slate-950 text-white select-none touch-pan-y"
    >
      {/* Background Hero Image Slides with AnimatePresence */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={activeSlide.image}
              alt="Guru Nanak Dev Academy Children"
              className="w-full h-full object-cover object-center filter brightness-[0.42] contrast-[1.02]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>

        {/* Soft Linear/Radial Royal Blue Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/85 via-black/40 to-blue-950/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/10"></div>
      </div>

      {/* Decorative Golden Light Rings */}
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-[#fbbf24] opacity-15 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-blue-500 opacity-15 blur-3xl pointer-events-none"></div>

      {/* Hero Content Area */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12 text-center lg:text-left w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
        {/* Left column: Headings and CTAs */}
        <div className="lg:col-span-8 flex flex-col space-y-4 md:space-y-5 text-left items-start">
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-amber-400 text-blue-950 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-extrabold tracking-wider uppercase shadow-md"
          >
            <Heart size={12} className="fill-current text-red-500 animate-pulse shrink-0" />
            <span>Premium Primary & Nursery School</span>
          </motion.div>

          {/* Sliding dynamic headings container */}
          <div className="min-h-[150px] sm:min-h-[180px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.12,
                    }
                  },
                  exit: { opacity: 0, transition: { duration: 0.2 } },
                }}
                className="space-y-2 md:space-y-3"
              >
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="text-[#fbbf24] font-bold text-xs md:text-sm tracking-widest uppercase flex items-center gap-1"
                >
                  <Sparkles size={14} className="text-[#fbbf24]" />
                  {activeSlide.tagline}
                </motion.p>
                <motion.h1
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
                  }}
                  className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-sans leading-tight text-white"
                >
                  {activeSlide.motto.split('&')[0]}
                  {activeSlide.motto.includes('&') && <>&<br />
                    <span className="text-[#fbbf24]">
                      {activeSlide.motto.split('&')[1].trim()}
                    </span>
                  </>}
                </motion.h1>
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="text-slate-200 text-xs sm:text-sm md:text-base max-w-xl font-medium leading-relaxed"
                >
                  {activeSlide.description}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Quick CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto pt-2">
            <button
              onClick={() => scrollToSection('gallery')}
              className="w-full sm:w-auto bg-[#fbbf24] hover:bg-amber-400 text-blue-950 font-extrabold text-xs md:text-sm px-6 py-3 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <span>Explore Photo Gallery</span>
              <ChevronRight size={15} />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/35 text-white font-bold text-xs md:text-sm px-6 py-3 rounded-xl backdrop-blur-xs transition-transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>Contact Admissions</span>
            </button>
          </div>
        </div>

        {/* Right column: Cute trust highlight box */}
        <div className="lg:col-span-4 bg-white/10 border border-white/20 p-5 rounded-2xl backdrop-blur-md text-left hidden lg:block hover:border-[#fbbf24]/40 transition-colors">
          <div className="flex items-center space-x-2 text-[#fbbf24] mb-3">
            <Calendar size={16} />
            <span className="text-[10px] font-bold tracking-widest uppercase">Ongoing Registrations</span>
          </div>
          <h3 className="text-white font-bold text-sm mb-1.5 font-sans leading-snug">
            Seats Open for Playgroup, Nursery, LKG, UKG & Classes I - V
          </h3>
          <p className="text-slate-200 text-[11px] leading-relaxed mb-3">
            Secure your child’s emotional growth and core intelligence in our state-of-the-art playground and happy class zones. Easy documentation process.
          </p>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
            className="text-[11px] text-[#fbbf24] hover:text-[#fbbf24]/85 font-extrabold flex items-center space-x-1"
          >
            <span>Ask Admissions Desk</span>
            <ChevronRight size={12} />
          </a>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              currentSlide === idx ? 'w-6 bg-[#fbbf24]' : 'w-2 bg-white/40'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
