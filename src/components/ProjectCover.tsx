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
const d = (s: number) => ({ animationDelay: `${s}s` });

function Sentinel({ u }: { u: string }) {
  const orbit = 'M10 318 a190 44 0 1 0 380 0 a190 44 0 1 0 -380 0';
  const orbiter = (
    <g>
      <circle r={10} fill="#fff" opacity={0.15} />
      <circle r={4} fill="#fff" />
      <animateMotion dur="9s" repeatCount="indefinite" path={orbit} />
    </g>
  );
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
        <clipPath id={`sn-planet-${u}`}>
          <circle cx={200} cy={318} r={150} />
        </clipPath>
        <clipPath id={`sn-front-${u}`}>
          <rect x={0} y={318} width={W} height={H} />
        </clipPath>
      </defs>
      <rect width={W} height={H} fill={`url(#sn-bg-${u})`} />
      <path d="M10 318a190 44 0 0 1 380 0" fill="none" stroke="#fff" strokeOpacity={0.18} />
      {orbiter}
      <circle cx={200} cy={318} r={150} fill={`url(#sn-mars-${u})`} />
      <g clipPath={`url(#sn-planet-${u})`}>
        <g className="cv-drift">
          {[0, 200, 400].map((x) => (
            <g key={x} transform={`translate(${x} 0)`} stroke="#3b1206" fill="none">
              <path d="M0 300C50 284 150 316 200 300" strokeOpacity={0.5} strokeWidth={10} />
              <path d="M0 362C50 374 150 350 200 362" strokeOpacity={0.4} strokeWidth={6} />
              <circle cx={150} cy={240} r={9} fill="#3b1206" fillOpacity={0.35} stroke="none" />
            </g>
          ))}
        </g>
      </g>
      <path d="M10 318a190 44 0 0 0 380 0" fill="none" stroke="#fff" strokeOpacity={0.45} />
      <g clipPath={`url(#sn-front-${u})`}>{orbiter}</g>
      <line x1={300} y1={70} x2={250} y2={190} stroke="#fff" strokeOpacity={0.5} strokeDasharray="3 8" className="cv-dash" />
      <circle cx={300} cy={70} r={3} fill="#fff" className="cv-blink" />
    </>
  );
}

function AcilAfet() {
  const r = rng(7);
  const nodes = Array.from({ length: 18 }).map(() => ({ x: 40 + r() * 320, y: 60 + r() * 380 }));
  const near = (a: (typeof nodes)[0], b: (typeof nodes)[0]) => Math.hypot(a.x - b.x, a.y - b.y) < 120;
  const edges: [number, number][] = [];
  nodes.forEach((a, i) => nodes.forEach((b, j) => j > i && near(a, b) && edges.push([i, j])));
  const HUB = 5;
  const hub = nodes[HUB];
  const dist = (i: number) => Math.hypot(nodes[i].x - hub.x, nodes[i].y - hub.y);

  // A message hops greedily from the farthest node toward the hub.
  let cur = nodes.reduce((best, _, i) => (dist(i) > dist(best) ? i : best), 0);
  const hops = [cur];
  while (cur !== HUB && hops.length < 12) {
    const from = cur;
    const options = nodes.map((_, i) => i).filter((i) => i !== from && near(nodes[from], nodes[i]) && dist(i) < dist(from));
    if (!options.length) break;
    cur = options.reduce((a, b) => (dist(a) < dist(b) ? a : b));
    hops.push(cur);
  }
  const route = hops.map((i, k) => `${k ? 'L' : 'M'}${nodes[i].x.toFixed(1)} ${nodes[i].y.toFixed(1)}`).join(' ');

  return (
    <>
      <rect width={W} height={H} fill="#0b0b0b" />
      {edges.map(([i, j], k) => (
        <line key={k} x1={nodes[i].x} y1={nodes[i].y} x2={nodes[j].x} y2={nodes[j].y} stroke="#ff3b2f" strokeOpacity={0.4} />
      ))}
      <path d={route} fill="none" stroke="#ff3b2f" strokeWidth={1.5} strokeDasharray="2 6" className="cv-dash" />
      {[0, 1, 2].map((k) => (
        <circle key={k} cx={hub.x} cy={hub.y} r={30} fill="none" stroke="#ff3b2f" strokeWidth={1.5} className="cv cv-pulse" style={d(k)} />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={i === HUB ? 7 : 3.5}
          fill={i === HUB ? '#ff3b2f' : '#fff'}
          className={i % 3 === 0 && i !== HUB ? 'cv-blink' : undefined}
          style={d(i * 0.23)}
        />
      ))}
      <g>
        <circle r={10} fill="#ff3b2f" opacity={0.3} />
        <circle r={4} fill="#fff" />
        <animateMotion dur="3.2s" repeatCount="indefinite" path={route} />
      </g>
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
            <g className={active ? 'cv cv-breathe' : undefined}>
              <rect width={150} height={112} rx={14} fill={active ? '#2f4bff' : '#111'} />
              <circle cx={24} cy={26} r={10} fill={active ? '#fff' : '#e8e5de'} opacity={active ? 1 : 0.3} />
              <rect x={14} y={60} width={92} height={6} rx={3} fill="#fff" opacity={active ? 0.9 : 0.25} className={active ? undefined : 'cv-blink'} style={d(i * 0.4)} />
              <rect x={14} y={76} width={60} height={6} rx={3} fill="#fff" opacity={active ? 0.6 : 0.15} />
              {active && <path d="M128 18l4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1z" fill="#ffd23f" />}
            </g>
          </g>
        );
      })}
      <g className="cv-bob">
        <path d="M300 300 l0 40 l10 -9 l8 18 l7 -3 l-8 -17 l14 -1 z" fill="#111" stroke="#e8e5de" strokeWidth={2} strokeLinejoin="round" />
      </g>
    </>
  );
}

