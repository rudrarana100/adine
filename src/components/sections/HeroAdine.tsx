import { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/motion";

/* ─── Typewriter accent ─── */
const accentWords = ["actually pick up the phone", "never miss a follow-up", "close more deals"];
const getWord = (i: number) => accentWords[i % accentWords.length]!;

function TypewriterAccent({ reduce }: { reduce: boolean }) {
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const word = getWord(wordIdx);
    if (!deleting && charIdx === word.length) {
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % accentWords.length);
      return;
    }
    const speed = deleting ? 30 : 60;
    const t = setTimeout(() => {
      setCharIdx((c) => c + (deleting ? -1 : 1));
    }, speed);
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, reduce]);

  const text = reduce ? accentWords[0] : getWord(wordIdx).slice(0, charIdx);

  return (
    <span className="mt-2 block min-h-[1.2em] text-[clamp(36px,5vw,52px)] font-light leading-[1.12] tracking-[-0.03em] gradient-text">
      {text}
      {!reduce && (
        <span className="ml-0.5 inline-block h-[1em] w-[3px] align-middle bg-violet opacity-60 animate-pulse" />
      )}
    </span>
  );
}

/* ─── Floating orb ─── */
function FloatingOrb({
  className,
  delay = 0,
  reduce,
}: {
  className: string;
  delay?: number;
  reduce: boolean;
}) {
  if (reduce) return <div className={className} aria-hidden="true" />;
  return (
    <motion.div
      className={className}
      aria-hidden="true"
      animate={{
        y: [0, -16, 0, 12, 0],
        x: [0, 8, -5, 6, 0],
        scale: [1, 1.06, 0.97, 1.03, 1],
      }}
      transition={{
        duration: 12 + delay * 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

/* ─── Product mockup (floating, breathing) ─── */
function ProductMockup({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      className="relative mx-auto mt-16 max-w-[720px]"
      animate={reduce ? {} : { y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="card-surface overflow-hidden rounded-[24px] p-1">
        {/* Mockup chrome bar */}
        <div className="flex items-center gap-2 rounded-t-[20px] bg-canvas px-5 py-3">
          <span className="h-3 w-3 rounded-full bg-peony" />
          <span className="h-3 w-3 rounded-full bg-mint" />
          <span className="h-3 w-3 rounded-full bg-sky" />
          <span className="ml-4 h-2.5 flex-1 rounded-full bg-pebble/60" />
        </div>
        {/* Mockup content area */}
        <div
          className="relative flex items-stretch rounded-b-[20px] bg-card"
          style={{ height: 320 }}
        >
          {/* Sidebar */}
          <div className="hidden w-[200px] flex-col gap-3 border-r border-pebble/40 p-4 sm:flex">
            <div className="h-3 w-20 rounded-full bg-violet/15" />
            <div className="h-2.5 w-28 rounded-full bg-canvas" />
            <div className="h-2.5 w-24 rounded-full bg-canvas" />
            <div className="h-2.5 w-32 rounded-full bg-canvas" />
            <div className="mt-auto h-2.5 w-20 rounded-full bg-canvas" />
          </div>
          {/* Main area */}
          <div className="flex-1 p-5">
            {/* Header row */}
            <div className="mb-4 flex items-center gap-3">
              <div className="h-4 w-32 rounded-full bg-ink/8" />
              <div className="ml-auto h-7 w-24 rounded-full bg-violet/10" />
            </div>
            {/* Call row 1 — active */}
            <div className="mb-2 flex items-center gap-3 rounded-[12px] bg-violet/5 px-4 py-3">
              <div className="relative">
                <div className="h-9 w-9 rounded-full bg-violet/20" />
                <motion.span
                  className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-card"
                  animate={reduce ? {} : { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <div className="flex-1">
                <div className="h-2.5 w-24 rounded-full bg-ink/10" />
                <div className="mt-1.5 h-2 w-16 rounded-full bg-ink/6" />
              </div>
              <span className="rounded-full bg-green-500/10 px-3 py-1 text-[11px] font-medium text-green-600">
                In call
              </span>
            </div>
            {/* Call row 2 */}
            <div className="mb-2 flex items-center gap-3 rounded-[12px] px-4 py-3">
              <div className="h-9 w-9 rounded-full bg-sky/30" />
              <div className="flex-1">
                <div className="h-2.5 w-28 rounded-full bg-ink/8" />
                <div className="mt-1.5 h-2 w-20 rounded-full bg-ink/5" />
              </div>
              <span className="rounded-full bg-canvas px-3 py-1 text-[11px] font-medium text-iron">
                Completed
              </span>
            </div>
            {/* Call row 3 */}
            <div className="mb-2 flex items-center gap-3 rounded-[12px] px-4 py-3">
              <div className="h-9 w-9 rounded-full bg-mint/30" />
              <div className="flex-1">
                <div className="h-2.5 w-20 rounded-full bg-ink/8" />
                <div className="mt-1.5 h-2 w-14 rounded-full bg-ink/5" />
              </div>
              <span className="rounded-full bg-canvas px-3 py-1 text-[11px] font-medium text-iron">
                Scheduled
              </span>
            </div>
            {/* Call row 4 */}
            <div className="flex items-center gap-3 rounded-[12px] px-4 py-3">
              <div className="h-9 w-9 rounded-full bg-lavender/40" />
              <div className="flex-1">
                <div className="h-2.5 w-24 rounded-full bg-ink/8" />
                <div className="mt-1.5 h-2 w-16 rounded-full bg-ink/5" />
              </div>
              <span className="rounded-full bg-canvas px-3 py-1 text-[11px] font-medium text-iron">
                No answer
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Shadow beneath */}
      <div className="absolute -bottom-4 left-[10%] right-[10%] h-8 rounded-full bg-violet/8 blur-2xl" />
    </motion.div>
  );
}

export default function HeroAdine() {
  const reduce = useReducedMotion() ?? false;
  const v = (variants: Variants): Variants => (reduce ? {} : variants);

  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 20 });
  const spotlightX = useTransform(smoothX, (val) => `${val}px`);
  const spotlightY = useTransform(smoothY, (val) => `${val}px`);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-[120px] pb-[40px]"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Gradient blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute -top-[200px] left-[8%] h-[500px] w-[500px] rounded-full blur-[120px]"
          style={{ background: "rgba(97,97,255,0.08)" }}
          animate={reduce ? {} : { scale: [1, 1.12, 1], rotate: [0, 6, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[60px] right-[4%] h-[400px] w-[400px] rounded-full blur-[120px]"
          style={{ background: "rgba(237,223,247,0.35)" }}
          animate={reduce ? {} : { scale: [1, 1.08, 0.96, 1], rotate: [0, -5, 3, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[50%] h-[300px] w-[300px] rounded-full blur-[100px]"
          style={{ background: "rgba(171,240,255,0.2)" }}
          animate={reduce ? {} : { scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      {/* Mouse spotlight */}
      {!reduce && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background: `radial-gradient(600px circle at ${spotlightX} ${spotlightY}, rgba(97,97,255,0.05), transparent 60%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Floating orbs */}
      <FloatingOrb
        reduce={reduce}
        delay={0}
        className="absolute top-[18%] left-[6%] h-2.5 w-2.5 rounded-full bg-violet/15"
      />
      <FloatingOrb
        reduce={reduce}
        delay={2.5}
        className="absolute top-[28%] right-[10%] h-3 w-3 rounded-full bg-cotton-candy/20"
      />
      <FloatingOrb
        reduce={reduce}
        delay={5}
        className="absolute bottom-[35%] left-[18%] h-2 w-2 rounded-full bg-mint/25"
      />
      <FloatingOrb
        reduce={reduce}
        delay={3.5}
        className="absolute top-[12%] right-[28%] h-2 w-2 rounded-full bg-sky/20"
      />
      <FloatingOrb
        reduce={reduce}
        delay={7}
        className="absolute bottom-[25%] right-[22%] h-1.5 w-1.5 rounded-full bg-apricot/15"
      />

      {/* Content */}
      <div className="shell relative z-10">
        <motion.div
          variants={v(staggerContainer)}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-[800px] text-center"
        >
          <motion.div variants={v(fadeUp)}>
            <span className="section-eyebrow">Outbound sales, in one place</span>
          </motion.div>

          <motion.h1
            variants={v(fadeUp)}
            className="mt-6 text-[clamp(36px,5vw,56px)] font-light leading-[1.1] tracking-[-0.03em] text-ink"
          >
            Adine
            <TypewriterAccent reduce={reduce} />
          </motion.h1>

          <motion.p
            variants={v(fadeUp)}
            className="mx-auto mt-8 max-w-[520px] text-[17px] font-light leading-[1.6] text-slate"
          >
            The outbound CRM built for high-volume cold calling. Manage sessions, auto-log calls,
            and follow up instantly — without the busywork.
          </motion.p>

          <motion.div
            variants={v(fadeUp)}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href="https://adine-crm.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill"
            >
              Start free
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href="#how" className="btn-ghost-pill">
              See how it works
            </a>
          </motion.div>

          {/* Trust stats */}
          <motion.div
            variants={v(staggerContainer)}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            {[
              { value: "150+", label: "calls per week" },
              { value: "30s", label: "to first call" },
              { value: "2.4×", label: "pipeline growth" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={v(scaleIn)}
                className="flex items-center gap-2 rounded-full border border-pebble bg-card px-5 py-2.5"
              >
                <span className="text-[16px] font-semibold text-violet">{stat.value}</span>
                <span className="text-[13px] font-medium text-iron">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <ProductMockup reduce={reduce} />
      </div>
    </section>
  );
}
