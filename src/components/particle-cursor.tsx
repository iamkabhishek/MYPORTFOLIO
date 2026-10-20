"use client";

import { useEffect } from "react";

/** Lightweight canvas particle trail. Disabled for touch and reduced-motion users. */
export default function ParticleCursor() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    if (reduceMotion.matches || !finePointer.matches) return;

    const canvas = document.createElement("canvas");
    canvas.className = "particle-canvas";
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) { canvas.remove(); return; }

    let width = 0;
    let height = 0;
    let frame = 0;
    let lastSpawn = 0;
    const particles: Array<{ x: number; y: number; vx: number; vy: number; life: number; size: number }> = [];
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth; height = window.innerHeight;
      canvas.width = width * dpr; canvas.height = height * dpr;
      canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.timeStamp - lastSpawn < 18) return;
      lastSpawn = event.timeStamp;
      particles.push({ x: event.clientX, y: event.clientY, vx: (Math.random() - .5) * .6, vy: (Math.random() - .5) * .6, life: 1, size: 1.5 + Math.random() * 2 });
      if (particles.length > 36) particles.shift();
    };
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy; p.life -= .022;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(205, 105, 88, ${p.life * .55})`; ctx.fill();
      }
      frame = window.requestAnimationFrame(draw);
    };
    resize(); frame = window.requestAnimationFrame(draw);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener("pointermove", move); window.removeEventListener("resize", resize); canvas.remove(); };
  }, []);
  return null;
}
