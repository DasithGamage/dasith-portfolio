import { useState, useEffect, useRef } from "react";

const TrophyIcon = ({ className = "" }) => (
  <svg
    width="11" height="11" viewBox="0 0 24 24" fill="currentColor"
    className={`inline-block mb-px mr-1 ${className}`}
    aria-hidden
  >
    <path d="M6 2h12v8a6 6 0 01-12 0V2zM4 4H2v3a3 3 0 003 3h.18A8.02 8.02 0 014 7V4zm16 0h2v3a3 3 0 01-3 3h-.18A8.02 8.02 0 0020 7V4zM9 17.93V20H7v2h10v-2h-2v-2.07A8.001 8.001 0 0012 18a8 8 0 00-3-.07z"/>
  </svg>
);

const FlipHint = () => (
  <div className="absolute bottom-3 right-4 pointer-events-none" style={{ color: "rgba(255,255,255,0.22)" }}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 11-9-9"/>
      <polyline points="21 3 21 9 15 9"/>
    </svg>
  </div>
);

const PRED_LABEL = {
  home_win: (m) => `${m.home_team} Win`,
  away_win: (m) => `${m.away_team} Win`,
  draw: () => "Draw",
};

export default function MatchSection({ match, index }) {
  const [visible, setVisible] = useState(false);
  const [bars, setBars] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [sweepKey, setSweepKey] = useState(0);
  const [sweeping, setSweeping] = useState(false);
  const ref = useRef(null);

  const canFlip = match.actual_result != null;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          setTimeout(() => setBars(true), 450 + index * 80);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  const hp = Math.round(match.home_win_prob * 100);
  const dp = Math.round(match.draw_prob * 100);
  const ap = Math.round(match.away_win_prob * 100);
  const pred = PRED_LABEL[match.predicted_result]?.(match) ?? "—";
  const eloDiff = Math.abs(Math.round((match.home_elo ?? 1500) - (match.away_elo ?? 1500)));
  const eloFavour = (match.home_elo ?? 1500) >= (match.away_elo ?? 1500) ? match.home_team : match.away_team;

  const flagBg = (code) => code ? `url(https://flagcdn.com/w640/${code}.png)` : "none";
  const flagSrc = (code) => code ? `https://flagcdn.com/w320/${code}.png` : null;

  const actualHS = match.actual_home_score;
  const actualAS = match.actual_away_score;
  const actualResult = match.actual_result;
  const predCorrect = actualResult === match.predicted_result;

  const CARD_HEIGHT = 520;

  return (
    <div
      ref={ref}
      className="relative mb-6"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.65s ease ${index * 80}ms, transform 0.65s ease ${index * 80}ms`,
        cursor: canFlip ? "pointer" : "default",
      }}
      onMouseEnter={() => { setSweepKey(k => k + 1); setSweeping(true); }}
      onClick={() => canFlip && setFlipped((f) => !f)}
    >
      {/* ── Sweep border (single-shot CSS animation) ── */}
      <div
        className="absolute rounded-3xl overflow-hidden pointer-events-none"
        style={{ inset: "-1px", zIndex: 0 }}
      >
        {sweeping && (
          <div
            key={sweepKey}
            onAnimationEnd={() => setSweeping(false)}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "200%",
              height: "200%",
              background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(200,215,255,0.65) 16deg, transparent 32deg, transparent 360deg)",
              animation: "sweep-border-once 0.6s linear forwards",
            }}
          />
        )}
      </div>

      {/* ── 3D flip container ── */}
      <div style={{ perspective: "1400px", position: "relative", zIndex: 1 }}>
        <div
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            position: "relative",
            height: `${CARD_HEIGHT}px`,
          }}
        >

          {/* ════════ FRONT: Prediction ════════ */}
          <div style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", position: "absolute", inset: 0, borderRadius: "1.5rem", overflow: "hidden" }}>
            {/* Flag BG */}
            <div className="absolute inset-0 flex pointer-events-none select-none">
              <div className="w-1/2 h-full" style={{ backgroundImage: flagBg(match.home_team_flag), backgroundSize: "cover", backgroundPosition: "center", filter: "blur(14px) brightness(0.32) saturate(2)", transform: "scale(1.15)" }} />
              <div className="w-1/2 h-full" style={{ backgroundImage: flagBg(match.away_team_flag), backgroundSize: "cover", backgroundPosition: "center", filter: "blur(14px) brightness(0.32) saturate(2)", transform: "scale(1.15)" }} />
            </div>
            {/* Divider */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-px w-px pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.10) 25%, rgba(255,255,255,0.10) 75%, transparent 100%)" }} />
            {/* Overlay */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.32) 40%, rgba(0,0,0,0.80) 100%)" }} />

            {/* Content */}
            <div className="relative z-10 flex flex-col p-6 md:p-10" style={{ height: `${CARD_HEIGHT}px` }}>
              {/* Top bar */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3 flex-wrap">
                  {match.group && (
                    <span className="font-f1-body text-[10px] font-semibold tracking-[0.35em] uppercase text-red-400">
                      Group {match.group}
                    </span>
                  )}
                  <span className="font-f1-body text-[10px] tracking-[0.28em] uppercase text-white/25">
                    · FIFA World Cup 2026 ·
                  </span>
                  <span className="font-f1-body text-[10px] tracking-[0.28em] uppercase text-white/50">
                    {match.kickoff_time}
                  </span>
                </div>
                {match.model_used && match.model_used !== "global" && (
                  <span className="font-f1-body text-[9px] font-semibold tracking-[0.22em] uppercase text-blue-400/60 border border-blue-400/20 rounded-full px-2.5 py-0.5 shrink-0">
                    Per-Match Model
                  </span>
                )}
              </div>

              {/* Teams */}
              <div className="flex items-center justify-between flex-1 mb-10 gap-2">
                {/* Home */}
                <div className="flex-1 flex flex-col items-center gap-4 text-center">
                  <div className="w-20 h-14 md:w-28 md:h-[72px] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 shrink-0">
                    {flagSrc(match.home_team_flag)
                      ? <img src={flagSrc(match.home_team_flag)} className="w-full h-full object-cover" alt={match.home_team} />
                      : <div className="w-full h-full bg-white/10" />}
                  </div>
                  <h2 className="font-f1 font-black uppercase text-white leading-none" style={{ fontSize: "clamp(1.4rem, 3vw, 2.8rem)", letterSpacing: "-0.01em" }}>
                    {match.home_team}
                  </h2>
                  <div className="font-f1 font-black leading-none" style={{
                    fontSize: "clamp(2.5rem, 6vw, 5rem)",
                    letterSpacing: "0.02em",
                    color: match.predicted_result === "home_win" ? "#f87171" : "rgba(255,255,255,0.38)",
                    opacity: bars ? 1 : 0,
                    transform: bars ? "scale(1)" : "scale(0.82)",
                    transition: "opacity 0.85s ease, transform 0.85s ease",
                  }}>
                    {hp}%
                  </div>
                  <span className="font-f1-body text-[10px] tracking-[0.32em] uppercase text-white/28">Win Probability</span>
                </div>

                {/* VS */}
                <div className="flex flex-col items-center gap-3 px-2 shrink-0">
                  <span className="font-f1 font-black text-xl tracking-[0.45em] text-white/12">VS</span>
                </div>

                {/* Away */}
                <div className="flex-1 flex flex-col items-center gap-4 text-center">
                  <div className="w-20 h-14 md:w-28 md:h-[72px] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 shrink-0">
                    {flagSrc(match.away_team_flag)
                      ? <img src={flagSrc(match.away_team_flag)} className="w-full h-full object-cover" alt={match.away_team} />
                      : <div className="w-full h-full bg-white/10" />}
                  </div>
                  <h2 className="font-f1 font-black uppercase text-white leading-none" style={{ fontSize: "clamp(1.4rem, 3vw, 2.8rem)", letterSpacing: "-0.01em" }}>
                    {match.away_team}
                  </h2>
                  <div className="font-f1 font-black leading-none" style={{
                    fontSize: "clamp(2.5rem, 6vw, 5rem)",
                    letterSpacing: "0.02em",
                    color: match.predicted_result === "away_win" ? "#60a5fa" : "rgba(255,255,255,0.38)",
                    opacity: bars ? 1 : 0,
                    transform: bars ? "scale(1)" : "scale(0.82)",
                    transition: "opacity 0.85s ease 0.18s, transform 0.85s ease 0.18s",
                  }}>
                    {ap}%
                  </div>
                  <span className="font-f1-body text-[10px] tracking-[0.32em] uppercase text-white/28">Win Probability</span>
                </div>
              </div>

              {/* Probability bar */}
              <div className="mb-5">
                <div className="h-[5px] rounded-full overflow-hidden flex" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div style={{ width: bars ? `${hp}%` : "0%", background: "linear-gradient(to right, #b91c1c, #f87171)", transition: "width 1.1s cubic-bezier(0.4,0,0.2,1)" }} />
                  <div style={{ width: bars ? `${dp}%` : "0%", background: "rgba(255,255,255,0.22)", transition: "width 1.1s cubic-bezier(0.4,0,0.2,1) 0.1s" }} />
                  <div style={{ width: bars ? `${ap}%` : "0%", background: "linear-gradient(to right, #60a5fa, #1d4ed8)", transition: "width 1.1s cubic-bezier(0.4,0,0.2,1) 0.2s" }} />
                </div>
                <div className="flex justify-between mt-2.5">
                  <span className="font-f1-body text-[10px] font-semibold tracking-[0.22em] uppercase text-red-400">
                    <TrophyIcon />{match.home_team} Win · {hp}%
                  </span>
                  <span className="font-f1-body text-[10px] font-semibold tracking-[0.22em] uppercase text-white/28">
                    Draw · {dp}%
                  </span>
                  <span className="font-f1-body text-[10px] font-semibold tracking-[0.22em] uppercase text-blue-400">
                    <TrophyIcon />{match.away_team} Win · {ap}%
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <div>
                  <p className="font-f1-body text-[9px] tracking-[0.35em] uppercase text-white/25 mb-0.5">
                    XGBoost Prediction
                    <span className="ml-2 tracking-[0.22em]" style={{ color: "rgba(255,255,255,0.45)" }}>
                      · {match.confidence}
                    </span>
                  </p>
                  <p className="font-f1 font-black text-xl uppercase tracking-[0.1em] text-white">{pred}</p>
                </div>
                <div className="text-right">
                  <p className="font-f1-body text-[9px] tracking-[0.35em] uppercase text-white/25 mb-0.5">Elo Advantage</p>
                  <p className="font-f1 font-bold text-sm tracking-[0.12em] text-white/55">{eloFavour} +{eloDiff}</p>
                </div>
              </div>

              {canFlip && <FlipHint />}
            </div>
          </div>

          {/* ════════ BACK: Actual Result ════════ */}
          {canFlip && (
            <div style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)", position: "absolute", inset: 0, borderRadius: "1.5rem", overflow: "hidden" }}>
              {/* Flag BG (darker) */}
              <div className="absolute inset-0 flex pointer-events-none select-none">
                <div className="w-1/2 h-full" style={{ backgroundImage: flagBg(match.home_team_flag), backgroundSize: "cover", backgroundPosition: "center", filter: "blur(14px) brightness(0.32) saturate(2)", transform: "scale(1.15)" }} />
                <div className="w-1/2 h-full" style={{ backgroundImage: flagBg(match.away_team_flag), backgroundSize: "cover", backgroundPosition: "center", filter: "blur(14px) brightness(0.32) saturate(2)", transform: "scale(1.15)" }} />
              </div>
              <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.72)" }} />

              {/* Back content */}
              <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center" style={{ height: `${CARD_HEIGHT}px` }}>
                <p className="font-f1-body text-[10px] tracking-[0.45em] uppercase text-white/30 mb-8">
                  Full Time Result
                </p>

                <div className="flex items-center gap-6 md:gap-10 mb-8">
                  <div className="flex flex-col items-center gap-3">
                    {flagSrc(match.home_team_flag) && (
                      <img src={flagSrc(match.home_team_flag)} className="w-16 h-10 object-cover rounded-xl shadow-xl ring-1 ring-white/10" alt={match.home_team} />
                    )}
                    <p className="font-f1 font-black text-lg uppercase tracking-[0.04em] text-white">{match.home_team}</p>
                    <p className="font-f1 font-black leading-none" style={{
                      fontSize: "5rem",
                      color: actualResult === "home_win" ? "#f87171" : "rgba(255,255,255,0.45)",
                    }}>
                      {actualHS}
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-2 pb-6">
                    <span className="font-f1 font-black text-3xl text-white/15 tracking-widest">—</span>
                  </div>

                  <div className="flex flex-col items-center gap-3">
                    {flagSrc(match.away_team_flag) && (
                      <img src={flagSrc(match.away_team_flag)} className="w-16 h-10 object-cover rounded-xl shadow-xl ring-1 ring-white/10" alt={match.away_team} />
                    )}
                    <p className="font-f1 font-black text-lg uppercase tracking-[0.04em] text-white">{match.away_team}</p>
                    <p className="font-f1 font-black leading-none" style={{
                      fontSize: "5rem",
                      color: actualResult === "away_win" ? "#60a5fa" : "rgba(255,255,255,0.45)",
                    }}>
                      {actualAS}
                    </p>
                  </div>
                </div>

                <p className="font-f1 font-black text-2xl uppercase tracking-[0.1em] text-white mb-6">
                  {actualResult === "home_win" ? `${match.home_team} Won` : actualResult === "away_win" ? `${match.away_team} Won` : "Full Time Draw"}
                </p>

                <div className={`inline-flex items-center gap-2.5 rounded-full px-6 py-2.5 border ${
                  predCorrect
                    ? "bg-green-500/15 border-green-500/35 text-green-400"
                    : "bg-red-500/15 border-red-500/35 text-red-400"
                }`}>
                  <span className="font-f1 font-black text-base">{predCorrect ? "✓" : "✗"}</span>
                  <span className="font-f1-body text-xs font-semibold tracking-[0.22em] uppercase">
                    ML Prediction {predCorrect ? "Correct" : "Incorrect"}
                  </span>
                </div>

                <p className="font-f1-body text-[9px] tracking-[0.28em] uppercase text-white/22 mt-4">
                  Predicted: {pred} · {Math.round(match.confidence_score * 100)}% confidence
                </p>

                <FlipHint />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
