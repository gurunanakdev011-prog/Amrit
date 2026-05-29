/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import Hero from './components/Hero';
import TrustSection from './components/TrustSection';
import GallerySection from './components/GallerySection';
import Highlights from './components/Highlights';
import Testimonials from './components/Testimonials';
import PrincipalMessage from './components/PrincipalMessage';
import CampusMap from './components/CampusMap';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-white min-h-screen text-slate-800 antialiased font-sans selection:bg-[#fbbf24] selection:text-blue-950">
      {/* Sticky Header Menu */}
      <Header />

      <main className="relative overflow-x-hidden pt-[56px] md:pt-[100px]">
        {/* HERO BANNER - Sliding high fidelity hero banner with tagline triggers */}
        <Hero />

        {/* TRUST BADGES BAR - Ratings, secure and caring key highlights under hero */}
        <TrustSection />

        {/* PREMIUM UNIFIED MEDIA HUB - Mixed photo and video moments with smart filters */}
        <GallerySection />

        {/* SCHOOL FACILITIES & HIGHLIGHTS - Smart Classrooms, safe playgrounds, stats */}
        <Highlights />

        {/* PARENT REVIEWS & RATINGS - Visual ratings & trust builders & dynamic Add Review form */}
        <Testimonials />

        {/* COMPACT ABOUT SECTION - Introduction, vision, mission and key strengths */}
        <PrincipalMessage />

        {/* VISIT OUR CAMPUS & CONTACT SECTION - GPS live map coordinates, cards & info */}
        <CampusMap />
      </main>

      {/* Socials, copyrights and scroll to top footer */}
      <Footer />
    </div>
  );
}
