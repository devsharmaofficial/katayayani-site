"use client";

import Link from "next/link";
import Image from "next/image";
import { VideoIcon, Play } from "lucide-react";

export function VideoShowcaseTeaser({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "w-full py-2" : "max-w-[1280px] mx-auto px-[24px] py-[24px]"}>
      <Link 
        href="/gallery?tab=videos" 
        className="block bg-[#0f1115] rounded-3xl border border-white/10 shadow-lg hover:shadow-2xl hover:border-white/20 transition-all duration-300 overflow-hidden group relative"
      >
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="flex flex-col xl:flex-row items-stretch min-h-[140px]">
          {/* Text Section - Minimal */}
          <div className={`p-5 md:p-6 ${compact ? 'xl:w-1/3' : 'xl:w-1/3'} flex flex-col justify-center border-b xl:border-b-0 xl:border-r border-white/10 z-10`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500/20 text-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <VideoIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-[18px] md:text-[20px] font-black text-white leading-tight">Video Showcase</h3>
                <span className="text-red-400 font-bold text-[13px] flex items-center gap-1 group-hover:gap-2 transition-all mt-0.5">
                  Watch All Videos &rarr;
                </span>
              </div>
            </div>
          </div>
          
          {/* Videos Section */}
          <div className={`w-full ${compact ? 'xl:w-2/3' : 'xl:w-2/3'} p-3 md:p-4 bg-black/20 flex gap-3 overflow-x-auto scrollbar-hide items-center relative snap-x z-10`}>
             <div className="absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-[#0f1115] to-transparent z-10 pointer-events-none"></div>
             
             {/* Thumbnail 1 */}
             <div className="relative w-36 h-24 md:w-44 md:h-28 shrink-0 rounded-xl overflow-hidden shadow-md group-hover:scale-[1.03] transition-transform duration-500 snap-start border border-white/10">
               <Image src="/youtube/0IoHCk3LOko.jpg" alt="Video 1" fill className="object-cover" sizes="(max-width: 768px) 150px, 176px" quality={60} />
               <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-red-600/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:bg-red-500 transition-colors">
                    <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
                  </div>
               </div>
             </div>
             
             {/* Thumbnail 2 */}
             <div className="relative w-36 h-24 md:w-44 md:h-28 shrink-0 rounded-xl overflow-hidden shadow-md group-hover:scale-[1.03] transition-transform duration-500 delay-75 snap-start border border-white/10">
               <Image src="/youtube/8AwxVYJaLew.jpg" alt="Video 2" fill className="object-cover" sizes="(max-width: 768px) 150px, 176px" quality={60} />
               <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-colors">
                    <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
                  </div>
               </div>
             </div>
             
             {/* Thumbnail 3 */}
             <div className="relative w-36 h-24 md:w-44 md:h-28 shrink-0 rounded-xl overflow-hidden shadow-md group-hover:scale-[1.03] transition-transform duration-500 delay-150 snap-start border border-white/10">
               <Image src="/youtube/ubeivRfLExQ.jpg" alt="Video 3" fill className="object-cover" sizes="(max-width: 768px) 150px, 176px" quality={60} />
               <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-colors">
                    <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
                  </div>
               </div>
             </div>

          </div>
        </div>
      </Link>
    </div>
  );
}
