/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Star, Quote, ShieldCheck, Heart, Sparkles, Send, Check } from 'lucide-react';
import { TESTIMONIALS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export default function Testimonials() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('Parent');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('gnda_reviews_v1');
    if (stored) {
      try {
        setReviews(JSON.parse(stored));
      } catch (e) {
        setReviews(TESTIMONIALS);
      }
    } else {
      setReviews(TESTIMONIALS);
      localStorage.setItem('gnda_reviews_v1', JSON.stringify(TESTIMONIALS));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !feedback.trim()) return;

    const newReview = {
      id: 'r-' + Date.now(),
      name: name.trim(),
      role: role.trim() || 'Parent',
      feedback: feedback.trim(),
      rating: rating,
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200', // Premium neutral user profile silhouette representation
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('gnda_reviews_v1', JSON.stringify(updated));

    // Reset Form
    setName('');
    setRole('Parent');
    setFeedback('');
    setRating(5);
    setSuccessMsg(true);

    setTimeout(() => {
      setSuccessMsg(false);
    }, 4500);
  };

  return (
    <section id="reviews" className="py-12 md:py-16 bg-white relative overflow-hidden text-left border-b border-gray-100">
      
      {/* Background radial highlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-50/45 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#1e3a8a] tracking-widest uppercase bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full inline-flex items-center space-x-1">
            <Heart size={12} className="text-red-500 fill-red-500" />
            <span>Hear From Our Parents</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3 mb-2 font-sans tracking-tight">
            Loved by Batala Parents
          </h2>
          <div className="h-1 py-0.5 bg-[#fbbf24] w-12 mx-auto rounded-full mb-3"></div>
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
            Nothing builds confidence like the genuine thoughts of mothers and fathers who watch their toddlers jump with joy to school every morning.
          </p>
        </div>

        {/* REVIEWS GRID SPLIT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Testimonial cards timeline feed */}
          <div className="lg:col-span-7 flex flex-col space-y-4 max-h-[620px] overflow-y-auto pr-1 select-none custom-scrollbar pb-4">
            <AnimatePresence initial={false}>
              {reviews.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.35 }}
                  className="bg-slate-50 border border-slate-100 p-5 rounded-2xl shadow-xs relative flex flex-col justify-between hover:bg-slate-50/20 hover:border-blue-200 transition-all duration-300 shrink-0"
                >
                  <div>
                    {/* Background Quote Mark */}
                    <div className="text-blue-200 absolute top-4 right-4 opacity-40">
                      <Quote size={24} className="fill-current" />
                    </div>

                    {/* Stars Row */}
                    <div className="flex space-x-0.5 mb-2.5">
                      {Array.from({ length: 5 }).map((_, starIdx) => (
                        <Star
                          key={starIdx}
                          size={12}
                          className={`${
                            starIdx < testimonial.rating
                              ? 'fill-[#fbbf24] text-[#fbbf24]'
                              : 'text-gray-200'
                          } stroke-[1]`}
                        />
                      ))}
                    </div>

                    {/* Feedback Quote */}
                    <p className="text-xs text-gray-700 font-medium leading-relaxed italic pr-2 mb-4">
                      &ldquo;{testimonial.feedback}&rdquo;
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center space-x-3 pt-3 border-t border-slate-200/55">
                    <div className="w-9 h-9 rounded-full bg-blue-100 text-[#1e3a8a] border border-blue-200 flex items-center justify-center font-extrabold text-xs shadow-xs uppercase shrink-0">
                      {testimonial.name.slice(0, 2)}
                    </div>
                    <div className="text-left">
                      <h4 className="font-sans font-extrabold text-xs text-slate-900 flex items-center gap-1 leading-tight">
                        <span>{testimonial.name}</span>
                        <ShieldCheck size={11} className="text-[#138808] inline fill-[#138808]/10" />
                      </h4>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wide mt-0.5">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Right Column: Give Review dynamic form card sticky on desktop */}
          <div className="lg:col-span-5 lg:sticky lg:top-[120px]">
            <div className="bg-[#1e3a8a] border border-blue-900 text-white p-5 sm:p-6 rounded-3xl shadow-md relative overflow-hidden">
              {/* Golden Yellow Accents */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#fbbf24]/10 to-transparent rounded-bl-3xl"></div>
              
              <div className="mb-4">
                <span className="text-[10px] bg-amber-400 text-blue-950 font-black px-2 py-1 rounded-md uppercase tracking-wider inline-block">
                  Parents Shared Space
                </span>
                <h3 className="text-lg font-black font-sans text-white mt-1.5 flex items-center gap-1">
                  <Sparkles size={16} className="text-amber-400" /> Share Your Happy Experience
                </h3>
                <p className="text-[11px] text-slate-200 mt-1">
                  How has your child’s emotional development and learning progress bloomed under our educators’ caring guidance? Let other parents know!
                </p>
              </div>

              {/* Form elements */}
              <form onSubmit={handleSubmit} className="space-y-3 pt-2 text-left">
                
                {/* Interactive Star Selection */}
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-300 uppercase tracking-widest block">
                    Your Rating Rating
                  </label>
                  <div className="flex items-center space-x-1.5 bg-blue-950/45 px-3 py-2 rounded-xl border border-blue-900/60 w-fit">
                    {Array.from({ length: 5 }).map((_, idx) => {
                      const starValue = idx + 1;
                      const isHighlighted = hoveredRating !== null ? starValue <= hoveredRating : starValue <= rating;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onMouseEnter={() => setHoveredRating(starValue)}
                          onMouseLeave={() => setHoveredRating(null)}
                          onClick={() => setRating(starValue)}
                          className="focus:outline-none transition-transform hover:scale-120 cursor-pointer"
                        >
                          <Star
                            size={18}
                            className={`${
                              isHighlighted
                                ? 'fill-[#fbbf24] text-[#fbbf24]'
                                : 'text-slate-500 border-none'
                            } transition-colors duration-150`}
                          />
                        </button>
                      );
                    })}
                    <span className="text-[10px] font-bold text-amber-300 uppercase shrink-0 pl-1.5">
                      {rating} Star{rating > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                {/* Input: Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-300 uppercase tracking-widest block">
                    Your Name (Parent)
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Harbhajan Singh Sandhu"
                    className="w-full bg-blue-950/45 border border-blue-900/60 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors font-medium"
                  />
                </div>

                {/* Input: Role (e.g. Parent of Sukhmani, UKG) */}
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-300 uppercase tracking-widest block">
                    Student Link / Role
                  </label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g., Parent of Sukhmani (Class I)"
                    className="w-full bg-blue-950/45 border border-blue-900/60 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors font-medium"
                  />
                </div>

                {/* Textarea: Testimonial Text */}
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-300 uppercase tracking-widest block">
                    Your True Experience Feedback
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Write a few lines on what your child loves most about Guru Nanak Dev Academy..."
                    className="w-full bg-blue-950/45 border border-blue-900/60 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors font-medium resize-none leading-relaxed"
                  ></textarea>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-[#fbbf24] hover:bg-amber-400 text-blue-950 font-black text-xs uppercase tracking-wider py-3 rounded-2xl shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-1.5 cursor-pointer mt-1"
                >
                  <Send size={12} className="shrink-0" />
                  <span>Submit Parent Review</span>
                </button>

                {/* Live custom success confirmation indicator inside form */}
                <AnimatePresence>
                  {successMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-2 bg-green-500/15 border border-green-550/25 p-2 rounded-xl flex items-center gap-1.5"
                    >
                      <span className="p-1 rounded-full bg-green-500 text-white leading-none">
                        <Check size={8} className="stroke-[3]" />
                      </span>
                      <span className="text-[9.5px] font-bold text-green-300">
                        Thank you! Review published instantly to the local parent timeline above.
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

              </form>
            </div>
          </div>

        </div>

        {/* Small Trust Micro-badge */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-yellow-50 border border-yellow-100 rounded-full py-2 px-5 text-left shadow-2xs">
            <Sparkles size={13} className="text-amber-500 fill-amber-500 shrink-0" />
            <span className="text-[10.5px] font-bold text-gray-500 uppercase tracking-wide">
              All school testimonials are submitted under local verification guidelines.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
