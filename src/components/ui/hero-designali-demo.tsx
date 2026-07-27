"use client";

import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";
import { renderCanvas, ShineBorder, TypeWriter } from "@/components/ui/hero-designali";
import { Plus } from "lucide-react"; 

import { Button } from "@/components/ui/button"; 

export const Hero = () => {
  const talkAbout = [
    "Tractor Fiber Hoods",
    "Canopies",
    "Chatris",
    "Punjabi Hoods"
  ];

  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <section id="home" className="relative w-full pt-0 pb-4 overflow-hidden">
      <div className="absolute inset-0 max-md:hidden top-0 -z-10 h-full w-full bg-transparent bg-[linear-gradient(to_right,#57534e_1px,transparent_1px),linear-gradient(to_bottom,#57534e_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#a8a29e_1px,transparent_1px),linear-gradient(to_bottom,#a8a29e_1px,transparent_1px)]"></div>
      
      <div className="flex flex-col items-center justify-center px-4 text-center z-10 relative">
        <div className="mx-auto max-w-5xl mt-2">
          <div className="border-[#11764c]/20 relative mx-auto h-full bg-background border py-4 px-6 [mask-image:radial-gradient(800rem_96rem_at_center,white,transparent)]">
            <h1 className="flex text-center text-3xl font-semibold leading-[1.1] tracking-tight md:text-[50px] lg:text-[56px] text-[#012d1d] justify-center flex-wrap">
              <Plus
                strokeWidth={4}
                className="text-[#11764c] absolute -left-5 -top-5 h-10 w-10"
              />
              <Plus
                strokeWidth={4}
                className="text-[#11764c] absolute -bottom-5 -left-5 h-10 w-10"
              />
              <Plus
                strokeWidth={4}
                className="text-[#11764c] absolute -right-5 -top-5 h-10 w-10"
              />
              <Plus
                strokeWidth={4}
                className="text-[#11764c] absolute -bottom-5 -right-5 h-10 w-10"
              />
              <span className="z-10 relative">
                India's Best Tractor{" "}
                <span className="text-[#11764c]">Fiber Hoods.</span>
              </span>
            </h1>
            <div className="flex items-center mt-3 justify-center gap-1">
              <span className="relative flex h-3 w-3 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              <p className="text-xs text-green-500 font-semibold">In Stock Now</p>
            </div>
          </div>

          <p className="text-gray-600 font-medium py-2 max-w-4xl mx-auto mt-2 text-[14px] sm:text-[18px] leading-snug">
            <strong className="text-orange-500 font-extrabold tracking-tight text-[16px] sm:text-[22px] drop-shadow-sm">Katayayani Enterprises, Meerut</strong> is India's leading manufacturer of premium{" "}
            <span className="text-blue-600 font-bold">
              <TypeWriter strings={talkAbout} />
            </span>.
          </p>
        </div>
      </div>
      <canvas
        className="pointer-events-none absolute inset-0 mx-auto z-0"
        id="canvas"
      ></canvas>
      <Image
        width={1512}
        height={550}
        className="absolute left-1/2 top-0 -z-20 -translate-x-1/2 opacity-30"
        src="https://raw.githubusercontent.com/designali-in/designali/refs/heads/main/apps/www/public/images/gradient-background-top.png"
        alt=""
        role="presentation"
        priority
      />
    </section>
  );
};
