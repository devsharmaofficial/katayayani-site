"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Play, Heart, MessageCircle, Send, X, ExternalLink } from "lucide-react";

function Instagram({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/katayayanienterprises.meerut/";

const REELS = [
  {
    id: "reel-1",
    videoId: "UL6jtWMHmtI",
    title: "Swaraj 855 FE Heavy Duty Punjabi Hood Installation 🔥",
    likes: "4.8K",
    comments: "142",
  },
  {
    id: "reel-2",
    videoId: "c1hL6fj8VjQ",
    title: "Mahindra Arjun Novo Premium FRP Canopy Fitting Guide 🚜",
    likes: "3.5K",
    comments: "98",
  },
  {
    id: "reel-3",
    videoId: "ap38alCuUxY",
    title: "Sonalika Tiger Double Bumper Fiber Chatri Setup ⚡",
    likes: "5.2K",
    comments: "187",
  },
  {
    id: "reel-4",
    videoId: "3STNVrRyyP0",
    title: "Heavy Duty Punjabi Hood Fiber Chatri Canopy Factory Tour 🏭",
    likes: "6.1K",
    comments: "204",
  },
  {
    id: "reel-5",
    videoId: "koeGb8HLNgs",
    title: "John Deere Premium Canopy Review by Customer 🌟",
    likes: "4.3K",
    comments: "115",
  },
  {
    id: "reel-6",
    videoId: "NCVo8d9WqUM",
    title: "New Holland Fiber Hood Custom Fitting Process 🛠️",
    likes: "2.9K",
    comments: "84",
  },
];

export default function InstagramSection() {
  const [activeReel, setActiveReel] = useState<typeof REELS[0] | null>(null);
  const [isLiked, setIsLiked] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    // Initialize random mock like counts close to their text representation
    const counts: Record<string, number> = {};
    REELS.forEach((reel) => {
      const base = parseFloat(reel.likes.replace("K", "")) * 1000;
      counts[reel.id] = Math.floor(base);
    });
    setLikeCounts(counts);
  }, []);

  const handleLikeToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked((prev) => {
      const nextState = !prev[id];
      setLikeCounts((prevCounts) => ({
        ...prevCounts,
        [id]: prevCounts[id] + (nextState ? 1 : -1),
      }));
      return { ...prev, [id]: nextState };
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-white" aria-label="Instagram Integration">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-pink-500/5 via-purple-500/5 to-yellow-500/5 blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-yellow-500/5 via-red-500/5 to-purple-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        {/* Header content */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="flex items-center gap-2 bg-gradient-to-r from-[#f09433] via-[#e1306c] to-[#bc1888] text-white text-[11px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-md">
                <Instagram className="w-3.5 h-3.5" />
                Instagram
              </span>
              <span className="text-gray-500 text-[12px] font-semibold">@katayayanienterprises.meerut</span>
            </div>
            
            <h2 className="text-gray-900 text-[28px] sm:text-[36px] md:text-[40px] font-black leading-tight tracking-tight">
              Trending on{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f09433] via-[#e1306c] to-[#bc1888]">
                Instagram Reels
              </span>
            </h2>
            <p className="text-gray-500 text-[14px] mt-3 max-w-[500px] leading-relaxed">
              Explore our latest updates, customer tractor installations, and newly customized fiber hoods directly on our Instagram grid.
            </p>
          </div>

          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#f09433] via-[#e1306c] to-[#bc1888] text-white font-extrabold text-[14px] rounded-full hover:opacity-95 active:scale-95 transition-all shadow-[0_4px_20px_rgba(225,48,108,0.25)] hover:shadow-[0_4px_25px_rgba(225,48,108,0.35)]"
          >
            <Instagram className="w-4 h-4" />
            Follow on Instagram
            <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
          </a>
        </div>

        {/* Reels grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {REELS.map((reel) => {
            const liked = isLiked[reel.id];
            const currentLikes = likeCounts[reel.id] || 0;
            return (
              <div
                key={reel.id}
                onClick={() => setActiveReel(reel)}
                className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-black cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Reel cover image facade */}
                <Image
                  src={`https://img.youtube.com/vi/${reel.videoId}/hqdefault.jpg`}
                  alt={reel.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
                  unoptimized={true}
                  className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

                {/* Play Badge Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                    <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
                  </div>
                </div>

                {/* Top Instagram Reels indicator */}
                <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md rounded-lg px-2 py-1 text-[9px] text-white/95 font-semibold flex items-center gap-1">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                  </svg>
                  <span>REEL</span>
                </div>

                {/* Bottom stats & info */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-[11px] font-medium leading-tight mb-2 line-clamp-2 text-white/90">
                    {reel.title}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-white/70">
                    <button
                      onClick={(e) => handleLikeToggle(reel.id, e)}
                      className="flex items-center gap-1 hover:text-red-500 transition-colors py-1"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${liked ? "text-red-500 fill-red-500 animate-bounce" : ""}`}
                      />
                      <span>{formatNumber(currentLikes)}</span>
                    </button>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{reel.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-10 pt-6 border-t border-gray-100">
          <span className="text-[12px] font-semibold text-gray-500">
            @katayayanienterprises.meerut
          </span>
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-bold text-pink-600 hover:text-pink-700 hover:underline inline-flex items-center gap-1.5 transition-colors"
          >
            Open Instagram Grid
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Immersive Instagram Reels Modal */}
      {activeReel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          {/* Close button outside */}
          <button
            onClick={() => setActiveReel(null)}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-105 active:scale-95"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div 
            className="relative w-full max-w-[420px] aspect-[9/19] rounded-[40px] border-[12px] border-gray-800 bg-[#000] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Phone notch / camera spacer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-30 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-black mr-2" />
              <div className="w-12 h-1 bg-black rounded-full" />
            </div>

            {/* Video container */}
            <div className="flex-1 w-full relative bg-[#111]">
              <iframe
                src={`https://www.youtube.com/embed/${activeReel.videoId}?autoplay=1&mute=0&rel=0&modestbranding=1&controls=0`}
                title="Instagram Reel View"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0 z-10"
              />

              {/* Instagram Reels UI Overlays (Simulated on top of video) */}
              <div className="absolute right-4 bottom-24 z-20 flex flex-col items-center gap-5 text-white">
                {/* Profile Pic Indicator */}
                <a 
                  href={INSTAGRAM_PROFILE_URL}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border-2 border-pink-500 overflow-hidden relative group hover:scale-105 transition-transform"
                >
                  <div className="absolute inset-0 bg-[#bc1888]/20 group-hover:bg-transparent transition-colors" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/favicon.ico" alt="Katayayani Enterprises Logo" className="w-full h-full object-cover bg-white" />
                </a>

                {/* Like Button */}
                <button 
                  onClick={(e) => handleLikeToggle(activeReel.id, e)}
                  className="flex flex-col items-center gap-1 group py-1"
                >
                  <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-colors">
                    <Heart className={`w-5.5 h-5.5 ${isLiked[activeReel.id] ? "text-red-500 fill-red-500 animate-ping-once" : "text-white"}`} />
                  </div>
                  <span className="text-[11px] font-bold shadow-sm">{formatNumber(likeCounts[activeReel.id] || 0)}</span>
                </button>

                {/* Comment Button */}
                <div className="flex flex-col items-center gap-1 py-1">
                  <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                    <MessageCircle className="w-5.5 h-5.5 text-white" />
                  </div>
                  <span className="text-[11px] font-bold shadow-sm">{activeReel.comments}</span>
                </div>

                {/* Share/Instagram Button */}
                <a 
                  href={`${INSTAGRAM_PROFILE_URL}reels/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1 py-1"
                >
                  <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-colors">
                    <Send className="w-5.5 h-5.5 text-white ml-0.5" />
                  </div>
                  <span className="text-[11px] font-bold shadow-sm">Share</span>
                </a>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-16 z-20 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[13px] font-bold">katayayanienterprises.meerut</span>
                  <a
                    href={INSTAGRAM_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold bg-[#bc1888] hover:bg-[#d6249f] px-2 py-0.5 rounded-md transition-colors"
                  >
                    Follow
                  </a>
                </div>
                <p className="text-[12px] font-normal leading-tight text-white/90 line-clamp-3">
                  {activeReel.title}
                </p>
                <div className="flex items-center gap-1 mt-2.5 text-[10px] text-white/70">
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Original audio</span>
                </div>
              </div>
            </div>

            {/* Bottom Phone Indicator Bar */}
            <div className="w-full h-8 bg-black flex items-center justify-center z-30">
              <a
                href={INSTAGRAM_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2 bg-gradient-to-r from-[#f09433] via-[#e1306c] to-[#bc1888] text-white text-[12px] font-black tracking-wide uppercase hover:opacity-95 flex items-center justify-center gap-1.5"
              >
                <Instagram className="w-3.5 h-3.5" />
                View on Instagram
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
