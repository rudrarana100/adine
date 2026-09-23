import { useRef, useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { fadeUp, heroWord, heroWordContainer, badgePop, staggerContainer } from "@/lib/motion";
import { AuroraField, GlowOrb } from "@/components/backgrounds/AnimatedBackgrounds";
import { InteractiveMesh } from "@/components/backgrounds/InteractiveMesh";

/* Typewriter gradient accent — the after-call moment Adine protects */
const accentWords = [
  "after-call paperwork disappear.",
  "follow-up write itself.",
  "momentum outlast the call.",
];
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
  const word = getWord(wordIdx);

  return (
    <span className="mt-2 block min-h-[2em] text-[clamp(26px,4.8vw,54px)] font-light leading-[1.16] tracking-[-0.03em] gradient-text sm:min-h-[1.2em] sm:text-[clamp(34px,4.8vw,54px)] lg:min-h-[1.15em] lg:text-[clamp(24px,3vw,38px)]">
      {text}
      {/* Caret only while the word is mid-typing — never left behind at rest */}
      {!reduce && charIdx < word.length && (
        <span className="ml-0.5 inline-block h-[1em] w-[3px] align-middle bg-violet opacity-60 animate-pulse" />
      )}
    </span>
  );
}

/* ── Call Session mock — the real product screenshot, kept inside the same
   floating chrome and motion rhythm as the original hand-built card ── */
