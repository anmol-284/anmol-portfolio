"use client";

import { motion } from "framer-motion";
import { ArrowDown, FileText, Mail, Code2, Trophy, MapPin } from "lucide-react";
import { Github, Linkedin } from "@/components/icons/brand";
import { profile, socials, metrics } from "@/lib/data";
import { Particles } from "@/components/interactive/particles";
import { Aurora } from "@/components/interactive/aurora";
import { Typewriter } from "@/components/interactive/typewriter";
import { Terminal, type TermLine } from "@/components/interactive/terminal";
import { Counter } from "@/components/interactive/counter";

const socialIcon: Record<string, React.ReactNode> = {
  github: <Github className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />,
  code: <Code2 className="h-4 w-4" />,
  trophy: <Trophy className="h-4 w-4" />,
  mail: <Mail className="h-4 w-4" />,
};

const bootLines: TermLine[] = [
  { text: "whoami", kind: "cmd", delay: 300 },
  { text: "anmol_sahu — software engineer @ Leap Finance", kind: "out", delay: 500 },
  { text: "cat strengths.json", kind: "cmd", delay: 700 },
  { text: '{ "backend": "Spring Boot + PostgreSQL",', kind: "out", delay: 250 },
  { text: '  "frontend": "Next.js + React + TS",', kind: "out", delay: 250 },
  { text: '  "edge": "DSA · LeetCode Knight (1935)" }', kind: "out", delay: 250 },
  { text: "deploy --impact", kind: "cmd", delay: 600 },
  { text: "✓ API latency reduced by 60% (Elasticsearch)", kind: "ok", delay: 450 },
  { text: "✓ 2199+ problems solved across LeetCode & Codeforces", kind: "ok", delay: 350 },
  { text: "✓ ready for interview ↵", kind: "ok", delay: 350 },
];

function jump(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-28"
    >
      <Aurora />
      <Particles density={70} />
      <div className="absolute inset-0 grid-bg" aria-hidden />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left: copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald/20 bg-emerald/10 px-3 py-1 text-xs text-emerald"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
            </span>
            {profile.availability}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-mono text-sm text-cyan"
          >
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-1 font-[family-name:var(--font-display)] text-5xl font-bold leading-[1.05] sm:text-6xl md:text-7xl"
          >
            <span className="gradient-text">{profile.name}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-3 flex items-center gap-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-fg/90 sm:text-3xl"
          >
            <span className="text-muted">&lt;</span>
            <Typewriter words={profile.roles} className="text-fg" />
            <span className="text-muted">/&gt;</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet to-indigo px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgba(139,92,246,0.6)] transition hover:scale-[1.03]"
            >
              <FileText className="h-4 w-4" /> View Resume
            </a>
            <button
              onClick={() => jump("coding")}
              className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-fg transition hover:border-cyan/40 hover:bg-white/[0.06]"
            >
              <Trophy className="h-4 w-4" /> Coding Profile
            </button>
            <button
              onClick={() => jump("contact")}
              className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-fg transition hover:border-emerald/40 hover:bg-white/[0.06]"
            >
              <Mail className="h-4 w-4" /> Contact Me
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 flex items-center gap-4"
          >
            <div className="flex items-center gap-1.5 text-xs text-muted">
              <MapPin className="h-3.5 w-3.5" /> {profile.location}
            </div>
            <span className="h-4 w-px bg-white/10" />
            <div className="text-xs text-muted">
              🎓 NIT Allahabad
            </div>
            <span className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-muted transition hover:-translate-y-0.5 hover:border-violet/40 hover:text-fg"
                >
                  {socialIcon[s.icon]}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="float"
        >
          <Terminal lines={bootLines} />
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="glass rounded-xl p-3 text-center"
              >
                <div className="font-[family-name:var(--font-display)] text-xl font-bold text-fg">
                  <Counter value={m.value} suffix={m.suffix} decimals={"decimals" in m ? (m as { decimals: number }).decimals : 0} />
                </div>
                <div className="mt-0.5 text-[10px] leading-tight text-muted">{m.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => jump("experience")}
        aria-label="Scroll to experience"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="flex flex-col items-center gap-1 text-xs"
        >
          scroll
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.button>
    </section>
  );
}
