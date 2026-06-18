export default function Header({ count, generatedAt, onRefresh, refreshing, isImmersive, selectedDate }) {
  const formattedTime = generatedAt
    ? new Date(generatedAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })
    : null;

  if (isImmersive) {
    return (
      <header className="relative overflow-hidden border-b" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(5,5,15,0.95)" }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-0 h-48 w-48 rounded-full blur-3xl" style={{ background: "rgba(220,38,38,0.10)" }} />
          <div className="absolute -right-10 top-0 h-48 w-48 rounded-full blur-3xl" style={{ background: "rgba(59,130,246,0.10)" }} />
        </div>
        <div className="relative mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-f1 font-black text-2xl md:text-3xl uppercase tracking-[0.06em] text-white">
                FIFA World Cup
              </span>
              <span className="font-f1 font-black text-2xl md:text-3xl uppercase tracking-[0.06em]" style={{ color: "#e8003d" }}>
                2026
              </span>
              <span className="font-f1-body text-[10px] font-semibold tracking-[0.28em] uppercase text-white/30 ml-1 self-end mb-1">
                ML Predictor
              </span>
            </div>
            <p className="font-f1-body text-[11px] tracking-[0.2em] uppercase mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
              {count} match{count !== 1 ? "es" : ""} · {selectedDate}
              {formattedTime ? ` · Updated ${formattedTime}` : ""}
            </p>
          </div>
          <button
            onClick={onRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed font-f1-body tracking-widest uppercase"
            style={{
              background: "rgba(220,38,38,0.25)",
              border: "1px solid rgba(220,38,38,0.70)",
              color: "#fca5a5",
              boxShadow: "0 0 16px rgba(220,38,38,0.25)",
            }}
          >
            <span className={refreshing ? "animate-spin inline-block" : "inline-block"}>⟳</span>
            {refreshing ? "Training…" : "Refresh"}
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="relative overflow-hidden border-b border-white/10 bg-gradient-to-r from-pitch-950 via-emerald-950 to-pitch-950">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl" />
        <div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-gold-400/15 blur-3xl" />
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            FIFA World Cup 2026 <span className="text-accent-400">Predictor</span>
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            {count} match{count === 1 ? "" : "es"} · {selectedDate}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {formattedTime && (
            <div className="text-left text-xs text-gray-500 sm:text-right">
              Last updated<br />
              <span className="text-gray-300">{formattedTime}</span>
            </div>
          )}
          <button
            type="button"
            onClick={onRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 rounded-full border border-accent-500/40 bg-accent-500/10 px-4 py-2 text-xs font-semibold text-accent-400 transition hover:bg-accent-500/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className={refreshing ? "animate-spin inline-block" : "inline-block"}>⟳</span>
            {refreshing ? "Refreshing…" : "Refresh"}
          </button>
        </div>
      </div>
    </header>
  );
}
