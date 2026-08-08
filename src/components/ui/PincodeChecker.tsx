"use client";

import { useState } from "react";
import { checkDelivery } from "@/app/actions/pincode";
import { MapPin, CheckCircle2, XCircle, Truck, Loader2 } from "lucide-react";

export default function PincodeChecker() {
  const [pincode, setPincode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [result, setResult] = useState<any>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6) return;

    setStatus("loading");
    const response = await checkDelivery(pincode);

    if (response.error) {
      setResult(response.error);
      setStatus("error");
    } else {
      setResult(response);
      setStatus("success");
    }
  };

  return (
    <div className="bg-white/50 backdrop-blur-md rounded-2xl p-5 border border-outline-variant/30 shadow-[0_4px_20px_rgba(0,0,0,0.02)] mt-6">
      <h4 className="text-label-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-primary" />
        Check Delivery & Time
      </h4>
      
      <form onSubmit={handleCheck} className="flex gap-2">
        <div className="relative flex-grow">
          <input
            type="text"
            maxLength={6}
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter 6-digit Pincode"
            className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm font-medium tracking-wide transition-all bg-white"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading" || pincode.length !== 6}
          className="h-11 px-5 rounded-xl font-bold text-sm text-white bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
        >
          {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Check"}
        </button>
      </form>

      {status === "success" && result && (
        <div className="mt-4 p-3.5 bg-green-50/80 border border-green-100 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-green-800 mb-0.5">{result.message}</p>
              <p className="text-xs text-green-700 flex items-center gap-1.5 font-medium">
                <Truck className="w-3.5 h-3.5" />
                Expected Delivery: <span className="font-bold">{result.deliveryTime}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {status === "error" && result && (
        <div className="mt-4 p-3.5 bg-red-50/80 border border-red-100 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-start gap-2.5">
            <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm font-semibold text-red-800">{result}</p>
          </div>
        </div>
      )}
    </div>
  );
}
