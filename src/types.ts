/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  label: string;
  href: string;
}

export interface Notice {
  id: string;
  date: string;
  title: string;
  content: string;
  type: 'urgent' | 'info' | 'academic' | 'event';
  pdfUrl?: string;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  iconName: string; // Resolves to Lucide icon
  image: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: 'sports' | 'academic' | 'campus' | 'celebration';
  isVideo?: boolean;
}

export interface Highlight {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  feedback: string;
  rating: number;
  image: string;
}

export interface VideoItem {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  category: string;
}
