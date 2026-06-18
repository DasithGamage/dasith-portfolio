export default function ProbabilityBar({ homeProb, drawProb, awayProb }) {
  const home = Math.round(homeProb * 100);
  const draw = Math.round(drawProb * 100);
  const away = 100 - home - draw;

  return (
    <div className="w-full">
      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-pitch-700">
        <div className="bg-accent-500" style={{ width: `${home}%` }} />
        <div className="bg-gray-500" style={{ width: `${draw}%` }} />
        <div className="bg-gold-400" style={{ width: `${away}%` }} />
      </div>
      <div className="mt-1.5 flex justify-between text-xs font-medium text-gray-400">
        <span className="text-accent-400">{home}%</span>
        <span className="text-gray-400">{draw}%</span>
        <span className="text-gold-400">{away}%</span>
      </div>
    </div>
  );
}
