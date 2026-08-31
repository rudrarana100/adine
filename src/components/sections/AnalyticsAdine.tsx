import { motion } from "framer-motion";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";
import { FlameIcon, CheckIcon } from "@/components/icons/FeatureIcons";

/* 90-day call heatmap mock — boolean intensity per weekday */
const WEEKS = Array.from({ length: 13 }, () => [3, 4, 1, 3, 5, 2, 0]);

function HeatmapMock() {
  return (
    <div className="flex gap-1.5" aria-hidden="true">
      {WEEKS.map((week, w) => (
        <div key={w} className="flex flex-col gap-1.5">
          {week.map((level, d) => (
            <span
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
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsAdine() {
  const v = useVariants();

  return (
    <section id="analytics" className="bg-violet py-[96px] text-white">
      <div className="shell">
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
              {[
                { label: "Day streak", value: "14", icon: FlameIcon },
                { label: "Calls today", value: "58" },
                { label: "Meeting booked", value: "4" },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-[18px] bg-white p-4 text-center">
                  {Icon && <Icon size={20} className="mx-auto mb-1 text-apricot" />}
                  <p className="text-[22px] font-semibold tabular-nums text-ink">{value}</p>
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
              <HeatmapMock />
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
