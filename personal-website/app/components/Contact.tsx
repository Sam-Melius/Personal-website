"use client";
import { useEffect, useRef, useState } from "react";
import { personal } from "../data/content";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }); },
      { threshold: 0.1 }
    );
    const reveals = sectionRef.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Wire up to your email service (Resend, Formspree, etc.)
    setSubmitted(true);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="reveal flex items-center gap-4 mb-16">
          <span className="font-mono text-[var(--accent)] text-xs tracking-widest">04.</span>
          <h2 className="font-display text-2xl md:text-3xl text-[var(--text)] tracking-tight">get_in_touch</h2>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>

        <div className="grid md:grid-cols-1 gap-16">
          <div className="reveal">
            <p className="font-sans text-[var(--text-dim)] leading-relaxed mb-8">{personal.bio}</p>
            <div className="space-y-3">
              <a href={`mailto:${personal.email}`} className="flex items-center gap-3 font-mono text-sm text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors group">
                <span className="text-[var(--accent)] opacity-60 group-hover:opacity-100">→</span>
                {personal.email}
              </a>
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-mono text-sm text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors group">
                <span className="text-[var(--accent)] opacity-60 group-hover:opacity-100">→</span>
                github
              </a>
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-mono text-sm text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors group">
                <span className="text-[var(--accent)] opacity-60 group-hover:opacity-100">→</span>
                linkedin
              </a>
            </div>
          </div>

          {/* <div className="reveal" style={{ transitionDelay: "150ms" }}>
            {submitted ? (
              <div className="border border-[var(--accent)]/30 bg-[var(--accent)]/5 p-8 text-center">
                <p className="font-mono text-[var(--accent)] text-sm">message_sent.success ✓</p>
                <p className="font-sans text-[var(--text-dim)] text-sm mt-2">Thanks — I&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { key: "name", label: "name", type: "text" },
                  { key: "email", label: "email", type: "email" },
                ].map(({ key, label, type }) => (
                  <div key={key}>
                    <label className="font-mono text-[10px] tracking-widest text-[var(--text-dim)] uppercase mb-1.5 block">
                      // {label}
                    </label>
                    <input
                      type={type}
                      required
                      value={form[key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      className="w-full bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] font-mono text-sm px-4 py-3 focus:outline-none focus:border-[var(--accent)] transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="font-mono text-[10px] tracking-widest text-[var(--text-dim)] uppercase mb-1.5 block">// message</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] font-mono text-sm px-4 py-3 focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                  />
                </div>
                <button type="submit" className="w-full py-3 bg-[var(--accent)] text-[var(--bg)] font-mono text-sm font-bold tracking-wider hover:bg-[var(--accent-dim)] transition-colors">
                  send_message()
                </button>
              </form>
            )}
          </div> */}
        </div>
      </div>
    </section>
  );
}
