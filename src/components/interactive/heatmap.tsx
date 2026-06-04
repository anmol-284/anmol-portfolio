"use client";

import { useEffect, useMemo, useState } from "react";
import { generateGrid, gridFromMap, bestGridFromMap, pinnedGridFromMap, type Day } from "@/lib/heatmap";

type Accent = "violet" | "cyan" | "emerald" | "amber";

const palettes: Record<Accent, string[]> = {
  violet: ["#15171f", "#3b2d6b", "#5b3fb0", "#7c5cff", "#a78bfa"],
  cyan:   ["#15171f", "#114b57", "#117a8c", "#22d3ee", "#67e8f9"],
  emerald:["#15171f", "#14523c", "#1a7a52", "#34d399", "#6ee7b7"],
  amber:  ["#15171f", "#5c451a", "#9a6f17", "#fbbf24", "#fcd34d"],
};

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function Heatmap({
  seed,
  accent = "violet",
  endpoint,
  label,
  best = false,
  from,
  to,
}: {
  seed: string;
  accent?: Accent;
  endpoint?: string;
  label?: string;
  /** Show the best 52-week window instead of the most recent one. */
  best?: boolean;
  /** Pin to an exact date range (YYYY-MM-DD). Overrides `best`. */
  from?: string;
  to?: string;
}) {
  const [mounted, setMounted]         = useState(false);
  const [days, setDays]               = useState<Day[]>([]);
  const [live, setLive]               = useState(false);
  const [windowLabel, setWindowLabel] = useState(
    from && to ? `${fmt(from)} – ${fmt(to)}` : ""
  );

  const fallback = useMemo(() => generateGrid(seed), [seed]);

  useEffect(() => {
    setMounted(true);
    setDays(fallback);
    if (!endpoint) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(endpoint);
        if (!res.ok) return;
        const json = await res.json();
        if (!cancelled && json.ok && json.map) {
          if (from && to) {
            setDays(pinnedGridFromMap(json.map, from, to));
            setWindowLabel(`${fmt(from)} – ${fmt(to)}`);
          } else if (best) {
            const { grid, windowLabel: wl } = bestGridFromMap(json.map);
            setDays(grid);
            setWindowLabel(wl);
          } else {
            setDays(gridFromMap(json.map));
          }
          setLive(true);
        }
      } catch {
        /* keep fallback */
      }
    })();
    return () => { cancelled = true; };
  }, [endpoint, fallback, best, from, to]);

  const weeks = useMemo(() => {
    const cols: Day[][] = [];
    for (let i = 0; i < days.length; i += 7) cols.push(days.slice(i, i + 7));
    return cols;
  }, [days]);

  const totalActive = days.filter((d) => d.level > 0).length;
  const totalSubs   = days.reduce((s, d) => s + d.count, 0);
  const palette     = palettes[accent];

  if (!mounted) {
    return <div className="h-[120px] w-full animate-pulse rounded-lg bg-white/[0.03]" />;
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs text-muted">
        <span className="font-mono flex items-center gap-1.5">
          {label}
          {live && <span className="text-emerald">· live</span>}
          {best && live && <span className="text-violet">· best window</span>}
        </span>
        <span className="font-mono">
          {totalSubs} submissions · {totalActive} days
        </span>
      </div>

      <div className="overflow-x-auto pb-1">
        <div className="flex gap-[3px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((d) => (
                <div
                  key={d.date}
                  title={`${d.date}: ${d.count} submission${d.count === 1 ? "" : "s"}`}
                  className="h-[11px] w-[11px] rounded-[2px] transition-transform hover:scale-125"
                  style={{ backgroundColor: palette[d.level] }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between text-[10px] text-muted">
        {windowLabel ? (
          <span className="font-mono text-violet/80">{windowLabel}</span>
        ) : (
          <span />
        )}
        <div className="flex items-center gap-1">
          <span>less</span>
          {palette.map((c, i) => (
            <span key={i} className="h-[10px] w-[10px] rounded-[2px]" style={{ backgroundColor: c }} />
          ))}
          <span>more</span>
        </div>
      </div>
    </div>
  );
}
