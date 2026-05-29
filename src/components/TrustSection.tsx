/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Star, Award, Heart } from 'lucide-react';

export default function TrustSection() {
  const badges = [
    {
      id: 'badge-1',
      icon: Star,
      iconColor: 'text-[#fbbf24] fill-[#fbbf24]',
      title: 'Top Rated Primary',
      subtitle: '4.9/5 Star Parent Rating',
      bg: 'bg-amber-500/5 hover:bg-amber-500/10 border-amber-200/50',
    },
    {
      id: 'badge-2',
      icon: ShieldCheck,
      iconColor: 'text-green-600',
      title: '100% Secure Campus',
      subtitle: 'CCTV Covered Perimeters',
      bg: 'bg-green-500/5 hover:bg-green-500/10 border-green-200/50',
    },
    {
      id: 'badge-3',
      icon: Award,
      iconColor: 'text-blue-600',
      title: 'Activity Curriculum',
      subtitle: 'Montessori Stress-free Play',
      bg: 'bg-blue-500/5 hover:bg-blue-500/10 border-blue-200/50',
    },
    {
      id: 'badge-4',
      icon: Heart,
      iconColor: 'text-red-500 fill-red-500/30',
      title: 'Motherly Care Mentors',
      subtitle: '1:15 Child Teacher Ratio',
      bg: 'bg-red-500/5 hover:bg-red-500/10 border-red-200/50',
    },
  ];

  return (
    <section className="py-8 bg-slate-50 border-b border-gray-150 relative overflow-hidden select-none">
      {/* Dynamic graphic lines */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-blue-500/15 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Row of badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {badges.map((b, idx) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className={`flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 p-4 rounded-2xl border bg-white shadow-xs transition-all duration-300 ${b.bg}`}
              >
                <div className={`p-2.5 rounded-xl bg-white shadow-2xs shrink-0 flex items-center justify-center`}>
                  <Icon size={18} className={b.iconColor} />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 leading-tight">
                    {b.title}
                  </h4>
                  <p className="text-[10px] text-gray-500 font-bold tracking-wide mt-1 uppercase">
                    {b.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Micro ticker / social proof banner beneath */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-5 border-t border-slate-200/40">
          <div className="flex items-center space-x-1">
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={11} className="text-[#fbbf24] fill-[#fbbf24]" />
              ))}
            </span>
            <span className="text-[10.5px] font-bold text-slate-700">
              Trusted by 500+ Batala Families
            </span>
          </div>
          <span className="hidden sm:inline text-gray-300 font-light">•</span>
          <div className="text-[10.5px] font-bold text-slate-600 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span>Admissions Open for Nursery & Primary (2026-27 Session)</span>
          </div>
        </div>

      </div>
    </section>
  );
}
