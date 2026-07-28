"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import dynamic from "next/dynamic";

// Dynamically import react-youtube with NO SSR so it doesn't block initial page load/hydration
const YouTube = dynamic(() => import("react-youtube"), { ssr: false });

const HERO_IMAGE_PATH = "/hero-slider/hppggurkoc7o0gpnqqn2.avif";

type HeroBanner = {
  type: "image" | "video" | "split-shorts";
  src?: string;
  alt?: string;
  videoId?: string;
  start?: number;
  shorts?: { videoId: string; start?: number }[];
};

const heroBanners: HeroBanner[] = [
  {
    type: "split-shorts",
    shorts: [
      { videoId: "gQT_ke2q5To" },
      { videoId: "dmhwYUss980" }
    ]
  },
  {
    type: "image",
    src: HERO_IMAGE_PATH,
    alt: "Premium Swaraj & Mahindra Tractor Fiber Hood Manufacturer India"
  },
  {
    type: "video",
    videoId: "8AwxVYJaLew",
    start: 5,
  },
  {
    type: "image",
    src: "/hero-slider/lf33ylzukbdxjfbcupvf.avif",
    alt: "Best Price Tractor Fiber Chatri & Canopy Manufacturer Meerut"
  },
  {
    type: "video",
    videoId: "0IoHCk3LOko",
  },
  {
    type: "split-shorts",
    shorts: [
      { videoId: "c1hL6fj8VjQ" },
      { videoId: "ap38alCuUxY" }
    ]
  },
  {
    type: "image",
    src: "/hero-slider/ppisvxajf1zmlunl52yu.avif",
    alt: "Heavy Duty Punjabi Hood Fiber Chatri Canopy Factory"
  }
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [firstLoaded, setFirstLoaded] = useState(false);
  const [loadedSlides, setLoadedSlides] = useState<Set<number>>(new Set([0]));
  const [mountVideos, setMountVideos] = useState(false);
  
  // Store references to YouTube players using unique keys e.g., "slide-0-0"
  const playerRefs = useRef<{ [key: string]: any }>({});

  // Idle Rendering Pattern: Defer video mounting to unblock main thread on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setMountVideos(true);
    }, 1500); // Wait 1.5s after hydration to mount heavy iframes
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // If it's a video slide, pause auto-scroll immediately
    const banner = heroBanners[currentSlide];
    if (banner.type === "video" || banner.type === "split-shorts") {
      setIsPaused(true);
    } else {
      setIsPaused(false);
    }

    // Command videos to play or pause based on current slide
    Object.keys(playerRefs.current).forEach((key) => {
      const slideIdx = parseInt(key.split("-")[1]);
      const player = playerRefs.current[key];
      
      if (player && typeof player.pauseVideo === "function") {
        if (slideIdx === currentSlide) {
          const banner = heroBanners[slideIdx];
          if (banner.type === "video" && banner.start) {
            player.seekTo(banner.start, true);
          }
          // Attempt to auto-play with sound
          player.playVideo();
        } else {
          // Pause if it's not the active slide
          player.pauseVideo();
        }
      }
    });
  }, [currentSlide]);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % heroBanners.length;
        setLoadedSlides((loaded) => {
          if (loaded.has(next)) return loaded;
          const copy = new Set(loaded);
          copy.add(next);
          return copy;
        });
        return next;
      });
    }, 4000); // 4 seconds per slide

    return () => clearInterval(timer);
  }, [isPaused]);

  const goToSlide = useCallback((idx: number) => {
    setCurrentSlide(idx);
    setLoadedSlides((loaded) => {
      if (loaded.has(idx)) return loaded;
      const copy = new Set(loaded);
      copy.add(idx);
      return copy;
    });
  }, []);

  const handleVideoReady = (event: any, slideIndex: number, playerKey: string) => {
    const player = event.target;
    playerRefs.current[`slide-${slideIndex}-${playerKey}`] = player;
    
    // If the video loads while it's the current slide, play it
    if (currentSlide === slideIndex) {
      const banner = heroBanners[slideIndex];
      if (banner.type === "video" && banner.start) {
        player.seekTo(banner.start, true);
      }
      player.playVideo();
    }
  };

  const handleStateChange = (event: any) => {
    // Hide static LCP image once video actually starts playing (state 1 is PLAYING in YT API)
    if (event.data === 1) { 
      setFirstLoaded(true);
    }
  };

  const handleVideoEnd = () => {
    // Advance to next slide when video finishes
    goToSlide((currentSlide + 1) % heroBanners.length);
  };

  const encPath = encodeURIComponent(HERO_IMAGE_PATH);

  const getYoutubeOpts = (startAt?: number) => ({
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
      controls: 1,
      rel: 0,
      modestbranding: 1,
      vq: "hd1080",
      mute: 1, // Must be muted for guaranteed autoplay on load
      playsinline: 1,
      start: startAt,
    },
  });

  return (
    <div className="w-full flex flex-col relative rounded-[24px] md:rounded-[32px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.1)] bg-white mt-2">
      {/* Image/Video Section */}
      <div className="w-full relative aspect-[16/9] sm:aspect-[2/1] md:aspect-[21/9] lg:aspect-[2.5/1] xl:aspect-[2.8/1] bg-[#f8f8f8]">

        {/* Static LCP image - Fades out once first slide (video or image) loads */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          id="hero-lcp-image"
          src={`/_next/image?url=${encPath}&w=828&q=80`}
          srcSet={`/_next/image?url=${encPath}&w=640&q=80 640w, /_next/image?url=${encPath}&w=828&q=80 828w, /_next/image?url=${encPath}&w=1080&q=80 1080w, /_next/image?url=${encPath}&w=1200&q=80 1200w`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1300px"
          alt="Premium Swaraj & Mahindra Tractor Fiber Hood Manufacturer India"
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-0 w-full h-full object-contain text-transparent"
          style={{
            opacity: firstLoaded ? 0 : 1,
            zIndex: firstLoaded ? -1 : 20,
            transition: "opacity 0.3s ease",
          }}
          width={828}
          height={466}
        />

        {/* Interactive slides */}
        {heroBanners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out ${
              currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {loadedSlides.has(index) && (
              banner.type === "split-shorts" ? (
                <div className="w-full h-full flex bg-black">
                  {mountVideos && (
                    <>
                      <div className="w-1/2 h-full border-r border-black/50">
                        <YouTube
                          videoId={banner.shorts![0].videoId}
                          opts={getYoutubeOpts(banner.shorts![0].start)}
                          onReady={(e) => handleVideoReady(e, index, "0")}
                          onStateChange={handleStateChange}
                          onEnd={handleVideoEnd}
                          className="w-full h-full flex items-center justify-center"
                          iframeClassName="w-full h-full max-h-full"
                        />
                      </div>
                      <div className="w-1/2 h-full border-l border-black/50">
                        <YouTube
                          videoId={banner.shorts![1].videoId}
                          opts={getYoutubeOpts(banner.shorts![1].start)}
                          onReady={(e) => handleVideoReady(e, index, "1")}
                          onStateChange={handleStateChange}
                          onEnd={handleVideoEnd}
                          className="w-full h-full flex items-center justify-center"
                          iframeClassName="w-full h-full max-h-full"
                        />
                      </div>
                    </>
                  )}
                </div>
              ) : banner.type === "video" ? (
                <div className="w-full h-full bg-black">
                   {mountVideos && (
                     <YouTube
                       videoId={banner.videoId}
                       opts={getYoutubeOpts(banner.start)}
                       onReady={(e) => handleVideoReady(e, index, "0")}
                       onStateChange={handleStateChange}
                       onEnd={handleVideoEnd}
                       className="w-full h-full bg-black flex items-center justify-center"
                       iframeClassName="w-full h-full max-h-full aspect-video"
                     />
                   )}
                </div>
              ) : (
                <Image
                  src={banner.src!}
                  alt={banner.alt!}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1300px"
                  priority={index === 0 || index === 1}
                  fetchPriority={index === 0 || index === 1 ? "high" : "low"}
                  loading={index === 0 || index === 1 ? "eager" : "lazy"}
                  quality={index === 0 || index === 1 ? 100 : 80}
                  onLoad={index === 1 ? () => setFirstLoaded(true) : undefined}
                />
              )
            )}
          </div>
        ))}
      </div>
      
      {/* Bottom Bar: Pagination and Buttons */}
      <div className="w-full relative px-5 py-4 md:px-8 md:py-6 bg-white flex flex-col md:flex-row items-center justify-center gap-5 border-t border-black/5">
          {/* Pagination dashes */}
          <div className="flex gap-2.5 w-full justify-center md:absolute md:left-8 md:w-auto">
            {heroBanners.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => goToSlide(idx)}
                className={`h-[5px] cursor-pointer transition-all duration-300 rounded-full ${idx === currentSlide ? 'w-10 sm:w-12 bg-[#012d1d]' : 'w-5 sm:w-6 bg-black/10 hover:bg-black/20'}`} 
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4 w-full md:w-auto z-10">
              <div className="flex-1 md:flex-none flex justify-center">
                <InteractiveHoverButton 
                  href="/products" 
                  text="Buy Now" 
                  className="w-full justify-center"
                />
              </div>
              <Link href="/contact" className="flex-1 md:flex-none text-center px-6 md:px-8 py-3 bg-white text-[#012d1d] font-bold border-2 border-[#012d1d]/10 rounded-full hover:bg-black/5 transition-all shadow-sm text-[15px] tracking-wide h-[54px] flex items-center justify-center">
                  Request Quote
              </Link>
          </div>
      </div>
    </div>
  );
}
