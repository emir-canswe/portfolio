'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  size: number;
  accent: boolean;
}

// "EC" drawn in dots. Dots assemble on mount, scatter from the pointer and spring home.
export default function ParticleMonogram({ text = 'EC', className }: { text?: string; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let w = 0;
    let h = 0;
    const pointer = { x: -9999, y: -9999, active: false };
    let raf = 0;
    let visible = true;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      // Integer sizes: the pixel-sampling index below assumes whole-pixel rows.
      w = Math.round(rect.width);
      h = Math.round(rect.height);
      if (!w || !h) return;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Rasterise the text offscreen, then sample it on a grid.
      const off = document.createElement('canvas');
      off.width = w;
      off.height = h;
      const o = off.getContext('2d');
      if (!o) return;
      const family = getComputedStyle(document.body).fontFamily;
      let size = h * 0.95;
      o.font = `600 ${size}px ${family}`;
      const measured = o.measureText(text).width;
      if (measured > w * 0.92) size *= (w * 0.92) / measured;
      o.font = `600 ${size}px ${family}`;
      o.textAlign = 'center';
      o.textBaseline = 'middle';
      o.fillStyle = '#fff';
      o.fillText(text, w / 2, h / 2 + size * 0.04);

      const data = o.getImageData(0, 0, w, h).data;
      const gap = Math.max(4, Math.round(Math.min(w, h) / 70));
      const next: Particle[] = [];
      let seed = 1;
      const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
      for (let y = 0; y < h; y += gap) {
        for (let x = 0; x < w; x += gap) {
          if (data[(Math.floor(y) * w + Math.floor(x)) * 4 + 3] > 128) {
            const prev = particles[next.length];
            next.push({
              x: prev ? prev.x : rand() * w,
              y: prev ? prev.y : rand() * h,
              vx: 0,
              vy: 0,
              tx: x,
              ty: y,
              size: gap * (0.32 + rand() * 0.28),
              accent: rand() < 0.035,
            });
          }
        }
      }
      particles = next;
      if (reduced) particles.forEach((p) => ((p.x = p.tx), (p.y = p.ty)));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const radius = Math.min(w, h) * 0.22;
      for (const p of particles) {
        if (!reduced) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (pointer.active && dist < radius && dist > 0.01) {
            const force = (1 - dist / radius) * 6;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
          p.vx += (p.tx - p.x) * 0.045;
          p.vy += (p.ty - p.y) * 0.045;
          p.vx *= 0.82;
          p.vy *= 0.82;
          p.x += p.vx;
          p.y += p.vy;
        }
        const speed = Math.min(1, Math.hypot(p.vx, p.vy) / 8);
        ctx.fillStyle = p.accent ? '#ff5a36' : `rgba(255,255,255,${0.55 + speed * 0.45})`;
        const s = p.size * (1 + speed * 0.8);
        ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
      }
    };

    const loop = () => {
      if (visible) draw();
      raf = requestAnimationFrame(loop);
    };

    const toLocal = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = pointer.y = -9999;
    };
    const onUp = (e: PointerEvent) => e.pointerType !== 'mouse' && onLeave();

    const ro = new ResizeObserver(build);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);
    canvas.addEventListener('pointermove', toLocal);
    canvas.addEventListener('pointerdown', toLocal);
    canvas.addEventListener('pointerleave', onLeave);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onLeave);

    document.fonts?.ready.then(build).catch(build);
    build();
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener('pointermove', toLocal);
      canvas.removeEventListener('pointerdown', toLocal);
      canvas.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('pointercancel', onLeave);
      canvas.removeEventListener('pointerup', onUp);
    };
  }, [text]);

  return <canvas ref={canvasRef} className={className} style={{ touchAction: 'pan-y' }} aria-hidden="true" />;
}
