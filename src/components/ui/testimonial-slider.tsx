"use client";

import React from "react";
import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

const reviews = [
  {
    name: "Ramesh Kumar",
    role: "Swaraj 744 FE • Vill. Rohtak, Haryana",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80",
    rating: 5,
    text: "भाई छतरी बहुत मजबूत है बारिश में कोई प्रॉब्लम नहीं होती मस्त फिट हुई है"
  },
  {
    name: "Sandeep Patil",
    role: "Mahindra 575 DI • Vill. Shirur, Maharashtra",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
    rating: 4,
    text: "छान आहे ट्रॅक्टरला एकदम परफेक्ट बसली उन्हात पण चांगलं रक्षण होतं"
  },
  {
    name: "Venkatesh",
    role: "New Holland 3630 • Vill. Palasa, AP",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&h=100&q=80",
    rating: 5,
    text: "క్వాలిటీ సూపర్ ఉంది. వర్షంలో కూడా లోపల ఏమీ తడవలేదు చాలా స్ట్రాంగ్ ఫైబర్"
  },
  {
    name: "Karthik R.",
    role: "Sonalika DI 60 • Vill. Perundurai, TN",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80",
    rating: 4,
    text: "நல்லா இருக்கு டிராக்டருக்கு சூப்பரா பிட் ஆகிடுச்சு காசுக்கு ஏத்த பொருள்"
  },
  {
    name: "Gurpreet Singh",
    role: "Sonalika DI 745 • Vill. Moga, Punjab",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
    rating: 5,
    text: "ਬਹੁਤ ਵਧੀਆ ਛਤਰੀ ਹੈ ਟਰੈਕਟਰ ਤੇ ਲਗਾਈ ਹੈ ਰੰਗ ਵੀ ਖਰਾਬ ਨਹੀਂ ਹੁੰਦਾ ਧੁੱਪ ਵਿੱਚ"
  },
  {
    name: "Manjunath",
    role: "Eicher 380 • Vill. Mandya, Karnataka",
    avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=100&h=100&q=80",
    rating: 5,
    text: "ಚೆನ್ನಾಗಿದೆ ಟ್ರ್ಯಾಕ್ಟರ್ ಗೆ ಒಳ್ಳೆ ಕ್ಯಾನೋಪಿ ತುಂಬಾ ಸ್ಟ್ರಾಂಗ್ ಇದೆ"
  },
  {
    name: "Amit Yadav",
    role: "Massey Ferguson 241 • Vill. Ballia, UP",
    avatar: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&w=100&h=100&q=80",
    rating: 4,
    text: "थोड़ा महंगा है पर क्वालिटी नंबर 1 है चलाते टाइम आवाज़ नहीं आती"
  },
  {
    name: "Harish",
    role: "Kubota MU4501 • Vill. Nizamabad, TS",
    avatar: "https://images.unsplash.com/photo-1566492031523-87d28ebd9cb0?auto=format&fit=crop&w=100&h=100&q=80",
    rating: 5,
    text: "very good fiber roof my tractor looking beautiful now thnk u"
  }
];

export function TestimonialCard({ review }: { review: typeof reviews[0] }) {
  return (
    <div className="w-[320px] shrink-0 flex flex-col items-start border border-primary/10 p-5 rounded-2xl bg-surface shadow-sm hover:shadow-md transition-shadow duration-300 mx-3">
      <Quote className="w-8 h-8 text-secondary/40 mb-2" fill="currentColor" />
      <div className="flex items-center justify-start mt-1 gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <p className="text-[15px] mt-4 text-on-surface-variant font-medium min-h-[80px]">
        &quot;{review.text}&quot;
      </p>
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-primary/5 w-full">
        <div className="relative h-10 w-10 shrink-0">
          <Image
            className="rounded-full object-cover ring-2 ring-background"
            src={review.avatar}
            alt={review.name}
            fill
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-[15px] text-primary font-bold leading-tight">
            {review.name}
          </h2>
          <p className="text-[13px] text-on-surface-variant leading-tight mt-0.5">
            {review.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="pt-2 pb-12 bg-transparent overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-[24px] text-center mb-6">
        <h2 className="text-headline-md text-primary">
          What Farmers Say <span className="font-semibold text-secondary">About Us</span>
        </h2>
      </div>

      <div className="relative mx-auto w-full max-w-[100vw] pb-8">
        {/* Left/Right fading gradients for smooth scrolling effect */}
        <div className="absolute top-0 bottom-0 left-0 w-[100px] md:w-[200px] bg-gradient-to-r from-[#f0f4ea] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-[100px] md:w-[200px] bg-gradient-to-l from-[#f0f4ea] to-transparent z-10 pointer-events-none" />

        <InfiniteSlider gap={0} duration={60} durationOnHover={150}>
          {reviews.map((review, idx) => (
            <TestimonialCard key={idx} review={review} />
          ))}
        </InfiniteSlider>
      </div>
    </section>
  );
}
