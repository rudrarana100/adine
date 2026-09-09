import { motion, useReducedMotion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";
import { Ambient } from "@/components/backgrounds/Ambient";
import { FlameIcon, CheckIcon } from "@/components/icons/FeatureIcons";

/* Count-up number that animates 0 → value when it scrolls into view (~800ms) */
function Counter({
  value,
  reduce,
  className,
}: {
  value: number;
  reduce: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(reduce ? String(value) : "0");

  useEffect(() => {
    if (reduce || !inView) return;
    const controls = animate(0, value, {
      duration: 0.8,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(String(Math.round(v))),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  useEffect(() => {
    if (reduce) setDisplay(String(value));
  }, [reduce, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

/* Decorative floating white glyphs for the violet section */
function WhiteGlyphs({ reduce }: { reduce: boolean }) {
  const items = [
    {
      Icon: FlameIcon,
      className: "left-[6%] top-[18%]",
      size: 34,
      delay: 0,
      dur: 13,
      y: -18,
      x: 12,
      o: 0.5,
    },
    {
      Icon: CheckIcon,
      className: "right-[8%] top-[24%]",
      size: 28,
      delay: 1.2,
      dur: 11,
      y: 16,
      x: -14,
      o: 0.4,
    },
    {
      Icon: FlameIcon,
      className: "left-[16%] bottom-[20%]",
      size: 24,
      delay: 2,
      dur: 14,
      y: 14,
      x: 10,
      o: 0.35,
    },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {items.map(({ Icon, className, size, delay, dur, y, x, o }, i) => (
        <motion.div
          key={i}
          className={`absolute ${className}`}
          animate={
            reduce
              ? {}
              : { y: [0, y, 0], x: [0, x, 0], rotate: [0, 10, 0], opacity: [o, o * 1.5, o] }
          }
          transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
        >
          <Icon size={size} className="text-white" />
        </motion.div>
      ))}
    </div>
  );
}

/* 90-day call heatmap mock — boolean intensity per weekday */
const WEEKS = Array.from({ length: 13 }, () => [3, 4, 1, 3, 5, 2, 0]);

function HeatmapMock({ reduce, active }: { reduce: boolean; active: boolean }) {
  return (
    <div className="flex gap-1.5" aria-hidden="true">
      {WEEKS.map((week, w) => (
        <div key={w} className="flex flex-col gap-1.5">
          {week.map((level, d) => (
            <motion.span
              key={`${w}-${d}`}
              className={`h-4 w-4 rounded-[4px] ${
                level === 0
                  ? "bg-white/[0.08]"
                  : level === 1
                    ? "bg-white/[0.22]"
                    : level === 2
                      ? "bg-white/[0.35]"
                      : level === 3
                        ? "bg-white/[0.5]"
                        : level === 4
                          ? "bg-violet-200"
                          : "bg-white/[0.9]"
              }`}
              animate={
                reduce || !active
                  ? { opacity: 1, scale: 1 }
                  : {
                      opacity: [0, 1, 1, 0.85, 1],
                      scale: [0.4, 1.08, 1, 1, 1],
                    }
              }
              transition={{
                duration: 2.4,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeOut",
                delay: (w * 5 + d) * 0.035,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsAdine() {
  const v = useVariants();
  const reduce = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.25 });

  return (
    <section
      id="analytics"
      ref={sectionRef}
      className="relative overflow-hidden bg-violet py-[96px] text-white"
    >
      {/* Glow aura + animated white glyphs — only mounted near the viewport */}
      <Ambient className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-32 left-[6%] h-[460px] w-[460px] rounded-full"
          style={{
            background:
              "radial-gradient(460px circle at 50% 50%, rgba(255,255,255,0.16), transparent 60%)",
          }}
          animate={reduce ? {} : { scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-[4%] -bottom-40 h-[560px] w-[560px] rounded-full"
          style={{
            background:
              "radial-gradient(560px circle at 50% 50%, rgba(255,255,255,0.12), transparent 60%)",
          }}
          animate={reduce ? {} : { scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
        <WhiteGlyphs reduce={reduce} />
      </Ambient>

      <div className="shell relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: copy */}
          <motion.div
            variants={v(staggerContainer)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.span
              variants={v(fadeUp)}
              className="inline-block rounded-full bg-white/15 px-5 py-2 text-[13px] font-medium text-white/80"
            >
              Analytics & gamification
            </motion.span>

            <motion.h2
              variants={v(fadeUp)}
              className="mt-5 text-[clamp(28px,3.5vw,44px)] font-light leading-[1.15] tracking-[-0.02em]"
            >
              Makes cold calling feel like a game, not a chore
            </motion.h2>

            <motion.p
              variants={v(fadeUp)}
              className="mt-5 max-w-[460px] text-[17px] font-light leading-[1.6] text-white/75"
            >
              Track your daily goal, keep a streak alive, and watch your 90-day call heatmap fill
              in. Hit your daily target and a celebration modal fires — momentum you can actually
              feel.
            </motion.p>

            <motion.ul variants={v(fadeUp)} className="mt-6 space-y-3">
              {[
                "Daily goal tracking with a live streak counter",
                "A 90-day call heatmap that fills with every session",
                "Peak-hour analysis tells you when to dial",
                "A live conversion funnel from calls to booked meetings",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[15px] font-light text-white/85"
                >
                  <CheckIcon size={18} className="mt-0.5 shrink-0 text-mint" />
                  {item}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right: analytics dashboard mock */}
          <motion.div
            variants={v(staggerContainer)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-[28px] bg-white/10 p-6 backdrop-blur-sm"
          >
            {/* streak / stat row */}
            <motion.div variants={v(fadeUp)} className="mb-5 grid grid-cols-3 gap-3">
              {(
                [
                  { label: "Day streak", value: 14, icon: FlameIcon },
                  { label: "Calls today", value: 58 },
                  { label: "Meeting booked", value: 4 },
                ] as {
                  label: string;
                  value: number;
                  icon?: (props: { size?: number; className?: string }) => React.ReactNode;
                }[]
              ).map(({ label, value, icon }) => (
                <div key={label} className="rounded-[18px] bg-white p-4 text-center">
                  {icon &&
                    (() => {
                      const Icon = icon;
                      return <Icon size={20} className="mx-auto mb-1 text-apricot" />;
                    })()}
                  <p className="text-[22px] font-semibold tabular-nums text-ink">
                    <Counter value={value} reduce={reduce} />
                  </p>
                  <p className="text-[11px] text-slate">{label}</p>
                </div>
              ))}
            </motion.div>

            {/* heatmap */}
            <motion.div variants={v(fadeUp)} className="rounded-[18px] bg-white p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[13px] font-medium text-ink">90-day call heatmap</p>
                <span className="rounded-full bg-violet/10 px-2.5 py-0.5 text-[11px] font-medium text-violet">
                  Personal best: 168
                </span>
              </div>
              <HeatmapMock reduce={reduce} active={inView || reduce} />
              <div className="mt-3 flex items-center justify-end gap-1 text-[10px] text-iron">
                Less
                {[0, 1, 2, 3, 4, 5].map((l) => (
                  <span
                    key={l}
                    className={`h-3 w-3 rounded-[3px] ${
                      l === 0 ? "bg-canvas" : l === 5 ? "bg-violet" : "bg-violet/30"
                    }`}
                  />
                ))}
                More
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
