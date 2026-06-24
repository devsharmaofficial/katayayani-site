"use client";

import React from "react";
import { Star } from "lucide-react";
import ScrollReveal from "@/components/motion/ScrollReveal";

interface Testimonial {
  text: string;
  name: string;
  role: string;
  rating: number;
  date: string;
}

const testimonials: Testimonial[] = [
  { name: "Ramkishan", role: "Swaraj 744 • Vill. Baraut, UP", date: "Jan 2024", rating: 5, text: "chatri bahot majboot h... barish me paani nhi aata andar. dhoop me b achi h" },
  { name: "Muthu", role: "Mahindra 575 • Madurai, TN", date: "Nov 2023", rating: 5, text: "ரொம்ப நல்லா இருக்கு. வெயில் மழையில இருந்து நல்ல பாதுகாப்பு. டிராக்டருக்கு சூப்பரா இருக்கு." },
  { name: "Sandeep Patil", role: "Mahindra 575 • Shirur, MH", date: "Feb 2024", rating: 4, text: "छान आहे पण फिटिंग ला वेळ लागला.. बाकी क्वालिटी एक नंबर" },
  { name: "Venkat", role: "New Holland • Guntur, AP", date: "Mar 2024", rating: 5, text: "కానోపీ క్వాలిటీ సూపర్ ఉంది, ఫైబర్ చాలా స్ట్రాంగ్. ⭐⭐⭐⭐⭐" },
  { name: "Pappu Yadav", role: "Eicher 380 • Vidisha, MP", date: "Dec 2023", rating: 5, text: "mast hai bhaisaab ekdum kadak 🔥👌 hilta nahi hai bilkul bhi" },
  { name: "Surjit S.", role: "Sonalika 745 • Moga, PB", date: "Oct 2023", rating: 5, text: "⭐⭐⭐⭐⭐🔥👍🚜" },
  { name: "Manjunath", role: "John Deere • Mandya, KA", date: "May 2023", rating: 5, text: "ಟ್ರಾಕ್ಟರ್ ಗೆ ಕರೆಕ್ಟ್ ಆಗಿ ಮ್ಯಾಚ್ ಆಯ್ತು. ಕ್ವಾಲಿಟಿ ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ. ದುಡ್ಡಿಗೆ ತಕ್ಕ ಬೆಲೆ." },
  { name: "Ramesh", role: "Massey 241 • Rohtak, HR", date: "Apr 2024", rating: 3, text: "Nice canopy but nut bolt was missing 1 piece, I bought from local shop. body is heavy." },
  { name: "Sajeev", role: "Kubota MU4501 • Palakkad, KL", date: "Jan 2024", rating: 4, text: "നല്ല ഉൽപ്പന്നം. പണം നൽകിയതിന് മൂല്യമുണ്ട്. fitting is good." },
  { name: "Karthik", role: "Kubota MU4501 • Salem, TN", date: "Jul 2024", rating: 5, text: "Super product. Heavy weight. tnx" },
  { name: "Baldev Singh", role: "Farmtrac 60 • Karnal, HR", date: "Aug 2023", rating: 5, text: "ek nambar chhatri" },
  { name: "Ramesh Patel", role: "Sonalika 35 • Rajkot, GJ", date: "Jun 2024", rating: 5, text: "ખૂબ જ સરસ છત્રી છે, ટ્રેક્ટર પર સારી લાગે છે અને વરસાદ માં બચાવે છે." },
  { name: "Manoj Kumar", role: "Powertrac 439 • Patna, BR", date: "May 2024", rating: 4, text: "sir mujhe lagwane me dikkat aayi thi par inke bande ne video call pe bata dia. service achi h" },
  { name: "Lokesh", role: "Eicher 485 • Indore, MP", date: "Feb 2024", rating: 4, text: "fiber ki quality boht acchi h. plastic wali nhi h bilkul b" },
  { name: "Hari", role: "John Deere 5050 • Trichy, TN", date: "Mar 2023", rating: 5, text: "Worth for money 😍" },
  { name: "Sukhdev", role: "Swaraj 855 • Barnala, PB", date: "Nov 2023", rating: 5, text: "bhot kaim a veer g, awaj ni aundi kark kark di.. 10/10" },
  { name: "Ajit", role: "Mahindra 275 • Pune, MH", date: "Sep 2023", rating: 3, text: "thik thaak hai bhai. delivery bhut late kr diya" },
  { name: "Ganesh", role: "Massey 1035 • Nashik, MH", date: "Dec 2023", rating: 5, text: "क्वालिटी एकदम कडक आहे, पावसात पण काही प्रॉब्लेम नाही आला. 1 नंबर." },
  { name: "Vikas", role: "Mahindra Arjun • Hisar, HR", date: "Apr 2024", rating: 5, text: "paisa vasool h bhaiyo aankh band krke le lo" },
  { name: "Raju", role: "Sonalika DI 60 • Bhopal, MP", date: "Aug 2024", rating: 5, text: "🚜🔥❤️" },
  { name: "Teja", role: "Kubota L4508 • Khammam, TS", date: "Jul 2023", rating: 4, text: "fitting chala bagundi bro" }
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
              {props.testimonials.map(({ text, name, role, date, rating }, i) => (
                <div 
                  className="p-8 rounded-[24px] border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 w-full md:w-[350px] flex flex-col justify-between" 
                  key={`${index}-${i}`}
                >
                  <div>
                    {/* Stars */}
                    <div className="flex items-center gap-0.5 mb-4">
                      {Array.from({ length: 5 }).map((_, starIdx) => (
                        <Star
                          key={starIdx}
                          className={`w-[14px] h-[14px] ${
                            starIdx < rating ? "text-amber-400 fill-amber-400" : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-[16px] text-gray-600 leading-relaxed">
                      {text}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-8">
                    {/* Initial Avatar */}
                    <div className={`h-[42px] w-[42px] shrink-0 rounded-full flex items-center justify-center font-bold text-[16px] ${getColorClass(name)}`}>
                      {getInitials(name)}
                    </div>
                    
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="font-bold text-[15px] text-gray-900 tracking-tight leading-none truncate">{name}</div>
                      <div className="text-[13px] text-gray-500 tracking-tight mt-1.5 leading-none truncate">{role}</div>
                    </div>
                    
                    {/* Date */}
                    <div className="text-[12px] font-medium text-gray-400 shrink-0 self-start mt-0.5">
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

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[640px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={35} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={45} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={40} />
        </div>
      </div>
    </section>
  );
};
