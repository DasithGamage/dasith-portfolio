"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// ── Update this when you deploy the predictor ──────────────────────────────
const TOOL_URL = process.env.NEXT_PUBLIC_WC_TOOL_URL ?? "http://localhost:5173";
// ──────────────────────────────────────────────────────────────────────────

const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const features = [
  { emoji: "🤖", title: "Per-Match XGBoost Models", desc: "4 separate models trained on historical data filtered to each matchup's teams" },
  { emoji: "📊", title: "Elo Rating System", desc: "Dynamic team strength ratings updated after every historical match with goal-margin multipliers" },
  { emoji: "🔄", title: "Live Score Refresh", desc: "Pulls real-time final scores from ESPN API and flips cards to show actual vs predicted" },
  { emoji: "🎴", title: "Interactive Card Flip", desc: "Click any completed match to flip the card and see the full-time result with prediction verdict" },
];

const stack = ["XGBoost", "Python", "FastAPI", "React", "Vite", "Tailwind CSS", "Pandas", "Scikit-learn"];

export default function WC2026Page() {
  const [launched, setLaunched] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto px-6 py-12 pb-24" style={{ maxWidth: "720px" }}>

        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <BackIcon /> Back to portfolio
        </Link>

        {/* Hero */}
        <div className="mb-10">
          <Badge variant="default" className="mb-4 text-sm px-4 py-1">
            Live ML Project · Jun 2026
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            FIFA World Cup 2026{" "}
            <span className="text-red-600 dark:text-red-500">AI Predictor</span>
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            A real-time machine learning system that predicts World Cup match outcomes using per-match XGBoost models, Elo ratings, and live score data from ESPN. Built entirely from scratch as a personal AI project during the tournament.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => setLaunched(true)}
              className="gap-2 bg-red-600 hover:bg-red-700 text-white"
            >
              ⚽ Launch Predictor
            </Button>
            <Button variant="outline" size="default" asChild>
              <a href={TOOL_URL} target="_blank" rel="noopener noreferrer" className="gap-2 inline-flex items-center">
                <ExternalIcon /> Open in new tab
              </a>
            </Button>
          </div>
        </div>

        {/* Embedded tool or launch prompt */}
        {launched ? (
          <div className="mb-10 rounded-2xl overflow-hidden border border-border shadow-lg" style={{ height: "75vh" }}>
            <iframe
              src={TOOL_URL}
              className="w-full h-full"
              title="FIFA World Cup 2026 AI Predictor"
              allow="fullscreen"
            />
          </div>
        ) : (
          <div
            onClick={() => setLaunched(true)}
            className="mb-10 rounded-2xl border border-border bg-muted/30 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-muted/50 transition-colors"
            style={{ height: "260px" }}
          >
            <span className="text-6xl">⚽</span>
            <p className="text-muted-foreground text-sm font-medium">Click to launch the predictor</p>
            <Button className="bg-red-600 hover:bg-red-700 text-white gap-2">
              ⚽ Launch Predictor
            </Button>
          </div>
        )}

        {/* Features */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">How it works</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4">
                <div className="text-2xl mb-2">{f.emoji}</div>
                <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stack */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {stack.map((s, i) => (
              <Badge key={i} variant="secondary" className="px-3 py-1 text-sm">
                {s}
              </Badge>
            ))}
          </div>
        </section>

        {/* Note */}
        <p className="text-xs text-muted-foreground text-center border-t border-border pt-6">
          Predictions are statistical estimates based on historical data — for entertainment purposes only.
        </p>
      </div>
    </main>
  );
}
