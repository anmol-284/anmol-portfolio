"use client";

import { Code2, Activity } from "lucide-react";
import { Section, SectionHeading, Reveal } from "@/components/ui/primitives";
import { Heatmap } from "@/components/interactive/heatmap";
import { cpStats, HANDLES } from "@/lib/data";

export function Coding() {
  return (
    <Section id="coding">
      <SectionHeading
        index="// 03"
        kicker="code"
        title={
          <>
            Competitive programming, <span className="gradient-text">quantified</span>
          </>
        }
        subtitle="LeetCode Knight · Codeforces Pupil · 2199+ problems solved — with live submission activity."
      />

      <Reveal>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* LeetCode */}
          <div className="glass-strong rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-[family-name:var(--font-display)] text-lg font-bold">
                <Code2 className="h-5 w-5 text-amber" /> LeetCode
              </div>
              <span className="rounded-full border border-amber/30 bg-amber/10 px-3 py-1 font-mono text-xs text-amber">
                {cpStats.leetcode.rank}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <Stat value={String(cpStats.leetcode.rating)} label="Peak rating" />
              <Stat value={cpStats.leetcode.percentile} label="Percentile" />
              <Stat value={cpStats.leetcode.solved} label="Solved" />
            </div>
            <div className="mt-3 rounded-lg border border-amber/15 bg-amber/5 px-3 py-2 text-center font-mono text-xs text-amber">
              Best contest: {cpStats.leetcode.bestContest} · Weekly 453
            </div>
            <div className="mt-5">
              <Heatmap
                seed={`leetcode-${HANDLES.leetcode}`}
                accent="amber"
                endpoint={`/api/leetcode?u=${HANDLES.leetcode}&year=2024`}
                label="2024 activity"
                from="2024-01-01"
                to="2024-12-31"
              />
            </div>
          </div>

          {/* Codeforces */}
          <div className="glass-strong rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-[family-name:var(--font-display)] text-lg font-bold">
                <Activity className="h-5 w-5 text-cyan" /> Codeforces
              </div>
              <span className="rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 font-mono text-xs text-cyan">
                {cpStats.codeforces.rank}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <Stat value={cpStats.codeforces.solved} label="Solved" />
              <Stat value="Pupil" label="Rank" />
              <Stat value="2199+" label="Total across platforms" />
            </div>
            <div className="mt-3 rounded-lg border border-cyan/15 bg-cyan/5 px-3 py-2 text-center font-mono text-xs text-cyan">
              Consistent contest participation
            </div>
            <div className="mt-5">
              <Heatmap
                seed={`codeforces-${HANDLES.codeforces}`}
                accent="cyan"
                endpoint={`/api/codeforces?handle=${HANDLES.codeforces}`}
                label="2024 activity"
                from="2024-01-01"
                to="2024-12-31"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.02] p-3 text-center">
      <div className="font-[family-name:var(--font-display)] text-xl font-bold text-fg">{value}</div>
      <div className="mt-0.5 text-[10px] leading-tight text-muted">{label}</div>
    </div>
  );
}
