'use client';

import React, { useEffect, useRef } from 'react';

export default function HudBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      pulseSpeed: number;
    }

    const particleColors = [
      '0, 242, 255',    // Neon Cyan
      '65, 105, 225',   // Electric Blue
      '138, 43, 226',   // Deep Violet
      '16, 185, 129',   // Emerald
    ];

    // Responsive particle count
    const particleCount = Math.min(Math.floor((width * height) / 20000), 65);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.8 + 0.8,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        alpha: Math.random() * 0.5 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.008,
      });
    }

    let mouseX = -2000;
    let mouseY = -2000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw and update animated particle constellation
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Smooth boundary bounce
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Pulse alpha
        p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.005;
        const currentAlpha = Math.max(0.15, Math.min(0.85, p.alpha));

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${currentAlpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${p.color}, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset for performance

        // Connect nearby particles with glowing cyber filaments
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const lineAlpha = (1 - dist / 130) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 242, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Gentle interactive mouse magnetic aura
        const mdx = p.x - mouseX;
        const mdy = p.y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 160) {
          const mAlpha = (1 - mdist / 160) * 0.35;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(0, 242, 255, ${mAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Deep Rich Cosmic Base */}
      <div className="absolute inset-0 bg-[#070A12]" />

      {/* Floating Ambient Glowing Nebulae (Slow Organic Breathing Orbs) */}
      <div className="absolute top-[-10%] left-[15%] w-[650px] h-[650px] rounded-full bg-cyan-500/12 blur-[140px] animate-float-1" />
      <div className="absolute top-[40%] right-[-10%] w-[700px] h-[700px] rounded-full bg-violet-600/12 blur-[160px] animate-float-2" />
      <div className="absolute bottom-[-15%] left-[20%] w-[750px] h-[750px] rounded-full bg-blue-600/12 blur-[150px] animate-float-3" />
      <div className="absolute top-[70%] right-[30%] w-[500px] h-[500px] rounded-full bg-emerald-500/8 blur-[140px] animate-float-1" />

      {/* Interactive Constellation / Neural Starfield Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-70"
      />

      {/* Faint Subtle Scanline Pulse */}
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent animate-scanline" />
    </div>
  );
}
