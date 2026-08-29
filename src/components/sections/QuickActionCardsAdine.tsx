import { motion } from "framer-motion";
import { PhoneCall, CheckCircle, Clock } from "@phosphor-icons/react";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";

const QUICK_ACTIONS = [
  { label: "Cold Call Session", Icon: PhoneCall },
  { label: "Auto Status Updates", Icon: CheckCircle },
  { label: "WhatsApp One-Click", Icon: PhoneCall },
  { label: "Follow-up Center", Icon: Clock },
];

export default function QuickActionCardsAdine() {
  const v = useVariants();

  return (
    <section className="bg-surface-white py-[24px]">
      <div className="shell">
        <div className="mx-auto max-w-[960px]">
          <p className="eyebrow !text-text-secondary text-center">Quick Actions</p>
          <h2 className="mt-4 text-[clamp(28px,3.5vw,36px)] leading-[1.1] tracking-[-0.02em] text-text-primary text-center">
            Direct access to what matters most
          </h2>
        </div>

        <motion.div
          variants={v(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4"
        >
          {QUICK_ACTIONS.map(({ label, Icon }) => (
            <motion.article
              key={label}
              variants={v(fadeUp)}
              className="card-premium hover:card-premium-hover cursor-pointer transition-all duration-200"
            >
              <div className="h-11 w-11 flex items-center justify-center rounded-pill bg-accent-soft mx-auto mb-3">
                <Icon size={18} className="text-accent-blue" aria-hidden="true" />
              </div>
              <h3 className="text-center text-text-secondary text-sm">{label}</h3>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
