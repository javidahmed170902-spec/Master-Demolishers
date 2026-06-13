import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Sourced professional local image files
import imgHero from '../assets/images/hero_demolition_1780477546062.png';
import imgBefore1 from '../assets/images/before_demolition_1780477562108.png';
import imgBefore2 from '../assets/images/before_demolition_premium_1780481576334.png';
import imgDuring1 from '../assets/images/during_demolition_1780477578930.png';
import imgDuring2 from '../assets/images/during_demolition_premium_1780481620089.png';
import imgAfter1 from '../assets/images/after_demolition_1780477597259.png';
import imgAfter2 from '../assets/images/after_demolition_premium_1780481656854.png';
import imgCommercial from '../assets/images/commercial_demolition_1_1780682225452.png';

const GALLERY_IMAGES = [
  { id: "img-1", src: imgDuring2, alt: "RCC Heavy Structural Demolition in Action" },
  { id: "img-2", src: imgAfter1, alt: "Post-Dismantling Plot Leveling and Grading" },
  { id: "img-3", src: imgDuring1, alt: "Residential Property Controlled Manual Dismantling" },
  { id: "img-4", src: imgCommercial, alt: "Commercial Core Excavation and Structure Crash" },
  { id: "img-5", src: imgBefore2, alt: "Initial Structure Inspection and Protective Barrier Installation" },
  { id: "img-6", src: imgHero, alt: "Industrial Concrete Base Excavation with Hydraulic Hammers" },
  { id: "img-7", src: imgAfter2, alt: "Final Graded Plot Level Handover" },
  { id: "img-8", src: imgBefore1, alt: "Heritage Masonry Manual Salvage Preparation" }
];

export default function ProjectGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const scrollDuration = 5000; // 5 seconds per image slide

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (isPlaying) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, scrollDuration);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentIndex, isPlaying]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-[#1A1A1A] rounded-2xl border-2 border-zinc-800 shadow-2xl p-4 md:p-6 font-sans space-y-6" id="project-gallery-section">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-805 pb-5">
        <div className="text-left">
          <span className="text-[10px] font-mono font-black text-brand-red uppercase tracking-widest bg-red-650/10 px-2.5 py-1 rounded-md border border-red-500/20 inline-block mb-2">
            Bengaluru Projects Proof Gallery
          </span>
          <h3 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight uppercase">
            Active Site Demolition Showcase
          </h3>
          <p className="text-xs md:text-sm text-zinc-400 mt-1 max-w-2xl font-medium">
            Browse through authentic high-resolution snapshots of our site work. No mock graphics — only verified mechanical demolition, excavation machinery, and graded plot handovers.
          </p>
        </div>

        {/* Play/Pause Autoplayer Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={togglePlay}
            className="flex items-center gap-2 px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-xl border border-zinc-800 transition-all text-xs font-mono font-black uppercase cursor-pointer"
            title={isPlaying ? "Pause Automatic Scrolling" : "Start Automatic Scrolling"}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-brand-red animate-pulse" />
                <span>SCROLLING</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-zinc-500" />
                <span>PAUSED</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative group/stage bg-black rounded-xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] border border-zinc-800 flex items-center justify-center">
        
        {/* Transparent Click-through Navigation Areas */}
        <div className="absolute inset-y-0 left-0 w-24 z-10 cursor-pointer pointer-events-auto" onClick={handlePrev} title="Previous Image" />
        <div className="absolute inset-y-0 right-0 w-24 z-10 cursor-pointer pointer-events-auto" onClick={handleNext} title="Next Image" />

        {/* Clear Image with fading transition */}
        <div className="w-full h-full select-none">
          <AnimatePresence mode="wait">
            <motion.img
              key={GALLERY_IMAGES[currentIndex].id}
              src={GALLERY_IMAGES[currentIndex].src}
              alt={GALLERY_IMAGES[currentIndex].alt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain filter brightness-[0.98] contrast-[1.02]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>

        {/* Precise Action Buttons: Prev, Fullscreen, Next */}
        <div className="absolute inset-x-4 bottom-4 flex justify-between items-center pointer-events-none z-20">
          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="w-11 h-11 rounded-full bg-black/80 hover:bg-brand-red text-white hover:scale-105 flex items-center justify-center transition-all border border-zinc-850 pointer-events-auto shadow-lg cursor-pointer"
            title="Previous Image"
          >
            <ChevronLeft className="w-6 h-6 shrink-0" />
          </button>

          {/* Fullscreen Magnifier Key */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFullscreenImage(GALLERY_IMAGES[currentIndex].src);
            }}
            className="h-9 px-4 rounded-full bg-black/80 hover:bg-[#E5A913] text-white hover:text-black hover:scale-105 flex items-center justify-center gap-1.5 transition-all border border-zinc-850 pointer-events-auto text-[10px] font-mono font-black uppercase tracking-wider cursor-pointer shadow-lg"
            title="Enlarge Image to Fullscreen"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>FULL VIEW</span>
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="w-11 h-11 rounded-full bg-black/80 hover:bg-brand-red text-white hover:scale-105 flex items-center justify-center transition-all border border-zinc-850 pointer-events-auto shadow-lg cursor-pointer"
            title="Next Image"
          >
            <ChevronRight className="w-6 h-6 shrink-0" />
          </button>
        </div>
      </div>

      {/* Grid of Scrolling Thumbnails & Jump Links */}
      <div className="space-y-3">
        <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block text-left">
          EXPLORE CHANNELS & LIVE DEMOLITION SHOTS:
        </span>
        
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
          {GALLERY_IMAGES.map((img, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={img.id}
                onClick={() => setCurrentIndex(idx)}
                className={`relative flex-shrink-0 w-24 h-18 sm:w-28 sm:h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  isSelected 
                    ? 'border-brand-red scale-95 shadow-lg brightness-110' 
                    : 'border-zinc-800 opacity-55 hover:opacity-100 hover:border-zinc-500'
                }`}
                title={`View image ${idx + 1}`}
              >
                <img 
                  src={img.src} 
                  alt="" 
                  className="w-full h-full object-cover filter brightness-[0.9] contrast-[1.05]" 
                />
                
                {/* Active index overlay bar */}
                {isSelected && (
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-brand-red" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Overlay Portal Modal */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/98 z-50 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setFullscreenImage(null)}
          >
            <div className="relative max-w-5xl max-h-screen flex items-center justify-center">
              <img
                src={fullscreenImage}
                alt="Enlarged Demolition Record snapshot"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[90vh] object-contain rounded-lg select-none"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFullscreenImage(null);
                }}
                className="absolute top-4 right-4 bg-zinc-900 hover:bg-brand-red text-white hover:text-white px-4 py-2 rounded-xl text-xs font-mono font-black uppercase border border-zinc-800 cursor-pointer shadow-lg"
              >
                CLOSE [ESC]
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
