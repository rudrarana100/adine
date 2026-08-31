import { motion } from "framer-motion";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";

const STEPS = [
  {
    number: "01",
    title: "Import your leads",
    description:
      "Upload a CSV or paste leads from any source. Adine auto-detects duplicates and organizes them into ready-to-dial batches.",
    accent: "bg-violet/10 text-violet",
  },
  {
    number: "02",
    title: "Start a session",
    description:
      "Hit start and begin dialing. Leads are presented one at a time in a clean, distraction-free interface built for speed.",
    accent: "bg-sky/30 text-[#2563eb]",
  },
  {
    number: "03",
    title: "Follow up instantly",
    description:
      "After each call, send a one-click WhatsApp follow-up or schedule a callback — no copy-pasting, no tab switching.",
    accent: "bg-mint/30 text-green-600",
  },
];

export default function HowItWorksAdine() {
  const v = useVariants();

  return (
    <section id="how" className="bg-card py-[96px]">
      <div className="shell">
        <div className="mx-auto max-w-[720px] text-center">
          <span className="section-eyebrow">How It Works</span>
          <h2 className="mt-4 text-[clamp(28px,3.5vw,44px)] font-light leading-[1.15] tracking-[-0.02em] text-ink">
            From import to follow-up in three steps
          </h2>
          <p className="mt-4 text-[17px] font-light leading-[1.6] text-slate">
            No complex setup. No training required. Just import, call, and close.
          </p>
        </div>

        <motion.div
          variants={v(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mt-16 grid max-w-[960px] grid-cols-1 gap-8 md:grid-cols-3"
        >
          {STEPS.map(({ number, title, description, accent }, i) => (
            <motion.div key={title} variants={v(fadeUp)} className="relative text-center">
              {/* Connector line (desktop) */}
              {i < STEPS.length - 1 && (
                <div
                  className="absolute top-8 left-[60%] hidden h-[1px] w-[calc(100%-20%)] md:block"
                  style={{ background: "linear-gradient(90deg, var(--color-pebble), transparent)" }}
                  aria-hidden="true"
                />
              )}

              <div
                className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-[20px] font-semibold text-[18px] ${accent}`}
              >
                {number}
              </div>
              <h3 className="text-[18px] font-medium text-ink">{title}</h3>
              <p className="mt-2 text-[15px] font-light leading-[1.6] text-slate">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
