"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Command, Menu, X } from "lucide-react";
import { navItems, profile } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navItems.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[90] flex justify-center px-4 pt-3 sm:pt-4">
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "flex w-full max-w-5xl items-center justify-between rounded-2xl px-3 py-2 transition-all duration-300 sm:px-4",
          scrolled ? "glass-strong shadow-lg" : "border border-transparent"
        )}
      >
        <button
          onClick={() => jump("home")}
          className="group flex items-center gap-2 rounded-lg px-2 py-1 font-mono text-sm font-semibold"
        >
          <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-violet to-cyan text-xs font-bold text-bg">
            {profile.initials}
          </span>
          <span className="hidden gradient-text sm:inline">anmol.dev</span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((n) => (
            <button
              key={n.id}
              onClick={() => jump(n.id)}
              className={cn(
                "relative rounded-lg px-3 py-1.5 text-sm transition-colors",
                active === n.id ? "text-fg" : "text-muted hover:text-fg"
              )}
            >
              {active === n.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 -z-10 rounded-lg bg-white/[0.06]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {n.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
            className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 font-mono text-xs text-muted transition hover:text-fg sm:flex"
            aria-label="Open command palette"
          >
            <Command className="h-3.5 w-3.5" />
            <span>K</span>
          </button>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong absolute left-4 right-4 top-[68px] grid grid-cols-2 gap-1 rounded-2xl p-3 md:hidden"
        >
          {navItems.map((n) => (
            <button
              key={n.id}
              onClick={() => jump(n.id)}
              className={cn(
                "rounded-lg px-3 py-2 text-left text-sm",
                active === n.id ? "bg-violet/15 text-fg" : "text-muted"
              )}
            >
              {n.label}
            </button>
          ))}
        </motion.div>
      )}
    </header>
  );
}
