import { motion } from "framer-motion";
import { Kanban, Target, ChartLineUp, IdentificationCard, UsersThree } from "@phosphor-icons/react";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";

const LEADS = [
  { name: "Meridian Technologies", score: 87 },
  { name: "Coralth Systems", score: 71 },
  { name: "Opacus Group", score: 55 },
  { name: "Runewell Labs", score: 23 },
];

const STAGES = [
  { name: "Qualify", deals: ["Fenwick", "Cerida"] },
  { name: "Demo", deals: ["Paravox"] },
  { name: "Proposal", deals: ["Tenloft", "Vortex"] },
  { name: "Closed", deals: ["Brightledge"] },
];

export default function FeaturesGrid() {
  const v = useVariants();

  return (
    <section id="features" className="bg-canvas-white py-[80px]">
      <div className="shell">
        <p className="eyebrow">Platform capabilities</p>
        <h2 className="mt-3 text-[clamp(30px,4vw,40px)] leading-[1.2] tracking-[-0.02em]">
          Everything your revenue team needs.
          <br />
          Nothing they don&apos;t.
        </h2>

        <motion.div
          variants={v(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 grid gap-4"
        >
          <div className="grid gap-4 lg:grid-cols-[60%_1fr]">
            <motion.article
              variants={v(fadeUp)}
              className="bg-ivory p-8 lg:p-12"
              style={{ borderRadius: "6px 0px 0px" }}
            >
              <Kanban size={24} weight="thin" aria-hidden="true" />
              <h3 className="mt-4 text-[24px] tracking-[-0.02em]">Pipeline Intelligence</h3>
              <p className="mt-3 max-w-[460px] text-[14px] leading-[1.6] text-steel">
                Drag-and-drop deal stages, weighted probability, and AI-suggested next actions. Your
                pipeline finally reflects reality.
              </p>
              <div className="mt-8 grid grid-cols-4 gap-2">
                {STAGES.map((stage) => (
                  <div key={stage.name}>
                    <p className="text-[11px] font-medium tracking-[0.04em] text-slate uppercase">
                      {stage.name}
                    </p>
                    <div className="mt-2 space-y-2">
                      {stage.deals.map((d) => (
                        <div
                          key={d}
                          className="rounded-sm bg-canvas-white px-2.5 py-2 text-[12px] text-graphite"
                        >
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.article>

            <motion.article variants={v(fadeUp)} className="rounded-data bg-fog p-8">
              <Target size={24} weight="thin" aria-hidden="true" />
              <h3 className="mt-4 text-[24px] tracking-[-0.02em]">AI Lead Scoring</h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-steel">
                47 behavioural signals. Prioritise every lead in seconds.
              </p>
              <ul className="mt-6 space-y-3">
                {LEADS.map((lead, i) => (
                  <li key={lead.name} className="flex items-center gap-3">
                    <div className="h-1.5 flex-1 rounded-sm bg-mist">
                      <div
                        className={`h-full rounded-sm ${i === 0 ? "bg-ember" : "bg-graphite"}`}
                        style={{ width: `${lead.score}%` }}
                      />
                    </div>
                    <span className="font-display w-8 text-right text-[14px] tracking-[-0.02em]">
                      {lead.score}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.article>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <motion.article variants={v(fadeUp)} className="rounded-card bg-fog p-6">
              <ChartLineUp size={24} weight="thin" aria-hidden="true" />
              <h3 className="mt-4 text-[18px] tracking-[-0.02em]">Revenue Forecasting</h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-steel">
                ML-based quarterly revenue forecasting, refreshed every weekday morning.
              </p>
              <svg viewBox="0 0 160 40" className="mt-5 h-10 w-full" aria-hidden="true">
                <polyline
                  points="2,34 34,26 66,29 98,14 130,18 158,4"
                  fill="none"
                  stroke="var(--color-brass)"
                  strokeWidth="2"
                />
              </svg>
            </motion.article>

            <motion.article variants={v(fadeUp)} className="rounded-card bg-fog p-6">
              <IdentificationCard size={24} weight="thin" aria-hidden="true" />
              <h3 className="mt-4 text-[18px] tracking-[-0.02em]">Contact Intelligence</h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-steel">
                Auto-enriched profiles with role, tenure, and buying-committee position.
              </p>
              <div className="mt-5 rounded-sm bg-canvas-white p-3">
                <p className="font-display text-[13px] tracking-[-0.02em]">Sarah Chen</p>
                <p className="text-[12px] text-slate">VP Sales · Meridian Technologies</p>
                <span className="mt-2 inline-block rounded-2xl bg-ivory px-2 py-[2px] text-[11px] text-brass">
                  Decision maker
                </span>
              </div>
            </motion.article>

            <motion.article variants={v(fadeUp)} className="rounded-card bg-fog p-6">
              <UsersThree size={24} weight="thin" aria-hidden="true" />
              <h3 className="mt-4 text-[18px] tracking-[-0.02em]">Team Collaboration</h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-steel">
                Shared notes, @mentions, and explicit deal ownership on every record.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["MW", "PN", "JO"].map((initials) => (
                    <span
                      key={initials}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-graphite text-[10px] text-canvas-white ring-2 ring-fog"
                    >
                      {initials}
                    </span>
                  ))}
                </div>
                <p className="rounded-sm bg-canvas-white px-3 py-2 text-[12px] text-steel">
                  @marcus can you loop in legal?
                </p>
              </div>
            </motion.article>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
