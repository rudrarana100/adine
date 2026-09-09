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
import {
  PhoneIcon,
  ChatIcon,
  MapPinIcon,
  CalendarMeetIcon,
  FlameIcon,
} from "@/components/icons/FeatureIcons";
import {
  AuroraField,
  GlowOrb,
  GridField,
  SignalRings,
} from "@/components/backgrounds/AnimatedBackgrounds";

/* Typewriter gradient accent — the cold-calling differentiator */
const accentWords = ["actually pick up the phone", "close more deals", "never miss a call"];
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
    <span className="mt-2 block min-h-[1.2em] text-[clamp(34px,4.8vw,54px)] font-light leading-[1.12] tracking-[-0.03em] gradient-text">
      {text}
      {!reduce && (
        <span className="ml-0.5 inline-block h-[1em] w-[3px] align-middle bg-violet opacity-60 animate-pulse" />
      )}
    </span>
  );
}

/* ── Animated waveform bars (equalizer), drives the "in call" strip ── */
function WaveformBars({ reduce, active }: { reduce: boolean; active: boolean }) {
  const bars = [10, 18, 26, 14, 22, 30, 16, 24, 12, 20];
  return (
    <span className="flex h-5 items-end gap-[3px]" aria-hidden="true">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-violet/70"
          animate={
            reduce || !active
              ? { height: 4, opacity: 0.25 }
              : { height: [4, h, 4], opacity: [0.4, 1, 0.4] }
          }
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: i * 0.09 }}
        />
      ))}
    </span>
  );
}

/* ── Call Session UI mock ── */
const OUTCOMES = [
  { key: "1", label: "No Answer" },
  { key: "2", label: "Invalid" },
  { key: "3", label: "Gatekeeper" },
  { key: "4", label: "Not Interested" },
  { key: "5", label: "Interested" },
  { key: "6", label: "Schedule" },
];

