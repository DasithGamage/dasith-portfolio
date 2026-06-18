const VIEW_LABEL = {
  "2026-06-17": "Classic View",
  "2026-06-18": "Immersive View",
};

function formatDate(d) {
  const date = new Date(d + "T12:00:00Z");
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

export default function DateSelector({ dates, selected, onChange }) {
  const isImmersive = selected === "2026-06-18";

  return (
    <div className="mb-8">
      <div className="relative inline-block">
        <select
          value={selected || ""}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none font-f1 font-bold text-base uppercase text-white rounded-2xl outline-none cursor-pointer pr-10 pl-5 py-3 transition-all"
          style={{
            background: isImmersive ? "rgba(220,38,38,0.12)" : "rgba(34,197,94,0.10)",
            border: isImmersive ? "1px solid rgba(220,38,38,0.30)" : "1px solid rgba(34,197,94,0.30)",
            letterSpacing: "0.18em",
          }}
        >
          {dates.map((d) => (
            <option key={d} value={d} style={{ background: "#05050f", color: "#fff" }}>
              {formatDate(d)}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(255,255,255,0.35)" }}>
          <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
