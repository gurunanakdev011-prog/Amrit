/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  ArrowLeft, 
  Play, 
  X, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Lock, 
  Unlock, 
  Upload, 
  Sparkles,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Video,
  Image as ImageIcon
} from 'lucide-react';

import schoolHeroBuilding from '../assets/images/school_hero_building_1779696676451.png';
import schoolPrincipalPortrait from '../assets/images/school_principal_portrait_1779696698942.png';
import { 
  SavedMedia, 
  getAllMediaItems, 
  saveAllMediaItems, 
  deleteMediaItem, 
  saveMediaItem 
} from '../lib/galleryDb';

// Preloaded images fallback dictionary in case local assets are missing
const FALLBACKS: Record<string, string> = {
  'media-gal-school-building': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800',
  'media-gal-principal-portrait': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
  'media-gal-teeyan-gifts': 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&q=80&w=800',
  'media-gal-swings-corridor': 'https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?auto=format&fit=crop&q=80&w=800',
  'media-gal-brown-suit-swing': 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800',
  'media-gal-navy-suit-swing': 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800',
  'media-gal-staff-swings-group': 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800',
  'media-gal-maroon-suit-swing': 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=800',
  'media-gal-mehndi-hands-group': 'https://images.unsplash.com/photo-1610030469614-25e2a220268f?auto=format&fit=crop&q=80&w=800',
  'media-gal-girls-inline-display': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800'
};

const INITIAL_PRELOADS: Omit<SavedMedia, 'order'>[] = [
  {
    id: 'media-gal-school-building',
    type: 'photo',
    src: schoolHeroBuilding,
    likes: 318
  },
  {
    id: 'media-gal-principal-portrait',
    type: 'photo',
    src: schoolPrincipalPortrait,
    likes: 245
  },
  {
    id: 'media-gal-teeyan-gifts',
    type: 'photo',
    src: '/src/assets/images/school_teeyan_festival_celebration.png',
    likes: 189
  },
  {
    id: 'media-gal-swings-corridor',
    type: 'photo',
    src: '/src/assets/images/school_girls_swings_corridor_1.png',
    likes: 210
  },
  {
    id: 'media-gal-brown-suit-swing',
    type: 'photo',
    src: '/src/assets/images/school_girl_brown_suit_swing.png',
    likes: 194
  },
  {
    id: 'media-gal-navy-suit-swing',
    type: 'photo',
    src: '/src/assets/images/school_girl_navy_suit_swing.png',
    likes: 232
  },
  {
    id: 'media-gal-staff-swings-group',
    type: 'photo',
    src: '/src/assets/images/school_staff_swings_group.png',
    likes: 312
  },
  {
    id: 'media-gal-maroon-suit-swing',
    type: 'photo',
    src: '/src/assets/images/school_girl_maroon_suit_swing.png',
    likes: 156
  },
  {
    id: 'media-gal-mehndi-hands-group',
    type: 'photo',
    src: '/src/assets/images/school_mehndi_hands_group.png',
    likes: 278
  },
  {
    id: 'media-gal-girls-inline-display',
    type: 'photo',
    src: '/src/assets/images/school_girls_inline_display.png',
    likes: 198
  }
];

// Canvas-based image compression utility to save space and speed up rendering
const compressImageFile = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDim = 1000; // Optimal for sharp styling without giant filesize
        
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              resolve(file);
            }
          }, 'image/jpeg', 0.85); // 85% high quality jpeg
        } else {
          resolve(file);
        }
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
};

