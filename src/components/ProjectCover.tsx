import React, { useId } from 'react';

// Deterministic PRNG so covers render identically on server and client.
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 10000) / 10000;
  };
}

const W = 400;
const H = 500;

function Sentinel({ u }: { u: string }) {
  return (
    <>
      <defs>
        <radialGradient id={`sn-bg-${u}`} cx="50%" cy="30%" r="80%">
          <stop offset="0" stopColor="#2a0f08" />
          <stop offset="1" stopColor="#070302" />
        </radialGradient>
        <radialGradient id={`sn-mars-${u}`} cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#f0874c" />
          <stop offset="0.45" stopColor="#b8441c" />
          <stop offset="1" stopColor="#2b0c04" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#sn-bg-${u})`} />
      <ellipse cx={200} cy={318} rx={190} ry={44} fill="none" stroke="#fff" strokeOpacity={0.18} />
      <ellipse cx={200} cy={318} rx={150} ry={150} fill={`url(#sn-mars-${u})`} />
      <path d="M95 300c40-16 70 10 112-4s78-22 98 4" stroke="#3b1206" strokeOpacity={0.5} strokeWidth={10} fill="none" />
      <path d="M120 360c34 8 70-12 110-4" stroke="#3b1206" strokeOpacity={0.4} strokeWidth={6} fill="none" />
      <path d="M10 318a190 44 0 0 0 380 0" fill="none" stroke="#fff" strokeOpacity={0.45} />
      <circle cx={356} cy={290} r={4} fill="#fff" />
      <line x1={356} y1={290} x2={300} y2={70} stroke="#fff" strokeOpacity={0.3} strokeDasharray="2 5" />
      <circle cx={300} cy={70} r={2.5} fill="#fff" opacity={0.8} />
    </>
  );
}

function AcilAfet() {
  const r = rng(7);
  const nodes = Array.from({ length: 18 }).map(() => ({ x: 40 + r() * 320, y: 60 + r() * 380 }));
  const edges: [number, number][] = [];
  nodes.forEach((a, i) =>
    nodes.forEach((b, j) => {
      if (j > i && Math.hypot(a.x - b.x, a.y - b.y) < 120) edges.push([i, j]);
    }),
  );
  const hub = nodes[5];
  return (
    <>
      <rect width={W} height={H} fill="#0b0b0b" />
      {edges.map(([i, j], k) => (
        <line key={k} x1={nodes[i].x} y1={nodes[i].y} x2={nodes[j].x} y2={nodes[j].y} stroke="#ff3b2f" strokeOpacity={0.55} />
      ))}
      {[24, 48, 76].map((rad) => (
        <circle key={rad} cx={hub.x} cy={hub.y} r={rad} fill="none" stroke="#ff3b2f" strokeOpacity={0.5 - rad / 200} />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={i === 5 ? 7 : 3.5} fill={i === 5 ? '#ff3b2f' : '#fff'} />
      ))}
    </>
  );
}

function InternMeet() {
  return (
    <>
      <rect width={W} height={H} fill="#e8e5de" />
      {Array.from({ length: 6 }).map((_, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const active = i === 3;
        return (
          <g key={i} transform={`translate(${44 + col * 162} ${70 + row * 128})`}>
            <rect width={150} height={112} rx={14} fill={active ? '#2f4bff' : '#111'} />
            <circle cx={24} cy={26} r={10} fill={active ? '#fff' : '#e8e5de'} opacity={active ? 1 : 0.3} />
            <rect x={14} y={60} width={92} height={6} rx={3} fill="#fff" opacity={active ? 0.9 : 0.25} />
            <rect x={14} y={76} width={60} height={6} rx={3} fill="#fff" opacity={active ? 0.6 : 0.15} />
          </g>
        );
      })}
    </>
  );
}

