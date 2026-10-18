"use client";

import React from "react";
import { Star } from "lucide-react";
import ScrollReveal from "@/components/motion/ScrollReveal";
import Image from "next/image";

import { Testimonial, testimonials } from "@/lib/testimonials";

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

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <div
        className="animate-marquee-vertical flex flex-col gap-6 pb-6 bg-transparent"
        style={{ animationDuration: `${props.duration || 10}s` }}
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, name, role, date, rating, image }, i) => (
                <div 
                  className="p-5 md:p-6 rounded-[24px] border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 w-full md:w-[350px] flex flex-col justify-between" 
                  key={`${index}-${i}`}
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

                    {/* Attached Customer Image - full image with custom auto height and transition scale */}
                    {image && (
                      <div className="mt-3 relative w-full overflow-hidden rounded-[16px] bg-gray-50 border border-gray-100/50">
                        <Image
                          src={image}
                          alt={`${name}'s tractor canopy feedback`}
                          width={500}
                          height={500}
                          quality={20}
                          loading="lazy"
                          sizes="(max-width: 640px) 100px, 350px"
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
            </React.Fragment>
          )),
        ]}
      </div>
    </div>
  );
};

// Limit DOM nodes: keep marquee smooth while avoiding excessive DOM nodes
const MAX_MOBILE = 6;
const MAX_DESKTOP_COL = 4;

const thirdLength = Math.ceil(testimonials.length / 3);
const firstColumn = testimonials.slice(0, thirdLength).slice(0, MAX_DESKTOP_COL);
const secondColumn = testimonials.slice(thirdLength, thirdLength * 2).slice(0, MAX_DESKTOP_COL);
const thirdColumn = testimonials.slice(thirdLength * 2).slice(0, MAX_DESKTOP_COL);

export const Testimonials = () => {
  return (
    <section className="py-16 bg-transparent relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-[24px] z-10 relative">
        <ScrollReveal
          className="flex flex-col items-center justify-center max-w-[600px] mx-auto mb-12 text-center"
        >
          <h2 className="text-headline-md text-primary">
            What Farmers Say <span className="font-semibold text-secondary">About Us</span>
          </h2>
        </ScrollReveal>

        {/* Mobile View: Single column scrolling subset of reviews */}
        <div className="block md:hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[640px] overflow-hidden mt-10">
          <TestimonialsColumn testimonials={testimonials.slice(0, MAX_MOBILE)} duration={120} />
        </div>

        {/* Tablet & Desktop View: 3 columns with sliced reviews */}
        <div className="hidden md:flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[720px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={45} />
          <TestimonialsColumn testimonials={secondColumn} duration={55} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={50} />
        </div>
      </div>
    </section>
  );
};
