import { motion } from "framer-motion";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";

const FEATURES = [
  {
    title: "Cold Call Sessions",
    text: "Import leads from any source and start dialing immediately. Automatic call logging and disposition tracking keeps your pipeline clean.",
  },
  {
    title: "Auto Status Updates",
    text: "Every call outcome is auto-logged with timestamps and duration. No more manual data entry — your CRM stays up to date in real time.",
  },
  {
    title: "WhatsApp One-Click",
    text: "Confirm appointments and send follow-up messages with a single click. Stay in touch with leads instantly, no copy-pasting needed.",
  },
];

export default function FeatureShowcaseAdine() {
  const v = useVariants();

  return (
    <section className="bg-surface-white py-[24px]">
      <div className="shell">
        <div className="mx-auto max-w-[960px]">
          <p className="eyebrow !text-text-secondary text-center">Features</p>
          <h2 className="mt-4 text-[clamp(28px,3.5vw,36px)] leading-[1.1] tracking-[-0.02em] text-text-primary text-center">
            Built for the way you work
          </h2>
        </div>

        <motion.div
          variants={v(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid max-w-[960px] mx-auto grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map(({ title, text }, index) => (
            <motion.div
              key={title}
              variants={v(fadeUp)}
              className="flex flex-col lg:flex-row gap-6 items-center"
            >
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="relative rounded-card border border-border-subtle shadow-subtle overflow-hidden bg-border-subtle w-80"
              >
                <div
                  className="absolute inset-0 bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity 200ms ease-out"
                  aria-hidden="true"
                />
                <div
                  className="relative flex flex-col items-center justify-center pt-8 pb-6 text-center"
                  style={{ height: "200px" }}
                  aria-hidden="true"
                >
                  <span className="text-text-tertiary text-sm uppercase mb-2">{title}</span>
                </div>
              </motion.div>

              <div className="flex-1 px-6 py-8">
                <h3 className="text-text-primary font-bold text-lg mb-2">{title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
