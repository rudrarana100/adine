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
import { PhoneIcon, ChatIcon, CalendarMeetIcon, FlameIcon } from "@/components/icons/FeatureIcons";
import { AuroraField, GlowOrb, SignalRings } from "@/components/backgrounds/AnimatedBackgrounds";
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

  return (
    <span className="mt-2 block min-h-[2em] text-[clamp(26px,4.8vw,54px)] font-light leading-[1.16] tracking-[-0.03em] gradient-text sm:min-h-[1.2em] sm:text-[clamp(34px,4.8vw,54px)] lg:min-h-[1.15em] lg:text-[clamp(24px,3vw,38px)]">
      {text}
      {!reduce && (
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
      className="relative mx-auto w-full max-w-[640px]"
      animate={reduce ? {} : { y: [0, -7, 0] }}
      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Pulsing signal rings behind the mock */}
      <SignalRings reduce={reduce} className="-inset-10" />

      {/* The screenshot itself — gentle breathing scale so it feels alive */}
      <motion.div
        className="card-surface relative z-10 overflow-hidden rounded-[24px] shadow-elevated ring-1 ring-white/10"
        animate={reduce ? {} : { scale: [1, 1.02, 1] }}
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

      {/* Elevation shadow */}
      <div className="absolute -bottom-5 left-[10%] right-[10%] h-10 rounded-full bg-violet/8 blur-2xl" />
    </motion.div>
  );
}

/* ── Floating SVG badges around the mock ── */

