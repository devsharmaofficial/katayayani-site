"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Heart, MessageCircle, X, ExternalLink } from "lucide-react";

const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/katayayani.enterprises/";
const INSTAGRAM_ID = "katayayani.enterprises";

const REELS = [
  {
    id: "DbsKeEUB73O",
    title: "Premium Punjabi Hood Modification on Tractor 🚜🔥",
    likes: "5.4K",
    comments: "148",
  },
  {
    id: "DbP0c0bBdcZ",
    title: "Swaraj Modified with Heavy Duty Fiber Chatri Setup ⚡",
    likes: "4.1K",
    comments: "112",
  },
  {
    id: "DbP1VJ_hLbN",
    title: "Katayayani Enterprises Custom Canopy Fitment & Review 🌟",
    likes: "6.3K",
    comments: "230",
  },
  {
    id: "DblnpQQhbOV",
    title: "Double Bumper Fiber Hood Tractor Installation Guide 🛠️",
    likes: "3.8K",
    comments: "95",
  },
  {
    id: "DblTKvyhXuj",
    title: "Custom Painted Tractor Canopy Design Factory Showcase 🎨",
    likes: "4.7K",
    comments: "128",
  },
  {
    id: "DbP04gcBKGt",
    title: "Mahindra Tractor New Fiber Canopy Fitment and Walkaround 🚜🌟",
    likes: "3.9K",
    comments: "104",
  },
  {
    id: "DafnacEhlnu",
    title: "Customer Review and Ride-Along with Punjabi Hood Installation 🌾💯",
    likes: "5.1K",
    comments: "176",
  },
  {
    id: "DbPzywnBs0f",
    title: "Best Price Tractor Fiber Hood Manufacturing Unit Meerut 🏗️⚡",
    likes: "4.5K",
    comments: "135",
  },
];

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
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

export default function InstagramSection() {
  const [activeReel, setActiveReel] = useState<typeof REELS[0] | null>(null);
  const [isLiked, setIsLiked] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});

  const getLikeCount = (reelId: string, baseLikes: string) => {
    if (likeCounts[reelId]) return likeCounts[reelId];
    const base = parseFloat(baseLikes.replace("K", "")) * 1000;
    return Math.floor(base);
  };

  const handleLikeToggle = (id: string, baseLikes: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentCount = getLikeCount(id, baseLikes);
    setIsLiked((prev) => {
      const nextState = !prev[id];
      setLikeCounts((prevCounts) => ({
        ...prevCounts,
        [id]: (prevCounts[id] || currentCount) + (nextState ? 1 : -1),
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
    <section className="relative overflow-hidden py-16 md:py-24 bg-[#fafafa] border-t border-gray-100" aria-label="Instagram Integration">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-pink-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-yellow-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        {/* Header content */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="flex items-center gap-2 bg-[#c13584] text-white text-[11px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                <InstagramIcon className="w-3.5 h-3.5" />
                Instagram
              </span>
              <span className="text-gray-600 text-[12px] font-bold">@{INSTAGRAM_ID}</span>
            </div>
            
            <h2 className="text-gray-900 text-[28px] sm:text-[36px] md:text-[40px] font-black leading-tight tracking-tight">
              Trending on <span className="text-[#c13584]">Instagram Reels</span>
            </h2>
            <p className="text-gray-600 text-[14px] mt-2 max-w-[500px] leading-relaxed">
              Explore our latest updates, customer tractor installations, and newly customized fiber hoods directly on our Instagram grid.
            </p>
          </div>

          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#c13584] hover:bg-[#a12a6e] text-white font-extrabold text-[14px] rounded-full transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
          >
            <InstagramIcon className="w-4 h-4" />
            Follow on Instagram
            <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
          </a>
        </div>

        {/* Reels grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {REELS.map((reel) => {
            const liked = isLiked[reel.id];
            const currentLikes = likeCounts[reel.id] || getLikeCount(reel.id, reel.likes);
            const localThumbnailUrl = `/instagram/${reel.id}.jpg`;

            return (
              <div
                key={reel.id}
                onClick={() => setActiveReel(reel)}
                className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-black cursor-pointer group shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
              >
                <Image
                  src={localThumbnailUrl}
                  alt={reel.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 250px"
                  quality={40}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

                {/* Play Badge Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                    <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
                  </div>
                </div>

                {/* Top Instagram Reels indicator */}
                <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md rounded-lg px-2 py-1 text-[9px] text-white/95 font-bold flex items-center gap-1">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                  </svg>
                  <span>REEL</span>
                </div>

                {/* Bottom stats & info */}
                <div className="absolute bottom-4 left-3 right-3 text-white">
                  <p className="text-[11px] font-semibold leading-snug mb-2 line-clamp-2 text-white/95">
                    {reel.title}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-white/80 font-bold">
                    <button
                      onClick={(e) => handleLikeToggle(reel.id, reel.likes, e)}
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-10 pt-6 border-t border-gray-200">
          <span className="text-[12px] font-bold text-gray-600">
            @{INSTAGRAM_ID}
          </span>
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-bold text-[#c13584] hover:text-[#a12a6e] hover:underline inline-flex items-center gap-1.5 transition-colors"
          >
            Open Instagram Profile
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Immersive Instagram Reels Embed Modal */}
      {activeReel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md" onClick={() => setActiveReel(null)}>
          {/* Close button */}
          <button
            onClick={() => setActiveReel(null)}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-105 active:scale-95"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div 
            className="relative w-full max-w-[480px] h-[85vh] max-h-[720px] rounded-3xl bg-white shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header info */}
            <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f09433] via-[#c13584] to-[#bc1888] p-[1.5px]">
                  <div className="w-full h-full rounded-full bg-white p-[1px]">
                    <Image src="/favicon.ico" alt="Katayayani Enterprises Logo" width={32} height={32} className="w-full h-full object-cover rounded-full" />
                  </div>
                </div>
                <div>
                  <h3 className="text-[13px] font-bold text-gray-900 leading-none">{INSTAGRAM_ID}</h3>
                  <span className="text-[10px] text-gray-600">Instagram Reel</span>
                </div>
              </div>
              <a
                href={INSTAGRAM_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-white bg-[#e1306c] hover:bg-[#c13584] px-4 py-1.5 rounded-full transition-colors"
              >
                Follow
              </a>
            </div>

            {/* Main Instagram Official Embed Iframe */}
            <div className="flex-1 w-full bg-[#fafafa] relative overflow-hidden flex items-center justify-center p-2">
              <iframe
                src={`https://www.instagram.com/reel/${activeReel.id}/embed/`}
                title="Instagram Reel View"
                allowTransparency={true}
                frameBorder="0"
                scrolling="no"
                className="w-full h-full rounded-xl border-0 shadow-sm"
                style={{ background: "white" }}
              />
            </div>

            {/* Bottom Bar redirecting to app / website */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <a
                href={`https://www.instagram.com/reel/${activeReel.id}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#e1306c] hover:bg-[#c13584] text-white text-[13px] font-extrabold tracking-wide uppercase hover:opacity-95 flex items-center justify-center gap-1.5 rounded-xl shadow-md transition-all active:scale-[0.98]"
              >
                <InstagramIcon className="w-4 h-4" />
                View & Comment on Instagram
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
