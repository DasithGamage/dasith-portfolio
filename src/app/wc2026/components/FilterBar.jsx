const FILTERS = [
  { key: "all", label: "All matches" },
  { key: "high", label: "High confidence" },
  { key: "home_win", label: "Home win" },
  { key: "draw", label: "Draw" },
  { key: "away_win", label: "Away win" },
];

export default function FilterBar({ active, onChange }) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {FILTERS.map((f) => {
        const isActive = active === f.key;
        return (
          <button
            key={f.key}
            type="button"
            onClick={() => onChange(f.key)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              isActive
                ? "bg-accent-500 text-pitch-950 shadow-md shadow-accent-500/30"
                : "bg-pitch-800 text-gray-400 ring-1 ring-pitch-700 hover:text-gray-200 hover:ring-accent-500/40"
            }`}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
