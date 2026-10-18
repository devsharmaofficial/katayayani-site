"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import { X, ExternalLink, Play } from "lucide-react";

const YouTube = dynamic(() => import("react-youtube"), { ssr: false });

export type MediaType = "video" | "reel" | "short";

export interface MediaItem {
  type: MediaType;
  id: string;
  title: string;
  thumbnail: string;
}

interface MediaModalProps {
  media: MediaItem | null;
  onClose: () => void;
}

export default function MediaModal({ media, onClose }: MediaModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // ESC key listener & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (media) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [media, onClose]);

  const [prevMedia, setPrevMedia] = useState<MediaItem | null>(null);

  useEffect(() => {
    if (media) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPrevMedia(media);
    }
  }, [media]);

  if (!mounted) return null;

  const currentMedia = media || prevMedia;

  const isReel = currentMedia?.type === "reel";
  const isShort = currentMedia?.type === "short";
  const isVideo = currentMedia?.type === "video";

  const modalJSX = (
    <>
      {media && currentMedia && (
        <div key="media-modal" className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-black/95 backdrop-blur-3xl cursor-pointer z-[999998] transition-opacity duration-300 animate-in fade-in"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          />

          {/* Top-Right Screen Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onClose();
            }}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[1000001] p-3.5 rounded-full bg-white/15 hover:bg-red-600 active:scale-90 text-white transition-all duration-300 backdrop-blur-xl border border-white/30 shadow-[0_0_30px_rgba(255,0,0,0.1)] hover:shadow-[0_0_30px_rgba(255,0,0,0.5)] cursor-pointer pointer-events-auto group animate-in fade-in zoom-in-75"
            title="Close Video (Esc)"
          >
            <X className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:scale-110 duration-300" />
          </button>

          {/* Modal Container */}
          <div
            className={`relative w-full z-[1000000] flex flex-col items-center justify-center overflow-hidden rounded-2xl sm:rounded-[24px] bg-[#0d0d0f] shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/10 transition-all duration-300 animate-in fade-in zoom-in-95 ${
              isVideo
                ? "max-w-[1000px] aspect-video"
                : "max-w-[420px] h-[88vh] max-h-[780px]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Brand Accent Line */}
            <div
              className={`h-1 w-full shrink-0 ${
                isReel
                  ? "bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500"
                  : "bg-red-600"
              }`}
            />

            {/* Modal Header Bar - Fixed Top Bar (non-overlapping) */}
            <div className="w-full px-4 py-3 bg-[#141417]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between shrink-0 z-20">
              <div className="flex items-center gap-3 overflow-hidden mr-3">
                {isReel ? (
                  <div className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-pink-400 border border-pink-500/20 text-[11px] font-bold uppercase tracking-wider">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-pink-400">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    <span>Instagram Reel</span>
                  </div>
                ) : (
                  <div className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-[11px] font-bold uppercase tracking-wider">
                    <Play className="w-3.5 h-3.5 fill-red-400" />
                    <span>{isShort ? "YouTube Short" : "YouTube Video"}</span>
                  </div>
                )}
                <span className="text-white/80 font-medium text-xs sm:text-sm truncate drop-shadow">
                  {currentMedia.title}
                </span>
              </div>

              {/* External Link Pill */}
              <a
                href={
                  isReel
                    ? `https://www.instagram.com/reel/${currentMedia.id}/`
                    : isShort
                    ? `https://www.youtube.com/shorts/${currentMedia.id}`
                    : `https://www.youtube.com/watch?v=${currentMedia.id}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 text-[11px] font-medium border border-white/15 transition-all duration-200"
              >
                <span>Watch on {isReel ? "Insta" : "YouTube"}</span>
                <ExternalLink className="w-3 h-3 text-white/70" />
              </a>
            </div>

            {/* Video Player Box Area */}
            <div className="w-full flex-1 relative flex items-center justify-center bg-black overflow-hidden">
              {isReel ? (
                // Clean Instagram Embed Frame
                <iframe
                  src={`https://www.instagram.com/reel/${currentMedia.id}/embed/`}
                  className="w-full h-full border-0 absolute inset-0"
                  allowTransparency
                  allow="autoplay; encrypted-media"
                  title={currentMedia.title}
                />
              ) : isShort ? (
                // Clean YouTube Shorts Embed Frame
                <div className="w-full h-full relative bg-black flex items-center justify-center">
                  <iframe
                    src={`https://www.youtube.com/embed/${currentMedia.id}?autoplay=1&playsinline=1&rel=0&modestbranding=1&controls=1&loop=1&playlist=${currentMedia.id}`}
                    className="w-full h-full max-w-[420px] aspect-[9/16] border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={currentMedia.title}
                  />
                  <div className="absolute top-2 left-2 z-10 pointer-events-none">
                    <span className="bg-red-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      Short
                    </span>
                  </div>
                </div>
              ) : (
                // Clean YouTube Player Embed
                <div className="w-full h-full relative bg-black flex items-center justify-center">
                  <YouTube
                    videoId={currentMedia.id}
                    opts={{
                      height: "100%",
                      width: "100%",
                      playerVars: {
                        autoplay: 1,
                        controls: 1,
                        rel: 0,
                        modestbranding: 1,
                        iv_load_policy: 3,
                        cc_load_policy: 0,
                      },
                    }}
                    className="w-full h-full bg-black flex items-center justify-center absolute inset-0"
                    iframeClassName="w-full h-full max-h-full"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );

  return createPortal(modalJSX, document.body);
}
