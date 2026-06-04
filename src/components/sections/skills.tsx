"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeading, Reveal } from "@/components/ui/primitives";
import { skillGroups } from "@/lib/data";

const colorVar: Record<string, string> = {
  violet: "#8b5cf6",
  cyan: "#22d3ee",
  emerald: "#34d399",
  amber: "#fbbf24",
  indigo: "#6366f1",
};

export function Skills() {
  const [active, setActive] = useState(0);
  const n = skillGroups.length;

  // place category nodes evenly around a circle
  const nodes = skillGroups.map((g, i) => {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    const radius = 40; // % of container
    return {
      ...g,
      x: 50 + radius * Math.cos(angle),
      y: 50 + radius * Math.sin(angle),
    };
  });

  const current = skillGroups[active];

  return (
    <Section id="skills">
      <SectionHeading
        index="// 02"
        kicker="skills"
        title={
          <>
            My <span className="gradient-text">technical galaxy</span>
          </>
        }
        subtitle="Tap a node to explore the stack. Backend-leaning, full-stack capable."
      />

      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        {/* Constellation */}
        <Reveal className="relative mx-auto aspect-square w-full max-w-md">
          {/* connecting lines */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden>
            {nodes.map((node, i) => (
              <line
                key={node.category}
                x1="50"
                y1="50"
                x2={node.x}
                y2={node.y}
                stroke={active === i ? colorVar[node.color] : "rgba(255,255,255,0.08)"}
                strokeWidth={active === i ? 0.5 : 0.3}
                className="transition-all duration-300"
              />
            ))}
          </svg>

          {/* center core */}
          <motion.div
            className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-gradient-to-br from-violet/30 to-cyan/20 text-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="font-[family-name:var(--font-display)] text-sm font-bold gradient-text">
              skills
            </span>
          </motion.div>

          {/* category nodes */}
          {nodes.map((node, i) => (
            <button
              key={node.category}
              onClick={() => setActive(i)}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              aria-label={node.category}
            >
              <motion.span
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center gap-1"
              >
                <span
                  className="grid h-12 w-12 place-items-center rounded-full border bg-bg text-xs font-bold transition-all"
                  style={{
                    borderColor: active === i ? colorVar[node.color] : "rgba(255,255,255,0.12)",
                    boxShadow: active === i ? `0 0 24px -4px ${colorVar[node.color]}` : "none",
                    color: active === i ? colorVar[node.color] : "var(--color-muted)",
                  }}
                >
                  {node.skills.length}
                </span>
                <span
                  className="whitespace-nowrap text-[10px] font-medium transition-colors"
                  style={{ color: active === i ? "var(--color-fg)" : "var(--color-muted)" }}
                >
                  {node.category}
                </span>
              </motion.span>
            </button>
          ))}
        </Reveal>

        {/* Detail panel */}
        <div className="min-h-[18rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.category}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
              className="glass-strong rounded-2xl p-6"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ background: colorVar[current.color] }}
                />
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-fg">
                  {current.category}
                </h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {current.skills.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-xl border px-3.5 py-2 font-mono text-sm"
                    style={{
                      borderColor: `${colorVar[current.color]}40`,
                      background: `${colorVar[current.color]}12`,
                      color: "var(--color-fg)",
                    }}
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
              <p className="mt-6 font-mono text-xs text-muted">
                {`// ${current.skills.length} technologies · click another node to explore`}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-4 flex flex-wrap gap-2">
            {skillGroups.map((g, i) => (
              <button
                key={g.category}
                onClick={() => setActive(i)}
                className={`rounded-full px-3 py-1 font-mono text-xs transition ${
                  active === i ? "text-fg" : "text-muted hover:text-fg"
                }`}
                style={{
                  background: active === i ? `${colorVar[g.color]}18` : "transparent",
                  border: `1px solid ${active === i ? colorVar[g.color] + "55" : "rgba(255,255,255,0.08)"}`,
                }}
              >
                {g.category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