function ForestEye() {
  return (
    <>
      <rect width={W} height={H} fill="#06120c" />
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 50} y1={0} x2={i * 50} y2={H} stroke="#fff" strokeOpacity={0.05} />
      ))}
      {Array.from({ length: 11 }).map((_, i) => (
        <line key={`h${i}`} x1={0} y1={i * 50} x2={W} y2={i * 50} stroke="#fff" strokeOpacity={0.05} />
      ))}
      <g className="cv cv-breathe">
        {Array.from({ length: 11 }).map((_, i) => {
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
      </g>
      <rect x={0} y={0} width={W} height={2} fill="#3ddc84" opacity={0.6} className="cv-scan" />
      <circle cx={225} cy={275} r={36} fill="none" stroke="#ff6a1f" strokeWidth={2} className="cv cv-pulse" />
      <circle cx={225} cy={275} r={36} fill="none" stroke="#ff6a1f" strokeWidth={2} className="cv cv-pulse" style={d(1.5)} />
      <rect x={200} y={250} width={50} height={50} fill="#ff6a1f" opacity={0.9} />
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
      <g className="cv-rise">
        <circle cx={200} cy={250} r={150} fill="#fff4e6" opacity={0.25} />
        <circle cx={200} cy={250} r={110} fill="#fff4e6" opacity={0.85} />
      </g>
      <rect y={300} width={W} height={200} fill="#c9532a" opacity={0.45} />
      {Array.from({ length: 29 }).map((_, i) => {
        const h = 10 + Math.abs(Math.sin(i * 0.7) * 50) + ((i * 13) % 17);
        return <rect key={i} x={60 + i * 10} y={400 - h / 2} width={4} height={h} rx={2} fill="#2a1208" className="cv cv-bar" style={d((i % 7) * 0.12)} />;
      })}
    </>
  );
}

function Deadlock() {
  const blocks = [
    [0, 0, 1, 2], [1, 0, 2, 1], [3, 0, 1, 2], [4, 0, 2, 1],
    [1, 1, 1, 2], [4, 1, 2, 1],
    [0, 3, 1, 3], [2, 3, 1, 2], [3, 3, 2, 1], [5, 3, 1, 2],
    [3, 4, 1, 2], [1, 5, 2, 1], [4, 5, 2, 1],
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
      <rect x={ox + 2 * s + 3} y={oy + 2 * s + 3} width={2 * s - 6} height={s - 6} rx={9} fill="#ff4747" className="cv-slide" />
      <rect x={ox + s * 6 + 10} y={oy + 2 * s + 8} width={4} height={s - 16} fill="#ff4747" className="cv-blink" />
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
      {shapes.map((sh, i) => (
        <g key={i} className="cv-bob" style={d(i * 0.35)}>
          {sh.cells.map(([x, y], j) => (
            <rect key={j} x={x * s + 4} y={y * s + 30} width={s - 4} height={s - 4} rx={6} fill={sh.c} />
          ))}
        </g>
      ))}
      <rect x={0} y={7 * s + 26} width={W} height={s + 4} fill="#fff" className="cv-flash" />
    </>
  );
}

function PhonePad() {
  return (
    <>
      <rect width={W} height={H} fill="#dde1e8" />
      <rect x={120} y={110} width={160} height={300} rx={28} fill="#111" />
      <rect x={132} y={124} width={136} height={272} rx={18} fill="#222" />
      <circle cx={200} cy={260} r={14} fill="none" stroke="#fff" strokeOpacity={0.6} className="cv cv-pulse" />
      <circle cx={200} cy={260} r={6} fill="#fff" opacity={0.6} />
      {[40, 70, 100].map((r, k) => (
        <path
          key={r}
          d={`M${200 - r * 0.7} ${100 - r * 0.2} A ${r} ${r} 0 0 1 ${200 + r * 0.7} ${100 - r * 0.2}`}
          fill="none"
          stroke="#2f4bff"
          strokeWidth={3}
          strokeLinecap="round"
          transform={`translate(0 ${-r * 0.4 + 30})`}
          className="cv-blink"
          style={d(k * 0.3)}
        />
      ))}
      <g className="cv-cursor">
        <path d="M300 300 l0 64 l16 -14 l12 28 l10 -4 l-12 -28 l22 -2 z" fill="#fff" stroke="#111" strokeWidth={3} strokeLinejoin="round" />
      </g>
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
    const dd = Math.hypot(x - cx, y - cy);
    if (dd < 7 && dd > 3.2) return true;
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
      if (o <= 0) continue;
      const animate = key || v > 0.93;
      cells.push(
        <rect
          key={`${x}-${y}`}
          x={x * s}
          y={y * s}
          width={s - 1}
          height={s - 1}
          fill={key ? '#8affc1' : '#fff'}
          opacity={key ? o : animate ? 0.5 : o}
          className={animate ? 'cv-blink' : undefined}
          style={animate ? d(key ? x * 0.06 : v * 9) : undefined}
        />,
      );
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
  const arc = 'M110 300 Q 200 110 290 300';
  return (
    <>
      <rect width={W} height={H} fill="#1a1c46" />
      <rect x={30} y={250} width={160} height={104} rx={8} fill="none" stroke="#fff" strokeOpacity={0.7} strokeWidth={2} />
      <rect x={210} y={250} width={160} height={104} rx={8} fill="none" stroke="#fff" strokeOpacity={0.7} strokeWidth={2} />
      <rect x={95} y={354} width={30} height={20} fill="#fff" opacity={0.4} />
      <rect x={275} y={354} width={30} height={20} fill="#fff" opacity={0.4} />
      <path d={arc} fill="none" stroke="#9aa8ff" strokeWidth={2} strokeDasharray="4 7" className="cv-dash" />
      <g>
        <rect x={-42} y={-29} width={84} height={58} rx={5} fill="#9aa8ff" />
        <rect x={-42} y={-29} width={84} height={10} rx={3} fill="#fff" opacity={0.6} />
        <animateMotion
          dur="5s"
          repeatCount="indefinite"
          path={arc}
          keyPoints="0;0;1;1;0"
          keyTimes="0;0.15;0.45;0.6;1"
          calcMode="spline"
          keySplines="0 0 1 1;0.65 0 0.35 1;0 0 1 1;0.65 0 0.35 1"
        />
      </g>
      <circle cx={200} cy={130} r={14} fill="#ff5a5f" />
      <circle cx={200} cy={130} r={20} fill="none" stroke="#ff5a5f" strokeWidth={2} className="cv cv-pulse" />
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
