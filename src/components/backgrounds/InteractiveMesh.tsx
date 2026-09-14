import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/*
 * InteractiveMesh — a slim, irregular line mesh rendered on a <canvas>.
 *
 * The mesh is deliberately not a perfect grid: lines are jittered, gently
 * curved, and interrupted by random gaps. It is ALWAYS alive — a slow
 * breathing undulation drifts across the field so the backdrop never sits
 * still — and it reacts to the pointer:
 *
 *   · a water-like ripple bursts on enter / click and trails the cursor
 *   · vertices are pulled toward the pointer while it's over the canvas,
 *     so the mesh visibly bends toward you
 *
 * Purely decorative; one path + one stroke per frame while active. Respects
 * prefers-reduced-motion (a single static frame, no listeners).
 */

type Ripple = { x: number; y: number; t0: number; following: boolean };

const AMP = 26; // ripple wave amplitude
const RADIUS = 380; // ripple reach
const WAVELENGTH = 140;
const SPEED = 1.4;
const FADE = 1.4;
const ATTRACT = 6; // vertex pull toward cursor (px)
const ATTRACT_RADIUS = 200;
const IDLE = 2.2; // idle breathing amplitude (px)

type MarginValue = `${number}${"px" | "%"}`;
type MarginType =
  | MarginValue
  | `${MarginValue} ${MarginValue}`
  | `${MarginValue} ${MarginValue} ${MarginValue}`
  | `${MarginValue} ${MarginValue} ${MarginValue} ${MarginValue}`;

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function makeLines(W: number, H: number): Array<{ px: number[]; py: number[] }> {
  const lines: Array<{ px: number[]; py: number[] }> = [];
  const cols = Math.max(8, Math.round(W / 68));
  const rows = Math.max(6, Math.round(H / 68));

  for (let c = 0; c < cols; c++) {
    const baseX = ((c + 0.5) / cols) * W + rand(-8, 8);
    const phase = rand(0, Math.PI * 2);
    const n = Math.max(8, Math.round(H / 26));
    const px: number[] = [];
    const py: number[] = [];
    for (let i = 0; i < n; i++) {
      const y = (i / (n - 1)) * H;
      px.push(baseX + Math.sin(y * 0.011 + phase) * 2.4 + rand(-1.2, 1.2));
      py.push(y + Math.cos(i * 1.7 + phase) * 1.3 + rand(-0.7, 0.7));
    }
    lines.push({ px, py });
  }

  for (let r = 0; r < rows; r++) {
    const baseY = ((r + 0.5) / rows) * H + rand(-8, 8);
    const phase = rand(0, Math.PI * 2);
    const n = Math.max(8, Math.round(W / 26));
    const px: number[] = [];
    const py: number[] = [];
    for (let i = 0; i < n; i++) {
      const x = (i / (n - 1)) * W;
      px.push(x + Math.cos(x * 0.011 + phase) * 2.2 + rand(-1.2, 1.2));
      py.push(baseY + Math.sin(i * 1.7 + phase) * 1.3 + rand(-0.7, 0.7));
    }
    lines.push({ px, py });
  }

  return lines;
}

function draw(
  ctx: CanvasRenderingContext2D,
  lines: Array<{ px: number[]; py: number[] }>,
  ripple: Ripple | null,
  now: number,
  W: number,
  H: number,
  color: string,
) {
  const t = now / 1000;
  ctx.clearRect(0, 0, W, H);
  ctx.lineWidth = 1;
  ctx.lineCap = "round";
  ctx.strokeStyle = color;
  ctx.beginPath();

  const age = ripple ? (now - ripple.t0) / 1000 : 0;
  const fade = ripple && !ripple.following ? Math.exp(-age * FADE) : 1;

  for (const line of lines) {
    for (let i = 0; i < line.px.length; i++) {
      const bx = line.px[i]!;
      const by = line.py[i]!;
      /* idle breathing — the mesh never sits still */
      let x = bx + Math.sin(by * 0.008 + t * 0.7) * IDLE;
      let y = by + Math.cos(bx * 0.007 + t * 0.6) * IDLE;
      /* slow undulation sweeping across the whole field */
      x += Math.sin((bx + by) * 0.004 + t * 0.35) * 1.6;
      y += Math.cos((bx + by) * 0.004 + t * 0.3) * 1.4;

      if (ripple) {
        const dx = x - ripple.x;
        const dy = y - ripple.y;
        const d = Math.hypot(dx, dy);
        if (d > 0.5) {
          /* expanding ripple */
          if (d < RADIUS * 2.4) {
            const wave =
              Math.sin((Math.PI * 2 * d) / WAVELENGTH - 2 * Math.PI * SPEED * age) *
              Math.exp(-d / RADIUS) *
              AMP *
              fade;
            const k = wave / d;
            x += dx * k;
            y += dy * k;
          }
          /* soft pull toward the pointer */
          if (d < ATTRACT_RADIUS) {
            const pull = (1 - d / ATTRACT_RADIUS) * ATTRACT * fade;
            x -= (dx / d) * pull;
            y -= (dy / d) * pull;
          }
        }
      }

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
  }

  ctx.stroke();
}

export function InteractiveMesh({
  className = "",
  color = "rgba(97,97,255,0.13)",
}: {
  className?: string;
  color?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion() ?? false;
  const inView = useInView(canvasRef, { margin: "300px 0px" as MarginType });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !inView) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let size = { w: 0, h: 0 };
    let lines: Array<{ px: number[]; py: number[] }> = [];
    let ripple: Ripple | null = null;
    let raf = 0;

    const drawFrame = (now: number) => draw(ctx, lines, ripple, now, size.w, size.h, color);

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      size = { w: rect.width, h: rect.height };
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lines = makeLines(rect.width, rect.height);
    };

    function loop(now: number) {
      drawFrame(now);
      raf = requestAnimationFrame(loop);
    }

    build();
    drawFrame(performance.now());

    const ro = new ResizeObserver(() => {
      build();
    });
    ro.observe(canvas);

    if (reduce) {
      return () => {
        ro.disconnect();
      };
    }

    raf = requestAnimationFrame(loop);

    const setRipple = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (!ripple || !ripple.following) {
        ripple = { x, y, t0: performance.now(), following: true };
      } else {
        ripple.x = x;
        ripple.y = y;
      }
    };
    const onMove = (e: PointerEvent) => {
      setRipple(e);
    };
    const onDown = (e: PointerEvent) => {
      setRipple(e);
    };
    const onLeave = () => {
      if (ripple) ripple.following = false;
    };

    canvas.addEventListener("pointermove", onMove, { passive: true });
    canvas.addEventListener("pointerdown", onDown, { passive: true });
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [inView, reduce, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-auto absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
