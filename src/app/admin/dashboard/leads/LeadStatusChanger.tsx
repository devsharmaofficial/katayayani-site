"use client";
import { useState } from "react";

const STATUSES = ["New", "Contacted", "Converted"];
const statusColors: Record<string, string> = {
  New: "text-blue-600 hover:bg-blue-50",
  Contacted: "text-amber-600 hover:bg-amber-50",
  Converted: "text-green-600 hover:bg-green-50",
};

export default function LeadStatusChanger({
  leadId,
  currentStatus,
}: {
  leadId: string;
  currentStatus: string;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const updateStatus = async (newStatus: string) => {
    if (newStatus === status) { setOpen(false); return; }
    setLoading(true);
    try {
      await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setStatus(newStatus);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        disabled={loading}
        className="px-3 py-1.5 text-xs font-bold rounded-lg border border-gray-200 hover:border-gray-300 bg-white transition-all disabled:opacity-50 flex items-center gap-1"
      >
        {loading ? "..." : "Change"}
        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white rounded-xl border border-gray-200 shadow-lg z-20 overflow-hidden min-w-[130px]">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => updateStatus(s)}
              className={`w-full text-left px-3 py-2 text-xs font-bold transition-colors ${statusColors[s]} ${s === status ? "opacity-50 cursor-default" : ""}`}
            >
              {s === status ? `✓ ${s}` : s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