function CallSessionMock({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-[520px]"
      animate={reduce ? {} : { y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Ambient glow behind the card — recedes into the background */}
      <div
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[48px] opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(60% 60% at 20% 15%, rgba(97,97,255,0.28), transparent 70%), radial-gradient(55% 55% at 85% 90%, rgba(56,189,248,0.18), transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Ghost backdrop panel — layered depth behind the primary card */}
      <div
        className="pointer-events-none absolute inset-x-6 inset-y-8 -z-10 rounded-[32px] border border-white/5 bg-gradient-to-br from-white/10 to-transparent shadow-card backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* The screenshot itself — gentle breathing scale so it feels alive */}
      <motion.div
        className="card-surface relative z-10 overflow-hidden rounded-[24px] shadow-elevated ring-1 ring-white/10"
        animate={reduce ? {} : { scale: [1, 1.012, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src="/screenshots/hero-mockup.png"
          alt="Adine — the live call session in the app"
          className="block h-auto w-full select-none"
          loading="eager"
          decoding="async"
        />
      </motion.div>

      {/* Soft ground shadow */}
      <div className="absolute -bottom-6 left-[8%] right-[8%] h-12 rounded-full bg-violet/10 blur-2xl" />
    </motion.div>
  );
}

/* Interactive SVG orbit: replaces the old status badges with a lighter,
   product-agnostic visual cue for the lead-to-follow-up workflow. */
function WorkflowOrbit({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      variants={badgePop}
      className="pointer-events-none absolute -inset-x-10 -inset-y-12 z-20 hidden md:block"
      aria-hidden="true"
    >
      <svg viewBox="0 0 620 430" className="h-full w-full overflow-visible" fill="none">
        <defs>
          <linearGradient id="workflow-arc" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#6161ff" stopOpacity="0.05" />
            <stop offset="0.5" stopColor="#6161ff" stopOpacity="0.48" />
            <stop offset="1" stopColor="#3ac9ff" stopOpacity="0.08" />
          </linearGradient>
          <filter id="workflow-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>
        <path
          d="M34 302C70 64 470 16 588 184C634 252 576 371 420 389C258 408 101 379 34 302Z"
          stroke="url(#workflow-arc)"
          strokeWidth="1.5"
          strokeDasharray="5 9"
        />
        <path
          d="M66 322C137 140 394 72 548 176"
          stroke="url(#workflow-arc)"
          strokeWidth="10"
          opacity="0.16"
          filter="url(#workflow-glow)"
        />
        {[{ cx: 82, cy: 292, r: 5 }, { cx: 522, cy: 148, r: 6 }, { cx: 430, cy: 382, r: 4 }].map(
          ({ cx, cy, r }, index) => (
            <motion.circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r={r}
              fill={index === 1 ? "#3ac9ff" : "#6161ff"}
              animate={
                reduce
                  ? { opacity: 0.8 }
                  : { opacity: [0.35, 1, 0.35], scale: [1, 1.55, 1] }
              }
              transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.7 }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />
          ),
        )}
      </svg>
      <motion.div
        className="absolute right-0 top-2 rounded-full border border-white/70 bg-white/70 px-3 py-1.5 text-[10px] font-medium tracking-[0.12em] text-violet shadow-card backdrop-blur-md"
        whileHover={{ scale: 1.06, y: -2 }}
      >
        MOMENTUM LOOP
      </motion.div>
    </motion.div>
  );
}

export default function HeroAdine() {
  const reduce = useReducedMotion() ?? false;
  const v = (variants: Variants): Variants => (reduce ? {} : variants);

  // Scroll-linked parallax: content drifts up as you scroll away
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const mockY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const mockScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 60]); // slower than content → depth
  const glowOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.15]);

  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-[112px] pb-16 sm:pt-[144px] sm:pb-32"
      ref={heroRef}
      onMouseMove={handleMouseMove}
    >
      {/* Background: slow aurora + grid (parallax slower than content) */}
      <motion.div
        {...(reduce ? {} : { style: { y: bgY } })}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <AuroraField />
        <InteractiveMesh className="opacity-50" />
      </motion.div>

      {/* Glow orbs — fade as you scroll */}
      <motion.div style={{ opacity: glowOpacity }} className="pointer-events-none absolute inset-0">
        <GlowOrb className="left-[8%] top-[12%]" />
        <GlowOrb className="right-[4%] top-[30%]" color="rgba(233,141,254,0.16)" size={360} />
      </motion.div>

      {/* Mouse spotlight — translate-only layer, no repaints */}
      {!reduce && (
        <motion.div
          className="pointer-events-none absolute left-0 top-0 z-[1] h-[600px] w-[600px] rounded-full"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: "-50%",
            translateY: "-50%",
            background:
              "radial-gradient(600px circle at 50% 50%, rgba(97,97,255,0.06), transparent 60%)",
          }}
          aria-hidden="true"
        />
      )}

      {/* Content */}
      <div className="shell relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* Left: copy */}
          <motion.div
            {...(reduce ? {} : { style: { y: contentY } })}
            className="mx-auto max-w-[820px] text-center lg:mx-0 lg:max-w-none lg:text-left"
          >
            <motion.div
              variants={v(staggerContainer)}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <motion.div variants={v(staggerContainer)}>
                <motion.div variants={v(heroWordContainer)}>
                  <motion.span variants={v(heroWord)} className="inline-block">
                    <span className="section-eyebrow block">Built for outbound, not busywork</span>
                  </motion.span>
                </motion.div>

                {/* Headline: brand + gradient typewriter accent */}
                <motion.h1
                  variants={v(heroWordContainer)}
                  className="mt-5 text-[clamp(34px,9vw,52px)] font-light leading-[1.12] tracking-[-0.03em] sm:mt-6 sm:text-[clamp(36px,5vw,60px)] lg:text-[clamp(32px,3.4vw,48px)]"
                >
                  {["Adine", "makes", "the"].map((word, i) => (
                    <motion.span
                      key={i}
                      variants={v(heroWord)}
                      className="inline-block whitespace-nowrap gradient-text"
                    >
                      {word}
                      {i < 2 && <span className="mx-[0.22em]">&nbsp;</span>}
                    </motion.span>
                  ))}
                  <TypewriterAccent reduce={reduce} />
                </motion.h1>

                <motion.p
                  variants={v(fadeUp)}
                  className="mx-auto mt-6 max-w-[560px] text-[16px] font-light leading-[1.6] text-slate sm:mt-8 sm:text-[18px] lg:mx-0"
                >
                  One keypress after every hang-up logs the call, queues the next lead, and
                  schedules the follow-up — the moment that used to kill your momentum just ends.
                </motion.p>

                <motion.div
                  variants={v(fadeUp)}
                  className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center lg:justify-start"
                >
                  <a
                    href="https://salestrackercrm.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pill"
                  >
                    Start Free
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                  <a href="#how" className="btn-ghost-pill">
                    See how it works
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: hero visual — screenshot enters last, then badges pop in */}
          <motion.div
            variants={v(staggerContainer)}
            initial="hidden"
            animate="visible"
            transition={{ delayChildren: 0.5, staggerChildren: 0.12 }}
            {...(reduce ? {} : { style: { y: mockY, scale: mockScale } })}
          >
            <motion.div
              variants={v(badgePop)}
              className="relative mx-auto mt-12 w-full max-w-[520px] lg:mt-0"
            >
              <CallSessionMock reduce={reduce} />
              <WorkflowOrbit reduce={reduce} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
