/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Navigation, ExternalLink, Sparkles, Shield, AlertTriangle } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';

const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

// Latitude & Longitude coordinates of Guru Nanak Dev Academy, Batala, Punjab
const SCHOOL_COORDS = { lat: 31.805383, lng: 75.216729 };
const GAPS_MAP_URL = 'https://maps.app.goo.gl/r6rXMPUCJbqGniaN6';
const GET_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${SCHOOL_COORDS.lat},${SCHOOL_COORDS.lng}`;

export default function CampusMap() {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoWindowOpen, setInfoWindowOpen] = useState(true);

  return (
    <section id="contact" className="py-12 md:py-16 bg-white relative overflow-hidden text-left border-b border-gray-150">
      {/* Background radial designs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-50/45 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#1e3a8a] tracking-widest uppercase bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full inline-flex items-center space-x-1">
            <MapPin size={12} className="text-red-500 fill-red-500 animate-bounce" />
            <span>Visit Our Campus</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3 mb-2 font-sans tracking-tight">
            Take a Trip To Our Beautiful School
          </h2>
          <div className="h-1 py-0.5 bg-[#fbbf24] w-14 mx-auto rounded-full mb-3"></div>
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
            Our campus is located in a quiet, pollution-free, safe nursery compound in Batala, Punjab. Follow our directions to drop by anytime!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column 1: Address Card Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-slate-50 border border-slate-200 p-6 rounded-3xl space-y-5 shadow-sm relative overflow-hidden"
            >
              {/* Highlight background corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#fbbf24]/10 to-transparent rounded-bl-3xl"></div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#1e3a8a] uppercase tracking-wider block">Official Campus HQ</span>
                <h3 className="text-xl font-black font-sans text-gray-950">
                  Guru Nanak Dev Academy
                </h3>
                <div className="w-8 h-1 bg-[#fbbf24] rounded-full mt-1"></div>
              </div>

              {/* Address details */}
              <div className="space-y-4 text-xs font-medium text-gray-800">
                
                {/* School Address Block */}
                <div className="flex items-start space-x-3">
                  <span className="bg-[#1e3a8a] text-white p-2 rounded-xl mt-0.5 shadow-sm">
                    <MapPin size={15} />
                  </span>
                  <div>
                    <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest leading-none">Registered Address</h4>
                    <p className="text-xs text-gray-900 font-bold leading-normal mt-1.5 whitespace-pre-line">
                      Guru Nanak Dev Academy{"\n"}
                      Batala, Punjab{"\n"}
                      India
                    </p>
                  </div>
                </div>

                {/* Admission coordinates */}
                <div className="flex items-start space-x-3">
                  <span className="bg-[#1e3a8a] text-white p-2 rounded-xl mt-0.5 shadow-sm">
                    <Phone size={15} />
                  </span>
                  <div>
                    <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest leading-none">Call Desk / Queries</h4>
                    <p className="text-[11.5px] text-gray-900 font-bold mt-1.5 leading-relaxed">
                      Main Hub: <a href="tel:+919876543210" className="text-[#1e3a8a] hover:underline">+91 98765-43210</a> <br />
                      Principal Desk: <a href="tel:+919876543211" className="text-[#1e3a8a] hover:underline">+91 98765-43211</a>
                    </p>
                  </div>
                </div>

                {/* Email inquiries */}
                <div className="flex items-start space-x-3">
                  <span className="bg-[#1e3a8a] text-white p-2 rounded-xl mt-0.5 shadow-sm">
                    <Mail size={15} />
                  </span>
                  <div>
                    <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest leading-none">Email Coordinates</h4>
                    <p className="text-[11px] text-[#1e3a8a] font-bold mt-1.5">
                      gndacademybatala@gmail.com
                    </p>
                  </div>
                </div>

                {/* Timings */}
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] font-bold text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                    <span>Admissions Active (Classes Playgroup to V)</span>
                  </span>
                </div>

              </div>
            </motion.div>

            {/* Quick action buttons row: directions directly to Google Map app on phones */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={GET_DIRECTIONS_URL}
                target="_blank"
                rel="noreferrer"
                className="bg-[#1e3a8a] hover:bg-blue-800 text-white font-extrabold text-[11px] sm:text-xs py-3 px-4 rounded-2xl shadow-md transition-all flex items-center justify-center space-x-1.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <Navigation size={13} className="fill-current animate-pulse text-amber-400" />
                <span>Get Directions Now</span>
              </a>
              <a
                href={GAPS_MAP_URL}
                target="_blank"
                rel="noreferrer"
                className="bg-[#fbbf24] hover:bg-amber-400 text-blue-950 font-extrabold text-[11px] sm:text-xs py-3 px-4 rounded-2xl shadow-md transition-all flex items-center justify-center space-x-1.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <ExternalLink size={13} />
                <span>Open in Google Maps</span>
              </a>
            </div>

            {/* Google Maps API Key Hint Box */}
            <div className="bg-blue-50/50 border border-blue-150 p-4 rounded-2xl text-[10px] leading-relaxed text-slate-600">
              <span className="font-extrabold text-[#1e3a8a] block uppercase tracking-wide mb-1 flex items-center gap-1">
                <Sparkles size={11} className="text-amber-500 fill-amber-500" /> Premium Google Maps Setup
              </span>
              This section is mapped with dual operational support: displays a high-fidelity interactive default map immediately for quick access, and supports full Google SDK custom marker maps when configured.
            </div>

          </div>

          {/* Column 2: Maps Display Container */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-gray-200 shadow-md relative min-h-[350px] bg-slate-100 flex flex-col justify-between">
            {hasValidKey ? (
              <div className="w-full h-full min-h-[400px]">
                <APIProvider apiKey={API_KEY} version="weekly">
                  <Map
                    defaultCenter={SCHOOL_COORDS}
                    defaultZoom={15}
                    mapId="GNDA_BATALA_MAP_ID"
                    internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                    style={{ width: '100%', height: '100%' }}
                  >
                    <AdvancedMarker
                      ref={markerRef}
                      position={SCHOOL_COORDS}
                      onClick={() => setInfoWindowOpen(true)}
                      title="Guru Nanak Dev Academy Batala campus location marker"
                    >
                      <Pin background="#1e3a8a" glyphColor="#fbbf24" borderColor="#1e3a8a" />
                    </AdvancedMarker>

                    {infoWindowOpen && (
                      <InfoWindow
                        anchor={marker}
                        onCloseClick={() => setInfoWindowOpen(false)}
                        headerDisabled
                      >
                        <div className="p-2 text-left font-sans max-w-xs space-y-1">
                          <h4 className="font-extrabold text-blue-950 text-xs">Guru Nanak Dev Academy</h4>
                          <p className="text-[10px] text-gray-600 font-semibold leading-tight">
                            Batala, Punjab, India
                          </p>
                          <a
                            href={GET_DIRECTIONS_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[9px] text-[#1e3a8a] hover:underline font-bold block pt-1"
                          >
                            Open Navigation & Directions
                          </a>
                        </div>
                      </InfoWindow>
                    )}
                  </Map>
                </APIProvider>
              </div>
            ) : (
              // High-fidelity Embed fallback matching the layout parameters exactly
              <div className="w-full h-full relative flex flex-col justify-between">
                <iframe
                  title="Guru Nanak Dev Academy GPS Location Map"
                  src="https://maps.google.com/maps?q=31.805383,75.216729&z=15&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '380px', flex: 1 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

                {/* Secret keys guidance overlay box that displays inside the map elegantly */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200/50 shadow-lg text-left text-[10px] leading-relaxed">
                  <div className="flex items-center space-x-1 text-[#1e3a8a] font-extrabold uppercase tracking-wide mb-1">
                    <Shield size={11} className="text-amber-500 fill-amber-500 shrink-0" />
                    <span>Google Maps Setup Guide</span>
                  </div>
                  <p className="text-gray-600">
                    To activate advanced dynamic markers, add your API key in AI Studio:
                    Open <strong>Settings</strong> (⚙️) → <strong>Secrets</strong> → add <code>GOOGLE_MAPS_PLATFORM_KEY</code> → paste your key.
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
