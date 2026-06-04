"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Coffee } from "lucide-react";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export function EasterEgg() {
  const [show, setShow] = useState(false);
  const [konami, setKonami] = useState(false);

  useEffect(() => {
    let buf: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      buf = [...buf, e.key].slice(-KONAMI.length);
      if (KONAMI.every((k, i) => k.toLowerCase() === (buf[i] ?? "").toLowerCase())) {
        setKonami(true);
        setShow(true);
        setTimeout(() => setShow(false), 4500);
      }
    };
    const onEgg = () => {
      setKonami(false);
      setShow(true);
      setTimeout(() => setShow(false), 3500);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("easter-egg", onEgg);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("easter-egg", onEgg);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <>
          {konami && <Confetti />}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.9 }}
            className="glass-strong fixed bottom-6 left-1/2 z-[140] flex -translate-x-1/2 items-center gap-3 rounded-2xl px-5 py-3 font-mono text-sm shadow-2xl"
          >
            <Coffee className="h-5 w-5 text-amber" />
            {konami ? (
              <span>
                <span className="text-emerald">Konami unlocked!</span> You found the dev easter egg ☕
              </span>
            ) : (
              <span>
                <span className="text-violet">$ sudo make coffee</span> → brewing... ✓
              </span>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Confetti() {
  const pieces = Array.from({ length: 40 });
  const colors = ["#8b5cf6", "#22d3ee", "#34d399", "#fbbf24"];
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[139] overflow-hidden">
      {pieces.map((_, i) => {
        const x = (i / pieces.length) * 100;
        const color = colors[i % colors.length];
        const delay = (i % 10) * 0.05;
        return (
          <motion.span
            key={i}
            initial={{ y: -20, x: `${x}vw`, opacity: 1, rotate: 0 }}
            animate={{ y: "100vh", rotate: 360 }}
            transition={{ duration: 2.4 + (i % 5) * 0.3, delay, ease: "easeIn" }}
            className="absolute top-0 h-2 w-2 rounded-[2px]"
            style={{ backgroundColor: color }}
          />
        );
      })}
    </div>
  );
}
