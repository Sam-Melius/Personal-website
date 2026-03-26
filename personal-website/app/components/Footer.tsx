import { personal } from "../data/content";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-xs text-[var(--text-dim)]">
          © {new Date().getFullYear()} {personal.name} — built with Next.js
        </span>
        <span className="font-mono text-xs text-[var(--text-dim)] opacity-50">
          designed & coded by hand
        </span>
      </div>
    </footer>
  );
}
