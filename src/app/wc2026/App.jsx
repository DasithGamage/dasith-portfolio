import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import MatchCard from "./components/MatchCard";
import MatchSection from "./components/MatchSection";
import DateSelector from "./components/DateSelector";
import LoadingScreen from "./components/LoadingScreen";
import { fetchDates, fetchPredictions, refreshPredictions } from "./lib/api";

const REFRESH_STEPS_DEFAULT = [
  "Downloading latest results…",
  "Rebuilding team state & Elo ratings…",
  "Generating predictions…",
];

const REFRESH_STEPS_IMMERSIVE = [
  "Downloading latest match results…",
  "Rebuilding Elo ratings & team form…",
  "Training England vs Croatia model…",
  "Training Ghana vs Panama model…",
  "Training Uzbekistan vs Colombia model…",
  "Training Czech Republic vs South Africa model…",
  "Generating predictions…",
];

export default function App() {
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshStep, setRefreshStep] = useState(0);
  const [filter, setFilter] = useState("all");

  const isImmersive = selectedDate === "2026-06-18";

  // Load fixture dates on mount
  useEffect(() => {
    fetchDates().then((dates) => {
      setAvailableDates(dates);
      const today = new Date().toISOString().split("T")[0];
      setSelectedDate(dates.includes(today) ? today : (dates[dates.length - 1] ?? today));
    });
  }, []);

  // Load predictions when date changes
  useEffect(() => {
    if (!selectedDate) return;
    setLoading(true);
    setData(null);
    setError(null);
    fetchPredictions(selectedDate)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [selectedDate]);

  const handleDateChange = (d) => {
    setSelectedDate(d);
    setFilter("all");
  };

  const handleRefresh = async () => {
    if (!selectedDate) return;
    const steps = isImmersive ? REFRESH_STEPS_IMMERSIVE : REFRESH_STEPS_DEFAULT;
    setRefreshing(true);
    setRefreshStep(0);
    const interval = setInterval(() => {
      setRefreshStep((s) => Math.min(s + 1, steps.length - 1));
    }, isImmersive ? 3500 : 2500);
    try {
      const fresh = await refreshPredictions(selectedDate);
      setData(fresh);
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      clearInterval(interval);
      setRefreshing(false);
      setRefreshStep(0);
    }
  };

  const filteredMatches = useMemo(() => {
    const matches = data?.matches ?? [];
    if (filter === "all") return matches;
    if (filter === "high") return matches.filter((m) => m.confidence === "high");
    return matches.filter((m) => m.predicted_result === filter);
  }, [data, filter]);

  if (loading && !selectedDate) return <LoadingScreen message="Loading…" />;
  if (refreshing) {
    const steps = isImmersive ? REFRESH_STEPS_IMMERSIVE : REFRESH_STEPS_DEFAULT;
    return <LoadingScreen message={steps[refreshStep]} />;
  }

  return (
    <div className={`min-h-screen ${isImmersive ? "bg-immersive" : "bg-stadium"}`}>
      <Header
        count={data?.count ?? 0}
        generatedAt={data?.generated_at}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        isImmersive={isImmersive}
        selectedDate={selectedDate}
      />

      <main className={`mx-auto px-6 py-8 ${isImmersive ? "max-w-4xl" : "max-w-6xl"}`}>

        {availableDates.length > 0 && (
          <DateSelector
            dates={availableDates}
            selected={selectedDate}
            onChange={handleDateChange}
          />
        )}

        {loading && selectedDate && (
          <div className="flex justify-center py-20">
            <div
              className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
              style={{
                borderColor: isImmersive ? "rgba(248,113,113,0.5)" : "rgba(34,197,94,0.5)",
                borderTopColor: "transparent",
              }}
            />
          </div>
        )}

        {error && !loading && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-center text-sm text-red-300">
            {error}
            <div className="mt-2 text-red-400/50 text-xs">
              Backend must be running on port 8010. Click Refresh to generate predictions.
            </div>
          </div>
        )}

        {!loading && !error && data?.matches?.length > 0 && (
          isImmersive ? (
            <div className="mt-2">
              {data.matches.map((match, i) => (
                <MatchSection key={i} match={match} index={i} />
              ))}
            </div>
          ) : (
            <>
              <FilterBar active={filter} onChange={setFilter} />
              {filteredMatches.length === 0 ? (
                <p className="text-center text-gray-400">No matches match this filter.</p>
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredMatches.map((match, idx) => (
                    <MatchCard key={idx} match={match} />
                  ))}
                </div>
              )}
            </>
          )
        )}

        {!loading && !error && data?.matches?.length === 0 && (
          <p className="text-center text-gray-400 py-16">No matches scheduled for this date.</p>
        )}
      </main>

      <footer className="text-center text-xs text-gray-700 pb-10 mt-4">
        Predictions are statistical estimates based on historical data — for entertainment purposes only.
      </footer>
    </div>
  );
}
