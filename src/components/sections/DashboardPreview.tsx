import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useVariants, fadeUp } from "@/lib/motion";
import PowerDialer from "./demo/PowerDialer";
import PipelineBoard from "./demo/PipelineBoard";
import FollowUpQueue from "./demo/FollowUpQueue";
import AnalyticsPanel from "./demo/AnalyticsPanel";

const TABS = ["Power Dialer", "Pipeline", "Follow-Ups", "Analytics"] as const;
type Tab = (typeof TABS)[number];

export default function DashboardPreview() {
  const [tab, setTab] = useState<Tab>("Power Dialer");
  const v = useVariants();

  return (
    <section id="tour" className="bg-canvas-white py-[80px]">
      <div className="shell grid gap-10 lg:grid-cols-[42%_1fr]">
        <div>
          <p className="eyebrow">Product tour</p>
          <h2 className="mt-3 text-[clamp(28px,3.6vw,40px)] leading-[1.2] tracking-[-0.02em]">
            The outbound stack, live on one screen.
          </h2>
          <p className="mt-4 max-w-[420px] text-[16px] leading-[1.6] text-steel">
            This is a working simulation, not a screenshot. Try the dialer, drag a deal across the
            pipeline, clear a follow-up, and watch the analytics react.
          </p>

          <ul className="mt-6 space-y-3 text-[14px] text-steel">
            {[
              ["Dial a lead", "and mark it interested, book a Meet, or schedule a callback."],
              ["Drag deals", "between pipeline stages — counts and value update live."],
              ["Complete follow-ups", "and they drop out of the queue with a logged activity."],
              ["Watch the dashboard", "aggregate every action into call and conversion charts."],
            ].map(([head, rest]) => (
              <li key={head} className="flex items-start gap-3">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ember"
                  aria-hidden="true"
                />
                <span>
                  <span className="font-display tracking-[-0.02em] text-graphite">{head}</span>{" "}
                  {rest}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <motion.div
          variants={v(fadeUp)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="rounded-data bg-ash p-6"
        >
          <div
            role="tablist"
            aria-label="Product views"
            className="flex gap-5 overflow-x-auto border-b border-mist"
          >
            {TABS.map((t) => (
              <button
                key={t}
                role="tab"
                type="button"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`font-display -mb-px shrink-0 border-b-2 pb-3 text-[14px] tracking-[-0.02em] ${
                  tab === t ? "border-ember text-graphite" : "border-transparent text-slate"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {tab === "Power Dialer" && <PowerDialer />}
                {tab === "Pipeline" && <PipelineBoard />}
                {tab === "Follow-Ups" && <FollowUpQueue />}
                {tab === "Analytics" && <AnalyticsPanel />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
