"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 280, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 280, damping: 30, mass: 0.5 });

  useEffect(() => {
    // Only enable on devices with a fine pointer (desktop mouse)
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const el = e.target as HTMLElement;
      setHovering(
        !!el.closest("a, button, [role='button'], input, textarea, [data-cursor='hover']")
      );
    };
    const leave = () => setHidden(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.body.classList.remove("custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[120] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan"
        style={{ x, y, opacity: hidden ? 0 : 1 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[120] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet/70"
        style={{ x: ringX, y: ringY, opacity: hidden ? 0 : 1 }}
        animate={{
          width: hovering ? 48 : 28,
          height: hovering ? 48 : 28,
          backgroundColor: hovering ? "rgba(139,92,246,0.12)" : "rgba(139,92,246,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </>
  );
}
