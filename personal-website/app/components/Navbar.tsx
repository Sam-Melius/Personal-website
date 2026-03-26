"use client";
import { useState, useEffect } from "react";
import { personal } from "../data/content";

const links = [
  { label: "projects", href: "#projects" },
  { label: "experience", href: "#experience" },
  { label: "contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#080c10]/90 backdrop-blur-md border-b border-[#1c2530]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          className="font-display text-sm text-[var(--accent)] tracking-widest uppercase hover:glow transition-all"
        >
          {personal.name.split(" ")[0].toLowerCase()}
          <span className="text-[var(--text-dim)]">
            .{personal.name.split(" ")[1]?.toLowerCase() ?? "dev"}
          </span>
        </a>

        <div className="flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors tracking-wider"
            >
              <span className="text-[var(--accent)] opacity-60">./</span>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
