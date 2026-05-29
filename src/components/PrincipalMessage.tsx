/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, Heart, Shield, Award, Calendar, Smile, Eye, Flame, CheckCircle } from 'lucide-react';
import schoolPrincipalPortrait from '../assets/images/school_principal_portrait_1779696698942.png';

export default function PrincipalMessage() {
  const stats = [
    { label: 'Enrolled Toddlers', value: '350+', icon: Smile },
    { label: 'Caring Instructors', value: '18+', icon: Heart },
    { label: 'Activity Rooms', value: '10+', icon: Sparkles },
    { label: 'Years of Trust', value: '18+', icon: Award },
  ];

  const strengths = [
    'Motherly educator-mentors with specialized child behavior training',
    'Full-campus advanced CCTV coverage and guarded safety perimeters',
    'Innovative activity-based learning kits replace stressful exam pressure',
    'Modern, light-filled playgrounds with soft, rounded safety safeguards'
  ];

  return (
    <section id="about" className="py-10 md:py-14 bg-white relative overflow-hidden text-left">
      {/* Background blobs for premium nursery feel */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-amber-100/30 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-blue-100/25 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Quick Trust-Building Intro Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#1e3a8a] tracking-widest uppercase bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full inline-flex items-center space-x-1">
            <Smile size={12} className="text-amber-500 fill-amber-500" />
            <span>Nurturing Tiny Steps Since 2008</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3 mb-2 font-sans">
            A Safe, Happy Place for Your Child to Grow
          </h2>
          <div className="h-1 py-0.5 bg-[#fbbf24] w-12 mx-auto rounded-full mb-3"></div>
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            At Guru Nanak Dev Academy, Batala (Primary and Nursery Block), we replace memory stress with hands-on cognitive exploration. Parents cherish us because children bloom naturally here.
          </p>
        </div>

        {/* Shrunk Bento Grid Intro Cards: Vision, Mission & Strengths */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Card 1: Vision */}
          <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl hover:border-blue-200 transition-colors">
            <span className="bg-[#1e3a8a]/10 p-2 text-[#1e3a8a] rounded-xl inline-block mb-3">
              <Eye size={18} />
            </span>
            <h3 className="text-xs font-extrabold text-gray-950 uppercase tracking-wider mb-2">Our Vision</h3>
            <p className="text-xs text-gray-650 leading-relaxed text-gray-600">
              To inspire life-long values, persistent curiosity, and emotional self-confidence in young toddlers during their most critical early-childhood developmental milestones.
            </p>
          </div>

          {/* Card 2: Mission */}
          <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl hover:border-amber-200 transition-colors">
            <span className="bg-amber-400/10 p-2 text-amber-600 rounded-xl inline-block mb-3">
              <Flame size={18} />
            </span>
            <h3 className="text-xs font-extrabold text-gray-950 uppercase tracking-wider mb-2">Our Mission</h3>
            <p className="text-xs text-gray-650 leading-relaxed text-gray-600">
              To supply premium Montessori play compounds, world-class smart digital classrooms, and a safe, joyful sandbox environment that makes learning look like a beautiful game.
            </p>
          </div>

          {/* Card 3: Key Strengths */}
          <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl hover:border-blue-200 transition-colors lg:col-span-1">
            <h3 className="text-xs font-extrabold text-[#1e3a8a] uppercase tracking-wider mb-3 flex items-center gap-1">
              <CheckCircle size={14} className="text-[#138808]" /> Key Strengths
            </h3>
            <ul className="space-y-2 text-[11px] font-medium text-gray-600 pl-1">
              {strengths.map((str, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#138808] font-bold mt-0.5">✓</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Direct Quote with Director/Principal in short trust snippet */}
        <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100 flex flex-col md:flex-row gap-5 items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#1e3a8a] shadow-xs shrink-0 bg-slate-200">
              <img
                src={schoolPrincipalPortrait}
                alt="Early Childhood Directress - Director Ravinder Kaur Sandhu"
                className="w-full h-full object-cover transition-all hover:scale-105 duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-amber-600 tracking-wider">From the Nursery Director</p>
              <h4 className="text-xs font-bold text-gray-950">Director Ravinder Kaur Sandhu</h4>
              <p className="text-[11px] text-gray-500 italic mt-0.5 leading-snug">
                "We believe every toddler has a unique spark. Our playrooms are decorated to make them feel like their second home."
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center space-x-1.5 bg-[#1e3a8a] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs">
            <Calendar size={12} className="text-amber-400" />
            <span>Admissions Active 2026-27</span>
          </div>
        </div>

        {/* Compact trust metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-3.5 rounded-xl border border-gray-150 text-center hover:shadow-xs transition-shadow">
              <span className="text-xl font-extrabold text-[#1e3a8a] block">{stat.value}</span>
              <span className="text-[9.5px] font-bold text-gray-450 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
