"use client";

import React, { useState, useMemo } from "react";
import { 
  MapPin, 
  Tractor, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  Truck, 
  ShieldCheck, 
  Sun, 
  Sparkles,
  ArrowRight,
  TrendingDown
} from "lucide-react";

interface CityData {
  city: string;
  district: string;
  state: string;
  tag: string;
  climateNote: string;
}

const SOUTH_INDIA_AGRI_CITIES: CityData[] = [
  // Andhra Pradesh
  { city: "Guntur", district: "Guntur", state: "Andhra Pradesh", tag: "Chilli & Cotton Capital", climateNote: "Specially formulated UV-barrier resin to resist severe 44°C+ coastal heat in Guntur fields." },
  { city: "Vijayawada", district: "Krishna", state: "Andhra Pradesh", tag: "Krishna Delta Rice Belt", climateNote: "100% moisture-proof and rust-proof body for intensive paddy delta operations." },
  { city: "Kurnool", district: "Kurnool", state: "Andhra Pradesh", tag: "Rayalaseema Groundnut & Cotton", climateNote: "Heavy vibration-absorbing clamps designed for rocky red-soil and black-soil ploughing." },
  { city: "Rajahmundry", district: "East Godavari", state: "Andhra Pradesh", tag: "Godavari Canal Agricultural Hub", climateNote: "Heavy rain water-channeling contours prevent pooling during wet monsoon cultivation." },
  { city: "Anantapur", district: "Anantapur", state: "Andhra Pradesh", tag: "Groundnut & Horticulture Basin", climateNote: "High heat-reflective glossy top-coat reduces cockpit heat by up to 12°C-15°C." },
  { city: "Nellore", district: "SPSR Nellore", state: "Andhra Pradesh", tag: "Rice & Aquaculture Gateway", climateNote: "Salt-mist and humidity resistant gelcoat ideal for coastal farmland tractors." },

  // Karnataka
  { city: "Dharwad", district: "Dharwad", state: "Karnataka", tag: "North Karnataka Agricultural Hub", climateNote: "Impact-tested for heavy black-cotton soil cultivation and long soybean harvesting shifts." },
  { city: "Belagavi", district: "Belagavi", state: "Karnataka", tag: "Sugarcane & Heavy Mechanization Belt", climateNote: "High-clearance reinforced frame suitable for tall sugarcane haulage and transport." },
  { city: "Davanagere", district: "Davanagere", state: "Karnataka", tag: "Central Karnataka Rice & Maize Epicenter", climateNote: "All-weather double layer composite built for variable central Karnataka temperatures." },
  { city: "Shimoga", district: "Shivamogga", state: "Karnataka", tag: "Malnad Arecanut & Paddy Gateway", climateNote: "Heavy monsoon proof canopy designed for heavy rainfall regions in Malnad." },
  { city: "Mandya", district: "Mandya", state: "Karnataka", tag: "Sugar Valley & Cauvery Canal Basin", climateNote: "Durable FRP canopy that won't crack or corrode under constant field moisture." },
  { city: "Ballari", district: "Ballari", state: "Karnataka", tag: "Cotton, Jowar & Sunflower Belt", climateNote: "Superior heat-shielding keeps tractor drivers cool in harsh dryland summer conditions." },

  // Tamil Nadu
  { city: "Coimbatore", district: "Coimbatore", state: "Tamil Nadu", tag: "Kongu Agro-Machinery & Farming Hub", climateNote: "Aerodynamic profile reduces wind drag during road haulage and multi-crop farming." },
  { city: "Thanjavur", district: "Thanjavur", state: "Tamil Nadu", tag: "Cauvery Delta Rice Bowl of South India", climateNote: "Corrosion-proof fiberglass and stainless zinc bolts for humid delta paddy puddling." },
  { city: "Salem", district: "Salem", state: "Tamil Nadu", tag: "Tapioca, Mango & Agricultural Implements", climateNote: "High tensile steel brackets ensure rock-solid stability on uneven hilly terrain." },
  { city: "Madurai", district: "Madurai", state: "Tamil Nadu", tag: "Paddy, Pulses & South TN Trade Center", climateNote: "UV50+ stabilized coating preserves brilliant factory tractor colors without yellowing." },
  { city: "Erode", district: "Erode", state: "Tamil Nadu", tag: "Turmeric City & River Basin Farming", climateNote: "Lightweight yet super-rigid structure prevents stress on tractor chassis and fenders." },
  { city: "Tiruchirappalli", district: "Tiruchirappalli", state: "Tamil Nadu", tag: "Cauvery River Banana & Paddy Zone", climateNote: "Ergonomic wide shade overhang provides complete 360-degree protection to the operator." },
  { city: "Tirunelveli", district: "Tirunelveli", state: "Tamil Nadu", tag: "Thamirabarani Basin Paddy & Grain Hub", climateNote: "Double layer acoustic fiberglass insulation dampens harsh engine and exhaust noise." },
];