/* Mini heatmap swatch — 5 columns of a few intensity squares */
function HeatSwatch({ className = "" }: { className?: string }) {
  const cols = [5, 3, 4, 2, 5];
  return (
    <div className={`flex gap-[3px] ${className}`} aria-hidden="true">
      {cols.map((n, c) => (
        <div key={c} className="flex flex-col gap-[3px]">
          {Array.from({ length: 5 }).map((_, r) => (
            <span
              key={r}
              className={`h-1.5 w-1.5 rounded-[2px] ${
                r < n ? (n === 5 ? "bg-violet" : "bg-violet/40") : "bg-canvas"
              }`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/* WhatsApp bubble with a "message sent" checkmark that animates across it on a loop */
function WhatsAppBadge({ reduce }: { reduce: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-mint/40 text-green-700">
        <ChatIcon size={18} />
      </span>
      <div>
        <p className="text-[12px] font-medium text-ink">WhatsApp</p>
        <p className="flex items-center gap-1 text-[11px] text-slate">
          Confirmation sent
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <motion.path
              d="M3 7.5l2.6 2.6L11 5"
              stroke="#38a169"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
              animate={
                reduce
                  ? { pathLength: 1 }
                  : {
                      pathLength: [0, 1, 1, 0],
                      opacity: [0, 1, 1, 0.2],
                    }
              }
              transition={{
                duration: 3.4,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 3.6,
              }}
            />
          </svg>
        </p>
      </div>
    </div>
  );
}

function FloatingBadges({ reduce }: { reduce: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {/* Phone dialer badge — anchored outside the card's top-left edge */}
      <motion.div
        variants={badgePop}
        className="absolute top-10 right-full mr-6 z-20 hidden lg:block"
      >
        <motion.div
          animate={reduce ? {} : { y: [0, -9, 0] }}
          transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          className={`flex items-center gap-2 rounded-[16px] bg-card/95 px-3.5 py-2.5 shadow-card backdrop-blur-sm`}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet/10 text-violet">
            <PhoneIcon size={18} />
          </span>
          <div>
            <p className="flex items-center gap-1.5 text-[12px] font-medium text-ink">
              Dialing
              <motion.span
                className="inline-block h-1.5 w-1.5 rounded-full bg-green-500"
                animate={reduce ? {} : { opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </p>
            <p className="text-[11px] text-slate">Lead 4 of 26</p>
          </div>
        </motion.div>
      </motion.div>

      {/* WhatsApp badge — anchored outside the card's top-right edge, with send loop */}
      <motion.div
        variants={badgePop}
        className="absolute top-4 left-full ml-6 z-20 hidden lg:block"
      >
        <motion.div
          animate={reduce ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 6.6, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
          className="flex items-center rounded-[16px] bg-card/95 px-3.5 py-2.5 shadow-card backdrop-blur-sm"
        >
          <WhatsAppBadge reduce={reduce} />
        </motion.div>
      </motion.div>

      {/* Streak badge — anchored outside the card's bottom-left edge */}
      <motion.div
        variants={badgePop}
        className="absolute bottom-20 right-full mr-6 z-20 hidden xl:block"
      >
        <motion.div
          animate={reduce ? {} : { y: [0, -8, 0] }}
          transition={{ duration: 7.4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="flex items-center gap-2 rounded-[16px] bg-card/95 px-3.5 py-2.5 shadow-card backdrop-blur-sm"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-apricot/15 text-apricot">
            <FlameIcon size={18} />
          </span>
          <div>
            <p className="text-[12px] font-medium text-ink">Streak kept</p>
            <p className="text-[11px] text-slate">14 days today</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Heatmap swatch badge — anchored outside the card's bottom-right edge */}
      <motion.div
        variants={badgePop}
        className="absolute bottom-12 left-full ml-6 z-20 hidden lg:block"
      >
        <motion.div
          animate={reduce ? {} : { y: [0, 9, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
          className="rounded-[16px] bg-card/95 px-3.5 py-3 shadow-card backdrop-blur-sm"
        >
          <p className="flex items-center gap-1.5 text-[11px] font-medium text-ink">
            <CalendarMeetIcon size={13} className="text-violet" />
            Call activity
          </p>
          <HeatSwatch className="mt-1.5" />
        </motion.div>
      </motion.div>
    </div>
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
      className="relative overflow-hidden pt-[120px] pb-24"
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
        <InteractiveMesh className="opacity-70" />
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
                  className="mt-6 text-[clamp(36px,5vw,60px)] font-light leading-[1.12] tracking-[-0.03em] lg:text-[clamp(32px,3.4vw,48px)]"
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
                  className="mx-auto mt-8 max-w-[560px] text-[18px] font-light leading-[1.6] text-slate lg:mx-0"
                >
                  One keypress after every hang-up logs the call, queues the next lead, and
                  schedules the follow-up — the moment that used to kill your momentum just ends.
                </motion.p>

                <motion.div
                  variants={v(fadeUp)}
                  className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
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

                {/* Credibility micro-line */}
                <motion.p variants={v(fadeUp)} className="mt-5 text-[13px] font-medium text-iron">
                  Built from 1000+ real cold calls.
                </motion.p>

                {/* Concrete capability hints (no invented stats) */}
                <motion.div
                  variants={v(staggerContainer)}
                  className="mt-8 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start"
                >
                  {[
                    "CSV lead import",
                    "5-key outcome logging",
                    "Google Meet booking",
                    "WhatsApp follow-ups",
                  ].map((item) => (
                    <motion.span
                      key={item}
                      variants={v(fadeUp)}
                      className="cursor-default rounded-full border border-pebble bg-card px-4 py-1.5 text-[13px] font-medium text-slate transition-colors duration-200 hover:border-violet/40 hover:bg-violet/5 hover:text-violet"
                      {...(reduce ? {} : { whileHover: { y: -3, scale: 1.05 } })}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: hero visual — screenshot enters last, then badges pop in */}
          <motion.div
            variants={v(staggerContainer)}
            initial="hidden"
            animate="visible"
            transition={{ delayChildren: 0.55, staggerChildren: 0.09 }}
            {...(reduce ? {} : { style: { y: mockY, scale: mockScale } })}
          >
            <motion.div
              variants={v(badgePop)}
              className="relative mx-auto mt-12 w-full max-w-[640px] lg:mt-0"
            >
              <CallSessionMock reduce={reduce} />
              <FloatingBadges reduce={reduce} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
