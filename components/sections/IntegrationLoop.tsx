"use client";

import { useEffect, useId, useRef, useState } from "react";
import { m, useInView } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/hooks";

type Pt = [number, number];

/* Figure-8 geometry in the horizontal orientation (viewBox 600 × 300). */
const START: Pt = [300, 150];
const CURVES: [Pt, Pt, Pt][] = [
  // right loop (Network), clockwise
  [
    [352, 68],
    [540, 58],
    [540, 150],
  ],
  [
    [540, 242],
    [352, 232],
    [300, 150],
  ],
  // left loop (Tech), counter-clockwise
  [
    [248, 68],
    [60, 58],
    [60, 150],
  ],
  [
    [60, 242],
    [248, 232],
    [300, 150],
  ],
];
const LEFT_CENTER: Pt = [174, 150];
const RIGHT_CENTER: Pt = [426, 150];

function buildPath(t: (p: Pt) => Pt) {
  const f = (p: Pt) => t(p).join(",");
  return `M${f(START)} ${CURVES.map((c) => `C${c.map(f).join(" ")}`).join(" ")}Z`;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * FLIPO "Integration Model" (slide 12): an infinity loop, Tech on the left and Network on
 * the right. The stroke draws itself when scrolled into view, then a glowing dot keeps
 * travelling along the path to show the flow between both sides.
 */
export function IntegrationLoop({
  orientation,
  labels,
  ariaLabel,
  className,
}: {
  orientation: "horizontal" | "vertical";
  labels: { left: string; right: string };
  ariaLabel: string;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { once: true, margin: "0px 0px -20% 0px" });
  const visible = useInView(svgRef);
  const reduce = usePrefersReducedMotion();
  const [drawn, setDrawn] = useState(false);

  const vertical = orientation === "vertical";
  const t = (p: Pt): Pt => (vertical ? [p[1], p[0]] : p);
  const d = buildPath(t);
  const [lx, ly] = t(LEFT_CENTER);
  const [rx, ry] = t(RIGHT_CENTER);
  const [cx, cy] = t(START);
  const w = vertical ? 300 : 600;
  const h = vertical ? 600 : 300;

  // Pause the SMIL flow animation while the loop is off-screen.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (visible) svg.unpauseAnimations();
    else svg.pauseAnimations();
  }, [visible]);

  const showLabels = reduce || drawn;

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label={ariaLabel}
      className={className}
    >
      <defs>
        <linearGradient
          id={`loop-${uid}`}
          gradientUnits="userSpaceOnUse"
          x1={vertical ? 0 : 60}
          y1={vertical ? 60 : 0}
          x2={vertical ? 0 : 540}
          y2={vertical ? 540 : 0}
        >
          <stop offset="0" stopColor="#F2733A" />
          <stop offset="0.42" stopColor="#7B4BE0" />
          <stop offset="0.58" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#39B59A" />
        </linearGradient>
        <filter id={`glow-${uid}`} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id={`soft-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#111" floodOpacity="0.12" />
        </filter>
      </defs>

      {/* Thin framing arcs */}
      <m.path
        d={
          vertical
            ? "M54,40 Q-6,300 54,560 M246,40 Q306,300 246,560"
            : "M40,54 Q300,-6 560,54 M40,246 Q300,306 560,246"
        }
        fill="none"
        stroke="var(--line)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{ duration: 1.6, ease: EASE, delay: 0.4 }}
      />

      {/* The loop */}
      <m.path
        d={d}
        fill="none"
        stroke={`url(#loop-${uid})`}
        strokeWidth="22"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={inView ? { pathLength: 1 } : undefined}
        transition={{ duration: 2, ease: [0.65, 0, 0.35, 1] }}
        onAnimationComplete={() => setDrawn(true)}
      />

      {/* Chevron at the crossing point */}
      <m.g
        initial={{ opacity: reduce ? 1 : 0 }}
        animate={showLabels ? { opacity: 1 } : undefined}
        transition={{ duration: 0.5 }}
        transform={`translate(${cx} ${cy}) rotate(${vertical ? 45 : -45})`}
      >
        <circle r="13" fill="#fff" filter={`url(#soft-${uid})`} />
        <path
          d="M-3.5,-5 L2.5,0 L-3.5,5"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </m.g>

      {/* Labels */}
      {[
        { x: lx, y: ly, text: labels.left },
        { x: rx, y: ry, text: labels.right },
      ].map((l, i) => (
        <m.g
          key={l.text}
          initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.85 }}
          animate={showLabels ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.6, ease: EASE, delay: i * 0.12 }}
        >
          <circle cx={l.x} cy={l.y} r="46" fill="#fff" filter={`url(#soft-${uid})`} />
          <text
            x={l.x}
            y={l.y}
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-ink font-sans text-[17px] font-bold tracking-[-0.01em]"
          >
            {l.text}
          </text>
        </m.g>
      ))}

      {/* Travelling flow dot */}
      {drawn && !reduce && (
        <g>
          <circle r="10" fill="#fff" opacity="0.9" filter={`url(#glow-${uid})`}>
            <animateMotion dur="7s" repeatCount="indefinite" path={d} />
          </circle>
          <circle r="5.5" fill="#fff" stroke="var(--accent)" strokeWidth="2.5">
            <animateMotion dur="7s" repeatCount="indefinite" path={d} />
          </circle>
        </g>
      )}
    </svg>
  );
}
