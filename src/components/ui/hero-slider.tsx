"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import MediaModal, { MediaItem } from "@/components/ui/media-modal";

const VIDEO_POOL: MediaItem[] = [
  { type: "video", id: "8AwxVYJaLew", title: "Katayayani Enterprises Manufacturing Plant Tour", thumbnail: "/youtube/8AwxVYJaLew.jpg" },
  { type: "video", id: "0IoHCk3LOko", title: "Premium Tractor Canopy Installations", thumbnail: "/youtube/0IoHCk3LOko.jpg" },
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
  { type: "reel", id: "DafmBMVhVBs", title: "Tractor Canopy Professional Fitting Overview", thumbnail: "/instagram/DafmBMVhVBs.jpg" },
  { type: "reel", id: "DaizqZkRhB4", title: "Latest Heavy Duty Tractor Bumper Design Release", thumbnail: "/instagram/DaizqZkRhB4.jpg" },
  { type: "reel", id: "Dbv_SG5hyOB", title: "Ultimate Canopy Setup for Farmers Walkaround", thumbnail: "/instagram/Dbv_SG5hyOB.jpg" }
];

const SHORTS_POOL: MediaItem[] = [
  { type: "short", id: "ct35ydK7Z_g", title: "Katayayani Tractor Fiber Hood Showcase", thumbnail: "/youtube/ct35ydK7Z_g.jpg" },
  { type: "short", id: "-tSXzjKu17A", title: "New Premium Design Reveal", thumbnail: "/youtube/-tSXzjKu17A.jpg" },
  { type: "short", id: "UhsBJOETVRI", title: "Heavy Duty Canopy Testing", thumbnail: "/youtube/UhsBJOETVRI.jpg" },
  { type: "short", id: "UdOJf6It_TA", title: "Customer Satisfaction Guaranteed", thumbnail: "/youtube/UdOJf6It_TA.jpg" },
  { type: "short", id: "sHBdDOuziVI", title: "Perfect Fitment Tutorial", thumbnail: "/youtube/sHBdDOuziVI.jpg" },
  { type: "short", id: "gQT_ke2q5To", title: "Installation Process Live", thumbnail: "/youtube/gQT_ke2q5To.jpg" },
  { type: "short", id: "dmhwYUss980", title: "Delivering Excellence", thumbnail: "/youtube/dmhwYUss980.jpg" },
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
  const [leftTop, setLeftTop] = useState<MediaItem | null>(null);
  const [leftBottom, setLeftBottom] = useState<MediaItem | null>(null);
  const [rightTop, setRightTop] = useState<MediaItem | null>(null);
  const [rightBottom, setRightBottom] = useState<MediaItem | null>(null);

  // Pick random media on mount to avoid hydration mismatch
  useEffect(() => {
    // Pick 1 random horizontal video
    const randomVideo = shuffleArray(VIDEO_POOL)[0];
    
    // Pick 4 random vertical medias (shorts or reels)
    const randomVerticals = shuffleArray(VERTICAL_POOL).slice(0, 4);
    
    setCenterVideo(randomVideo);
    setLeftTop(randomVerticals[0]);
    setLeftBottom(randomVerticals[1]);
    setRightTop(randomVerticals[2]);
    setRightBottom(randomVerticals[3]);
  }, []);

  const handleMediaClick = (media: MediaItem) => {
    setActiveMedia(media);
  };

  const renderGridCard = (media: MediaItem | null, isVertical: boolean) => {
    if (!media) {
      // Skeleton loader placeholder
      return (
        <div className={`w-full h-full bg-gray-100 rounded-3xl animate-pulse`}></div>
      );
    }

    return (
      <div 
        onClick={() => handleMediaClick(media)}
        className={`relative w-full h-full rounded-[28px] overflow-hidden group cursor-pointer shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100/50`}
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
      
      {/* Dynamic 5-Item Media Bento Grid */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 grid-rows-[repeat(2,180px)] md:grid-rows-[repeat(2,260px)] gap-3 md:gap-4 relative">
        
        {/* Center Main Video (Col Span 2, Row Span 2 on desktop) */}
        <div className="col-span-2 md:col-span-2 row-span-1 md:row-span-2 relative order-1 md:order-2 flex flex-col h-full">
          <div className="flex-1 w-full relative">
             {renderGridCard(centerVideo, false)}
          </div>
        </div>

        {/* Left Top */}
        <div className="col-span-1 row-span-1 relative order-2 md:order-1 flex w-full h-full">
            {renderGridCard(leftTop, true)}
        </div>
        
        {/* Left Bottom */}
        <div className="col-span-1 row-span-1 relative order-3 md:order-1 hidden md:flex w-full h-full">
            {renderGridCard(leftBottom, true)}
        </div>

        {/* Right Top */}
        <div className="col-span-1 row-span-1 relative order-4 md:order-3 flex w-full h-full">
            {renderGridCard(rightTop, true)}
        </div>
        
        {/* Right Bottom */}
        <div className="col-span-1 row-span-1 relative order-5 md:order-3 hidden md:flex w-full h-full">
            {renderGridCard(rightBottom, true)}
        </div>

      </div>

      {/* Action Buttons Below the entire grid */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 mt-6 mb-2">
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

      {/* Immersive Full-Screen Media Modal */}
      <MediaModal media={activeMedia} onClose={() => setActiveMedia(null)} />
    </div>
  );
}