interface BrandOption {
  name: string;
  popularModels: string;
  basePrice: number;
  deluxePrice: number;
  colorName: string;
}

const TRACTOR_BRANDS: BrandOption[] = [
  { name: "Mahindra", popularModels: "575 DI, 475 DI, 275 DI, Arjun 605, Yuvo Tech+", basePrice: 8999, deluxePrice: 13499, colorName: "Mahindra Signature Red" },
  { name: "Swaraj", popularModels: "Swaraj 744 FE, 855 FE, 735 FE, 963 FE", basePrice: 8999, deluxePrice: 13999, colorName: "Swaraj True Blue / White" },
  { name: "Sonalika", popularModels: "DI 750 III, DI 35, DI 60, Tiger Series", basePrice: 8799, deluxePrice: 13499, colorName: "Sonalika Deep Blue" },
  { name: "Massey Ferguson", popularModels: "241 DI Maha Shakti, 1035 DI, 9500", basePrice: 8999, deluxePrice: 13699, colorName: "Massey Heritage Red" },
  { name: "John Deere", popularModels: "5050 D, 5310, 5045 D, 5210 GearPro", basePrice: 9499, deluxePrice: 14499, colorName: "Classic Green & Yellow" },
  { name: "New Holland", popularModels: "3630 TX Super, 3230, Excel 4710", basePrice: 9199, deluxePrice: 13999, colorName: "New Holland Royal Blue" },
  { name: "Eicher", popularModels: "Eicher 380, 485, 551, 557 Super Plus", basePrice: 8699, deluxePrice: 13299, colorName: "Eicher Silver Metallic / Blue" },
  { name: "Kubota", popularModels: "MU4501, MU5501 4WD, L4508", basePrice: 9499, deluxePrice: 14499, colorName: "Kubota Dynamic Orange" },
  { name: "Farmtrac / Powertrac", popularModels: "Farmtrac 60 Powermaxx, 45, Euro 50", basePrice: 8799, deluxePrice: 13499, colorName: "Classic Black / Euro Blue" },
];

