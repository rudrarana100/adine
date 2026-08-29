import { motion } from "framer-motion";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";

const STEPS = [
  {
    number: "01",
    title: "Cold Call Session",
    description: "Start a dialing session, import leads, and begin calling — all in one flow.",
  },
  {
    number: "02",
    title: "Auto Status Updates",
    description:
      "Every call is auto-logged with duration, outcome, and timestamp — no manual entry.",
  },
  {
    number: "03",
    title: "Follow-up Center",
    description: "One-click WhatsApp follow-ups and email sequences keep leads warm automatically.",
  },
];

export default function HowItWorksAdine() {
  const v = useVariants();

  return (
    <section className="bg-surface-white py-[24px]">
      <div className="shell">
        <div className="mx-auto max-w-[720px]">
          <p className="eyebrow !text-text-secondary text-center">How It Works</p>
          <h2 className="mt-4 text-[clamp(28px,3.5vw,36px)] leading-[1.1] tracking-[-0.02em] text-text-primary text-center">
            Simple, high-volume cold calling
          </h2>
        </div>

        <motion.div
          variants={v(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid max-w-[720px] mx-auto grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {STEPS.map(({ number, title, description }) => (
            <motion.div key={title} variants={v(fadeUp)} className="text-center">
              <div className="flex flex-col items-center gap-3">
                <span className="font-jetbmono text-accent-blue text-[28px]">{number}</span>
                <h3 className="text-text-primary font-bold text-lg">{title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
