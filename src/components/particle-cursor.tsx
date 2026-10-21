"use client";

import { useEffect } from "react";

type Paw = { x: number; y: number; life: number; angle: number };
type Spark = { x: number; y: number; vx: number; vy: number; life: number; size: number };

/** A small cat cursor companion with a click reaction and a paw-print drag trail. */
export default function ParticleCursor() {
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return;

    const canvas = document.createElement("canvas");
    canvas.className = "particle-canvas";
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) { canvas.remove(); return; }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let frame = 0;
    let hasPointer = false;
    let pointerDown = false;
    let dragging = false;
    let targetX = 0;
    let targetY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let cursorVX = 0;
    let cursorVY = 0;
    let downX = 0;
    let downY = 0;
    let lastPawX = 0;
    let lastPawY = 0;
    let reaction = 0;
    let reactionX = 0;
    let reactionY = 0;
    const paws: Paw[] = [];
    const sparks: Spark[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const pointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      hasPointer = true;
      targetX = event.clientX;
      targetY = event.clientY;
      if (!pointerDown) return;
      if (!dragging && Math.hypot(targetX - downX, targetY - downY) > 7) {
        dragging = true;
        lastPawX = downX;
        lastPawY = downY;
      }
      if (dragging && Math.hypot(targetX - lastPawX, targetY - lastPawY) > 30) {
        paws.push({ x: targetX, y: targetY, life: 1, angle: Math.atan2(targetY - lastPawY, targetX - lastPawX) - Math.PI / 2 });
        if (paws.length > 18) paws.shift();
        lastPawX = targetX;
        lastPawY = targetY;
      }
    };

    const pointerDownHandler = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      hasPointer = true;
      pointerDown = true;
      dragging = false;
      downX = targetX = event.clientX;
      downY = targetY = event.clientY;
      if (!cursorX && !cursorY) { cursorX = targetX; cursorY = targetY; }
    };

    const pointerUpHandler = (event: PointerEvent) => {
      if (!pointerDown || event.pointerType !== "mouse") return;
      pointerDown = false;
      targetX = event.clientX;
      targetY = event.clientY;
      if (!dragging) {
        reaction = 1;
        reactionX = targetX;
        reactionY = targetY;
        for (let i = 0; i < 9; i++) {
          const angle = (Math.PI * 2 * i) / 9;
          const speed = 1 + Math.random() * 1.1;
          sparks.push({ x: targetX, y: targetY, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1, size: 2 + Math.random() * 2 });
        }
      } else {
        paws.push({ x: targetX, y: targetY, life: .9, angle: 0 });
      }
      dragging = false;
    };

    const pointerCancelHandler = () => { pointerDown = false; dragging = false; };

    const drawPaw = (paw: Paw) => {
      const alpha = paw.life * .55;
      ctx.save();
      ctx.translate(paw.x, paw.y);
      ctx.rotate(paw.angle);
      ctx.fillStyle = `rgba(73, 105, 87, ${alpha})`;
      ctx.beginPath();
      ctx.ellipse(0, 2, 3.2, 2.7, 0, 0, Math.PI * 2);
      ctx.fill();
      for (const [x, y] of [[-4, -2], [-1.4, -4], [1.5, -4], [4, -2]]) {
        ctx.beginPath();
        ctx.arc(x, y, 1.35, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const drawCat = (x: number, y: number, happy: boolean, draggingNow: boolean, lean: number, bob: number) => {
      ctx.save();
      ctx.translate(x + 20, y + 22 + bob);
      ctx.rotate(lean + (draggingNow ? -.09 : 0));

      // Ears and head
      ctx.beginPath();
      ctx.moveTo(-10, -5); ctx.lineTo(-11, -14); ctx.lineTo(-4, -10);
      ctx.lineTo(4, -10); ctx.lineTo(11, -14); ctx.lineTo(10, -4);
      ctx.quadraticCurveTo(12, 9, 0, 10);
      ctx.quadraticCurveTo(-12, 9, -10, -5);
      ctx.closePath();
      ctx.fillStyle = "#f5f0e7";
      ctx.strokeStyle = "#34332e";
      ctx.lineWidth = 1.25;
      ctx.fill(); ctx.stroke();

      // Warm inner ears
      ctx.fillStyle = "#d9947f";
      ctx.beginPath(); ctx.moveTo(-9, -7); ctx.lineTo(-9.5, -11.5); ctx.lineTo(-6, -9.5); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(9, -7); ctx.lineTo(9.5, -11.5); ctx.lineTo(6, -9.5); ctx.closePath(); ctx.fill();

      ctx.strokeStyle = "#34332e";
      ctx.lineWidth = 1.25;
      if (happy) {
        for (const eyeX of [-4, 4]) {
          ctx.beginPath(); ctx.arc(eyeX, -1, 1.5, Math.PI, 0); ctx.stroke();
        }
        ctx.beginPath(); ctx.moveTo(-2, 4); ctx.quadraticCurveTo(0, 7, 2, 4); ctx.stroke();
      } else {
        ctx.fillStyle = "#34332e";
        ctx.beginPath(); ctx.ellipse(-4, -1, 1.1, draggingNow ? 2 : 1.7, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(4, -1, 1.1, draggingNow ? 2 : 1.7, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#c96b59";
        ctx.beginPath(); ctx.moveTo(-1.2, 3); ctx.lineTo(1.2, 3); ctx.lineTo(0, 4.4); ctx.closePath(); ctx.fill();
        ctx.beginPath(); ctx.moveTo(0, 4.3); ctx.quadraticCurveTo(-2, 6.4, -3, 5); ctx.moveTo(0, 4.3); ctx.quadraticCurveTo(2, 6.4, 3, 5); ctx.stroke();
      }
      // Whiskers
      ctx.strokeStyle = "rgba(52,51,46,.7)";
      ctx.lineWidth = .65;
      for (const side of [-1, 1]) {
        ctx.beginPath(); ctx.moveTo(side * 5, 3); ctx.lineTo(side * 11, 1); ctx.moveTo(side * 5, 5); ctx.lineTo(side * 10, 6); ctx.stroke();
      }
      ctx.restore();
    };

    const drawClickSparks = () => {
      for (let i = sparks.length - 1; i >= 0; i--) {
        const spark = sparks[i];
        spark.x += spark.vx; spark.y += spark.vy; spark.vx *= .97; spark.vy *= .97; spark.life -= .035;
        if (spark.life <= 0) { sparks.splice(i, 1); continue; }
        const size = spark.size * spark.life;
        ctx.strokeStyle = `rgba(201, 107, 89, ${spark.life * .8})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(spark.x - size, spark.y); ctx.lineTo(spark.x + size, spark.y);
        ctx.moveTo(spark.x, spark.y - size); ctx.lineTo(spark.x, spark.y + size);
        ctx.stroke();
      }
      if (reaction > 0) {
        ctx.beginPath();
        ctx.arc(reactionX, reactionY, 5 + (1 - reaction) * 20, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(201, 107, 89, ${reaction * .45})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        reaction = Math.max(0, reaction - .045);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = paws.length - 1; i >= 0; i--) {
        paws[i].life -= .012;
        if (paws[i].life <= 0) { paws.splice(i, 1); continue; }
        drawPaw(paws[i]);
      }

      if (hasPointer) {
        const dx = targetX - cursorX;
        const dy = targetY - cursorY;
        if (reduceMotion.matches) {
          cursorX = targetX;
          cursorY = targetY;
          cursorVX = 0;
          cursorVY = 0;
        } else {
          // A damped spring gives the companion a soft, arcing catch-up instead of a rigid lock-on.
          cursorVX = Math.max(-28, Math.min(28, (cursorVX + dx * .075) * .78));
          cursorVY = Math.max(-28, Math.min(28, (cursorVY + dy * .075) * .78));
          cursorX += cursorVX;
          cursorY += cursorVY;
        }
        const lean = reduceMotion.matches ? 0 : Math.max(-.2, Math.min(.2, (cursorVX - cursorVY) * .007));
        const bob = reduceMotion.matches ? 0 : Math.sin(performance.now() * .004) * .55;
        drawCat(cursorX, cursorY, reaction > .12, pointerDown && dragging, lean, bob);
      }
      drawClickSparks();
      frame = window.requestAnimationFrame(draw);
    };

    resize();
    frame = window.requestAnimationFrame(draw);
    window.addEventListener("pointermove", pointerMove, { passive: true });
    window.addEventListener("pointerdown", pointerDownHandler, { passive: true });
    window.addEventListener("pointerup", pointerUpHandler, { passive: true });
    window.addEventListener("pointercancel", pointerCancelHandler, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("pointerdown", pointerDownHandler);
      window.removeEventListener("pointerup", pointerUpHandler);
      window.removeEventListener("pointercancel", pointerCancelHandler);
      window.removeEventListener("resize", resize);
      canvas.remove();
    };
  }, []);
  return null;
}