export default function GallerySection() {
  const [mediaList, setMediaList] = useState<SavedMedia[]>([]);
  const [isFullGalleryOpen, setIsFullGalleryOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');
  const [likedIds, setLikedIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('gnda_liked_ids');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [isUploading, setIsUploading] = useState(false);

  // Custom Delete popup variables
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Hidden secure admin portal access trigger variables
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const pressTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Zoom feature scale metrics
  const [zoomScale, setZoomScale] = useState(1);

  const startPressTimer = (e: React.MouseEvent | React.TouchEvent) => {
    if (isAdminMode) return; // already in editor mode
    cancelPressTimer();
    pressTimerRef.current = setTimeout(() => {
      setIsLoginOpen(true);
      cancelPressTimer();
    }, 1500); // 1.5s long hold triggers hidden admin login
  };

  const cancelPressTimer = () => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().toLowerCase() === 'admin' && password === 'gnda2026') {
      setIsAdminMode(true);
      setIsLoginOpen(false);
      setLoginError('');
      setUsername('');
      setPassword('');
    } else {
      setLoginError('Invalid Administrator Credentials');
    }
  };

  // Swipe detection coordinate storage for lightbox navigation
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const touchEndY = useRef<number>(0);

  // Object URL Cache for clean memory management on mobile
  const objectUrlCache = useRef<Map<Blob, string>>(new Map());
  const getMediaUrl = (item: SavedMedia) => {
    if (item.blob) {
      if (objectUrlCache.current.has(item.blob)) {
        return objectUrlCache.current.get(item.blob)!;
      }
      const url = URL.createObjectURL(item.blob);
      objectUrlCache.current.set(item.blob, url);
      return url;
    }
    return item.src || '';
  };

  // Revoke object URLs on unmount to prevent leaks
  useEffect(() => {
    return () => {
      objectUrlCache.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });
      objectUrlCache.current.clear();
    };
  }, []);

  // Fetch from IndexedDB at boot
  useEffect(() => {
    async function loadGalleryData() {
      try {
        let items = await getAllMediaItems();
        if (items.length === 0) {
          // Empty DB, lets populate initial high-fidelity Punjabi cultural preloaded assets
          const itemsToSave: SavedMedia[] = INITIAL_PRELOADS.map((p, idx) => ({
            ...p,
            order: idx
          }));
          await saveAllMediaItems(itemsToSave);
          items = itemsToSave;
        }
        setMediaList(items);
      } catch (e) {
        console.error('Error loading IndexedDB gallery data:', e);
        // Fallback state
        setMediaList(INITIAL_PRELOADS.map((p, idx) => ({ ...p, order: idx })));
      }
    }
    loadGalleryData();
  }, []);

  // Sync likes with localStorage
  useEffect(() => {
    localStorage.setItem('gnda_liked_ids', JSON.stringify(Array.from(likedIds)));
  }, [likedIds]);

  // Handle active scroll prevention on background page when modal is active
  useEffect(() => {
    if (isFullGalleryOpen || lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullGalleryOpen, lightboxIndex]);

  // Reset zoom on index scale transitions
  useEffect(() => {
    setZoomScale(1);
  }, [lightboxIndex]);

  // Handle ESC key or Arrows inside Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowRight') handleNextMedia();
      if (e.key === 'ArrowLeft') handlePrevMedia();
      if (e.key === 'Escape') setLightboxIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, mediaList, activeTab]);

  // Filter lists based on the active top tabs selection (Photos vs Videos)
  const filteredList = mediaList.filter(
    (item) => item.type === (activeTab === 'photos' ? 'photo' : 'video')
  );

  const activeMediaItem = lightboxIndex !== null ? filteredList[lightboxIndex] : null;

  // Switch index helper controls (Containment inside tab lists only!)
  const handlePrevMedia = () => {
    if (lightboxIndex === null || filteredList.length === 0) return;
    setLightboxIndex((prev) => (prev !== null && prev > 0) ? prev - 1 : filteredList.length - 1);
  };

  const handleNextMedia = () => {
    if (lightboxIndex === null || filteredList.length === 0) return;
    setLightboxIndex((prev) => (prev !== null && prev < filteredList.length - 1) ? prev + 1 : 0);
  };

  // Swipe logic for Android / Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const diffX = touchStartX.current - touchEndX.current;
    const diffY = touchStartY.current - touchEndY.current;
    const swipeThreshold = 50;

    // Swipe down to exit lightbox
    if (Math.abs(diffY) > 85 && Math.abs(diffX) < 100) {
      setLightboxIndex(null);
      return;
    }

    if (Math.abs(diffX) < swipeThreshold) return;

    if (diffX > 0) {
      handleNextMedia(); // Swiped Left
    } else {
      handlePrevMedia(); // Swiped Right
    }
  };

  // Likes handle toggler
  const handleLikeItem = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const newLikedIds = new Set(likedIds);
    let updatedLikes = 0;

    const list = mediaList.map((item) => {
      if (item.id === id) {
        const liked = newLikedIds.has(id);
        if (liked) {
          newLikedIds.delete(id);
          updatedLikes = item.likes - 1;
        } else {
          newLikedIds.add(id);
          updatedLikes = item.likes + 1;
        }
        return { ...item, likes: updatedLikes };
      }
      return item;
    });

    setMediaList(list);
    setLikedIds(newLikedIds);

    // Save update securely to DB
    const targetItem = list.find(i => i.id === id);
    if (targetItem) {
      try {
        await saveMediaItem(targetItem);
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Direct homepage click opens exact item and active matching tab
  const openGalleryAtItem = (item: SavedMedia) => {
    if (item.type === 'video') {
      setActiveTab('videos');
    } else {
      setActiveTab('photos');
    }
    
    // Compute targeted index in the filtered active tab list
    const targetFiltered = mediaList.filter(i => i.type === item.type);
    const targetIndex = targetFiltered.findIndex(i => i.id === item.id);
    
    setIsFullGalleryOpen(true);
    if (targetIndex !== -1) {
      setLightboxIndex(targetIndex);
    }
  };

  // Reorder list action helpers (Safe, click/touch-based reorder)
  const moveMediaItem = async (originalListIndex: number, direction: 'up' | 'down') => {
    if (originalListIndex === -1) return;
    if (originalListIndex === 0 && direction === 'up') return;
    if (originalListIndex === mediaList.length - 1 && direction === 'down') return;

    const targetIndex = direction === 'up' ? originalListIndex - 1 : originalListIndex + 1;
    const list = [...mediaList];
    
    // Swap items in memory
    const temp = list[originalListIndex];
    list[originalListIndex] = list[targetIndex];
    list[targetIndex] = temp;

    // Re-index order keys to synchronize database
    const updated = list.map((item, idx) => ({
      ...item,
      order: idx
    }));

    setMediaList(updated);
    try {
      await saveAllMediaItems(updated);
    } catch (e) {
      console.error('Failed to save reordered database list:', e);
    }
  };

  // Delete popup handler triggers
  const handleDeleteTrigger = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteTargetId(id);
  };

  // Final Confirmed Delete Execution
  const confirmDeleteMedia = async () => {
    if (!deleteTargetId || isDeleting) return;
    setIsDeleting(true);

    try {
      const updatedList = mediaList
        .filter(item => item.id !== deleteTargetId)
        .map((item, idx) => ({
          ...item,
          order: idx
        }));

      // Update state instantly (Auto-refreshes screen immediately!)
      setMediaList(updatedList);

      // Persist Delete to database
      await deleteMediaItem(deleteTargetId);
      await saveAllMediaItems(updatedList);
    } catch (e) {
      console.error('Failed to execute delete transaction:', e);
    } finally {
      setIsDeleting(false);
      setDeleteTargetId(null);
    }
  };

  // Direct Phone Gallery Media upload (Accepts photo/videos directly)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fileType: 'photo' | 'video') => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    setIsUploading(true);
    const newItems: SavedMedia[] = [];

    // Process uploaded files sequentially
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      let finalBlob: Blob = file;

      try {
        if (fileType === 'photo') {
          // Auto-compress photo files to 1000px in memory
          finalBlob = await compressImageFile(file);
        }

        const id = `item-${Math.random().toString(36).substring(2, 11)}-${Date.now()}`;
        const item: SavedMedia = {
          id,
          type: fileType,
          blob: finalBlob,
          likes: 0,
          order: mediaList.length + i // Append to bottom
        };

        newItems.push(item);
        await saveMediaItem(item);
      } catch (err) {
        console.error('Error handling direct file upload:', err);
      }
    }

    setMediaList(prev => [...prev, ...newItems]);
    setIsUploading(false);
    
    // Reset inputs
    e.target.value = '';
  };

  return (
    <section id="gallery" className="py-12 md:py-20 bg-neutral-50 relative overflow-hidden text-left">
      {/* Background aesthetics */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#fbbf24]/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* COMPACT LUXURY HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-neutral-200">
          <div>
            <span
              onMouseDown={startPressTimer}
              onTouchStart={startPressTimer}
              onMouseUp={cancelPressTimer}
              onMouseLeave={cancelPressTimer}
              onTouchEnd={cancelPressTimer}
              className="text-xs font-bold text-[#1e3a8a] tracking-widest uppercase bg-[#fbbf24]/20 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-2 select-none cursor-default"
              title="Hold to access portal"
            >
              <Sparkles size={11} className="fill-current text-[#1e3a8a]" />
              <span>GNDA Feed</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 font-sans uppercase">
              Student Moments
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm mt-1 max-w-xl">
              Authentic slices of happy playtimes, sports routines, and sensory school displays inside Guru Nanak Dev wing.
            </p>
          </div>
          
          {/* Quick link to launch immersive gallery */}
          <button
            onClick={() => {
              setActiveTab('photos');
              setIsFullGalleryOpen(true);
            }}
            className="self-start md:self-end bg-[#1e3a8a] hover:bg-blue-800 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] flex items-center gap-2 group"
          >
            <span>Open Immersive Gallery</span>
            <Maximize2 size={13} className="transition-transform group-hover:rotate-12 duration-300" />
          </button>
        </div>

        {/* 3-4 PREVIEW PHOTOS ON HOMEPAGE */}
        {mediaList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4" id="home-gallery-preview">
            {mediaList.slice(0, 4).map((item) => {
              const url = getMediaUrl(item);
              const isLiked = likedIds.has(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => openGalleryAtItem(item)}
                  className="group relative aspect-square overflow-hidden rounded-2xl bg-neutral-900 cursor-pointer shadow-sm border border-neutral-100"
                >
                  {item.type === 'video' ? (
                    <div className="w-full h-full relative bg-neutral-900/40 flex items-center justify-center">
                      {item.blob ? (
                        <video 
                          src={url}
                          className="w-full h-full object-cover brightness-95 opacity-80"
                          muted
                          playsInline
                        />
                      ) : (
                        <img
                          src={FALLBACKS[item.id] || url}
                          alt="Video Preview"
                          className="w-full h-full object-cover brightness-95"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      {/* Play icon badge */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300">
                          <Play size={18} className="fill-current text-amber-400 translate-x-[1.5px]" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={url}
                      alt="Moment Preview"
                      onError={(e) => {
                        const fall = FALLBACKS[item.id];
                        if (fall) e.currentTarget.src = fall;
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95"
                      referrerPolicy="no-referrer"
                    />
                  )}

                  {/* Top-gradient overlay for social aesthetics */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  
                  {/* Bottom title-less details */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white z-10">
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-black/30 backdrop-blur-xs flex items-center gap-1">
                      {item.type === 'video' ? <Video size={10} /> : <ImageIcon size={10} />}
                      {item.type}
                    </span>
                    <button 
                      onClick={(e) => handleLikeItem(item.id, e)}
                      className="flex items-center gap-1.5 focus:outline-none hover:scale-110 transition-transform p-1.5 rounded-full"
                    >
                      <Heart size={14} className={`${isLiked ? 'fill-red-500 text-red-500 scale-105' : 'text-white'}`} />
                      <span className="text-xs font-bold leading-none">{item.likes}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center text-neutral-400 bg-white rounded-2xl border border-neutral-100 shadow-xs">
            <p className="text-sm font-semibold">Initializing digital display frame...</p>
          </div>
        )}

      </div>

      {/* FULLSCREEN SOCIAL MEDIA GALLERY PAGE VIEW */}
      <AnimatePresence>
        {isFullGalleryOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 24, stiffness: 220 }}
            className="fixed inset-0 z-[100] bg-neutral-950 text-white flex flex-col focus:outline-none"
            id="fullscreen-gallery-page"
          >
            {/* COMPACT PREMIUM GLUE TOP ACTION BAR */}
            <header className="shrink-0 w-full px-4 py-4 border-b border-neutral-900 bg-neutral-900/80 backdrop-blur-md flex items-center justify-between z-10 relative">
              <button
                onClick={() => setIsFullGalleryOpen(false)}
                className="p-2 -ml-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                id="close-gallery-page-btn"
              >
                <ArrowLeft size={18} />
                <span className="text-xs font-semibold pr-1 select-none">Close Feed</span>
              </button>

              <div
                onMouseDown={startPressTimer}
                onTouchStart={startPressTimer}
                onMouseUp={cancelPressTimer}
                onMouseLeave={cancelPressTimer}
                onTouchEnd={cancelPressTimer}
                className="flex flex-col items-center select-none cursor-default text-center px-2"
                title="Hold to login admin portal"
              >
                <span className="text-[10px] text-[#fbbf24] tracking-widest font-bold uppercase leading-none">GNDA FEEDS</span>
                <span className="text-sm font-black tracking-tight uppercase mt-0.5 leading-none font-sans">Moment Stream</span>
              </div>

              {/* Secure Admin Logout Button (Only visible if logged in) */}
              {isAdminMode ? (
                <button
                  onClick={() => setIsAdminMode(false)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold leading-none bg-red-950 text-red-500 hover:bg-neutral-900 border border-red-800/30 active:scale-95 transition-all cursor-pointer shadow-md"
                  id="admin-logout-btn"
                >
                  <span>Logout</span>
                </button>
              ) : (
                <div className="w-10 h-10 shrink-0 select-none pointer-events-none" />
              )}
            </header>

            {/* TAB SYSTEM NAVIGATION HEADER - ONLY SHOWN ON PUBLIC FEED FOR GORGEOUS INTERACTION */}
            <div className="shrink-0 bg-neutral-950/90 border-b border-neutral-900">
              <div className="max-w-xl mx-auto flex">
                <button
                  onClick={() => {
                    setActiveTab('photos');
                    setLightboxIndex(null);
                  }}
                  className={`flex-1 py-3.5 text-center font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 border-b-2 transition-all relative cursor-pointer ${
                    activeTab === 'photos'
                      ? 'border-amber-400 text-amber-400 font-extrabold bg-amber-400/[0.03]'
                      : 'border-transparent text-neutral-400 hover:text-white'
                  }`}
                >
                  <ImageIcon size={14} />
                  <span>Photos ({mediaList.filter(m => m.type === 'photo').length})</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('videos');
                    setLightboxIndex(null);
                  }}
                  className={`flex-1 py-3.5 text-center font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 border-b-2 transition-all relative cursor-pointer ${
                    activeTab === 'videos'
                      ? 'border-amber-400 text-amber-400 font-extrabold bg-amber-400/[0.03]'
                      : 'border-transparent text-neutral-400 hover:text-white'
                  }`}
                >
                  <Video size={14} />
                  <span>Videos ({mediaList.filter(m => m.type === 'video').length})</span>
                </button>
              </div>
            </div>

            {/* MAIN PORTAL BODY WITH FULL INLINE OVERFLOW */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 no-scrollbar bg-neutral-950 text-white">
              
              {/* IMMERSIVE STAFF ADMIN CONTROLS IF ACTIVE */}
              <AnimatePresence>
                {isAdminMode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="max-w-xl mx-auto mb-8 bg-neutral-900/80 rounded-2xl p-5 border border-dashed border-amber-400/30 overflow-hidden"
                  >
                    <div className="flex items-center gap-2 mb-3.5">
                      <div className="p-1.5 bg-amber-400 rounded-lg text-neutral-950">
                        <Sparkles size={14} className="fill-current text-neutral-950" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-xs font-black tracking-widest text-[#fbbf24] uppercase leading-none">Staff Toolset</h3>
                        <p className="text-[9.5px] text-neutral-400 mt-0.5">Direct phone media publisher • No external linking required.</p>
                      </div>
                    </div>

                    {/* TWO TAP DIRECT METRIC FILE INPUTS */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {/* Upload Photo Button */}
                      <label 
                        className="flex flex-col items-center justify-center p-4 bg-zinc-900 border border-neutral-800 rounded-xl hover:bg-zinc-850 hover:border-amber-400/40 cursor-pointer transition-all active:scale-95 group text-center min-h-[44px]"
                      >
                        <input 
                          type="file" 
                          accept="image/*" 
                          multiple 
                          className="hidden" 
                          onChange={(e) => handleFileUpload(e, 'photo')}
                          disabled={isUploading}
                        />
                        <Upload size={18} className="text-amber-400 group-hover:-translate-y-0.5 transition-transform" />
                        <span className="text-[11px] font-bold mt-1 text-white">Upload Photos</span>
                        <span className="text-[8.5px] text-neutral-500 mt-0.5">Compressed Automatically</span>
                      </label>

                      {/* Upload Video Button */}
                      <label 
                        className="flex flex-col items-center justify-center p-4 bg-zinc-900 border border-neutral-800 rounded-xl hover:bg-zinc-850 hover:border-amber-400/40 cursor-pointer transition-all active:scale-95 group text-center min-h-[44px]"
                      >
                        <input 
                          type="file" 
                          accept="video/*" 
                          multiple 
                          className="hidden" 
                          onChange={(e) => handleFileUpload(e, 'video')}
                          disabled={isUploading}
                        />
                        <Play size={18} className="text-amber-400" />
                        <span className="text-[11px] font-bold mt-1 text-white">Upload Videos</span>
                        <span className="text-[8.5px] text-neutral-500 mt-0.5">Raw MP4 Direct Stream</span>
                      </label>
                    </div>

                    {isUploading && (
                      <div className="flex items-center justify-center gap-2 text-xs text-[#fbbf24]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] animate-ping" />
                        <span>Publishing assets onto cloud IndexedDB frame... Please wait.</span>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* SOCIAL INTERACTION STREAM OR STAFF CONTROL AUDITING */}
              <div className="max-w-4xl mx-auto">
                {filteredList.length > 0 ? (
                  <>
                    {/* STAFF CONTROL GRID */}
                    {isAdminMode ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 pb-20">
                        {filteredList.map((item, index) => {
                          const originalIndex = mediaList.findIndex((m) => m.id === item.id);
                          const url = getMediaUrl(item);
                          return (
                            <div
                              key={item.id}
                              className="relative aspect-square overflow-hidden bg-neutral-900 rounded-2xl border border-neutral-850 flex flex-col justify-between shadow-md"
                            >
                              <div className="w-full h-full relative overflow-hidden flex items-center justify-center bg-[#070707]">
                                {item.type === 'video' ? (
                                  <div className="w-full h-full relative flex items-center justify-center">
                                    {item.blob ? (
                                      <video
                                        src={url}
                                        className="w-full h-full object-cover opacity-70"
                                        muted
                                        playsInline
                                      />
                                    ) : (
                                      <img
                                        src={FALLBACKS[item.id] || url}
                                        alt="Thumbnail"
                                        className="w-full h-full object-cover brightness-[0.6]"
                                        referrerPolicy="no-referrer"
                                      />
                                    )}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <Play size={16} className="fill-current text-amber-400" />
                                    </div>
                                  </div>
                                ) : (
                                  <img
                                    src={url}
                                    alt="Thumbnail"
                                    onError={(e) => {
                                      const fall = FALLBACKS[item.id];
                                      if (fall) e.currentTarget.src = fall;
                                    }}
                                    className="w-full h-full object-cover brightness-[0.8]"
                                    referrerPolicy="no-referrer"
                                  />
                                )}
                              </div>

                              {/* Action tools for sorting and purging media */}
                              <div className="absolute inset-x-0 bottom-0 bg-neutral-950/90 [support-backdrop-filter]:backdrop-blur px-2 py-2 flex items-center justify-between border-t border-white/5">
                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={(e) => { e.stopPropagation(); moveMediaItem(originalIndex, 'up'); }}
                                    disabled={originalIndex === 0}
                                    className="p-1.5 rounded bg-zinc-850 hover:bg-zinc-750 text-neutral-300 disabled:opacity-20 cursor-pointer transition-colors"
                                    title="Move Up"
                                  >
                                    <ArrowUp size={11} className="stroke-[2.5]" />
                                  </button>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); moveMediaItem(originalIndex, 'down'); }}
                                    disabled={originalIndex === mediaList.length - 1}
                                    className="p-1.5 rounded bg-zinc-850 hover:bg-zinc-750 text-neutral-300 disabled:opacity-20 cursor-pointer transition-colors"
                                    title="Move Down"
                                  >
                                    <ArrowDown size={11} className="stroke-[2.5]" />
                                  </button>
                                </div>

                                <button
                                  onClick={(e) => handleDeleteTrigger(item.id, e)}
                                  className="p-1.5 rounded bg-red-950/80 border border-red-900/40 text-red-500 hover:bg-red-900 hover:text-white cursor-pointer transition-colors text-xs"
                                  title="Delete item"
                                >
                                  <Trash2 size={12} className="stroke-[2.5]" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                     ) : (
                      <>
                        {/* PHOTOS TAB - MODERN SOCIAL MEDIA CARD GRID (3-COLS ON MOBILE) */}
                        {activeTab === 'photos' && (
                          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-1 md:gap-2 pb-24 max-w-4xl mx-auto">
                            {filteredList.map((item, index) => {
                              const url = getMediaUrl(item);
                              const isLiked = likedIds.has(item.id);
                              return (
                                <div
                                  key={item.id}
                                  onClick={() => setLightboxIndex(index)}
                                  className="relative aspect-square bg-neutral-900 hover:bg-neutral-850 rounded-lg sm:rounded-xl overflow-hidden cursor-pointer shadow-md group border border-white/5 active:scale-95 sm:hover:scale-[1.02] transition-all duration-300"
                                  id={`social-photo-${item.id}`}
                                >
                                  <img
                                    src={url}
                                    alt="Moment thumbnail"
                                    onError={(e) => {
                                      const fall = FALLBACKS[item.id];
                                      if (fall) e.currentTarget.src = fall;
                                    }}
                                    className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-105"
                                    referrerPolicy="no-referrer"
                                  />
                                  
                                  {/* Glassmorphic hover overlay stats (Instagram/Facebook style) */}
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2">
                                    <div className="flex items-center gap-1.5 text-white text-sm font-bold">
                                      <Heart size={16} className={`fill-red-500 text-red-500 scale-110`} />
                                      <span>{item.likes}</span>
                                    </div>
                                  </div>

                                  {/* Minimal quick identifier badge for mobile so it looks like a native device gallery */}
                                  <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[9px] font-bold text-white/90 flex items-center gap-0.5 select-none md:hidden">
                                    <Heart size={8} className={isLiked ? "fill-red-500 text-red-500" : "text-neutral-300"} />
                                    <span>{item.likes}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* VIDEOS TAB - MODERN SOCIAL MEDIA CARD GRID (3-COLS ON MOBILE) */}
                        {activeTab === 'videos' && (
                          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-1 md:gap-2 pb-24 max-w-4xl mx-auto">
                            {filteredList.map((item, index) => {
                              const url = getMediaUrl(item);
                              const isLiked = likedIds.has(item.id);
                              return (
                                <div
                                  key={item.id}
                                  onClick={() => setLightboxIndex(index)}
                                  className="relative aspect-square bg-neutral-900 hover:bg-neutral-850 rounded-lg sm:rounded-xl overflow-hidden cursor-pointer shadow-md group border border-white/5 active:scale-95 sm:hover:scale-[1.02] transition-all duration-300"
                                  id={`social-video-${item.id}`}
                                >
                                  {item.blob ? (
                                    <video
                                      src={url}
                                      className="w-full h-full object-cover"
                                      muted
                                      playsInline
                                    />
                                  ) : (
                                    <img
                                      src={FALLBACKS[item.id] || url}
                                      alt="Video Poster"
                                      className="w-full h-full object-cover opacity-80"
                                      referrerPolicy="no-referrer"
                                    />
                                  )}

                                  {/* Authentic Play Badge always beautifully centered in the grid card */}
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/45 transition-colors duration-300">
                                    <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-xs border border-white/10 flex items-center justify-center text-amber-400 shadow-md group-hover:scale-110 transition-transform">
                                      <Play size={12} className="fill-current text-white translate-x-[1px]" />
                                    </div>
                                  </div>

                                  {/* Small indicator stats badge for video grid list */}
                                  <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/60 backdrop-blur-xs rounded-md text-[9px] font-bold text-white/90 flex items-center gap-0.5 select-none">
                                    <Heart size={8} className={isLiked ? "fill-red-500 text-red-500" : "text-neutral-300"} />
                                    <span>{item.likes}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <div className="py-24 text-center text-neutral-400 bg-neutral-900 rounded-3xl border border-neutral-800 mt-4 max-w-sm mx-auto px-6">
                    <p className="text-sm font-semibold">No media in {activeTab}</p>
                    <p className="text-xs text-neutral-500 mt-1">Authorized staff can hold GNDA badge on homepage to upload photos & videos.</p>
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN IMMERSIVE LIGHTBOX VIEWER */}
      <AnimatePresence>
        {lightboxIndex !== null && activeMediaItem && (
          <div
            className="fixed inset-0 z-[200] bg-black flex flex-col justify-between"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            id="fullscreen-lightbox-viewer"
          >
            {/* Dark Backdrop */}
            <div className="absolute inset-0 bg-[#060606]/98 pointer-events-none" />

            {/* HEADER CONTROLS */}
            <header className="relative w-full z-10 px-4 sm:px-8 py-5 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2.5 text-white/95 hover:text-white hover:bg-white/10 active:scale-95 transition-all flex items-center gap-1.5 bg-neutral-900/60 backdrop-blur-md rounded-full border border-white/10 cursor-pointer shadow-lg min-h-[44px]"
                id="lightbox-close-header-btn"
              >
                <ArrowLeft size={16} />
                <span className="text-xs font-semibold pr-1">Back</span>
              </button>

              <div className="flex items-center gap-3">
                {/* Visual Zoom Scale indicators for photos only */}
                {activeMediaItem.type === 'photo' && (
                  <div className="flex items-center gap-1.5 bg-neutral-900/60 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10 shadow-md">
                    <button
                      onClick={() => setZoomScale(p => Math.max(0.75, p - 0.25))}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold hover:bg-white/10 active:scale-90 transition-all text-neutral-300 select-none cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-[10px] uppercase font-sans tracking-widest font-black text-neutral-400 leading-none select-none min-w-[34px] text-center">
                      {Math.round(zoomScale * 100)}%
                    </span>
                    <button
                      onClick={() => setZoomScale(p => Math.min(3, p + 0.25))}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold hover:bg-white/10 active:scale-90 transition-all text-neutral-300 select-none cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                )}

                {/* Like Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLikeItem(activeMediaItem.id);
                  }}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/10 transition-colors shadow-md cursor-pointer min-h-[44px]"
                >
                  <Heart
                    size={14}
                    className={`${likedIds.has(activeMediaItem.id) ? 'fill-red-500 text-red-500 scale-105' : 'text-white'}`}
                  />
                  <span className="text-xs font-bold leading-none select-none">
                    {activeMediaItem.likes}
                  </span>
                </button>
              </div>
            </header>

            {/* SCREEN CENTER MEDIA CONTAINER */}
            <div className="flex-1 w-full max-w-5xl mx-auto flex items-center justify-between px-2 relative z-10">
              
              {/* Previous arrows */}
              <button
                onClick={handlePrevMedia}
                className="hidden sm:flex w-11 h-11 rounded-full bg-neutral-900/40 hover:bg-neutral-800 border border-white/10 flex items-center justify-center text-white transition-all cursor-pointer select-none active:scale-90"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="flex-1 h-full max-h-[75vh] flex items-center justify-center p-3 relative select-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMediaItem.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring', damping: 26, stiffness: 260 }}
                    className="w-full h-full flex items-center justify-center select-none"
                    id={`active-fullscreen-element-${activeMediaItem.id}`}
                  >
                    {activeMediaItem.type === 'video' ? (
                      <div className="relative w-full max-w-4xl max-h-[75vh] aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center shadow-2xl">
                        <video
                          src={getMediaUrl(activeMediaItem)}
                          controls
                          playsInline
                          autoPlay
                          className="w-full h-full object-contain bg-black"
                        />
                      </div>
                    ) : (
                      <div className="relative overflow-visible flex items-center justify-center max-h-[75vh] max-w-full">
                        <motion.img
                          src={getMediaUrl(activeMediaItem)}
                          alt="Moment Zoom Frame"
                          animate={{ scale: zoomScale }}
                          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                          onError={(e) => {
                            const fall = FALLBACKS[activeMediaItem.id];
                            if (fall) e.currentTarget.src = fall;
                          }}
                          className="max-h-[72vh] max-w-full object-contain rounded-2xl select-none"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next arrows */}
              <button
                onClick={handleNextMedia}
                className="hidden sm:flex w-11 h-11 rounded-full bg-neutral-900/40 hover:bg-neutral-800 border border-white/10 flex items-center justify-center text-white transition-all cursor-pointer select-none active:scale-90"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* MINIMAL TOUCH FOOTER NOTES */}
            <footer className="relative w-full z-10 px-6 py-6 text-center bg-gradient-to-t from-black/80 to-transparent">
              <div className="max-w-xl mx-auto">
                <div className="text-[10px] text-neutral-400 font-bold tracking-widest uppercase select-none">
                  Swipe Left/Right to Navigate • Swipe Down or Drag to Exit
                </div>
              </div>
            </footer>
          </div>
        )}
      </AnimatePresence>

      {/* CUSTOM STAFF DELETE CONFIRMATION INTERFACE POPUP */}
      <AnimatePresence>
        {deleteTargetId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 focus:outline-none"
            onClick={() => setDeleteTargetId(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center mx-auto mb-4">
                <Trash2 size={24} className="stroke-[2.5]" />
              </div>
              
              <h3 className="text-lg font-extrabold text-white tracking-tight">
                Delete Media Item?
              </h3>
              
              <p className="text-xs text-neutral-400 mt-2">
                Are you sure you want to delete this media? This action cannot be undone.
              </p>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <button
                  onClick={() => setDeleteTargetId(null)}
                  className="py-3 px-4 rounded-xl bg-neutral-850 hover:bg-neutral-800 text-neutral-300 font-bold text-xs select-none cursor-pointer transition-all border border-neutral-800 active:scale-95"
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteMedia}
                  className="py-3 px-4 rounded-xl bg-red-650 hover:bg-red-700 text-white font-black text-xs select-none cursor-pointer transition-all flex items-center justify-center gap-1 active:scale-95"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <span className="w-4 h-4 rounded-full border-2 border-white border-[#fbbf24] animate-spin" />
                  ) : (
                    <span>Delete</span>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HIDDEN STAFF LOGIN PORTAL POPUP */}
      <AnimatePresence>
        {isLoginOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 focus:outline-none"
            onClick={() => {
              setIsLoginOpen(false);
              setUsername('');
              setPassword('');
              setLoginError('');
            }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl text-white relative text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setIsLoginOpen(false);
                  setUsername('');
                  setPassword('');
                  setLoginError('');
                }}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-full hover:bg-white/5 active:scale-95 transition-transform cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col items-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-3 text-amber-400 font-sans">
                  <Lock size={20} className="stroke-[2.5]" />
                </div>
                <h3 className="text-lg font-extrabold tracking-tight font-sans">Staff Portal Login</h3>
                <p className="text-xs text-neutral-400 mt-1 text-center font-sans">
                  This administrative panel is reserved for authorized Guru Nanak Dev wing personnel.
                </p>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-4 font-sans">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-widest mb-1.5 font-sans">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username (e.g. admin)"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400/50 outline-none text-sm transition-all text-white placeholder-neutral-600 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-widest mb-1.5 font-sans">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter staff security key"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400/50 outline-none text-sm transition-all text-white placeholder-neutral-600 font-sans"
                  />
                </div>

                {loginError && (
                  <div className="p-3 bg-red-950/40 border border-red-500/20 rounded-xl text-red-400 text-xs font-semibold text-center mt-2 font-sans">
                    {loginError}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-amber-400 hover:bg-amber-500 text-neutral-900 text-xs font-black tracking-widest uppercase py-3.5 rounded-xl transition-all font-sans cursor-pointer active:scale-95 shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Authenticate Entry</span>
                  </button>
                </div>
              </form>

              <div className="mt-5 text-center text-[10px] text-neutral-500 select-none border-t border-neutral-850 pt-3 font-mono">
                Authorized staff use: <span className="font-bold text-amber-500/80">admin</span> / <span className="font-bold text-amber-500/80">gnda2026</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
