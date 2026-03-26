"use client";
import { useEffect, useRef } from "react";
import { experience, skills } from "../data/content";

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const section = sectionRef.current;
  if (!section) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          section.querySelectorAll(".reveal").forEach((el) => {
            el.classList.add("visible");
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(section);

  return () => observer.disconnect();
}, []);

  return (
    <section id="experience" ref={sectionRef} className="py-32 px-6 bg-[var(--surface)]/40">
      <div className="max-w-5xl mx-auto">
        <div className="reveal flex items-center gap-4 mb-16">
          <span className="font-mono text-[var(--accent)] text-xs tracking-widest">03.</span>
          <h2 className="font-display text-2xl md:text-3xl text-[var(--text)] tracking-tight">experience</h2>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="reveal md:col-span-2 space-y-0">
            {experience.map((job, i) => (
              <div key={i} className="relative pl-6 pb-12 last:pb-0" style={{ transitionDelay: `${i * 120}ms` }}>
                {/* Timeline line */}
                <div className="absolute left-0 top-2 bottom-0 w-px bg-[var(--border)]" />
                <div className="absolute left-[-3px] top-2 w-[7px] h-[7px] rounded-full bg-[var(--accent)] shadow-[0_0_8px_rgba(0,255,157,0.5)]" />
                <div className="mb-1 flex items-center gap-3">
                  <h3 className="font-display text-lg text-[var(--text)]">{job.role}</h3>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-xs text-[var(--accent)]">{job.company}</span>
                  <span className="text-[var(--border)]">·</span>
                  <span className="font-mono text-xs text-[var(--text-dim)]">{job.period}</span>
                </div>
                <p className="font-sans text-sm text-[var(--text-dim)] leading-relaxed">{job.description}</p>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ transitionDelay: "300ms" }}>
            <h3 className="font-mono text-xs text-[var(--text-dim)] tracking-widest uppercase mb-6">// skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="font-mono text-[11px] px-3 py-1.5 border border-[var(--border)] text-[var(--text-dim)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all cursor-default">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
