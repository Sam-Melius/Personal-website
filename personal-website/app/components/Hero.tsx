"use client";

import { useEffect, useState } from "react";
import { personal } from "../data/content";

const lines = [
  "> initializing portfolio...",
  "> loading projects... done",
  "> status: available for hire",
];

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      if (i < lines.length) {
        const nextLine = lines[i];
        if (typeof nextLine === "string") {
          setVisibleLines((prev) => [...prev, nextLine]);
        }
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setReady(true), 300);
      }
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen lg:mx-24 px-6 md:px-10 pt-20 flex items-center">
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="hero-hud w-full max-w-3xl">
          <div className="hero-hud-corner hero-hud-corner-tl" />
          <div className="hero-hud-corner hero-hud-corner-tr" />
          <div className="hero-hud-corner hero-hud-corner-bl" />
          <div className="hero-hud-corner hero-hud-corner-br" />

          <div className="mb-10 font-mono text-xs text-[var(--text-dim)] space-y-1 min-h-[64px]">
            {visibleLines.map((line, i) => {
              if (typeof line !== "string") return null;
              const [first, ...rest] = line.split(" ");

              return (
                <p key={i} style={{ animation: "fadeUp 0.4s ease forwards" }}>
                  <span className="text-[var(--accent)]">{first}</span>{" "}
                  {rest.join(" ")}
                </p>
              );
            })}
          </div>

          <div
            className={`transition-all duration-700 ${
              ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6 text-[var(--text)]">
              {personal.name}
              <br />
              <span className="text-[var(--accent)] glow text-4xl md:text-5xl font-normal">
                {personal.title}
              </span>
            </h1>

            <p className="text-lg text-[var(--text-dim)] max-w-xl leading-relaxed mb-10">
              {personal.tagline}
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <a
                href="#projects"
                className="px-6 py-3 bg-[var(--accent)] text-[var(--bg)] font-mono text-sm font-bold tracking-wider hover:bg-[var(--accent-dim)] transition-colors"
              >
                view_projects()
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-[var(--border)] text-[var(--text-dim)] font-mono text-sm tracking-wider hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
              >
                get_in_touch()
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}