function ForestEye() {
  const rings = Array.from({ length: 11 });
  return (
    <>
      <rect width={W} height={H} fill="#06120c" />
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 50} y1={0} x2={i * 50} y2={H} stroke="#fff" strokeOpacity={0.05} />
      ))}
      {Array.from({ length: 11 }).map((_, i) => (
        <line key={`h${i}`} x1={0} y1={i * 50} x2={W} y2={i * 50} stroke="#fff" strokeOpacity={0.05} />
      ))}
      {rings.map((_, i) => {
        const k = i * 16 + 14;
        return (
          <path
            key={i}
            d={`M${230 - k} ${270} C ${230 - k} ${270 - k * 1.1}, ${230 + k * 1.2} ${270 - k * 0.9}, ${230 + k} ${270} S ${230 - k * 0.7} ${270 + k * 1.15}, ${230 - k} ${270}`}
            fill="none"
            stroke="#3ddc84"
            strokeOpacity={0.75 - i * 0.055}
          />
        );
      })}
      <rect x={200} y={250} width={50} height={50} fill="#ff6a1f" opacity={0.9} />
      <circle cx={225} cy={275} r={60} fill="#ff6a1f" opacity={0.12} />
    </>
  );
}

function Elion({ u }: { u: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`el-bg-${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6dcc2" />
          <stop offset="1" stopColor="#e57c4e" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#el-bg-${u})`} />
      <circle cx={200} cy={250} r={110} fill="#fff4e6" opacity={0.85} />
      <rect y={300} width={W} height={200} fill="#c9532a" opacity={0.35} />
      {Array.from({ length: 29 }).map((_, i) => {
        const h = 10 + Math.abs(Math.sin(i * 0.7) * 50) + ((i * 13) % 17);
        return <rect key={i} x={60 + i * 10} y={400 - h / 2} width={4} height={h} rx={2} fill="#2a1208" />;
      })}
    </>
  );
}

function Deadlock() {
  const blocks = [
    [0, 0, 1, 2], [1, 0, 2, 1], [3, 0, 1, 2], [4, 0, 2, 1],
    [1, 1, 1, 2], [4, 1, 1, 2], [5, 1, 1, 3],
    [2, 3, 1, 2], [3, 3, 2, 1], [0, 3, 1, 3],
    [1, 5, 2, 1], [3, 4, 1, 2], [4, 5, 2, 1],
  ];
  const s = 52;
  const ox = (W - s * 6) / 2;
  const oy = (H - s * 6) / 2;
  return (
    <>
      <rect width={W} height={H} fill="#141414" />
      <rect x={ox - 10} y={oy - 10} width={s * 6 + 20} height={s * 6 + 20} rx={18} fill="#1d1d1d" />
      {blocks.map(([x, y, w, h], i) => (
        <rect key={i} x={ox + x * s + 3} y={oy + y * s + 3} width={w * s - 6} height={h * s - 6} rx={9} fill="#fff" opacity={0.12 + (i % 4) * 0.08} />
      ))}
      <rect x={ox + 2 * s + 3} y={oy + 2 * s + 3} width={2 * s - 6} height={s - 6} rx={9} fill="#ff4747" />
      <rect x={ox + s * 6 + 10} y={oy + 2 * s + 8} width={4} height={s - 16} fill="#ff4747" />
    </>
  );
}

function PixelPop() {
  const shapes: { c: string; cells: [number, number][] }[] = [
    { c: '#111', cells: [[1, 1], [2, 1], [3, 1], [2, 2]] },
    { c: '#ff5c8a', cells: [[5, 1], [5, 2], [6, 2], [6, 3]] },
    { c: '#2f6bff', cells: [[1, 4], [1, 5], [2, 5], [3, 5]] },
    { c: '#fff', cells: [[4, 4], [5, 4], [4, 5], [5, 5]] },
    { c: '#111', cells: [[2, 7], [3, 7], [4, 7], [5, 7]] },
    { c: '#ff5c8a', cells: [[6, 6], [6, 7], [6, 8]] },
    { c: '#2f6bff', cells: [[1, 8], [2, 8]] },
  ];
  const s = 44;
  return (
    <>
      <rect width={W} height={H} fill="#ffd23f" />
      {shapes.map((sh, i) =>
        sh.cells.map(([x, y], j) => (
          <rect key={`${i}-${j}`} x={x * s + 4} y={y * s + 30} width={s - 4} height={s - 4} rx={6} fill={sh.c} />
        )),
      )}
    </>
  );
}

