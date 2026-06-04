"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export type TermLine = {
  text: string;
  kind?: "cmd" | "out" | "ok" | "muted";
  delay?: number;
};

const colorFor: Record<NonNullable<TermLine["kind"]>, string> = {
  cmd: "text-fg",
  out: "text-fg/70",
  ok: "text-emerald",
  muted: "text-muted",
};

export function Terminal({
  lines,
  title = "anmol@runtime: ~/portfolio",
}: {
  lines: TermLine[];
  title?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (shown >= lines.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), lines[shown]?.delay ?? 380);
    return () => clearTimeout(t);
  }, [inView, shown, lines]);

  return (
    <div
      ref={ref}
      className="glass-strong w-full overflow-hidden rounded-xl border border-white/10 font-mono text-[13px] shadow-2xl"
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate text-xs text-muted">{title}</span>
      </div>
      <div className="space-y-1.5 p-4 leading-relaxed">
        {lines.slice(0, shown).map((l, i) => (
          <div key={i} className={colorFor[l.kind ?? "out"]}>
            {l.kind === "cmd" && <span className="text-violet">$ </span>}
            {l.text}
          </div>
        ))}
        {shown < lines.length && <span className="caret">&nbsp;</span>}
      </div>
    </div>
  );
}
