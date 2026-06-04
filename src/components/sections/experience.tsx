"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, ChevronDown, MapPin, Sparkles, GraduationCap } from "lucide-react";
import { Section, SectionHeading, Reveal, Pill } from "@/components/ui/primitives";
import { experience } from "@/lib/data";

export function Experience() {
  const [open, setOpen] = useState(0);

  return (
    <Section id="experience">
      <SectionHeading
        index="// 01"
        kicker="experience"
        title={
          <>
            Where I&apos;ve <span className="gradient-text">shipped to production</span>
          </>
        }
        subtitle="Impact first — what changed because I was on the team."
      />

      <div className="relative">
        {/* timeline rail */}
        <div className="absolute bottom-0 left-[18px] top-2 w-px bg-gradient-to-b from-violet via-cyan/40 to-transparent md:left-[22px]" />

        {experience.map((job, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={job.company} delay={i} className="relative mb-6 pl-12 md:pl-16">
              <span className="absolute left-2 top-3 grid h-7 w-7 place-items-center rounded-full border border-violet/40 bg-bg md:left-[10px]">
                <Briefcase className="h-3.5 w-3.5 text-violet" />
              </span>

              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="spotlight-card w-full rounded-2xl border border-white/8 bg-white/[0.02] p-5 text-left transition hover:border-white/15"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-fg">
                      {job.role}{" "}
                      <span className="text-violet">@ {job.company}</span>
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted">
                      <span className="font-mono">{job.period}</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {job.location}
                      </span>
                    </div>
                  </div>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-muted">
                    <ChevronDown className="h-5 w-5" />
                  </motion.span>
                </div>

                <p className="mt-3 text-sm text-muted">{job.summary}</p>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-4 space-y-2.5">
                        {job.highlights.map((h) => (
                          <li key={h} className="flex gap-2.5 text-sm text-fg/85">
                            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.stack.map((s) => (
                    <Pill key={s}>{s}</Pill>
                  ))}
                </div>
              </button>
            </Reveal>
          );
        })}

        {/* Education */}
        <Reveal className="relative pl-12 md:pl-16">
          <span className="absolute left-2 top-3 grid h-7 w-7 place-items-center rounded-full border border-cyan/40 bg-bg md:left-[10px]">
            <GraduationCap className="h-3.5 w-3.5 text-cyan" />
          </span>
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
            <h3 className="text-lg font-semibold text-fg">
              B.Tech <span className="text-cyan">@ NIT Allahabad</span>
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted">
              <span className="font-mono">2022 — 2026</span>
              <span className="font-mono text-emerald">CGPA 8.98 / 10</span>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
