/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentType } from 'react';
import { motion } from 'motion/react';
import { Tv, Sparkles, Lock, Users, Heart } from 'lucide-react';
import { SCHOOL_HIGHLIGHTS } from '../data';

// Maps string name of icon to corresponding Lucide Icon
const iconMap: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  Tv,
  Sparkles,
  Lock,
  Users,
  Heart,
};

export default function Highlights() {
  return (
    <section id="facilities" className="py-12 md:py-16 bg-[#1e3a8a] text-white relative overflow-hidden text-left">
      {/* Background Graphic blobs */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-0.5 bg-gradient-to-r from-white/5 via-amber-400/5 to-white/5 pointer-events-none"></div>
      <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-[#fbbf24] opacity-5 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-blue-950 tracking-widest uppercase bg-amber-400 px-3.5 py-1.5 rounded-full inline-flex items-center space-x-1">
            <Sparkles size={11} className="fill-current" />
            <span>Nursery & Primary Facilities</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 mb-2 font-sans tracking-tight">
            Designed for Playful Excellence
          </h2>
          <div className="h-1 py-0.5 bg-[#fbbf24] w-12 mx-auto rounded-full mb-3"></div>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
            We understand early education. Every wing, seat, playground swing, and lesson map is curated carefully to build confidence in young toddlers.
          </p>
        </div>

        {/* HIGHLIGHT CONTENT MATRIX */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {SCHOOL_HIGHLIGHTS.map((highlight, index) => {
            const IconComponent = iconMap[highlight.iconName];
            return (
              <motion.div
                key={highlight.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-white/10 border border-white/15 hover:border-amber-400 p-5 rounded-2xl transition-all duration-300 relative overflow-hidden group text-left"
              >
                {/* Glowing Icon Package */}
                <div className="flex-shrink-0 bg-amber-400 text-blue-950 p-2.5 rounded-xl max-w-max mb-4 shadow-sm group-hover:scale-105 transition-transform">
                  {IconComponent && <IconComponent size={20} className="stroke-[2.5]" />}
                </div>

                <div className="space-y-1">
                  <h3 className="font-sans font-extrabold text-sm text-white group-hover:text-amber-300 transition-colors">
                    {highlight.title}
                  </h3>
                  <p className="text-slate-200 text-xs leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
