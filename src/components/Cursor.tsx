'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ui } from '@/data/content';

// A label bubble that trails the pointer over anything marked data-cursor="view".
export default function Cursor() {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!fine.matches) return;
    setEnabled(true);

    const pos = { x: -100, y: -100, tx: -100, ty: -100 };
    const onMove = (e: PointerEvent) => {
      pos.tx = e.clientX;
      pos.ty = e.clientY;
      const el = e.target instanceof Element ? e.target.closest('[data-cursor="view"]') : null;
      setActive(!!el);
    };
    const onLeave = () => setActive(false);
    document.addEventListener('pointerdown', onLeave);
    let raf = 0;
    const loop = () => {
      pos.x += (pos.tx - pos.x) * 0.2;
      pos.y += (pos.ty - pos.y) * 0.2;
      if (ref.current) ref.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('pointerdown', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div ref={ref} className="pointer-events-none fixed left-0 top-0 z-[95]" aria-hidden="true">
      <div
        className="rounded-full bg-white px-3.5 py-1.5 text-[13px] text-black transition-[opacity,transform] duration-300 ease-expo"
        style={{ opacity: active ? 1 : 0, transform: `translate(-50%, -50%) scale(${active ? 1 : 0.4})` }}
      >
        {ui.view[lang]}
      </div>
    </div>
  );
}
