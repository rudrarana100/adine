import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   AuroraField — layered, slowly-morphing gradient fields for section
   backdrops. Pure color + blur, no iconography. transform/opacity only,
   fully disabled under prefers-reduced-motion.
   ───────────────────────────────────────────────────────────────────────── */

const AURORA_PANES = [
  {
    className: "-top-[240px] left-[4%] h-[620px] w-[620px]",
    color: "radial-gradient(circle at 30% 30%, rgba(97,97,255,0.16), transparent 62%)",
    scale: [1, 1.16, 1],
    rotate: [0, 9, 0],
    duration: 20,
    delay: 0,
  },
  {
    className: "top-[30px] right-[2%] h-[520px] w-[520px]",
    color: "radial-gradient(circle at 70% 40%, rgba(237,223,247,0.6), transparent 60%)",
    scale: [1, 1.1, 0.96, 1],
    rotate: [0, -7, 5, 0],
    duration: 23,
    delay: 1.6,
  },
  {
    className: "bottom-[4%] left-[26%] h-[460px] w-[460px]",
    color: "radial-gradient(circle at 50% 50%, rgba(171,240,255,0.4), transparent 62%)",
    scale: [1, 1.14, 0.96, 1],
    rotate: [0, 6, -5, 0],
    duration: 18,
    delay: 3,
  },
  {
    className: "top-[48%] left-[44%] h-[360px] w-[360px]",
    color: "radial-gradient(circle at 50% 50%, rgba(233,141,254,0.14), transparent 60%)",
    scale: [1, 1.24, 0.92, 1],
    rotate: [0, -11, 7, 0],
    duration: 22,
    delay: 2.2,
  },
];

export function AuroraField() {
  const reduce = useReducedMotion() ?? false;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {AURORA_PANES.map((p, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[110px] ${p.className}`}
          style={{ background: p.color }}
          animate={reduce ? {} : { scale: p.scale, rotate: p.rotate }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   ShimmerField — fine twinkling dust that drifts upward. Soft 2-3px dots,
   no product icons, very subtle. Renders decorative only.
   ───────────────────────────────────────────────────────────────────────── */

const DUST_COUNT = 26;

function specFrom(hash: number) {
  const s = (n: number) => (hash * (n + 7)) % 97;
  return {
    left: (s(1) / 97) * 100,
    top: (s(2) / 97) * 100,
    size: 2 + (s(3) % 3),
    dur: 9 + (s(4) % 9),
    delay: (s(5) % 60) / 10,
    o: 0.25 + (s(6) % 6) / 20,
    y: -40 - (s(7) % 50),
  };
}

export function ShimmerField({
  className = "",
  color = "rgba(97,97,255,0.5)",
}: {
  className?: string;
  color?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  const dots = Array.from({ length: DUST_COUNT }, (_, i) => specFrom(i * 13 + 7));

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {dots.map((d, i) =>
        reduce ? null : (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${d.left}%`,
              top: `${d.top}%`,
              width: d.size,
              height: d.size,
              background: color,
              filter: "blur(0.5px)",
            }}
            animate={{ y: [0, d.y, 0], opacity: [d.o * 0.2, d.o, d.o * 0.2] }}
            transition={{ duration: d.dur, repeat: Infinity, ease: "easeInOut", delay: d.delay }}
          />
        ),
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   GridField — soft perspective grid lines (no dots). Adds structure
   without being icon-heavy.
   ───────────────────────────────────────────────────────────────────────── */

export function GridField({
  className = "",
  lineColor = "rgba(97,97,255,0.07)",
}: {
  className?: string;
  lineColor?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        {Array.from({ length: 21 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={`${(i / 20) * 100}`}
            y1="0"
            x2={`${(i / 20) * 100}`}
            y2="100"
            stroke={lineColor}
            strokeWidth="0.25"
          />
        ))}
        {Array.from({ length: 13 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1="0"
            y1={`${(i / 12) * 100}`}
            x2="100"
            y2={`${(i / 12) * 100}`}
            stroke={lineColor}
            strokeWidth="0.25"
          />
        ))}
      </svg>
      {!reduce && (
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, transparent 30%, rgba(97,97,255,0.12) 50%, transparent 70%)",
            backgroundSize: "220% 100%",
          }}
          animate={{ backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   ConicSheen — a slowly-rotating spotlight that sweeps the section. Used
   behind the hero center or the final CTA for a premium, alive grader.
   ───────────────────────────────────────────────────────────────────────── */

export function ConicSheen({
  className = "",
}: {
  className?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {reduce ? null : (
        <motion.div
          className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(97,97,255,0.10) 40deg, transparent 90deg, transparent 180deg, rgba(237,223,247,0.35) 220deg, transparent 270deg)",
            filter: "blur(60px)",
            borderRadius: "9999px",
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 46, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   DotGrid — faint dotted field. Keep but tune down + optional twinkle.
   ───────────────────────────────────────────────────────────────────────── */

const GRID_COLUMNS = 18;
const GRID_ROWS = 12;

export function DotGrid({
  className = "",
  twinkle = true,
}: {
  className?: string;
  twinkle?: boolean;
}) {
  const reduce = useReducedMotion() ?? false;
  const dots = Array.from({ length: GRID_COLUMNS * GRID_ROWS });

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(97,97,255,0.16) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
        }}
      />
      {twinkle &&
        !reduce &&
        dots.slice(0, 24).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-violet/30"
            style={{
              left: `${(i * 37) % 90}%`,
              top: `${(i * 53) % 88}%`,
            }}
            animate={{ opacity: [0.15, 0.9, 0.15], scale: [1, 1.7, 1] }}
            transition={{
              duration: 6 + (i % 5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 7) * 0.5,
            }}
          />
        ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   SignalRings — pulsing concentric rings, great behind the call mock.
   ───────────────────────────────────────────────────────────────────────── */

export function SignalRings({
  className = "",
  reduce,
}: {
  className?: string;
  reduce: boolean;
}) {
  if (reduce) return null;
  const rings = [0, 0.9, 1.8];
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {rings.map((d, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet/25"
          animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeOut",
            delay: d,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   GlowOrb — a single soft glow used as a "hero light source".
   ───────────────────────────────────────────────────────────────────────── */

export function GlowOrb({
  className = "",
  color = "rgba(97,97,255,0.22)",
  size = 420,
}: {
  className?: string;
  color?: string;
  size?: number;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full blur-[100px] ${className}`}
      style={{ width: size, height: size, background: `radial-gradient(circle, ${color}, transparent 65%)` }}
      animate={reduce ? {} : { scale: [1, 1.12, 1], y: [0, -16, 0] }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    />
  );
}

export type { ReactNode };