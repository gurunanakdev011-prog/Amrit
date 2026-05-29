/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Highlight, GalleryItem, Testimonial, VideoItem } from './types';

export const MENU_ITEMS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About Us', href: '#about' },
  { id: 'gallery', label: 'Media Gallery', href: '#gallery' },
  { id: 'facilities', label: 'Facilities', href: '#facilities' },
  { id: 'reviews', label: 'Reviews', href: '#reviews' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const SCHOOL_HIGHLIGHTS: Highlight[] = [
  {
    id: 'smart-class',
    title: 'Smart Classes',
    description: 'Animated lessons and multi-media teaching that keeps toddlers and children fully glued with wonder.',
    iconName: 'Tv',
  },
  {
    id: 'activity-learning',
    title: 'Activity-Based Learning',
    description: 'Montessori play-based labs, painting, physical blocks, sandpits, and custom craft workshops.',
    iconName: 'Sparkles',
  },
  {
    id: 'safe-env',
    title: 'Safe Environment',
    description: 'Verified guardians exit protocols, active child CCTV coverage, rounded-furniture and childproof walls.',
    iconName: 'Lock',
  },
  {
    id: 'exp-teachers',
    title: 'Experienced Teachers',
    description: 'Gentle, motherly educator-mentors skilled in behavioral therapy and early learning milestones.',
    iconName: 'Users',
  },
  {
    id: 'kids-friendly',
    title: 'Kids-Friendly Atmosphere',
    description: 'Vibrant wall murals, interactive golden toys, beautiful gardens, and bright welcoming smiles.',
    iconName: 'Heart',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    src: 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&q=80&w=800',
    title: 'Interactive Group Activity in Bright Sandbox',
    category: 'academic',
  },
  {
    id: 'gal-2',
    src: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800',
    title: 'Creative Building Blocks & Logical Thinking Time',
    category: 'academic',
  },
  {
    id: 'gal-3',
    src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    title: 'Playground Fun & Safe Climbing Sliders',
    category: 'campus',
  },
  {
    id: 'gal-4',
    src: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800',
    title: 'Digital Tab Interactive Storytelling Sessions',
    category: 'academic',
  },
  {
    id: 'gal-5',
    src: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800',
    title: 'Handmades Paper Craft & Artistic Display Studio',
    category: 'celebration',
  },
  {
    id: 'gal-6',
    src: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&q=80&w=800',
    title: 'Music Circle & Rhythmic Movement Class',
    category: 'celebration',
  },
  {
    id: 'gal-7',
    src: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=800',
    title: 'Fun Toddlers Races & Athletics Sports Morning',
    category: 'sports',
  },
  {
    id: 'gal-8',
    src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800',
    title: 'Bright Modern Kindergarten Classroom Compound',
    category: 'campus',
  },
  {
    id: 'gal-9',
    src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800',
    title: 'Caring Teacher Guiding Early Letters Writing',
    category: 'academic',
  }
];

export const VIDEO_ITEMS: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'Vibrant GNDA Campus & Fun Swings Tour',
    duration: '2:15',
    thumbnail: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1', // Placeholder or custom educational video
    category: 'Campus Tour'
  },
  {
    id: 'vid-2',
    title: 'Interactive Smart Class Storytelling Session',
    duration: '1:45',
    thumbnail: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    category: 'Smart Class'
  },
  {
    id: 'vid-3',
    title: 'Montessori Sand & Water Interactive Play',
    duration: '3:05',
    thumbnail: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    category: 'Activity Learning'
  },
  {
    id: 'vid-4',
    title: 'Toddlers Sports Day 100m Cute Obstacle Race',
    duration: '1:20',
    thumbnail: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    category: 'Sports Day'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Sardar Jagminder Singh Bajwa',
    role: 'Parent of Kirpal Singh (Nursery)',
    feedback: 'Enrolling Kirpal at Guru Nanak Dev Academy Batala was the best decision. The synthesis of CBSE prep with high discipline and warm, maternal care has made him absolutely love going to school everyday!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 't-2',
    name: 'Harpreet Kaur Kahlon',
    role: 'Parent of Sukhmani Kaur (Upper KG)',
    feedback: 'The teachers treat the children like their own. Sukhmani has started speaking English nursery lines with absolute confidence and her motor skills have improved so much through the physical blocks play sessions.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 't-3',
    name: 'Dr. Amrik Singh Randhawa',
    role: 'Local Child Specialist & Parent',
    feedback: 'As a pediatrician, I am highly selective of safety and hygiene. GNDA has beautiful rounded-edge furniture, clean corridors, active CCTV, and a warm learning atmosphere that nurtures emotional growth.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
  },
];
