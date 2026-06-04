/* Deterministic activity-grid helpers for the CP heatmaps.
   Used as a graceful fallback when live data is unavailable. */

export type Day = { date: string; level: number; count: number };

function hashSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function levelFor(count: number): number {
  if (count <= 0) return 0;
  if (count <= 1) return 1;
  if (count <= 3) return 2;
  if (count <= 6) return 3;
  return 4;
}

/* 52 weeks of plausible activity, seeded so SSR === CSR. */
export function generateGrid(seed: string, weeks = 52): Day[] {
  const rand = mulberry32(hashSeed(seed));
  const today = new Date();
  // align to end of current week (Saturday)
  const end = new Date(today);
  end.setDate(end.getDate() + (6 - end.getDay()));
  const total = weeks * 7;
  const days: Day[] = [];
  let streak = 0;
  for (let i = total - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setDate(end.getDate() - i);
    const dow = d.getDay();
    const weekdayBias = dow === 0 || dow === 6 ? 0.45 : 1;
    const inStreak = streak > 0;
    const active = rand() < 0.5 * weekdayBias + (inStreak ? 0.25 : 0);
    let count = 0;
    if (active) {
      count = 1 + Math.floor(rand() * 8 * weekdayBias);
      streak = inStreak ? streak - 1 : Math.floor(rand() * 5);
    } else {
      streak = 0;
    }
    days.push({
      date: d.toISOString().slice(0, 10),
      count,
      level: levelFor(count),
    });
  }
  return days;
}

/* Build a sorted array of all days in the map (oldest first). */
function allDaysFromMap(map: Record<string, number>): Day[] {
  return Object.entries(map)
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([date, count]) => ({ date, count, level: levelFor(count) }));
}

/* Convert a {date: count} map into the most-recent 52-week grid. */
export function gridFromMap(map: Record<string, number>, weeks = 52): Day[] {
  const today = new Date();
  const end = new Date(today);
  end.setDate(end.getDate() + (6 - end.getDay()));
  const total = weeks * 7;
  const days: Day[] = [];
  for (let i = total - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setDate(end.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const count = map[key] ?? 0;
    days.push({ date: key, count, level: levelFor(count) });
  }
  return days;
}

/* Pinned date-range grid — from YYYY-MM-DD to YYYY-MM-DD inclusive. */
export function pinnedGridFromMap(
  map: Record<string, number>,
  from: string,
  to: string
): Day[] {
  const start = new Date(from);
  const end = new Date(to);
  const days: Day[] = [];
  const cur = new Date(start);
  while (cur <= end) {
    const key = cur.toISOString().slice(0, 10);
    const count = map[key] ?? 0;
    days.push({ date: key, count, level: levelFor(count) });
    cur.setDate(cur.getDate() + 1);
  }
  return days;
}

/* Find the best 52-week window (highest number of active days) and return it.
   Falls back to the most-recent window if data is too sparse. */
export function bestGridFromMap(map: Record<string, number>, weeks = 52): {
  grid: Day[];
  windowLabel: string;
} {
  const size = weeks * 7;
  const all = allDaysFromMap(map);

  if (all.length === 0) {
    return { grid: gridFromMap(map, weeks), windowLabel: "" };
  }

  // Fill a contiguous date range from first to last submission day
  const first = new Date(all[0].date);
  const last = new Date(all[all.length - 1].date);
  const totalDays = Math.round((last.getTime() - first.getTime()) / 86400000) + 1;

  // Build a dense array: 1 if active that day, 0 if not (for the sliding metric)
  // and a parallel count array for display
  const active: number[] = new Array(totalDays).fill(0);
  const counts: number[] = new Array(totalDays).fill(0);
  for (const { date, count } of all) {
    const idx = Math.round((new Date(date).getTime() - first.getTime()) / 86400000);
    counts[idx] = count;
    active[idx] = count > 0 ? 1 : 0;
  }

  if (totalDays <= size) {
    // All data fits — use it all, padded to size
    const grid: Day[] = [];
    for (let i = 0; i < size; i++) {
      const d = new Date(first);
      d.setDate(first.getDate() + i);
      const count = counts[i] ?? 0;
      grid.push({ date: d.toISOString().slice(0, 10), count, level: levelFor(count) });
    }
    const label = fmtWindow(first, new Date(first.getTime() + (size - 1) * 86400000));
    return { grid, windowLabel: label };
  }

  // Sliding window over active-day counts to find peak stretch
  let windowActive = active.slice(0, size).reduce((a, b) => a + b, 0);
  let bestActive = windowActive;
  let bestStart = 0;

  for (let i = size; i < totalDays; i++) {
    windowActive += active[i] - active[i - size];
    if (windowActive > bestActive) {
      bestActive = windowActive;
      bestStart = i - size + 1;
    }
  }

  const grid: Day[] = [];
  for (let i = 0; i < size; i++) {
    const d = new Date(first);
    d.setDate(first.getDate() + bestStart + i);
    const count = counts[bestStart + i] ?? 0;
    grid.push({ date: d.toISOString().slice(0, 10), count, level: levelFor(count) });
  }

  const winStart = new Date(first);
  winStart.setDate(first.getDate() + bestStart);
  const winEnd = new Date(first);
  winEnd.setDate(first.getDate() + bestStart + size - 1);

  return { grid, windowLabel: fmtWindow(winStart, winEnd) };
}

function fmtWindow(start: Date, end: Date): string {
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  return `${fmt(start)} – ${fmt(end)}`;
}
