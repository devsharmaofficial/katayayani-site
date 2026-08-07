"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ChevronLeft, ChevronRight, X, MessageCircle, ArrowUpRight, Search, Play, ExternalLink, ImageIcon, VideoIcon } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/motion/ScrollReveal";
import { getAllProducts } from "@/lib/products";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

const YouTube = dynamic(() => import("react-youtube"), { ssr: false });

type MediaType = "video" | "reel" | "short";

interface MediaItem {
  type: MediaType;
  id: string;
  title: string;
  thumbnail: string;
}

// Consolidating all scraped media
const MEDIA_POOL: MediaItem[] = [
  // Newly Scraped YouTube Videos & Shorts (21 items)
  { type: "video", id: "0IoHCk3LOko", title: "Tractor Fiber Hood", thumbnail: "https://img.youtube.com/vi/0IoHCk3LOko/maxresdefault.jpg" },
  { type: "video", id: "1K2QMNdviLU", title: "MAKING OF TRACTOR ROOF CANOPY || AVAILABLE ON INDIAMART || #indiantractor", thumbnail: "https://img.youtube.com/vi/1K2QMNdviLU/maxresdefault.jpg" },
  { type: "video", id: "zQnOOgY0xAA", title: "BEST QUALITY FIBER HOOD | KATAYAYANI ENTERPRISES|", thumbnail: "https://img.youtube.com/vi/zQnOOgY0xAA/maxresdefault.jpg" },
  { type: "video", id: "scicO4XIies", title: "Mahindra Tractor Hoods", thumbnail: "https://img.youtube.com/vi/scicO4XIies/maxresdefault.jpg" },
  { type: "video", id: "8AwxVYJaLew", title: "🚜SWARAJ TRACTOR FIBER ROOF CANOPY🔥🔥", thumbnail: "https://img.youtube.com/vi/8AwxVYJaLew/maxresdefault.jpg" },
  { type: "video", id: "ubeivRfLExQ", title: "Swaraj Tractor Bumper manufacturing", thumbnail: "https://img.youtube.com/vi/ubeivRfLExQ/maxresdefault.jpg" },
  { type: "video", id: "XH49xTiab9E", title: "Tractor Hoods Canopy", thumbnail: "https://img.youtube.com/vi/XH49xTiab9E/maxresdefault.jpg" },
  { type: "short", id: "ct35ydK7Z_g", title: "Tractor Fiber Hood| Buy Now", thumbnail: "https://img.youtube.com/vi/ct35ydK7Z_g/maxresdefault.jpg" },
  { type: "short", id: "-tSXzjKu17A", title: "All Tractor fiber hood available #mahindra", thumbnail: "https://img.youtube.com/vi/-tSXzjKu17A/maxresdefault.jpg" },
  { type: "short", id: "UhsBJOETVRI", title: "All Tractor Fiber Hood available", thumbnail: "https://img.youtube.com/vi/UhsBJOETVRI/maxresdefault.jpg" },
  { type: "short", id: "UdOJf6It_TA", title: "All Tractor fiber hood available| all India delivery", thumbnail: "https://img.youtube.com/vi/UdOJf6It_TA/maxresdefault.jpg" },
  { type: "short", id: "sHBdDOuziVI", title: "All Tractor fiber hood available| all India delivery", thumbnail: "https://img.youtube.com/vi/sHBdDOuziVI/maxresdefault.jpg" },
  { type: "short", id: "gQT_ke2q5To", title: "Tractor Fiber Hood", thumbnail: "https://img.youtube.com/vi/gQT_ke2q5To/maxresdefault.jpg" },
  { type: "short", id: "m9KhEgoSXUM", title: "tractor fiber hood", thumbnail: "https://img.youtube.com/vi/m9KhEgoSXUM/maxresdefault.jpg" },
  { type: "short", id: "UL6jtWMHmtI", title: "BEST QUALITY FIBER HOOD ONLY AT KATAYAYANI ENTERPRISES", thumbnail: "https://img.youtube.com/vi/UL6jtWMHmtI/maxresdefault.jpg" },
  { type: "short", id: "c1hL6fj8VjQ", title: "BEST TRACTOR FIBER HOOD ONLY AT KATAYAYANI ENTERPRISES", thumbnail: "https://img.youtube.com/vi/c1hL6fj8VjQ/maxresdefault.jpg" },
  { type: "short", id: "ap38alCuUxY", title: "NO.1 QUALITY SONALIKA FIBER HOOD AND JOHN DEER FIBER HOOD", thumbnail: "https://img.youtube.com/vi/ap38alCuUxY/maxresdefault.jpg" },
  { type: "short", id: "3STNVrRyyP0", title: "EICHER TRACTOR ACCESORIES ONLY AT KATAYAYANI ENTERPRISES", thumbnail: "https://img.youtube.com/vi/3STNVrRyyP0/maxresdefault.jpg" },
  { type: "short", id: "koeGb8HLNgs", title: "SWARAJ TRACTOR BUMPER | SONALIKA TRACTOR BUMPER", thumbnail: "https://img.youtube.com/vi/koeGb8HLNgs/maxresdefault.jpg" },
  { type: "short", id: "dmhwYUss980", title: "TRACTOR FRP CANOPY (HOOD)", thumbnail: "https://img.youtube.com/vi/dmhwYUss980/maxresdefault.jpg" },
  { type: "short", id: "6HTWN0JjXA4", title: "Tractor front Bumfer For Swaraj", thumbnail: "https://img.youtube.com/vi/6HTWN0JjXA4/maxresdefault.jpg" },
  
  // Instagram Reels
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

export default function GalleryPage() {
  const allProducts = getAllProducts();
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");

  // Dynamically compile all images from our products
  const galleryItems = useMemo(() => {
    interface GalleryItem {
      id: string;
      src: string;
      alt: string;
      brand: string;
      brandSlug: string;
      productName: string;
      productSlug: string;
      isHero: boolean;
    }
    const items: GalleryItem[] = [];
    allProducts.forEach((product) => {
      product.images.forEach((img, idx) => {
        items.push({
          id: `${product.slug}-${idx}`,
          src: img.src,
          alt: img.alt,
          brand: product.brand,
          brandSlug: product.brandSlug,
          productName: product.name,
          productSlug: product.slug,
          isHero: idx === 0,
        });
      });
    });
    return items;
  }, [allProducts]);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<MediaItem | null>(null);

  // Mixed and shuffled video array for the dense grid
  const [shuffledVideos, setShuffledVideos] = useState<(MediaItem & { spanClass: string })[]>([]);

  useEffect(() => {
    // Shuffle the array
    const shuffled = [...MEDIA_POOL].sort(() => 0.5 - Math.random());
    
    // Assign random masonry span classes based on media type for an eye-catching grid
    const withSpans = shuffled.map((media) => {
      let spanClass = "";
      if (media.type === "video") {
        // 40% large video, 60% wide video
        spanClass = Math.random() > 0.6 
          ? "col-span-1 sm:col-span-2 md:col-span-2 row-span-2 aspect-video" 
          : "col-span-1 sm:col-span-2 md:col-span-2 row-span-1 aspect-[21/9] sm:aspect-video";
      } else {
        // 30% tall vertical reel, 70% normal vertical reel
        spanClass = Math.random() > 0.7 
          ? "col-span-1 row-span-2 aspect-[9/16]" 
          : "col-span-1 row-span-1 aspect-[3/4] sm:aspect-[9/16]";
      }
      return { ...media, spanClass };
    });
    setShuffledVideos(withSpans);
  }, []);

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null || galleryItems.length <= 1) return;
    setLightboxIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev! - 1));
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null || galleryItems.length <= 1) return;
    setLightboxIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev! + 1));
  };

  const activePhotoItem = lightboxIndex !== null ? galleryItems[lightboxIndex] : null;

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-28 md:pt-36 w-full max-w-[1280px] mx-auto px-[24px] pb-24">
        {/* Visual Breadcrumb Trail */}
        <Breadcrumbs items={[{ name: "Home", url: "/" }, { name: "Product Gallery", url: "/gallery" }]} />

        {/* Dynamic H1 Page Header */}
        <ScrollReveal>
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h1 className="text-[26px] md:text-[36px] font-black text-[#012d1d] leading-tight mb-3">
              FRP Tractor Canopy Installation Gallery
            </h1>
            <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed">
              Explore real customer installation photos and high-quality product videos of <strong>punjabi tractor hoods</strong> and <strong>fiber chatris</strong> manufactured by Katayayani Enterprises.
            </p>
          </div>
        </ScrollReveal>

        {/* Tabs for Photos / Videos */}
        <div className="flex items-center justify-center mb-12">
          <div className="bg-gray-100 p-1.5 rounded-full flex gap-1 shadow-inner border border-gray-200/60">
            <button
              onClick={() => setActiveTab("photos")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[14px] font-bold transition-all duration-300 ${
                activeTab === "photos" 
                ? "bg-white text-[#0a2e1f] shadow-md scale-100" 
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50 scale-95"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Installation Photos
            </button>
            <button
              onClick={() => setActiveTab("videos")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[14px] font-bold transition-all duration-300 ${
                activeTab === "videos" 
                ? "bg-[#0a2e1f] text-white shadow-md scale-100" 
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50 scale-95"
              }`}
            >
              <VideoIcon className="w-4 h-4" />
              Product Videos
            </button>
          </div>
        </div>

        {/* --- PHOTOS TAB --- */}
        {activeTab === "photos" && (
          <StaggerContainer className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {galleryItems.map((item, idx) => (
              <StaggerItem key={item.id} className="break-inside-avoid">
                <div
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative bg-white/40 backdrop-blur-md rounded-2xl overflow-hidden border border-white/60 shadow-sm hover:shadow-lg transition-all duration-500 cursor-pointer overflow-hidden transform hover:-translate-y-0.5"
                >
                  <div className="relative w-full aspect-[4/3] sm:aspect-auto sm:min-h-[200px]">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <div className="flex justify-between items-end text-white">
                      <div>
                        <span className="inline-block bg-primary text-on-primary px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider mb-2">
                          {item.brand}
                        </span>
                        <h3 className="text-title-sm font-bold truncate max-w-[180px] drop-shadow-md">
                          {item.productName.replace(" FRP Fiber Roof Canopy", "")}
                        </h3>
                        <p className="text-[11px] text-gray-300 font-medium line-clamp-1 opacity-90">
                          {item.alt}
                        </p>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <Search className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        {/* --- VIDEOS TAB --- */}
        {activeTab === "videos" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid-flow-dense gap-3 sm:gap-4 md:gap-5 animate-in fade-in duration-500">
            {shuffledVideos.map((media, idx) => {
              const isHorizontal = media.type === "video";
              return (
                <div 
                  key={media.id + idx}
                  onClick={() => setActiveVideo(media)}
                  className={`group relative rounded-xl sm:rounded-[24px] overflow-hidden cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 ${media.spanClass}`}
                >
                  <img
                    src={media.thumbnail}
                    alt={media.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 bg-gray-100"
                    onError={(e) => {
                      if (media.type !== 'reel' && media.thumbnail.includes('maxresdefault.jpg')) {
                        e.currentTarget.src = media.thumbnail.replace('maxresdefault.jpg', 'hqdefault.jpg');
                      }
                    }}
                  />
                  
                  {/* Gradient Overlay for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/5 opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                  
                  {/* Badge */}
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

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-red-600 border border-white/20">
                      <Play className="text-white w-6 h-6 ml-1" fill="currentColor" />
                    </div>
                  </div>

                  {/* Title */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <p className={`text-white font-bold leading-snug drop-shadow-md ${isHorizontal ? 'text-[16px] line-clamp-2' : 'text-[14px] line-clamp-3'}`}>
                      {media.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Lightbox Photo Modal */}
        {lightboxIndex !== null && activePhotoItem && (
          <div
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4 md:p-8 animate-in fade-in duration-300"
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 p-2.5 rounded-full transition-all border border-white/10 z-50 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative w-full max-w-[1000px] flex flex-col md:flex-row gap-6 bg-[#121212] rounded-3xl border border-white/5 overflow-hidden shadow-2xl p-4 md:p-6 animate-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>
              <div className="relative flex-grow flex items-center justify-center aspect-[4/3] md:aspect-auto md:h-[550px] bg-black/40 rounded-2xl overflow-hidden group">
                <img
                  src={activePhotoItem.src}
                  alt={activePhotoItem.alt}
                  className="max-w-full max-h-full object-contain rounded-xl select-none"
                />
                
                {/* Image Navigation */}
                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/80 text-white p-2.5 rounded-full backdrop-blur-sm transition-all border border-white/10 opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/80 text-white p-2.5 rounded-full backdrop-blur-sm transition-all border border-white/10 opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-[12px] font-bold px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                  {lightboxIndex + 1} / {galleryItems.length}
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="w-full md:w-[320px] flex flex-col pt-2 md:pt-4">
                <div className="mb-6 flex-grow">
                  <div className="inline-block px-3 py-1 bg-white/10 text-white border border-white/20 rounded-full text-[11px] font-bold uppercase tracking-wider mb-4">
                    {activePhotoItem.brand} Tractor
                  </div>
                  <h3 className="text-[20px] font-black text-white leading-tight mb-3">
                    {activePhotoItem.productName}
                  </h3>
                  <p className="text-gray-400 text-[14px] leading-relaxed">
                    {activePhotoItem.alt}
                  </p>
                </div>
                
                <div className="space-y-3 mt-auto">
                  <a
                    href={`https://wa.me/919358273054?text=${encodeURIComponent(`Hello Katayayani Enterprises,\n\nI saw this installation image of the *${activePhotoItem.brand}* tractor fiber hood in your gallery.\n\nCould you please share the pricing and delivery details for this model?\n\nThank you!`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_25px_rgba(37,211,102,0.5)] active:scale-[0.98]"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Ask Price on WhatsApp
                  </a>
                  <Link
                    href={`/products/${activePhotoItem.productSlug}`}
                    onClick={() => setLightboxIndex(null)}
                    className="w-full py-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/10 font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                  >
                    View Product Details
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video Player Modal */}
        {activeVideo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-lg" onClick={() => setActiveVideo(null)}>
            {/* Close button */}
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[110] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Modal Content Container */}
            <div 
              className={`relative w-full max-h-[90vh] flex flex-col items-center justify-center
                ${activeVideo.type === 'video' ? 'max-w-[1000px] aspect-video' : 'max-w-[480px] h-[85vh]'}
                rounded-2xl sm:rounded-3xl bg-black overflow-hidden shadow-2xl border border-white/10
              `}
              onClick={(e) => e.stopPropagation()}
            >
              {activeVideo.type === 'reel' ? (
                // Instagram Reel Embed
                <div className="w-full h-full bg-[#fafafa] relative overflow-hidden flex flex-col">
                  <div className="flex-1 w-full relative">
                    <iframe
                      src={`https://www.instagram.com/reel/${activeVideo.id}/embed/`}
                      title="Instagram Reel View"
                      allowTransparency={true}
                      frameBorder="0"
                      scrolling="no"
                      className="absolute inset-0 w-full h-full border-0"
                      style={{ background: "white" }}
                    />
                  </div>
                  <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                    <a
                      href={`https://www.instagram.com/reel/${activeVideo.id}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 bg-[#e1306c] hover:bg-[#c13584] text-white text-[13px] font-extrabold tracking-wide uppercase hover:opacity-95 flex items-center justify-center gap-1.5 rounded-xl shadow-md transition-all active:scale-[0.98]"
                    >
                      View on Instagram
                      <ExternalLink className="w-3.5 h-3.5 ml-1" />
                    </a>
                  </div>
                </div>
              ) : (
                // YouTube Embed
                <YouTube
                  videoId={activeVideo.id}
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

      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
