"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Play, X, ExternalLink } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import react-youtube to avoid SSR blocking
const YouTube = dynamic(() => import("react-youtube"), { ssr: false });

type MediaType = "video" | "reel" | "short";

interface MediaItem {
  type: MediaType;
  id: string;
  title: string;
  thumbnail: string;
}

const VIDEO_POOL: MediaItem[] = [
  { type: "video", id: "8AwxVYJaLew", title: "Katayayani Enterprises Manufacturing Plant Tour", thumbnail: "https://img.youtube.com/vi/8AwxVYJaLew/maxresdefault.jpg" },
  { type: "video", id: "0IoHCk3LOko", title: "Premium Tractor Canopy Installations", thumbnail: "https://img.youtube.com/vi/0IoHCk3LOko/maxresdefault.jpg" },
];

const REELS_POOL: MediaItem[] = [
  { type: "reel", id: "DbsKeEUB73O", title: "Premium Punjabi Hood Modification on Tractor 🚜🔥", thumbnail: "/instagram/DbsKeEUB73O.jpg" },
  { type: "reel", id: "DbP0c0bBdcZ", title: "Swaraj Modified with Heavy Duty Fiber Chatri Setup ⚡", thumbnail: "/instagram/DbP0c0bBdcZ.jpg" },
  { type: "reel", id: "DbP1VJ_hLbN", title: "Katayayani Enterprises Custom Canopy Fitment & Review 🌟", thumbnail: "/instagram/DbP1VJ_hLbN.jpg" },
  { type: "reel", id: "DblnpQQhbOV", title: "Double Bumper Fiber Hood Tractor Installation Guide 🛠️", thumbnail: "/instagram/DblnpQQhbOV.jpg" },
  { type: "reel", id: "DblTKvyhXuj", title: "Custom Painted Tractor Canopy Design Factory Showcase 🎨", thumbnail: "/instagram/DblTKvyhXuj.jpg" },
  { type: "reel", id: "DbP04gcBKGt", title: "Mahindra Tractor New Fiber Canopy Fitment and Walkaround 🚜🌟", thumbnail: "/instagram/DbP04gcBKGt.jpg" },
  { type: "reel", id: "DafnacEhlnu", title: "Customer Review and Ride-Along with Punjabi Hood Installation 🌾💯", thumbnail: "/instagram/DafnacEhlnu.jpg" },
  { type: "reel", id: "DbPzywnBs0f", title: "Best Price Tractor Fiber Hood Manufacturing Unit Meerut 🏗️⚡", thumbnail: "/instagram/DbPzywnBs0f.jpg" },
];

const SHORTS_POOL: MediaItem[] = [
  { type: "short", id: "ct35ydK7Z_g", title: "Katayayani Tractor Fiber Hood Showcase", thumbnail: "https://img.youtube.com/vi/ct35ydK7Z_g/maxresdefault.jpg" },
  { type: "short", id: "-tSXzjKu17A", title: "New Premium Design Reveal", thumbnail: "https://img.youtube.com/vi/-tSXzjKu17A/maxresdefault.jpg" },
  { type: "short", id: "UhsBJOETVRI", title: "Heavy Duty Canopy Testing", thumbnail: "https://img.youtube.com/vi/UhsBJOETVRI/maxresdefault.jpg" },
  { type: "short", id: "UdOJf6It_TA", title: "Customer Satisfaction Guaranteed", thumbnail: "https://img.youtube.com/vi/UdOJf6It_TA/maxresdefault.jpg" },
  { type: "short", id: "sHBdDOuziVI", title: "Perfect Fitment Tutorial", thumbnail: "https://img.youtube.com/vi/sHBdDOuziVI/maxresdefault.jpg" },
  { type: "short", id: "gQT_ke2q5To", title: "Installation Process Live", thumbnail: "https://img.youtube.com/vi/gQT_ke2q5To/maxresdefault.jpg" },
  { type: "short", id: "dmhwYUss980", title: "Delivering Excellence", thumbnail: "https://img.youtube.com/vi/dmhwYUss980/maxresdefault.jpg" },
];

