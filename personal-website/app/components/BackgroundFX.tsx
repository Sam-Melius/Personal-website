"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type TrailPoint = {
  x: number;
  y: number;
  life: number;
};

type NodePoint = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export default function BackgroundFX() {
  const [mousePct, setMousePct] = useState({ x: 50, y: 50 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let mouseX = width / 2;
    let mouseY = height / 2;

    const trail: TrailPoint[] = [];
    const nodes: NodePoint[] = Array.from({ length: 34 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
    }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      setMousePct({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });

      trail.push({ x: mouseX, y: mouseY, life: 1 });
      if (trail.length > 26) trail.shift();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }

      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        p.life -= 0.035;

        if (p.life <= 0) continue;

        const radius = 2 + p.life * 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(192,132,252,${p.life * 0.16})`;
        ctx.fill();

        if (i > 0) {
          const prev = trail[i - 1];
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(192,132,252,${p.life * 0.24})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      for (let i = trail.length - 1; i >= 0; i--) {
        if (trail[i].life <= 0) trail.splice(i, 1);
      }

      const cursorRadius = 180;
      const connectRadius = 120;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const distToMouse = Math.hypot(a.x - mouseX, a.y - mouseY);

        if (distToMouse < cursorRadius) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(192,132,252,${0.22 * (1 - distToMouse / cursorRadius)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          const aNear = Math.hypot(a.x - mouseX, a.y - mouseY) < cursorRadius;
          const bNear = Math.hypot(b.x - mouseX, b.y - mouseY) < cursorRadius;

          if ((aNear || bNear) && dist < connectRadius) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(59,130,246,${0.18 * (1 - dist / connectRadius)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        const glow = Math.max(0, 1 - distToMouse / cursorRadius);
        const size = 1.5 + glow * 2;

        ctx.beginPath();
        ctx.arc(a.x, a.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226,232,240,${0.22 + glow * 0.55})`;
        ctx.fill();

        if (glow > 0.1) {
          ctx.beginPath();
          ctx.arc(a.x, a.y, size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(192,132,252,${glow * 0.08})`;
          ctx.fill();
        }
      }

      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(192,132,252,0.95)";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 30, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(192,132,252,0.14)";
      ctx.lineWidth = 1;
      ctx.stroke();

      frameRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        left: `${6 + ((i * 11) % 88)}%`,
        top: `${5 + ((i * 17) % 90)}%`,
        delay: `${(i % 6) * 0.7}s`,
        duration: `${6 + (i % 5)}s`,
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 tech-grid" />

      <div
        className="absolute inset-0 transition-transform duration-150"
        style={{
          background: `radial-gradient(circle at ${mousePct.x}% ${mousePct.y}%,
            rgba(192,132,252,0.18) 0%,
            rgba(59,130,246,0.10) 16%,
            transparent 34%)`,
        }}
      />

      <div className="absolute inset-0 tech-ambient" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="tech-ring tech-ring-1" />
        <div className="tech-ring tech-ring-2" />
        <div className="tech-ring tech-ring-3" />
      </div>

      <div className="absolute inset-0 scanlines opacity-20" />

      <div className="absolute inset-0">
        {particles.map((p) => (
          <span
            key={p.id}
            className="tech-particle"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="tech-line tech-line-1" />
        <div className="tech-line tech-line-2" />
        <div className="tech-line tech-line-3" />
      </div>

      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}