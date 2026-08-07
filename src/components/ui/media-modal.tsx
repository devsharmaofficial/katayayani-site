"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import { X, ExternalLink } from "lucide-react";
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

  const modalJSX = (
    <AnimatePresence>
      {media && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 bg-black/95 backdrop-blur-2xl cursor-pointer z-[999998]"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          />

          {/* Floating Top-Right Close Button - Highest Z-Index */}
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
            <X className="w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover:rotate-90 duration-300" />
          </motion.button>

          {/* Animated Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className={`relative w-full z-[1000000] flex flex-col items-center justify-center overflow-hidden rounded-2xl sm:rounded-3xl bg-[#09090b] shadow-[0_0_80px_rgba(0,0,0,0.95)] border border-white/20 ${
              media.type === "video"
                ? "max-w-[1000px] aspect-video"
                : "max-w-[420px] h-[85vh] max-h-[760px]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header info bar inside container */}
            <div className="absolute top-0 left-0 right-0 z-30 px-4 py-3 bg-gradient-to-b from-black/90 via-black/50 to-transparent flex items-center justify-between pointer-events-auto">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/20 shadow-sm">
                {media.type === "reel" ? "Instagram Reel" : media.type === "short" ? "YouTube Short" : "YouTube Video"}
              </span>

              {/* Inner close button inside container header for extra reliability */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-red-600 text-white text-[12px] font-bold transition-all border border-white/20 cursor-pointer shadow-md"
              >
                <X className="w-3.5 h-3.5" />
                Close
              </button>
            </div>

            {/* Video Content */}
            {media.type === "reel" ? (
              // Official Instagram Reel Embed
              <div className="w-full h-full bg-[#fafafa] relative overflow-hidden flex flex-col pt-12">
                <div className="flex-1 w-full relative">
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
                <div className="p-3 bg-white border-t border-gray-100 shrink-0">
                  <a
                    href={`https://www.instagram.com/reel/${media.id}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-[#e1306c] hover:bg-[#c13584] text-white text-[13px] font-bold tracking-wide uppercase hover:opacity-95 flex items-center justify-center gap-2 rounded-xl shadow-md transition-all active:scale-[0.98]"
                  >
                    View Reel on Instagram
                    <ExternalLink className="w-4 h-4" />
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalJSX, document.body);
}