function PhonePad() {
  return (
    <>
      <rect width={W} height={H} fill="#dde1e8" />
      <rect x={120} y={110} width={160} height={300} rx={28} fill="#111" />
      <rect x={132} y={124} width={136} height={272} rx={18} fill="#222" />
      <circle cx={200} cy={260} r={6} fill="#fff" opacity={0.6} />
      {[40, 70, 100].map((r) => (
        <path key={r} d={`M${200 - r * 0.7} ${100 - r * 0.2} A ${r} ${r} 0 0 1 ${200 + r * 0.7} ${100 - r * 0.2}`} fill="none" stroke="#2f4bff" strokeWidth={3} strokeLinecap="round" opacity={1 - r / 140} transform={`translate(0 ${-r * 0.4 + 30})`} />
      ))}
      <path d="M300 300 l0 64 l16 -14 l12 28 l10 -4 l-12 -28 l22 -2 z" fill="#fff" stroke="#111" strokeWidth={3} strokeLinejoin="round" />
    </>
  );
}

function CryptoStealth() {
  const r = rng(42);
  const s = 10;
  const cols = W / s;
  const rows = H / s;
  // Hidden key glyph: circle head + shaft + teeth.
  const inKey = (x: number, y: number) => {
    const cx = 15, cy = 18;
    const d = Math.hypot(x - cx, y - cy);
    if (d < 7 && d > 3.2) return true;
    if (y >= 17 && y <= 19 && x > 21 && x < 33) return true;
    if (x >= 28 && x <= 29 && y > 19 && y < 23) return true;
    if (x >= 31 && x <= 32 && y > 19 && y < 22) return true;
    return false;
  };
  const cells: React.ReactNode[] = [];
  for (let y = 4; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const v = r();
      const key = inKey(x, y - 4);
      const o = key ? 0.85 : v > 0.62 ? v * 0.22 : 0;
      if (o > 0) cells.push(<rect key={`${x}-${y}`} x={x * s} y={y * s} width={s - 1} height={s - 1} fill={key ? '#8affc1' : '#fff'} opacity={o} />);
    }
  }
  return (
    <>
      <rect width={W} height={H} fill="#000" />
      {cells}
    </>
  );
}

function ScreenBridge() {
  return (
    <>
      <rect width={W} height={H} fill="#1a1c46" />
      <rect x={30} y={250} width={160} height={104} rx={8} fill="none" stroke="#fff" strokeOpacity={0.7} strokeWidth={2} />
      <rect x={210} y={250} width={160} height={104} rx={8} fill="none" stroke="#fff" strokeOpacity={0.7} strokeWidth={2} />
      <rect x={95} y={354} width={30} height={20} fill="#fff" opacity={0.4} />
      <rect x={275} y={354} width={30} height={20} fill="#fff" opacity={0.4} />
      <path d="M90 270 Q 200 90 300 270" fill="none" stroke="#9aa8ff" strokeWidth={2} strokeDasharray="4 7" />
      <rect x={258} y={270} width={84} height={58} rx={5} fill="#9aa8ff" />
      <rect x={258} y={270} width={84} height={10} rx={3} fill="#fff" opacity={0.6} />
      <circle cx={200} cy={130} r={14} fill="#ff5a5f" />
      <circle cx={200} cy={130} r={30} fill="#ff5a5f" opacity={0.15} />
    </>
  );
}

const covers: Record<string, (props: { u: string }) => React.ReactElement> = {
  'sentinel-os': Sentinel,
  'acil-afet': AcilAfet,
  internmeet: InternMeet,
  'forest-eye': ForestEye,
  elion: Elion,
  deadlock: Deadlock,
  pixelpop: PixelPop,
  phonepad: PhonePad,
  cryptostealth: CryptoStealth,
  screenbridge: ScreenBridge,
};

export default function ProjectCover({ id, className }: { id: string; className?: string }) {
  const Art = covers[id] ?? Sentinel;
  const u = useId().replace(/:/g, '');
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <Art u={u} />
    </svg>
  );
}
