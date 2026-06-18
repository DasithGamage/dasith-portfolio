const STYLES = {
  high: "bg-accent-500/15 text-accent-400 ring-accent-500/30",
  medium: "bg-gold-400/15 text-gold-400 ring-gold-400/30",
  low: "bg-gray-500/15 text-gray-400 ring-gray-500/30",
};

export default function ConfidenceBadge({ level, score }) {
  const style = STYLES[level] || STYLES.low;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ring-1 ${style}`}
    >
      {level} · {Math.round(score * 100)}%
    </span>
  );
}
