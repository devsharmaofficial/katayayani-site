"use client";

import React from "react";
import { Star } from "lucide-react";
import ScrollReveal from "@/components/motion/ScrollReveal";
import Image from "next/image";

interface Testimonial {
  text: string;
  name: string;
  role: string;
  rating: number;
  date: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  // ==================== COLUMN 1 (Items 0 to 12) ====================
  {
    name: "Venkat Reddy",
    role: "Vill. Pedakakani, Guntur, AP",
    date: "Mar 2024",
    rating: 5,
    text: "కానోపీ సూపర్ క్వాలిటీ 🔥🔥",
    image: "/reviews/1000034591-jpg-500x500.webp"
  },
  {
    name: "Srinu",
    role: "Vill. Sattenapalli, Palnadu, AP",
    date: "Jan 2025",
    rating: 4,
    text: "good product but delivery late hogaya 8 din laga. baaki sab ok",
    image: "/reviews/1000036007-jpg-500x500.webp"
  },
  {
    name: "K. Rambabu",
    role: "Vill. Martur, Prakasam, AP",
    date: "Nov 2024",
    rating: 5,
    text: "⭐⭐⭐⭐⭐ 👍🚜",
    image: "/reviews/1000041747-jpg-500x500.webp"
  },
  {
    name: "Anjaneyulu G.",
    role: "Vill. Atmakur, Nellore, AP",
    date: "Oct 2024",
    rating: 5,
    text: "heavy duty fiber 💪 rain proof hai bilkul",
    image: "/reviews/1000041750-jpg-500x500.webp"
  },
  {
    name: "Siva Prasad",
    role: "Vill. Repalle, Bapatla, AP",
    date: "Dec 2024",
    rating: 3,
    text: "canopy is ok ok types.. fitting me ek bolt missing tha local se lena pada. fiber accha hai",
    image: "/reviews/1000160755-jpg-500x500.webp"
  },
  {
    name: "Ravi Kumar N.",
    role: "Vill. Tadepalligudem, W. Godavari, AP",
    date: "Aug 2024",
    rating: 5,
    text: "చాలా బాగుంది. ఎండలో చల్లగా ఉంటుంది 👌",
    image: "/reviews/1000161258-jpg-500x500.webp"
  },
  {
    name: "Bhaskar Rao",
    role: "Vill. Narsaraopet, Palnadu, AP",
    date: "Feb 2025",
    rating: 5,
    text: "perfect fit"
  },
  {
    name: "Laxman",
    role: "Vill. Siddipet, TS",
    date: "Jul 2024",
    rating: 5,
    text: "👍👍👍"
  },
  {
    name: "Rajesh Yadav",
    role: "Vill. Mancherial, TS",
    date: "Oct 2024",
    rating: 5,
    text: "worth it 💯"
  },
  {
    name: "K. Lingaiah",
    role: "Vill. Suryapet, TS",
    date: "Jan 2025",
    rating: 3,
    text: "canopy heavy and strong but fitting video call pe samjhna pada"
  },
  {
    name: "Manjunath H.",
    role: "Vill. Gundlupet, KA",
    date: "May 2023",
    rating: 5,
    text: "ಟ್ರಾಕ್ಟರ್ ಗೆ ಕರೆಕ್ಟ್ ಫಿಟ್. ದುಡ್ಡಿಗೆ ತಕ್ಕ ಬೆಲೆ 👍"
  },
  {
    name: "Suresh M.",
    role: "Vill. Sindhanur, Raichur, KA",
    date: "Aug 2024",
    rating: 3,
    text: "product ok hai. delivery 10 din lag gaya. bolt kit incomplete tha"
  },
  {
    name: "Nagaraj",
    role: "Vill. Davangere, KA",
    date: "Nov 2024",
    rating: 5,
    text: "premium quality 🚜✅"
  },

