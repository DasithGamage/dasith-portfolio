export default function LoadingScreen({ message = "Loading predictions…" }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stadium gap-6">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-24 w-24 rounded-full border-4 border-accent-500/20 border-t-accent-500 animate-spin" />
        <span className="text-4xl">⚽</span>
      </div>
      <div className="text-center">
        <p className="text-lg font-semibold text-white">{message}</p>
        <p className="mt-1 text-sm text-gray-500">FIFA World Cup 2026 Predictor</p>
      </div>
    </div>
  );
}
