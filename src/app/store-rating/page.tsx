import { Metadata } from "next";
import { testimonials, averageRating, reviewCount } from "@/lib/testimonials";
import { Star } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Empirical Consumer Satisfaction Indices (Store Rating) | Katayayani Enterprises",
  description: "Aggregated empirical consumer satisfaction indices and evaluative metrics.",
  robots: {
    index: false,
    follow: true,
  },
};

const avatarColors = [
  "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",
  "bg-yellow-100 text-yellow-700",
  "bg-purple-100 text-purple-700",
  "bg-pink-100 text-pink-700",
  "bg-indigo-100 text-indigo-700",
  "bg-teal-100 text-teal-700",
  "bg-orange-100 text-orange-700",
];

const getColorClass = (name: string) => avatarColors[name.charCodeAt(0) % avatarColors.length];
const getInitials = (name: string) => name.charAt(0).toUpperCase();

export default function StoreRating() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Customer Reviews</h1>
          <div className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-800">
            <span className="text-4xl">{averageRating}</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className={`w-6 h-6 ${star <= Math.round(Number(averageRating)) ? "text-amber-400 fill-amber-400" : "text-gray-200"}`} />
              ))}
            </div>
          </div>
          <p className="text-gray-500 mt-2">Based on {reviewCount}+ verified reviews</p>
        </div>
        
        {/* Static Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map(({ text, name, role, date, rating, image }, idx) => (
            <div 
              key={idx} 
              className="break-inside-avoid p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 w-full flex flex-col justify-between"
            >
              <div>
                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, starIdx) => (
                    <Star
                      key={starIdx}
                      className={`w-[14px] h-[14px] ${
                        starIdx < rating ? "text-amber-400 fill-amber-400" : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-[15px] text-gray-600 leading-relaxed whitespace-normal break-words">
                  {text}
                </p>

                {/* Attached Customer Image */}
                {image && (
                  <div className="mt-3 relative w-full overflow-hidden rounded-[16px] bg-gray-50 border border-gray-100/50">
                    <Image
                      src={image}
                      alt={`${name}'s tractor canopy feedback`}
                      width={500}
                      height={500}
                      quality={70}
                      sizes="(max-width: 640px) 100vw, 350px"
                      className="w-full h-auto object-contain hover:scale-[1.02] transition-transform duration-300 rounded-[16px]"
                    />
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-3 mt-6">
                {/* Initial Avatar */}
                <div className={`h-[36px] w-[36px] shrink-0 rounded-full flex items-center justify-center font-bold text-[14px] ${getColorClass(name)}`}>
                  {getInitials(name)}
                </div>
                
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="font-bold text-[14px] text-gray-900 tracking-tight leading-snug whitespace-normal break-words">{name}</div>
                  <div className="text-[12px] text-gray-500 tracking-tight mt-0.5 leading-normal whitespace-normal break-words">{role}</div>
                </div>
                
                {/* Date */}
                <div className="text-[11px] font-medium text-gray-500 shrink-0 self-start mt-0.5 ml-1">
                  {date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