  // ==================== COLUMN 2 (Items 13 to 25) ====================
  {
    name: "Mallesh",
    role: "Vill. Choutuppal, Yadadri, TS",
    date: "Sep 2024",
    rating: 5,
    text: "mast hai bhai 🔥",
    image: "/reviews/1739474538520-jpg-500x500.webp"
  },
  {
    name: "Srinivas Goud",
    role: "Vill. Yellareddy, Kamareddy, TS",
    date: "Nov 2024",
    rating: 5,
    text: "best quality fiber hood. meerut se aaya 5 din me. full paisa vasool",
    image: "/reviews/img20230812wa0001-jpg-500x500.webp"
  },
  {
    name: "Devender R.",
    role: "Vill. Shamshabad, Rangareddy, TS",
    date: "Feb 2025",
    rating: 4,
    text: "thick fiber. fitting correct. but packing me thoda damage tha corner pe",
    image: "/reviews/img20230812wa0004-jpg-500x500.webp"
  },
  {
    name: "Channappa",
    role: "Vill. Harobele, Ramanagara, KA",
    date: "Sep 2024",
    rating: 5,
    text: "ಸೂಪರ್ ಕ್ವಾಲಿಟಿ 👌🔥 fitting perfect aagide",
    image: "/reviews/img20250103135059-jpg-500x500.webp"
  },
  {
    name: "Basavaraju",
    role: "Vill. Nanjangud, Mysuru, KA",
    date: "Dec 2024",
    rating: 4,
    text: "heavy duty canopy. but color thoda different aaya photo se. still ok",
    image: "/reviews/img20250104044807-jpg-500x500.webp"
  },
  {
    name: "Lokesha Gowda",
    role: "Vill. Holenarasipura, Hassan, KA",
    date: "Jan 2025",
    rating: 5,
    text: "frame bahut mota hai 💪 strong",
    image: "/reviews/img20250331wa0003-jpg-500x500.webp"
  },
  {
    name: "Shivanna P.",
    role: "Vill. Tiptur, Tumkur, KA",
    date: "Sep 2024",
    rating: 5,
    text: "100% recommend 🔥"
  },
  {
    name: "Muthu S.",
    role: "Vill. Paramakudi, Ramanathapuram, TN",
    date: "Nov 2023",
    rating: 5,
    text: "super product 👌👌"
  },
  {
    name: "Senthil",
    role: "Vill. Aruppukottai, Virudhunagar, TN",
    date: "Mar 2024",
    rating: 4,
    text: "fiber quality nalla irukku. fitting thoda tight tha but adjust ho gaya"
  },
  {
    name: "Manikandan",
    role: "Vill. Kumbakonam, Thanjavur, TN",
    date: "Jan 2025",
    rating: 5,
    text: "⭐⭐⭐⭐⭐ 🚜🔥"
  },
  {
    name: "Arun Kumar",
    role: "Vill. Meenachil, Kottayam, KL",
    date: "Sep 2024",
    rating: 5,
    text: "നല്ല ഉൽപ്പന്നം 👍👍"
  },
  {
    name: "Sandeep Patil",
    role: "Vill. Shirur, Pune, MH",
    date: "Feb 2024",
    rating: 4,
    text: "fitting la time lagla.. baaki quality ek number 👌"
  },
  {
    name: "Ganesh B.",
    role: "Vill. Sinnar, Nashik, MH",
    date: "Dec 2023",
    rating: 5,
    text: "ekdum kadak 🔥 paus madhe pan problem nahi"
  },

