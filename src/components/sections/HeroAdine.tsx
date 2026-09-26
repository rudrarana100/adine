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
import { badgePop, fadeUp, heroWord, heroWordContainer, staggerContainer } from "@/lib/motion";
import { AuroraField, GlowOrb } from "@/components/backgrounds/AnimatedBackgrounds";
import { InteractiveMesh } from "@/components/backgrounds/InteractiveMesh";

/* Typewriter gradient accent — the after-call moment Adine protects */
const accentWords = [
  "after-call admin disappear.",
  "follow-up write itself.",
  "momentum outlast the call.",
];
const getWord = (i: number) => accentWords[i % accentWords.length]!;

/* The accent wraps to more than one line on narrow viewports. This copy is
   never seen — it only reserves the tallest wrapped height the accent can
   ever occupy, so the paragraph below never jumps mid-type. */
const longestAccent = accentWords.reduce((a, b) => (b.length > a.length ? b : a));

const HOLD_MS = 2000;
const TYPE_MS = 58;
const ERASE_MS = 28;

type AccentPhase = "hold" | "type" | "erase";

function TypewriterAccent({ reduce }: { reduce: boolean }) {
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(accentWords[0]!.length);
  const [phase, setPhase] = useState<AccentPhase>("hold");

  useEffect(() => {
    if (reduce) return;
    const word = getWord(wordIdx);

    if (phase === "hold") {
      const t = setTimeout(() => setPhase("erase"), HOLD_MS);
      return () => clearTimeout(t);
    }

    if (phase === "type") {
      if (charIdx >= word.length) {
        const t = setTimeout(() => setPhase("hold"), HOLD_MS);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setCharIdx((c) => c + 1), TYPE_MS);
      return () => clearTimeout(t);
    }

    if (charIdx <= 0) {
      setWordIdx((i) => (i + 1) % accentWords.length);
      setPhase("type");
      return;
    }
    const t = setTimeout(() => setCharIdx((c) => c - 1), ERASE_MS);
    return () => clearTimeout(t);
  }, [charIdx, phase, wordIdx, reduce]);

  const word = getWord(wordIdx);
  const text = word.slice(0, charIdx);
  const showCaret = !reduce && phase !== "hold";

  return (
    <span className="hero-accent mt-[0.4em] grid">
      <span aria-hidden className="invisible col-start-1 row-start-1 select-none">
        {longestAccent}
        <span className="ml-[0.12em] inline-block h-[1em] w-[0.09em] align-middle" />
      </span>
      <span className="col-start-1 row-start-1 gradient-text">
        {text}
        {showCaret && (
          <span className="ml-[0.12em] inline-block h-[1em] w-[0.09em] align-middle bg-violet opacity-60 animate-pulse" />
        )}
      </span>
    </span>
  );
}

/* ── Call Session mock — the real product screenshot, kept inside the same
   floating chrome and motion rhythm as the original hand-built card ── */
function CallSessionMock({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-[32rem]"
      animate={reduce ? {} : { y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Ambient glow behind the card — recedes into the background */}
      <div
        className="pointer-events-none absolute -inset-[clamp(1rem,4vw,2rem)] -z-10 rounded-[3rem] opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(60% 60% at 20% 15%, rgba(97,97,255,0.28), transparent 70%), radial-gradient(55% 55% at 85% 90%, rgba(56,189,248,0.18), transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Ghost backdrop panel — layered depth behind the primary card */}
      <div
        className="pointer-events-none absolute inset-x-[clamp(1rem,4vw,1.5rem)] inset-y-[clamp(1rem,4vw,2rem)] -z-10 rounded-[2rem] border border-white/5 bg-gradient-to-br from-white/10 to-transparent shadow-card backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* The screenshot itself — gentle breathing scale so it feels alive */}
      <motion.div
        className="card-surface relative z-10 overflow-hidden rounded-[1.5rem] shadow-elevated ring-1 ring-white/10"
        animate={reduce ? {} : { scale: [1, 1.012, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src="/screenshots/hero-mockup.png"
          alt="Adine: the live call session in the app"
          width={1536}
          height={1024}
          className="block aspect-[3/2] h-auto w-full select-none"
          loading="eager"
          decoding="async"
        />
      </motion.div>

      {/* Soft ground shadow */}
      <div className="absolute -bottom-6 left-[8%] right-[8%] h-[3rem] rounded-full bg-violet/10 blur-2xl" />
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
      className="relative overflow-hidden pt-[calc(var(--nav-h,5.75rem)+clamp(1rem,3vw,2.75rem))] pb-[clamp(3.5rem,8vw,7rem)]"
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
        <GlowOrb className="left-[8%] top-[12%]" size="min(30rem,72vmin)" />
        <GlowOrb
          className="right-[4%] top-[30%]"
          color="rgba(233,141,254,0.16)"
          size="min(24rem,60vmin)"
        />
      </motion.div>

      {/* Mouse spotlight — translate-only layer, no repaints */}
      {!reduce && (
        <motion.div
          className="pointer-events-none absolute left-0 top-0 z-[1] h-[min(62rem,78vmin)] w-[min(62rem,78vmin)] rounded-full"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: "-50%",
            translateY: "-50%",
            background:
              "radial-gradient(circle at 50% 50%, rgba(97,97,255,0.06), transparent 60%)",
          }}
          aria-hidden="true"
        />
      )}

      {/* Content */}
      <div className="shell relative z-10">
        <div className="grid items-center gap-[clamp(2.75rem,7vw,5.5rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-[clamp(2.5rem,3vw,4rem)]">
          {/* Left: copy */}
          <motion.div
            {...(reduce ? {} : { style: { y: contentY } })}
            className="@container mx-auto w-full max-w-[51.25rem] text-center lg:mx-0 lg:max-w-none lg:text-left"
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
                <motion.h1 variants={v(heroWordContainer)} className="hero-title mt-[clamp(1.25rem,3vw,1.5rem)]">
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
                  className="hero-lede mx-auto mt-[clamp(1.5rem,3vw,2rem)] max-w-[35rem] text-slate lg:mx-0"
                >
                  One keypress after every hang-up logs the call, queues the next lead, and
                  schedules the follow-up. The moment that used to kill your momentum just ends.
                </motion.p>

                <motion.div
                  variants={v(fadeUp)}
                  className="mt-[clamp(2rem,4vw,2.5rem)] flex flex-wrap flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start"
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
              className="relative mx-auto mt-[clamp(2.5rem,7vw,4.5rem)] w-full max-w-[32rem] lg:mt-0"
            >
              <CallSessionMock reduce={reduce} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