export default function TractorPriceEstimator() {
  const [selectedState, setSelectedState] = useState<string>("All States");
  const [selectedCityName, setSelectedCityName] = useState<string>("Guntur");
  const [selectedBrandName, setSelectedBrandName] = useState<string>("Mahindra");
  const [hoodType, setHoodType] = useState<"standard" | "deluxe">("standard");

  // Filter cities by state if state is selected
  const availableCities = useMemo(() => {
    if (selectedState === "All States") {
      return SOUTH_INDIA_AGRI_CITIES;
    }
    return SOUTH_INDIA_AGRI_CITIES.filter((c) => c.state === selectedState);
  }, [selectedState]);

  // Current active city data
  const currentCity = useMemo(() => {
    const found = SOUTH_INDIA_AGRI_CITIES.find((c) => c.city === selectedCityName);
    return found || availableCities[0] || SOUTH_INDIA_AGRI_CITIES[0];
  }, [selectedCityName, availableCities]);

  // Current active brand data
  const currentBrand = useMemo(() => {
    return TRACTOR_BRANDS.find((b) => b.name === selectedBrandName) || TRACTOR_BRANDS[0];
  }, [selectedBrandName]);

  // Calculate pricing
  const estimatedFactoryPrice = hoodType === "standard" ? currentBrand.basePrice : currentBrand.deluxePrice;
  const estimatedLocalDealerPrice = Math.round(estimatedFactoryPrice * 1.42);
  const directFactorySavings = estimatedLocalDealerPrice - estimatedFactoryPrice;

  // WhatsApp prefilled message
  const whatsappQuery = `Hello Katayayani Enterprises! I am inquiring about the factory price for ${currentBrand.name} Tractor Fiber Hood (${hoodType === "deluxe" ? "Deluxe Punjabi Model" : "Heavy Duty Standard"}) for delivery to ${currentCity.city}, ${currentCity.state}. Please send the catalog, live photos and dispatch details.`;
  const whatsappUrl = `https://wa.me/919358273054?text=${encodeURIComponent(whatsappQuery)}`;

  return (
    <div className="my-10 p-5 sm:p-8 bg-gradient-to-br from-emerald-950 via-[#012d1d] to-[#03442c] rounded-3xl text-white shadow-2xl border border-emerald-700/40 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-semibold mb-3">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Interactive South India Tractor Fiber Hood Price Finder</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Check Tractor Fiber Hood Price in Your City
        </h3>
        <p className="text-emerald-100/80 text-sm sm:text-base mt-2">
          Select your agricultural hub in Andhra Pradesh, Karnataka, or Tamil Nadu to see direct factory prices, freight timelines & custom fitment.
        </p>
      </div>

      {/* Selectors Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* 1. State Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-emerald-200 mb-2">
            1. Select State
          </label>
          <div className="relative">
            <select
              value={selectedState}
              onChange={(e) => {
                const newState = e.target.value;
                setSelectedState(newState);
                const firstCityInState = SOUTH_INDIA_AGRI_CITIES.find(
                  (c) => newState === "All States" || c.state === newState
                );
                if (firstCityInState) {
                  setSelectedCityName(firstCityInState.city);
                }
              }}
              className="w-full bg-emerald-900/60 border border-emerald-600/50 rounded-xl px-4 py-3 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer appearance-none"
            >
              <option value="All States" className="bg-[#012d1d] text-white">All South India States</option>
              <option value="Andhra Pradesh" className="bg-[#012d1d] text-white">Andhra Pradesh</option>
              <option value="Karnataka" className="bg-[#012d1d] text-white">Karnataka</option>
              <option value="Tamil Nadu" className="bg-[#012d1d] text-white">Tamil Nadu</option>
            </select>
            <MapPin className="absolute right-3.5 top-3.5 w-4 h-4 text-emerald-400 pointer-events-none" />
          </div>
        </div>

        {/* 2. City Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-emerald-200 mb-2">
            2. Select Agri City / Hub
          </label>
          <div className="relative">
            <select
              value={selectedCityName}
              onChange={(e) => setSelectedCityName(e.target.value)}
              className="w-full bg-emerald-900/60 border border-emerald-600/50 rounded-xl px-4 py-3 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer appearance-none"
            >
              {availableCities.map((c) => (
                <option key={c.city} value={c.city} className="bg-[#012d1d] text-white">
                  {c.city} ({c.district} Dist.)
                </option>
              ))}
            </select>
            <MapPin className="absolute right-3.5 top-3.5 w-4 h-4 text-amber-400 pointer-events-none" />
          </div>
        </div>

        {/* 3. Brand Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-emerald-200 mb-2">
            3. Select Tractor Brand
          </label>
          <div className="relative">
            <select
              value={selectedBrandName}
              onChange={(e) => setSelectedBrandName(e.target.value)}
              className="w-full bg-emerald-900/60 border border-emerald-600/50 rounded-xl px-4 py-3 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer appearance-none"
            >
              {TRACTOR_BRANDS.map((b) => (
                <option key={b.name} value={b.name} className="bg-[#012d1d] text-white">
                  {b.name}
                </option>
              ))}
            </select>
            <Tractor className="absolute right-3.5 top-3.5 w-4 h-4 text-emerald-400 pointer-events-none" />
          </div>
        </div>

        {/* 4. Model Grade Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-emerald-200 mb-2">
            4. Hood Construction
          </label>
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-emerald-900/60 border border-emerald-600/50 rounded-xl">
            <button
              type="button"
              onClick={() => setHoodType("standard")}
              className={`py-2 px-2 text-xs font-bold rounded-lg transition-all ${
                hoodType === "standard"
                  ? "bg-amber-400 text-[#012d1d] shadow-md"
                  : "text-emerald-200 hover:text-white"
              }`}
            >
              Heavy Single
            </button>
            <button
              type="button"
              onClick={() => setHoodType("deluxe")}
              className={`py-2 px-2 text-xs font-bold rounded-lg transition-all ${
                hoodType === "deluxe"
                  ? "bg-amber-400 text-[#012d1d] shadow-md"
                  : "text-emerald-200 hover:text-white"
              }`}
            >
              Deluxe Punjabi
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Results Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/15">
          {/* Title & Agricultural Fitment */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-[#012d1d]">
                {currentCity.tag}
              </span>
              <span className="text-xs text-emerald-300 font-medium">
                {currentCity.state}
              </span>
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {currentBrand.name} Tractor Fiber Hood Price in {currentCity.city}
            </h4>
            <p className="text-xs sm:text-sm text-emerald-100">
              Compatible with: <span className="font-semibold text-white">{currentBrand.popularModels}</span>
            </p>
          </div>

          {/* Pricing Highlight */}
          <div className="bg-black/30 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:items-end justify-center">
            <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
              Katayayani Factory-Direct Price
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-black text-amber-300">
                ₹{estimatedFactoryPrice.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-gray-300 line-through">
                ₹{estimatedLocalDealerPrice.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-md mt-1.5">
              <TrendingDown className="w-3.5 h-3.5 text-emerald-300" />
              Save ~₹{directFactorySavings.toLocaleString("en-IN")} vs Local {currentCity.city} Middlemen
            </div>
          </div>
        </div>

        {/* Feature Badges & Climate Note */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="flex items-start gap-3 bg-emerald-950/40 p-3.5 rounded-xl border border-emerald-600/30">
            <Sun className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">{currentCity.city} Climate Adaptation</p>
              <p className="text-xs text-emerald-200 mt-1 leading-relaxed">{currentCity.climateNote}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-emerald-950/40 p-3.5 rounded-xl border border-emerald-600/30">
            <Truck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">Direct Transport Delivery</p>
              <p className="text-xs text-emerald-200 mt-1 leading-relaxed">
                Dispatched in 24 hrs. Doorstep/depot delivery to {currentCity.city} in <strong className="text-white">3 to 5 business days</strong> with live tracking.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-emerald-950/40 p-3.5 rounded-xl border border-emerald-600/30">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">Complete Fitting Kit</p>
              <p className="text-xs text-emerald-200 mt-1 leading-relaxed">
                Includes heavy-gauge steel pipe brackets (chimtas), anti-vibration rubber gaskets & zero-modification bolt kit.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs text-emerald-200 font-medium">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Govt. IEC Certified (BGDPS3254A) & GST Registered (09BGDPS3254A1ZL)</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-white font-bold text-sm hover:bg-[#20ba59] transition-all shadow-lg hover:shadow-[#25D366]/30 hover:scale-102"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Get {currentCity.city} Quote on WhatsApp</span>
            </a>

            <a
              href="tel:+919358273054"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#ffc641] text-[#012d1d] font-bold text-sm hover:bg-[#ffd269] transition-all shadow-lg hover:scale-102"
            >
              <Phone className="w-4 h-4" />
              <span>Call +91-9358273054</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
