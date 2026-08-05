import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useVariants, fadeUp } from "@/lib/motion";

const TABS = ["Pipeline", "Forecasting", "Reports", "Contacts"] as const;
type Tab = (typeof TABS)[number];

const PIPELINE = [
  { stage: "Qualify", deals: [["Fenwick", "$84K"], ["Cerida", "$62K"], ["Opacus", "$41K"]] },
  { stage: "Demo Scheduled", deals: [["Paravox", "$220K"], ["Runewell", "$96K"]] },
  { stage: "Proposal Sent", deals: [["Tenloft", "$310K"], ["Vortex", "$155K"]] },
  { stage: "Negotiation", deals: [["Brightledge", "$500K"], ["Meridian", "$430K"]] },
];

function TabBody({ tab }: { tab: Tab }) {
  if (tab === "Pipeline") {
    return (
      <div>
        <div className="flex items-end justify-between">
          <p className="eyebrow">Open pipeline</p>
          <p className="font-display text-[24px] tracking-[-0.02em]">$4.2M</p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {PIPELINE.map((col) => (
            <div key={col.stage}>
              <p className="text-[11px] font-medium tracking-[0.04em] text-slate uppercase">
                {col.stage}
              </p>
              <div className="mt-2 space-y-2">
                {col.deals.map(([name, value]) => (
                  <div key={name} className="rounded-sm bg-canvas-white p-3">
                    <p className="font-display text-[13px] tracking-[-0.02em]">{name}</p>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-[13px] text-brass">{value}</span>
                      <span className="h-2 w-2 rounded-full bg-graphite" aria-hidden="true" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (tab === "Forecasting") {
    const bars = [48, 62, 55, 74, 81, 93];
    return (
      <div>
        <p className="eyebrow">Weighted quarterly forecast</p>
        <p className="font-display mt-2 text-[32px] tracking-[-0.02em]">$847K</p>
        <div className="mt-6 flex h-40 items-end gap-3">
          {bars.map((h, i) => (
            <div
              key={h}
              className={`flex-1 rounded-t-sm ${i === bars.length - 1 ? "bg-ember" : "bg-graphite/80"}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <p className="mt-3 text-[13px] text-slate">Apr → Sep · confidence band ±4%</p>
      </div>
    );
  }

  if (tab === "Reports") {
    return (
      <div>
        <p className="eyebrow">Win rate by source</p>
        <ul className="mt-4 space-y-3">
          {[
            ["Outbound sequences", 38],
            ["Inbound demo requests", 61],
            ["Partner referrals", 74],
            ["Event pipeline", 29],
          ].map(([label, value], i) => (
            <li key={label as string} className="flex items-center gap-4">
              <span className="w-44 text-[13px] text-steel">{label}</span>
              <div className="h-2 flex-1 rounded-sm bg-mist">
                <div
                  className={`h-full rounded-sm ${i === 2 ? "bg-ember" : "bg-graphite/80"}`}
                  style={{ width: `${value}%` }}
                />
              </div>
              <span className="font-display w-10 text-right text-[13px] tracking-[-0.02em]">
                {value}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <p className="eyebrow">Contact intelligence</p>
      <ul className="mt-4 space-y-2">
        {[
          ["Sarah Chen", "VP Sales · Meridian", "Decision maker"],
          ["Marcus Webb", "Head of Sales · Coralth", "Champion"],
          ["Priya Nair", "CRO · Paravox Labs", "Economic buyer"],
        ].map(([name, role, tag]) => (
          <li
            key={name}
            className="flex items-center justify-between rounded-sm bg-canvas-white p-3"
          >
            <div>
              <p className="font-display text-[13px] tracking-[-0.02em]">{name}</p>
              <p className="text-[12px] text-slate">{role}</p>
            </div>
            <span className="rounded-2xl bg-ivory px-2.5 py-1 text-[11px] text-brass">{tag}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DashboardPreview() {
  const [tab, setTab] = useState<Tab>("Pipeline");
  const v = useVariants();

  return (
    <section id="tour" className="bg-canvas-white py-[80px]">
      <div className="shell grid gap-10 lg:grid-cols-[45%_1fr]">
        <div>
          <p className="eyebrow">Product tour</p>
          <h2 className="mt-3 text-[clamp(28px,3.6vw,40px)] leading-[1.2] tracking-[-0.02em]">
            See exactly where every deal stands. At a glance.
          </h2>
          <p className="mt-4 max-w-[420px] text-[16px] leading-[1.6] text-steel">
            SalesTracker CRM renders your pipeline, forecast, reports, and contact intelligence on
            one surface — updated automatically from email and calendar activity.
          </p>
        </div>

        <motion.div
          variants={v(fadeUp)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-data bg-ash p-6"
        >
          <div
            role="tablist"
            aria-label="Dashboard views"
            className="flex gap-5 border-b border-mist"
          >
            {TABS.map((t) => (
              <button
                key={t}
                role="tab"
                type="button"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`font-display -mb-px border-b-2 pb-3 text-[14px] tracking-[-0.02em] ${
                  tab === t ? "border-ember text-graphite" : "border-transparent text-slate"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-6 min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TabBody tab={tab} />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
