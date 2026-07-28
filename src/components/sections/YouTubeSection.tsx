"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { Play, ExternalLink } from "lucide-react";

const CHANNEL_URL = "https://youtube.com/@katayayanienterprises.meerut";

// YouTube Shorts video IDs from the channel
const SHORTS = [
  { id: "UL6jtWMHmtI" },
  { id: "c1hL6fj8VjQ" },
  { id: "ap38alCuUxY" },
  { id: "3STNVrRyyP0" },
  { id: "koeGb8HLNgs" },
  { id: "NCVo8d9WqUM" },
  { id: "dmhwYUss980" },
  { id: "6HTWN0JjXA4" },
];

function ShortCard({ id, index }: { id: string; index: number }) {
  const [playing, setPlaying] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPlaying(true);
  };

  // Staggered animation delay for entrance
  const delay = `${index * 0.08}s`;

  return (
    <div
      className="short-card relative flex-shrink-0 rounded-2xl overflow-hidden bg-black cursor-pointer group"
      style={{
        width: "clamp(130px, 28vw, 175px)",
        aspectRatio: "9/16",
        animationDelay: delay,
      }}
      onClick={playing ? undefined : handlePlay}
    >
      {!playing ? (
        <>
          {/* Thumbnail */}
          <Image
            ref={imgRef as any}
            src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
            alt="Katayayani Enterprises Tractor Fiber Hood YouTube Short"
            width={175}
            height={311}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            unoptimized={false}
          />

          {/* Gradient layers */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 transition-opacity duration-300 group-hover:opacity-70" />

          {/* Shorts logo - top left */}
          <div className="absolute top-2.5 left-2.5 z-10">
            <div className="flex items-center gap-1 bg-[#FF0000] rounded-full px-1.5 py-0.5 shadow-md">
              <svg width="8" height="10" viewBox="0 0 10 14" fill="white">
                <path d="M8.77 4.32L7.57 3.82 9 3.06C10.84 2.1 11.53-.17 10.56-2S7.33-2.53 5.5-1.56L-3 2.94C-4.29 3.62-5.06 4.97-4.98 6.43c.07 1.46.98 2.73 2.3 3.27l1.2.5L-3 10.94C-4.84 11.9-5.53 14.17-4.56 16c.97 1.83 3.23 2.53 5.06 1.56l8.5-4.5c1.29-.68 2.06-2.03 1.98-3.49-.07-1.46-.98-2.73-2.21-3.25z"/>
              </svg>
              <span className="text-white font-bold" style={{ fontSize: "8px" }}>Shorts</span>
            </div>
          </div>

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-white group-hover:shadow-red-500/20 group-hover:shadow-2xl">
              <Play className="w-4 h-4 text-black ml-0.5" fill="black" />
            </div>
          </div>

          {/* Hover shimmer */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-white/5 to-transparent" />
        </>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title="Katayayani Enterprises YouTube Short"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      )}
    </div>
  );
}

// YouTube Logo SVG
function YTLogo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 20 14" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.582 2.186A2.506 2.506 0 0 0 17.824.424C16.254 0 10 0 10 0S3.746 0 2.176.424A2.506 2.506 0 0 0 .418 2.186 26.33 26.33 0 0 0 0 7a26.33 26.33 0 0 0 .418 4.814 2.506 2.506 0 0 0 1.758 1.762C3.746 14 10 14 10 14s6.254 0 7.824-.424a2.506 2.506 0 0 0 1.758-1.762A26.33 26.33 0 0 0 20 7a26.33 26.33 0 0 0-.418-4.814ZM8 10V4l5.2 3L8 10Z"
        fill="white"
      />
    </svg>
  );
}

export default function YouTubeSection() {
  return (
    <section
      className="relative overflow-hidden py-16 md:py-24"
      aria-label="Katayayani Enterprises YouTube Shorts — Tractor Fiber Hood Videos"
    >
      {/* === BACKGROUND === */}
      <div className="absolute inset-0 bg-[#0d0d0d]" />

      {/* Ambient glows */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#FF0000]/8 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-20 w-[400px] h-[400px] rounded-full bg-[#012d1d]/40 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#FF0000]/4 blur-[80px] pointer-events-none" />

      {/* Fine dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* === CONTENT === */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">

          <div>
            {/* Label pill */}
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="flex items-center gap-2 bg-[#cc0000] text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg shadow-red-900/30">
                <YTLogo size={14} />
                YouTube
              </span>
              <span className="text-white/60 text-[12px] tracking-wide">Shorts &amp; Videos</span>
            </div>

            <h2 className="text-white text-[28px] sm:text-[36px] md:text-[40px] font-extrabold leading-[1.1] tracking-tight">
              Watch Our{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #FF0000 0%, #FF6B6B 100%)",
                }}
              >
                YouTube&nbsp;Channel
              </span>
            </h2>

            <p className="text-white/60 text-[14px] mt-3 max-w-[480px] leading-relaxed">
              See real tractor fiber hoods, punjabi hoods &amp; fiber chatri in action — Swaraj, Mahindra, Sonalika &amp; all brands.
            </p>
          </div>

          {/* Subscribe CTA */}
          <div className="flex-shrink-0">
            <Link
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-white font-bold text-[14px] px-6 py-3.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 group"
              style={{
                background: "linear-gradient(135deg, #FF0000 0%, #cc0000 100%)",
                boxShadow: "0 8px 32px -4px rgba(255,0,0,0.35), 0 0 0 1px rgba(255,0,0,0.15)",
              }}
            >
              <YTLogo size={18} />
              Subscribe Now
              <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
            </Link>
          </div>
        </div>
      </div>

      {/* === SHORTS SCROLL STRIP (full-width, bleeds to edges) === */}
      <div className="relative">
        {/* Left edge fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #0d0d0d, transparent)" }} />
        {/* Right edge fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #0d0d0d, transparent)" }} />

        <div
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 pt-1 px-8"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {SHORTS.map((short, i) => (
            <ShortCard key={short.id} id={short.id} index={i} />
          ))}
        </div>
      </div>

      {/* === BOTTOM FOOTER ROW === */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 mt-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/[0.06]">
          <p className="text-white/60 text-[12px] tracking-wide">
            @katayayanienterprises.meerut
          </p>
          <Link
            href={`${CHANNEL_URL}/shorts`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#FF4444] hover:text-[#FF6666] text-[13px] font-semibold transition-all duration-200 hover:gap-2.5"
          >
            View All Shorts
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Card animation CSS moved to globals.css as .short-card */}
    </section>
  );
}
