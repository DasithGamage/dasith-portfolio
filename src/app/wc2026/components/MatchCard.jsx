import { useState } from "react";
import Flag from "./Flag";
import ProbabilityBar from "./ProbabilityBar";
import ConfidenceBadge from "./ConfidenceBadge";

const RESULT_LABEL = {
  home_win: (m) => `${m.home_team} to win`,
  away_win: (m) => `${m.away_team} to win`,
  draw: () => "Draw",
};

const FlipHint = () => (
  <div className="absolute bottom-3 right-3 pointer-events-none" style={{ color: "rgba(255,255,255,0.30)" }}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 11-9-9"/>
      <polyline points="21 3 21 9 15 9"/>
    </svg>
  </div>
);

const CARD_H = 310;
const CARD_STYLE = { background: "linear-gradient(to bottom, rgba(22,28,31,0.55), rgba(15,20,22,0.65))" };

export default function MatchCard({ match }) {
  const [flipped, setFlipped] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [sweepKey, setSweepKey] = useState(0);
  const [sweeping, setSweeping] = useState(false);

  const canFlip = match.actual_result != null;
  const predictedLabel = RESULT_LABEL[match.predicted_result]?.(match) ?? "—";
  const eloDiff = Math.round(match.home_elo - match.away_elo);
  const predCorrect = match.actual_result === match.predicted_result;

  const handleClick = () => {
    if (canFlip) setFlipped((f) => !f);
    else setExpanded((e) => !e);
  };

  return (
    <div
      className="relative"
      style={{ cursor: "pointer", height: canFlip ? `${CARD_H}px` : "auto" }}
      onMouseEnter={() => { setSweepKey(k => k + 1); setSweeping(true); }}
      onClick={handleClick}
    >
      {/* Sweep border */}
      <div className="absolute rounded-2xl overflow-hidden pointer-events-none" style={{ inset: "-1px", zIndex: 0 }}>
        {sweeping && (
          <div
            key={sweepKey}
            onAnimationEnd={() => setSweeping(false)}
            style={{
              position: "absolute", top: "50%", left: "50%",
              width: "200%", height: "200%",
              background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(200,215,255,0.55) 16deg, transparent 32deg, transparent 360deg)",
              animation: "sweep-border-once 0.6s linear forwards",
            }}
          />
        )}
      </div>

      {canFlip ? (
        /* ── Flippable card: two independent faces, no preserve-3d ── */
        <div style={{ position: "relative", zIndex: 1, height: `${CARD_H}px` }}>

          {/* Front face */}
          <div
            className="absolute inset-0 rounded-2xl border border-pitch-700 p-5 shadow-lg shadow-black/20 overflow-hidden"
            style={{
              ...CARD_STYLE,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
              transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)",
              perspective: "1000px",
            }}
          >
            <div className="mb-3 flex items-center justify-between text-xs text-gray-500">
              <span className="rounded-full bg-pitch-700 px-2.5 py-1 font-medium text-gray-300">{match.tournament}</span>
              <span>{match.kickoff_time ? `Today · ${match.kickoff_time}` : match.date}</span>
            </div>

            <div className="mb-3 flex items-center justify-between">
              <div className="flex flex-1 flex-col items-center gap-1.5">
                <Flag code={match.home_team_flag} name={match.home_team} size={36} />
                <span className="text-sm font-semibold text-gray-100">{match.home_team}</span>
              </div>
              <span className="px-3 text-sm font-bold text-gray-500">VS</span>
              <div className="flex flex-1 flex-col items-center gap-1.5">
                <Flag code={match.away_team_flag} name={match.away_team} size={36} />
                <span className="text-sm font-semibold text-gray-100">{match.away_team}</span>
              </div>
            </div>

            <ProbabilityBar homeProb={match.home_win_prob} drawProb={match.draw_prob} awayProb={match.away_win_prob} />

            <div className="mt-4 flex items-center justify-between border-t border-pitch-700 pt-3">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-gray-500">Predicted result</p>
                <p className="text-sm font-bold text-gray-100">{predictedLabel}</p>
              </div>
              <ConfidenceBadge level={match.confidence} score={match.confidence_score} />
            </div>
            <FlipHint />
          </div>

          {/* Back face */}
          <div
            className="absolute inset-0 rounded-2xl border border-pitch-700 shadow-lg shadow-black/20 overflow-hidden flex flex-col items-center justify-center p-5 text-center"
            style={{
              ...CARD_STYLE,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: flipped ? "rotateY(0deg)" : "rotateY(-180deg)",
              transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)",
              perspective: "1000px",
            }}
          >
            <p className="text-[10px] tracking-[0.35em] uppercase text-gray-500 mb-3">Full Time Result</p>

            <div className="flex items-center gap-5 mb-3">
              <div className="flex flex-col items-center gap-1">
                <Flag code={match.home_team_flag} name={match.home_team} size={30} />
                <span className="text-xs font-semibold text-gray-200">{match.home_team}</span>
                <span className="font-black text-4xl leading-none" style={{ color: match.actual_result === "home_win" ? "#4ade80" : "rgba(255,255,255,0.4)" }}>
                  {match.actual_home_score}
                </span>
              </div>
              <span className="text-xl font-bold text-gray-600 pb-4">—</span>
              <div className="flex flex-col items-center gap-1">
                <Flag code={match.away_team_flag} name={match.away_team} size={30} />
                <span className="text-xs font-semibold text-gray-200">{match.away_team}</span>
                <span className="font-black text-4xl leading-none" style={{ color: match.actual_result === "away_win" ? "#60a5fa" : "rgba(255,255,255,0.4)" }}>
                  {match.actual_away_score}
                </span>
              </div>
            </div>

            <p className="text-sm font-bold text-gray-100 mb-3">
              {match.actual_result === "home_win" ? `${match.home_team} Won`
                : match.actual_result === "away_win" ? `${match.away_team} Won`
                : "Draw"}
            </p>

            <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold border ${
              predCorrect ? "bg-green-500/15 border-green-500/30 text-green-400" : "bg-red-500/15 border-red-500/30 text-red-400"
            }`}>
              {predCorrect ? "✓" : "✗"} ML Prediction {predCorrect ? "Correct" : "Wrong"}
            </div>
            <FlipHint />
          </div>
        </div>

      ) : (
        /* ── Non-flippable expand/collapse card ── */
        <div
          className="relative z-[1] group rounded-2xl border border-pitch-700 p-5 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:border-accent-500/50 hover:shadow-accent-500/10"
          style={CARD_STYLE}
        >
          <div className="mb-4 flex items-center justify-between text-xs text-gray-500">
            <span className="rounded-full bg-pitch-700 px-2.5 py-1 font-medium text-gray-300">{match.tournament}</span>
            <span>{match.kickoff_time ? `Today · ${match.kickoff_time}` : match.date}</span>
          </div>

          <div className="mb-5 flex items-center justify-between">
            <div className="flex flex-1 flex-col items-center gap-2">
              <Flag code={match.home_team_flag} name={match.home_team} size={40} />
              <span className="text-sm font-semibold text-gray-100">{match.home_team}</span>
            </div>
            <span className="px-3 text-sm font-bold text-gray-500">VS</span>
            <div className="flex flex-1 flex-col items-center gap-2">
              <Flag code={match.away_team_flag} name={match.away_team} size={40} />
              <span className="text-sm font-semibold text-gray-100">{match.away_team}</span>
            </div>
          </div>

          <ProbabilityBar homeProb={match.home_win_prob} drawProb={match.draw_prob} awayProb={match.away_win_prob} />

          <div className="mt-5 flex items-center justify-between border-t border-pitch-700 pt-4">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-gray-500">Predicted result</p>
              <p className="text-sm font-bold text-gray-100">{predictedLabel}</p>
            </div>
            <ConfidenceBadge level={match.confidence} score={match.confidence_score} />
          </div>

          <div className={`grid overflow-hidden transition-all duration-300 ${expanded ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
            <div className="min-h-0 border-t border-pitch-700 pt-3 text-xs text-gray-400">
              <div className="flex justify-between">
                <span>{match.home_team} Elo</span>
                <span className="font-medium text-gray-200">{Math.round(match.home_elo)}</span>
              </div>
              <div className="mt-1 flex justify-between">
                <span>{match.away_team} Elo</span>
                <span className="font-medium text-gray-200">{Math.round(match.away_elo)}</span>
              </div>
              <div className="mt-1 flex justify-between">
                <span>Elo gap</span>
                <span className={`font-medium ${eloDiff >= 0 ? "text-accent-400" : "text-gold-400"}`}>
                  {eloDiff >= 0 ? "+" : ""}{eloDiff} ({match.home_team})
                </span>
              </div>
              <div className="mt-1 flex justify-between">
                <span>Venue</span>
                <span className="font-medium text-gray-200">{match.neutral ? "Neutral" : "Home advantage"}</span>
              </div>
            </div>
          </div>

          <p className="mt-3 text-center text-[10px] text-gray-600 group-hover:text-gray-500">
            {expanded ? "Click to collapse" : "Click for match details"}
          </p>
        </div>
      )}
    </div>
  );
}
