"use client";
import { useEffect, useRef } from "react";
import { projects } from "../data/content";

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }); },
      { threshold: 0.1 }
    );
    const reveals = sectionRef.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="reveal flex items-center gap-4 mb-16">
          <span className="font-mono text-[var(--accent)] text-xs tracking-widest">02.</span>
          <h2 className="font-display text-2xl md:text-3xl text-[var(--text)] tracking-tight">selected_projects</h2>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>
        <div className="grid gap-6">
          {projects.map((project, i) => (
            <div key={project.id} className="reveal group relative border border-[var(--border)] bg-[var(--surface)] p-8 hover:border-[var(--accent)] transition-all duration-300" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="absolute top-0 left-0 w-3 h-3 bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-[10px] text-[var(--text-dim)] tracking-widest">{project.year}</span>
                    <div className="w-1 h-1 rounded-full bg-[var(--border)]" />
                    <h3 className="font-display text-xl text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">{project.title}</h3>
                  </div>
                  <p className="font-sans text-[var(--text-dim)] text-sm leading-relaxed max-w-2xl mb-5">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[10px] tracking-wider px-2 py-1 border border-[var(--border)] text-[var(--text-dim)] group-hover:border-[var(--accent)]/30 transition-colors">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 md:flex-col items-start">
                  {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-[var(--accent)] border border-[var(--accent)]/30 px-3 py-2 hover:bg-[var(--accent)]/10 transition-colors whitespace-nowrap">live →</a>}
                  {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-[var(--text-dim)] border border-[var(--border)] px-3 py-2 hover:text-[var(--text)] hover:border-[var(--text-dim)] transition-colors whitespace-nowrap">github →</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
