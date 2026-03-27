"use client";
import { useEffect, useRef } from "react";
import { projects } from "../data/content";

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );

    const reveals = sectionRef.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-32 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="reveal flex items-center gap-4 mb-16">
          <span className="font-mono text-[var(--accent)] text-xs tracking-widest">
            02.
          </span>
          <h2 className="text-2xl md:text-3xl text-[var(--text)] tracking-tight">
            selected_projects
          </h2>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>

        <div className="grid gap-8">
          {projects.map((project, i) => (
            <article
              key={project.id}
              className="reveal group hero-hud relative overflow-hidden border border-[var(--border)] bg-[var(--surface)]/70 p-4 md:p-5 hover:border-[var(--accent)]/50 transition-all duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="hero-hud-corner hero-hud-corner-tl" />
              <div className="hero-hud-corner hero-hud-corner-tr" />
              <div className="hero-hud-corner hero-hud-corner-bl" />
              <div className="hero-hud-corner hero-hud-corner-br" />

              <div className="grid md:grid-cols-[1.25fr_.95fr] gap-6 md:gap-8 items-stretch">
                <div className="relative">
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-shot group/image block relative overflow-hidden rounded-2xl border border-[var(--border)] bg-black"
                    >
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={`${project.title} preview`}
                          className="block w-full h-full min-h-[240px] md:min-h-[320px] object-cover object-top transition-transform duration-700 group-hover/image:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex min-h-[240px] md:min-h-[320px] items-center justify-center text-[var(--text-dim)] font-mono text-xs tracking-widest">
                          preview_unavailable
                        </div>
                      )}

                      <div className="project-shot-overlay" />
                      <div className="project-shot-scanlines" />
                      <div className="project-shot-glow" />

                      <div className="absolute top-4 left-4 z-10">
                        <span className="inline-flex items-center rounded-full border border-white/10 bg-black/40 px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-white/80 backdrop-blur-sm">
                          LIVE PREVIEW
                        </span>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 z-10 p-4 md:p-5">
                        <div className="flex items-end justify-between gap-4">
                          <div>
                            <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--accent)] mb-2">
                              {project.year}
                            </p>
                            <h3 className="text-lg md:text-xl text-white">
                              {project.title}
                            </h3>
                          </div>
                          <span className="font-mono text-xs text-white/85 translate-x-0 group-hover/image:translate-x-1 transition-transform">
                            open ↗
                          </span>
                        </div>
                      </div>
                    </a>
                  ) : (
                    <div className="project-shot block relative overflow-hidden rounded-2xl border border-[var(--border)] bg-black">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={`${project.title} preview`}
                          className="block w-full h-full min-h-[240px] md:min-h-[320px] object-cover object-top"
                        />
                      ) : (
                        <div className="flex min-h-[240px] md:min-h-[320px] items-center justify-center text-[var(--text-dim)] font-mono text-xs tracking-widest">
                          preview_unavailable
                        </div>
                      )}
                      <div className="project-shot-overlay" />
                      <div className="project-shot-scanlines" />
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-between py-1">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-[10px] text-[var(--text-dim)] tracking-[0.18em]">
                        {project.year}
                      </span>
                      <div className="w-1 h-1 rounded-full bg-[var(--border)]" />
                      <span className="font-mono text-[10px] text-[var(--accent)] tracking-[0.18em]">
                        FEATURED
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl text-[var(--text)] mb-4 group-hover:text-[var(--accent)] transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm md:text-[15px] leading-relaxed text-[var(--text-dim)] mb-6">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] tracking-[0.14em] px-3 py-1.5 rounded-full border border-[var(--border)] text-[var(--text-dim)] bg-white/[0.02] group-hover:border-[var(--accent)]/30 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2.5 bg-[var(--accent)] text-[var(--bg)] font-mono text-xs tracking-[0.15em] rounded-full hover:bg-[var(--accent-dim)] transition-colors"
                      >
                        visit_live_site ↗
                      </a>
                    )}

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2.5 border border-[var(--border)] text-[var(--text-dim)] font-mono text-xs tracking-[0.15em] rounded-full hover:text-[var(--text)] hover:border-[var(--text-dim)] transition-colors"
                      >
                        view_code →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}