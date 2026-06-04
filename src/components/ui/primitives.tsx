"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/* Scroll-triggered reveal */
const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "span" | "li" | "section";
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      variants={revealVariants}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}

/* Mono eyebrow label like  // 01 · about */
export function Kicker({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2 font-mono text-xs text-cyan">
      <span className="text-muted">{index}</span>
      <span className="h-px w-8 bg-gradient-to-r from-cyan to-transparent" />
      <span className="uppercase tracking-[0.2em]">{children}</span>
    </div>
  );
}

export function SectionHeading({
  index,
  kicker,
  title,
  subtitle,
}: {
  index: string;
  kicker: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <Kicker index={index}>{kicker}</Kicker>
      <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base text-muted sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}

export function Pill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-fg/80",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Section({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("relative mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-28", className)}>
      {children}
    </section>
  );
}
