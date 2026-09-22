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
import { PhoneIcon, ChatIcon } from "@/components/icons/FeatureIcons";
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
    <div className="pointer-events-none absolute inset-0 z-30" aria-hidden="true">
      {/* WhatsApp confirmation — overlaps the card's top-right corner */}
      <motion.div variants={badgePop} className="absolute -top-5 -right-3 hidden md:block">
        <motion.div
          animate={reduce ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          className="flex items-center gap-2 rounded-2xl border border-white/10 bg-card/95 px-3 py-2.5 shadow-elevated backdrop-blur-md"
        >
          <WhatsAppBadge reduce={reduce} />
        </motion.div>
      </motion.div>

      {/* Dialing live status — overlaps the card's bottom-left corner */}
      <motion.div variants={badgePop} className="absolute -bottom-5 -left-3 hidden md:block">
        <motion.div
          animate={reduce ? {} : { y: [0, -5, 0] }}
          transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-card/95 px-3.5 py-2.5 shadow-elevated backdrop-blur-md"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet/10 text-violet">
            <PhoneIcon size={18} />
          </span>
          <div>
            <p className="flex items-center gap-1.5 text-[12px] font-medium text-ink">
              Dialing
              <motion.span
                className="inline-block h-1.5 w-1.5 rounded-full bg-green-500"
                animate={reduce ? {} : { opacity: [1, 0.25, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </p>
            <p className="text-[11px] text-slate">Lead 4 of 26</p>
          </div>
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
              <FloatingBadges reduce={reduce} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
