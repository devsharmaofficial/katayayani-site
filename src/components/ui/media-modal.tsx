"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import { X, ExternalLink, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  if (!mounted) return null;

  const isReel = media?.type === "reel";
  const isShort = media?.type === "short";
  const isVideo = media?.type === "video";

  const modalJSX = (
    <AnimatePresence>
      {media && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 bg-black/95 backdrop-blur-2xl cursor-pointer z-[999998]"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          />

          {/* Top-Right Screen Close Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onClose();
            }}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[1000001] p-3.5 rounded-full bg-white/15 hover:bg-red-600 active:scale-90 text-white transition-all duration-200 backdrop-blur-xl border border-white/30 shadow-2xl cursor-pointer pointer-events-auto group"
            title="Close Video (Esc)"
          >
            <X className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:rotate-90 duration-300" />
          </motion.button>

          {/* Animated Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 26, stiffness: 340 }}
            className={`relative w-full z-[1000000] flex flex-col items-center justify-center overflow-hidden rounded-2xl sm:rounded-[32px] bg-[#0d0d0f] shadow-[0_0_80px_rgba(0,0,0,0.95)] border border-white/20 ${
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
            <div className="w-full px-4 py-3 bg-[#141417] border-b border-white/10 flex items-center justify-between shrink-0 z-20">
              <div className="flex items-center gap-2">
                {isReel ? (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-pink-400 border border-pink-500/30 text-[11px] font-bold uppercase tracking-wider">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-pink-400">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    Instagram Reel
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-[11px] font-bold uppercase tracking-wider">
                    <Play className="w-3.5 h-3.5 fill-red-400 text-red-400" />
                    {isShort ? "YouTube Short" : "YouTube Video"}
                  </div>
                )}
              </div>

              {/* Header Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-red-600 text-white text-[12px] font-bold transition-all border border-white/20 cursor-pointer active:scale-95 shadow-md"
              >
                <X className="w-3.5 h-3.5" />
                Close
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="flex-1 w-full relative overflow-hidden bg-black flex flex-col">
              {isReel ? (
                // Official Instagram Reel Embed Container
                <div className="w-full h-full bg-[#121212] relative overflow-hidden flex flex-col">
                  <div className="flex-1 w-full relative bg-white">
                    <iframe
                      src={`https://www.instagram.com/reel/${media.id}/embed/`}
                      title={media.title || "Instagram Reel"}
                      allowTransparency={true}
                      frameBorder="0"
                      scrolling="no"
                      className="absolute inset-0 w-full h-full border-0"
                      style={{ background: "white" }}
                    />
                  </div>
                  <div className="p-3 bg-[#18181b] border-t border-white/10 shrink-0">
                    <a
                      href={`https://www.instagram.com/reel/${media.id}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white text-[13px] font-black tracking-wide uppercase flex items-center justify-center gap-2 rounded-xl shadow-lg transition-all active:scale-[0.98]"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-white">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                      Watch on Instagram
                      <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                    </a>
                  </div>
                </div>
              ) : (
                // Clean YouTube Player Embed
                <div className="w-full h-full relative bg-black flex items-center justify-center">
                  <YouTube
                    videoId={media.id}
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalJSX, document.body);
}
