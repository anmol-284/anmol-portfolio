"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check, AlertCircle, Loader2 } from "lucide-react";
import { Section, SectionHeading, Reveal } from "@/components/ui/primitives";
import { profile, CONTACT_FORM_KEY } from "@/lib/data";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const mailtoFallback = () => {
    const subject = encodeURIComponent(`Portfolio — message from ${form.name || "a recruiter"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!CONTACT_FORM_KEY) {
      mailtoFallback();
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: CONTACT_FORM_KEY,
          subject: `Portfolio — message from ${form.name}`,
          from_name: "Portfolio Contact Form",
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section id="contact">
      <SectionHeading
        index="// 04"
        kicker="contact"
        title={
          <>
            Let&apos;s build something <span className="gradient-text">worth shipping</span>
          </>
        }
        subtitle="Drop a message — I'll reply within 24 hours."
      />

      <Reveal className="mx-auto max-w-lg">
        <form onSubmit={submit} className="glass-strong space-y-4 rounded-2xl p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Name">
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Jane Recruiter"
                className="input"
              />
            </Field>
            <Field label="Email">
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="jane@company.com"
                className="input"
              />
            </Field>
          </div>
          <Field label="Message">
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Hi Anmol, we're hiring for…"
              className="input resize-none"
            />
          </Field>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={status === "sending"}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan to-emerald px-4 py-3 text-sm font-semibold text-bg transition hover:scale-[1.01] disabled:opacity-70"
          >
            {status === "sending" ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
            ) : status === "sent" ? (
              <><Check className="h-4 w-4" /> {CONTACT_FORM_KEY ? "Message sent!" : "Opening mail client…"}</>
            ) : status === "error" ? (
              <><AlertCircle className="h-4 w-4" /> Failed — try again</>
            ) : (
              <><Send className="h-4 w-4" /> Send Message</>
            )}
          </motion.button>

          <p className="text-center font-mono text-[11px] text-muted">
            {status === "error"
              ? `// email ${profile.email} directly`
              : `// delivered to ${profile.email}`}
          </p>
        </form>
      </Reveal>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.02);
          padding: 0.7rem 0.9rem;
          font-size: 0.875rem;
          color: var(--color-fg);
          outline: none;
          transition: border-color 0.2s;
        }
        :global(.input:focus) {
          border-color: rgba(139, 92, 246, 0.5);
        }
        :global(.input::placeholder) {
          color: var(--color-muted);
        }
      `}</style>
    </Section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-xs text-muted">{label}</span>
      {children}
    </label>
  );
}
