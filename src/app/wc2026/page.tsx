"use client";
import dynamic from "next/dynamic";

// Lazy-load the Vite→Next ported App — avoids SSR issues with browser APIs
const WCApp = dynamic(() => import("./App"), { ssr: false, loading: () => (
  <div className="wc-bg min-h-screen flex items-center justify-center">
    <div className="text-white/40 text-sm tracking-widest uppercase animate-pulse">Loading Predictor…</div>
  </div>
)});

export default function WC2026Page() {
  return <WCApp />;
}