// Combine all vertical media for the side slots
const VERTICAL_POOL = [...REELS_POOL, ...SHORTS_POOL];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function HeroSlider() {
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);
  
  // State for the randomly selected grid items
  const [centerVideo, setCenterVideo] = useState<MediaItem | null>(null);
  const [leftVertical, setLeftVertical] = useState<MediaItem | null>(null);
  const [rightVertical, setRightVertical] = useState<MediaItem | null>(null);

  // Pick random media on mount to avoid hydration mismatch
  useEffect(() => {
    // Pick 1 random horizontal video
    const randomVideo = shuffleArray(VIDEO_POOL)[0];
    
    // Pick 2 random vertical medias (shorts or reels)
    const randomVerticals = shuffleArray(VERTICAL_POOL).slice(0, 2);
    
    setCenterVideo(randomVideo);
    setLeftVertical(randomVerticals[0]);
    setRightVertical(randomVerticals[1]);
  }, []);

  const handleMediaClick = (media: MediaItem) => {
    setActiveMedia(media);
  };

  const renderGridCard = (media: MediaItem | null, isVertical: boolean) => {
    if (!media) {
      // Skeleton loader placeholder
      return (
        <div className={`w-full ${isVertical ? 'aspect-[9/16]' : 'aspect-[16/9]'} bg-gray-100 rounded-3xl animate-pulse`}></div>
      );
    }

    return (
      <div 
        onClick={() => handleMediaClick(media)}
        className={`relative w-full ${isVertical ? 'aspect-[9/16]' : 'aspect-[16/9]'} rounded-[28px] overflow-hidden group cursor-pointer shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100/50`}
      >
        {/* High Res Thumbnail */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.thumbnail}
          alt={media.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Gradient Overlay for text contrast and premium feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

        {/* Badge Indicator */}
        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-sm">
            {media.type === 'reel' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-white">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            ) : media.type === 'short' ? (
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white text-white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-red-500 text-red-500">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
            )}
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">
              {media.type === 'reel' ? 'Insta Reel' : media.type === 'short' ? 'YT Short' : 'Video'}
            </span>
          </div>
        </div>

        {/* Center Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className={`
            rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm
            transition-all duration-500 group-hover:scale-110 group-hover:bg-red-600 border border-white/20
            ${isVertical ? 'w-14 h-14 bg-white/20' : 'w-20 h-20 bg-white/20'}
          `}>
            <Play 
              className={`text-white ml-1 ${isVertical ? 'w-6 h-6' : 'w-8 h-8'}`} 
              fill="currentColor" 
            />
          </div>
        </div>

        {/* Bottom Title */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <p className={`text-white font-bold leading-snug line-clamp-2 drop-shadow-md ${isVertical ? 'text-[13px]' : 'text-[18px]'}`}>
            {media.title}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col mt-6 mb-8 relative">
      
      {/* Dynamic Media Bento Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        
        {/* Left Column - Vertical Media (Hidden on mobile for cleaner stack, visible on tablet+) */}
        <div className="hidden md:flex flex-col gap-4 col-span-1">
          {renderGridCard(leftVertical, true)}
        </div>

        {/* Center Column - Large Video (Takes 2 columns on desktop, full width on mobile) */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-4 items-center justify-center">
          {renderGridCard(centerVideo, false)}
          
          {/* Action Buttons Below the main video */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
            <a
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#0a2e1f] hover:bg-[#061d13] text-white text-[15px] font-bold transition-all shadow-md hover:shadow-lg active:scale-95 group"
            >
              Explore Products
              <svg 
                className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" 
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a
              href="/enquiry"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white border border-gray-200 text-[#0a2e1f] text-[15px] font-bold hover:bg-gray-50 transition-all shadow-sm hover:shadow active:scale-95"
            >
              Request Quote
            </a>
          </div>
        </div>

        {/* Right Column - Vertical Media */}
        <div className="col-span-1 flex flex-col gap-4">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
             {/* On mobile, we show the left vertical item here alongside the right one to form a nice 2-col row! */}
             <div className="md:hidden">
               {renderGridCard(leftVertical, true)}
             </div>
             <div>
               {renderGridCard(rightVertical, true)}
             </div>
          </div>
        </div>

      </div>

      {/* Immersive Full-Screen Media Modal */}
      {activeMedia && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-lg" onClick={() => setActiveMedia(null)}>
          {/* Close button */}
          <button
            onClick={() => setActiveMedia(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[110] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-105 active:scale-95"
            title="Close Video"
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Modal Content Container */}
          <div 
            className={`relative w-full max-h-[90vh] flex flex-col items-center justify-center
              ${activeMedia.type === 'video' ? 'max-w-[1000px] aspect-video' : 'max-w-[480px] h-[85vh]'}
              rounded-2xl sm:rounded-3xl bg-black overflow-hidden shadow-2xl border border-white/10
            `}
            onClick={(e) => e.stopPropagation()}
          >
            {activeMedia.type === 'reel' ? (
              // Instagram Reel Official Embed
              <div className="w-full h-full bg-[#fafafa] relative overflow-hidden flex flex-col">
                <div className="flex-1 w-full relative">
                  <iframe
                    src={`https://www.instagram.com/reel/${activeMedia.id}/embed/`}
                    title="Instagram Reel View"
                    allowTransparency={true}
                    frameBorder="0"
                    scrolling="no"
                    className="absolute inset-0 w-full h-full border-0"
                    style={{ background: "white" }}
                  />
                </div>
                {/* Direct link footer for better UX */}
                <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                  <a
                    href={`https://www.instagram.com/reel/${activeMedia.id}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 bg-[#e1306c] hover:bg-[#c13584] text-white text-[13px] font-extrabold tracking-wide uppercase hover:opacity-95 flex items-center justify-center gap-1.5 rounded-xl shadow-md transition-all active:scale-[0.98]"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    View on Instagram
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </a>
                </div>
              </div>
            ) : (
              // YouTube Video or Short Embed
              <YouTube
                videoId={activeMedia.id}
                opts={{
                  height: "100%",
                  width: "100%",
                  playerVars: {
                    autoplay: 1,
                    controls: 1,
                    rel: 0,
                    modestbranding: 1,
                  }
                }}
                className="w-full h-full bg-black flex items-center justify-center absolute inset-0"
                iframeClassName="w-full h-full max-h-full"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