  // ==================== COLUMN 3 (Items 26 to 39) ====================
  {
    name: "Pannerselvam",
    role: "Vill. Omalur, Salem, TN",
    date: "Nov 2024",
    rating: 5,
    text: "best fiber chatri 🔥 worth for money",
    image: "/reviews/img20260531102056-jpg-500x500.webp"
  },
  {
    name: "Ranganathan",
    role: "Vill. Lalgudi, Trichy, TN",
    date: "Dec 2024",
    rating: 4,
    text: "good quality. no vibration sound. delivery 4 days 👍",
    image: "/reviews/img7646-jpeg-500x500.webp"
  },
  {
    name: "Elangovan K.",
    role: "Vill. Melur, Madurai, TN",
    date: "Oct 2024",
    rating: 5,
    text: "ரொம்ப ஸ்ட்ராங் 💪 மழைக்கு அருமை",
    image: "/reviews/img7652-jpeg-500x500.webp"
  },
  {
    name: "Karthik R.",
    role: "Vill. Dharapuram, Tiruppur, TN",
    date: "Jul 2024",
    rating: 5,
    text: "heavy weight 💯 tnx",
    image: "/reviews/img7659-jpeg-500x500.webp"
  },
  {
    name: "Subramani",
    role: "Vill. Aruppukottai, Virudhunagar, TN",
    date: "Mar 2024",
    rating: 4,
    text: "fiber quality nalla irukku. fitting fit and finish good",
    image: "/reviews/img-20220604-135610-454-jpg.jpg"
  },
  {
    name: "Veluchamy",
    role: "Vill. Kumbakonam, Thanjavur, TN",
    date: "Jan 2025",
    rating: 5,
    text: "⭐⭐⭐⭐⭐ heavy duty canopy super quality",
    image: "/reviews/img-20230201-162324-jpg.jpg"
  },
  {
    name: "Sajeev",
    role: "Vill. Chittur, Palakkad, KL",
    date: "Jan 2024",
    rating: 4,
    text: "good product. fitting ok. paisa worth hai",
    image: "/reviews/img-20230710-193441-jpg.jpg"
  },
  {
    name: "Ajit T.",
    role: "Vill. Bhor, Pune, MH",
    date: "Sep 2023",
    rating: 3,
    text: "thik thaak hai. delivery bhut late kr diya 12 din lag gaye"
  },
  {
    name: "Pappu Yadav",
    role: "Vill. Ganjbasoda, Vidisha, MP",
    date: "Dec 2023",
    rating: 5,
    text: "kadak maal hai 🔥👌 hilta nahi bilkul"
  },
  {
    name: "Lokesh S.",
    role: "Vill. Mhow, Indore, MP",
    date: "Feb 2024",
    rating: 4,
    text: "fiber ki quality acchi h. plastic jaisi nhi h"
  },
  {
    name: "Ramesh Patel",
    role: "Vill. Dhoraji, Rajkot, GJ",
    date: "Jun 2024",
    rating: 5,
    text: "ખૂબ સરસ છે 👌 ટ્રેક્ટર સરસ લાગે છે"
  },
  {
    name: "Ramkishan",
    role: "Vill. Baraut, Baghpat, UP",
    date: "Jan 2024",
    rating: 5,
    text: "chatri majboot h 💪 barish me paani nhi aata. dhoop me bhi achi"
  },
  {
    name: "Manoj Kumar",
    role: "Vill. Bihta, Patna, BR",
    date: "May 2024",
    rating: 4,
    text: "sir lagwane me thodi dikkat aayi thi par video call pe bata diya. service achi h"
  },
  {
    name: "Suresh T.",
    role: "Vill. Perambalur, TN",
    date: "Jun 2024",
    rating: 5,
    text: "perfect fit 👌"
  },
  {
    name: "Ravi G.",
    role: "Vill. Bellary, KA",
    date: "Mar 2025",
    rating: 5,
    text: "best quality 🔥🔥🔥"
  },
  {
    name: "Nagendra",
    role: "Vill. Gadwal, Jogulamba, TS",
    date: "Dec 2024",
    rating: 5,
    text: "👍🚜💯"
  }
];

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

const thirdLength = Math.ceil(testimonials.length / 3);
const firstColumn = testimonials.slice(0, thirdLength);
const secondColumn = testimonials.slice(thirdLength, thirdLength * 2);
const thirdColumn = testimonials.slice(thirdLength * 2);

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

        {/* Mobile View: Single column scrolling ALL reviews */}
        <div className="block md:hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[640px] overflow-hidden mt-10">
          <TestimonialsColumn testimonials={testimonials} duration={120} />
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