function CallSessionMock({ reduce }: { reduce: boolean }) {
  const [pressed, setPressed] = useState(4);
  const [inCall, setInCall] = useState(true);
  const [pressFx, setPressFx] = useState(0);

  // Loop: "Interested" (key 5) looks pressed every few seconds, then advance
  useEffect(() => {
    if (reduce) return;
    const cycle = () => {
      setPressed(4);
      setInCall(true);
      setPressFx((p) => p + 1);
      const t1 = setTimeout(() => setPressed(5), 1800);
      const t2 = setTimeout(() => setInCall(false), 2600);
      const t3 = setTimeout(cycle, 3800);
      return [t1, t2, t3];
    };
    const timers = cycle();
    return () => timers.forEach((t) => typeof t === "number" && clearTimeout(t));
  }, [reduce]);

  return (
    <motion.div
      className="relative mx-auto mt-16 max-w-[640px]"
      animate={reduce ? {} : { y: [0, -7, 0] }}
      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Pulsing signal rings behind the mock */}
      <SignalRings reduce={reduce} className="-inset-10" />

      <div className="card-surface relative z-10 overflow-hidden rounded-[24px] bg-card p-5 shadow-elevated sm:p-6">
        {/* Session header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span
              className={`relative flex h-2.5 w-2.5 rounded-full ${inCall ? "bg-red-500" : "bg-slate-300"}`}
              aria-hidden="true"
            >
              {inCall && !reduce && (
                <span className="absolute inset-0 rounded-full bg-red-500 opacity-60 [animation:outcome-pulse_1.8s_ease-in-out_infinite]" />
              )}
            </span>
            <p className="text-[15px] font-medium text-ink">Cold call session</p>
            <WaveformBars reduce={reduce} active={inCall} />
          </div>
          <span className="rounded-full bg-violet/10 px-3 py-1 text-[12px] font-semibold text-violet">
            Lead 3 of 26
          </span>
        </div>

        {/* Lead card */}
        <div className="mt-4 rounded-[16px] border border-pebble/60 bg-canvas/60 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet/15 text-[13px] font-semibold text-violet">
                RM
              </span>
              <div>
                <p className="text-[15px] font-medium text-ink">Rahul Mehta</p>
                <p className="text-[13px] text-slate">Meridian Technologies</p>
              </div>
            </div>
          </div>
          <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[13px] text-slate sm:grid-cols-4">
            <div className="flex items-center gap-1.5">
              <PhoneIcon size={14} />
              <dd className="truncate">+91 98204 55123</dd>
            </div>
            <dd className="text-iron">Software</dd>
            <dd className="text-iron">Mumbai</dd>
            <dd className="text-iron">Est. ₹4.2L</dd>
          </dl>
        </div>

        {/* Quick actions */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-violet px-3.5 py-2 text-[13px] font-medium text-white">
            <PhoneIcon size={15} /> Call lead
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-mint/40 px-3.5 py-2 text-[13px] font-medium text-green-700">
            <ChatIcon size={15} /> WhatsApp
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sky/40 px-3.5 py-2 text-[13px] font-medium text-sky-700">
            <MapPinIcon size={15} /> Maps
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-lavender/50 px-3.5 py-2 text-[13px] font-medium text-ultraviolet">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <rect x="3" y="5" width="14" height="14" rx="3" />
              <path d="M17 7l4-2v12l-4-2" />
            </svg>
            Gmail
          </span>
        </div>

        {/* Outcome row with keyboard shortcuts */}
        <div className="mt-4 rounded-[16px] bg-canvas p-3">
          <p className="mb-2.5 px-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-iron">
            Call outcome
          </p>
          <div className="flex flex-wrap gap-1.5">
            {OUTCOMES.map((o, i) => {
              const isPressed = pressed === i;
              const isInterested = i === 4;
              return (
                <motion.span
                  key={isInterested ? `${o.key}-${pressFx}` : o.key}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12.5px] ${
                    isPressed
                      ? "border-violet bg-violet text-white shadow-pill"
                      : "border-pebble bg-card text-slate"
                  }`}
                  {...(isInterested && !reduce ? { initial: { scale: 1 } } : {})}
                  animate={
                    isInterested && isPressed && !reduce ? { scale: [0.92, 1.03, 1] } : { scale: 1 }
                  }
                  transition={
                    isInterested && isPressed && !reduce
                      ? { duration: 0.35, ease: "easeOut" }
                      : { duration: 0.15 }
                  }
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded text-[10px] font-bold ${
                      isPressed ? "bg-white/20 text-white" : "bg-canvas text-iron"
                    }`}
                  >
                    {o.key}
                  </span>
                  {o.label}
                </motion.span>
              );
            })}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-pebble bg-card px-3 py-1.5 text-[12.5px] text-slate">
              <span className="flex h-4 w-4 items-center justify-center rounded bg-canvas text-[10px] font-bold text-iron">
                S
              </span>
              Skip
            </span>
          </div>
        </div>

        {/* Queue progress */}
        <div className="mt-4 flex gap-1.5" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 flex-1 rounded-full ${
                i < 2 ? "bg-violet/50" : i === 2 ? "bg-violet" : "bg-canvas"
              }`}
            />
          ))}
        </div>
      </div>

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
      {/* Phone dialer badge — top left */}
      <motion.div variants={badgePop} className="absolute left-0 top-8 z-20 hidden lg:block">
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

      {/* WhatsApp badge — top right, with send loop */}
      <motion.div variants={badgePop} className="absolute right-0 top-4 z-20 hidden lg:block">
        <motion.div
          animate={reduce ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 6.6, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
          className="flex items-center rounded-[16px] bg-card/95 px-3.5 py-2.5 shadow-card backdrop-blur-sm"
        >
          <WhatsAppBadge reduce={reduce} />
        </motion.div>
      </motion.div>

      {/* Streak badge — bottom left */}
      <motion.div variants={badgePop} className="absolute left-0 bottom-16 z-20 hidden xl:block">
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

      {/* Heatmap swatch badge — bottom right */}
      <motion.div variants={badgePop} className="absolute right-6 bottom-10 z-20 hidden lg:block">
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
      className="relative overflow-hidden pt-[120px] pb-[40px]"
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
        <GridField className="opacity-70" />
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
        <motion.div
          {...(reduce ? {} : { style: { y: contentY } })}
          className="mx-auto max-w-[820px] text-center"
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
                  <span className="section-eyebrow block">Cold-calling CRM for India</span>
                </motion.span>
              </motion.div>

              {/* Headline: brand + gradient typewriter accent */}
              <motion.h1
                variants={v(heroWordContainer)}
                className="mt-6 text-[clamp(36px,5vw,60px)] font-light leading-[1.08] tracking-[-0.03em] text-ink"
              >
                {["Adine", "makes", "you"].map((word, i) => (
                  <motion.span
                    key={i}
                    variants={v(heroWord)}
                    className="inline-block whitespace-nowrap"
                  >
                    {word}
                    {i < 2 && <span className="mx-[0.22em]">&nbsp;</span>}
                  </motion.span>
                ))}
                <TypewriterAccent reduce={reduce} />
              </motion.h1>

              <motion.p
                variants={v(fadeUp)}
                className="mx-auto mt-8 max-w-[560px] text-[18px] font-light leading-[1.6] text-slate"
              >
                A call session queue, one-keypress call logging, and automatic WhatsApp follow-ups —
                built for founders who dial 100+ prospects a week.
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
                  Open the app
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
                <a href="#how" className="btn-ghost-pill">
                  See how it works
                </a>
              </motion.div>

              {/* Concrete capability hints (no invented stats) */}
              <motion.div
                variants={v(staggerContainer)}
                className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
              >
                {[
                  "Google Maps lead import",
                  "6-key outcome logging",
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

        {/* Hero visual: mock card enters last, then badges pop in */}
        <motion.div
          variants={v(staggerContainer)}
          initial="hidden"
          animate="visible"
          transition={{ delayChildren: 0.55, staggerChildren: 0.09 }}
          {...(reduce ? {} : { style: { y: mockY, scale: mockScale } })}
        >
          <motion.div variants={v(badgePop)} className="relative mx-auto max-w-[720px]">
            <CallSessionMock reduce={reduce} />
            <FloatingBadges reduce={reduce} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
