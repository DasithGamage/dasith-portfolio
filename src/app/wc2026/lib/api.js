const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8010";

export async function fetchDates() {
  try {
    const res = await fetch(`${API_BASE}/api/dates`);
    if (!res.ok) return [];
    return (await res.json()).dates || [];
  } catch {
    return [];
  }
}

export async function fetchPredictions(date) {
  const res = await fetch(`${API_BASE}/api/predictions/${date}`);
  if (!res.ok) throw new Error(`No predictions for ${date} yet — click Refresh to generate them`);
  return res.json();
}

export async function refreshPredictions(date) {
  const res = await fetch(`${API_BASE}/api/predictions/${date}/refresh`, { method: "POST" });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `Refresh failed (${res.status})`);
  }
  return res.json();
}
