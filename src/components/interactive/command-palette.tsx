"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Command,
  Search,
  ArrowRight,
  FileText,
  Mail,
  Code2,
  Trophy,
  Terminal,
  CornerDownLeft,
} from "lucide-react";
import { Github, Linkedin } from "@/components/icons/brand";
import { navItems, socials, profile } from "@/lib/data";

type Item = {
  id: string;
  label: string;
  hint?: string;
  group: string;
  icon: React.ReactNode;
  run: () => void;
};

const iconFor: Record<string, React.ReactNode> = {
  github: <Github className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />,
  code: <Code2 className="h-4 w-4" />,
  trophy: <Trophy className="h-4 w-4" />,
  mail: <Mail className="h-4 w-4" />,
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const go = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const items = useMemo<Item[]>(() => {
    const nav: Item[] = navItems.map((n) => ({
      id: `nav-${n.id}`,
      label: n.label,
      hint: "Jump to section",
      group: "Navigation",
      icon: <ArrowRight className="h-4 w-4" />,
      run: () => go(n.id),
    }));
    const links: Item[] = socials.map((s) => ({
      id: `link-${s.label}`,
      label: s.label,
      hint: "Open link",
      group: "Links",
      icon: iconFor[s.icon] ?? <ArrowRight className="h-4 w-4" />,
      run: () => window.open(s.href, s.href.startsWith("mailto") ? "_self" : "_blank"),
    }));
    const actions: Item[] = [
      {
        id: "act-resume",
        label: "Download Resume",
        hint: "PDF",
        group: "Actions",
        icon: <FileText className="h-4 w-4" />,
        run: () => window.open(profile.resumeUrl, "_blank"),
      },
      {
        id: "act-copy",
        label: "Copy email address",
        hint: profile.email,
        group: "Actions",
        icon: <Mail className="h-4 w-4" />,
        run: () => navigator.clipboard?.writeText(profile.email),
      },
      {
        id: "act-egg",
        label: "Run easter egg",
        hint: "sudo make coffee",
        group: "Actions",
        icon: <Terminal className="h-4 w-4" />,
        run: () => window.dispatchEvent(new CustomEvent("easter-egg")),
      },
    ];
    return [...nav, ...links, ...actions];
  }, [go]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        i.group.toLowerCase().includes(q) ||
        i.hint?.toLowerCase().includes(q)
    );
  }, [items, query]);

  // Keyboard: open with ⌘K / Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.run();
      setOpen(false);
    }
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[130] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            role="dialog"
            aria-label="Command palette"
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            className="glass-strong relative w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl"
            onKeyDown={onListKey}
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <Search className="h-4 w-4 text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sections, links, actions…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
              />
              <kbd className="hidden items-center gap-1 rounded border border-white/15 px-1.5 py-0.5 font-mono text-[10px] text-muted sm:flex">
                ESC
              </kbd>
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-muted">
                  No matches. Try “projects” or “resume”.
                </p>
              )}
              {filtered.map((item, idx) => {
                const showGroup = item.group !== lastGroup;
                lastGroup = item.group;
                return (
                  <div key={item.id}>
                    {showGroup && (
                      <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-wider text-muted">
                        {item.group}
                      </p>
                    )}
                    <button
                      onMouseEnter={() => setActive(idx)}
                      onClick={() => {
                        item.run();
                        setOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${
                        active === idx
                          ? "bg-violet/15 text-fg"
                          : "text-fg/80 hover:bg-white/5"
                      }`}
                    >
                      <span className="text-violet">{item.icon}</span>
                      <span className="flex-1">{item.label}</span>
                      {item.hint && (
                        <span className="font-mono text-[11px] text-muted">{item.hint}</span>
                      )}
                      {active === idx && (
                        <CornerDownLeft className="h-3.5 w-3.5 text-muted" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between border-t border-white/10 px-4 py-2 font-mono text-[10px] text-muted">
              <span className="flex items-center gap-1">
                <Command className="h-3 w-3" /> command palette
              </span>
              <span>↑↓ navigate · ↵ select</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
