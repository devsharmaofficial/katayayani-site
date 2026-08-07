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
  // Newly Scraped YouTube Videos & Shorts (21 items) - All high quality local thumbnails
  { type: "video", id: "0IoHCk3LOko", title: "Tractor Fiber Hood", thumbnail: "/youtube/0IoHCk3LOko.jpg" },
  { type: "video", id: "1K2QMNdviLU", title: "MAKING OF TRACTOR ROOF CANOPY || AVAILABLE ON INDIAMART || #indiantractor", thumbnail: "/youtube/1K2QMNdviLU.jpg" },
  { type: "video", id: "zQnOOgY0xAA", title: "BEST QUALITY FIBER HOOD | KATAYAYANI ENTERPRISES|", thumbnail: "/youtube/zQnOOgY0xAA.jpg" },
  { type: "video", id: "scicO4XIies", title: "Mahindra Tractor Hoods", thumbnail: "/youtube/scicO4XIies.jpg" },
  { type: "video", id: "8AwxVYJaLew", title: "🚜SWARAJ TRACTOR FIBER ROOF CANOPY🔥🔥", thumbnail: "/youtube/8AwxVYJaLew.jpg" },
  { type: "video", id: "ubeivRfLExQ", title: "Swaraj Tractor Bumper manufacturing", thumbnail: "/youtube/ubeivRfLExQ.jpg" },
  { type: "video", id: "XH49xTiab9E", title: "Tractor Hoods Canopy", thumbnail: "/youtube/XH49xTiab9E.jpg" },
  { type: "short", id: "ct35ydK7Z_g", title: "Tractor Fiber Hood| Buy Now", thumbnail: "/youtube/ct35ydK7Z_g.jpg" },
  { type: "short", id: "-tSXzjKu17A", title: "All Tractor fiber hood available #mahindra", thumbnail: "/youtube/-tSXzjKu17A.jpg" },
  { type: "short", id: "UhsBJOETVRI", title: "All Tractor Fiber Hood available", thumbnail: "/youtube/UhsBJOETVRI.jpg" },
  { type: "short", id: "UdOJf6It_TA", title: "All Tractor fiber hood available| all India delivery", thumbnail: "/youtube/UdOJf6It_TA.jpg" },
  { type: "short", id: "sHBdDOuziVI", title: "All Tractor fiber hood available| all India delivery", thumbnail: "/youtube/sHBdDOuziVI.jpg" },
  { type: "short", id: "gQT_ke2q5To", title: "Tractor Fiber Hood", thumbnail: "/youtube/gQT_ke2q5To.jpg" },
  { type: "short", id: "m9KhEgoSXUM", title: "tractor fiber hood", thumbnail: "/youtube/m9KhEgoSXUM.jpg" },
  { type: "short", id: "UL6jtWMHmtI", title: "BEST QUALITY FIBER HOOD ONLY AT KATAYAYANI ENTERPRISES", thumbnail: "/youtube/UL6jtWMHmtI.jpg" },
  { type: "short", id: "c1hL6fj8VjQ", title: "BEST TRACTOR FIBER HOOD ONLY AT KATAYAYANI ENTERPRISES", thumbnail: "/youtube/c1hL6fj8VjQ.jpg" },
  { type: "short", id: "ap38alCuUxY", title: "NO.1 QUALITY SONALIKA FIBER HOOD AND JOHN DEER FIBER HOOD", thumbnail: "/youtube/ap38alCuUxY.jpg" },
  { type: "short", id: "3STNVrRyyP0", title: "EICHER TRACTOR ACCESORIES ONLY AT KATAYAYANI ENTERPRISES", thumbnail: "/youtube/3STNVrRyyP0.jpg" },
  { type: "short", id: "koeGb8HLNgs", title: "SWARAJ TRACTOR BUMPER | SONALIKA TRACTOR BUMPER", thumbnail: "/youtube/koeGb8HLNgs.jpg" },
  { type: "short", id: "dmhwYUss980", title: "TRACTOR FRP CANOPY (HOOD)", thumbnail: "/youtube/dmhwYUss980.jpg" },
  { type: "short", id: "6HTWN0JjXA4", title: "Tractor front Bumfer For Swaraj", thumbnail: "/youtube/6HTWN0JjXA4.jpg" },
  
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

  // Shuffled video pool — randomized on mount for freshness
  const [shuffledMedia, setShuffledMedia] = useState<MediaItem[]>([]);

  useEffect(() => {
    // Separate by type for structured layout
    const videos = [...MEDIA_POOL].filter(m => m.type === 'video').sort(() => 0.5 - Math.random());
    const verticals = [...MEDIA_POOL].filter(m => m.type !== 'video').sort(() => 0.5 - Math.random());
    // Interleave: 1 video (wide) then 3 verticals, repeat
    const interleaved: MediaItem[] = [];
    let vi = 0, ri = 0;
    while (vi < videos.length || ri < verticals.length) {
      if (vi < videos.length) interleaved.push(videos[vi++]);
      for (let k = 0; k < 3 && ri < verticals.length; k++) interleaved.push(verticals[ri++]);
    }
    setShuffledMedia(interleaved);
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
          <div className="animate-in fade-in duration-500">
            {/* Stats Bar */}
            <div className="flex items-center gap-4 mb-8 pb-5 border-b border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 text-[13px] font-medium">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 font-bold text-[12px] border border-red-100"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block"></span>Videos</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-pink-600 font-bold text-[12px] border border-pink-100">Instagram Reels</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-bold text-[12px] border border-blue-100">YT Shorts</span>
              </div>
              <span className="ml-auto text-gray-400 text-[13px]">{MEDIA_POOL.length} videos total</span>
            </div>

            {/* STRUCTURED editorial 4-column grid */}
            {/* Each 'block' is: 1 wide video (col-span-4) then 4 verticals per row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5">
              {shuffledMedia.map((media, idx) => {
                const isVideo = media.type === 'video';
                const isReel = media.type === 'reel';
                const badgeColor = isReel ? 'bg-[#e1306c]/90' : isVideo ? 'bg-[#ff0000]/90' : 'bg-[#0f0f0f]/80';
                const badgeLabel = isReel ? '📷 Reel' : isVideo ? '▶ Video' : '⚡ Short';

                return (
                  <div
                    key={media.id + idx}
                    onClick={() => setActiveVideo(media)}
                    className={`group relative overflow-hidden cursor-pointer rounded-2xl bg-gray-900 shadow-md hover:shadow-2xl transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.015] ${
                      isVideo ? 'col-span-2 sm:col-span-3 md:col-span-4 aspect-video' : 'col-span-1 aspect-[9/16]'
                    }`}
                  >
                    {/* Thumbnail */}
                    <img
                      src={media.thumbnail}
                      alt={media.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    />

                    {/* Gradient overlay — stronger at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-400" />

                    {/* Top left — platform badge */}
                    <div className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-widest ${badgeColor} backdrop-blur-sm shadow-lg`}>
                      {badgeLabel}
                    </div>

                    {/* Center play button */}
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                      <div className={`flex items-center justify-center rounded-full shadow-2xl border border-white/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-white/50 ${
                        isVideo ? 'w-16 h-16 bg-black/40 group-hover:bg-red-600' : 'w-12 h-12 bg-black/40 group-hover:bg-white/20'
                      }`}>
                        <Play className="text-white fill-white ml-1" style={{ width: isVideo ? '24px' : '16px', height: isVideo ? '24px' : '16px' }} />
                      </div>
                    </div>

                    {/* Bottom info block */}
                    <div className="absolute bottom-0 left-0 right-0 z-10 p-3 md:p-4">
                      <p className={`text-white font-bold leading-tight drop-shadow-lg ${
                        isVideo ? 'text-[15px] md:text-[17px] line-clamp-2' : 'text-[12px] line-clamp-3'
                      }`}>
                        {media.title}
                      </p>
                      {isVideo && (
                        <div className="flex items-center gap-2 mt-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                          <span className="text-white/60 text-[11px] font-medium">Click to watch</span>
                        </div>
                      )}
                    </div>

                    {/* Hover shimmer border */}
                    <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 group-hover:ring-white/20 transition-all duration-300 pointer-events-none" />
                  </div>
                );
              })}
            </div>
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
