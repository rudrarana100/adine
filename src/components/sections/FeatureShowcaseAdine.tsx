import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";

/* ─── Feature card data with rotating pastel accent surfaces ─── */
const FEATURES = [
  {
    title: "Cold Call Sessions",
    text: "Import leads from any source and start dialing immediately. Automatic call logging and disposition tracking keeps your pipeline clean.",
    wash: "bg-violet/6",
    iconBg: "bg-violet/12",
    icon: "dialer",
  },
  {
    title: "Auto Status Updates",
    text: "Every call outcome is logged with timestamps and duration. Your CRM stays current in real time — zero manual data entry.",
    wash: "bg-mint/20",
    iconBg: "bg-green-500/10",
    icon: "check",
  },
  {
    title: "WhatsApp One-Click",
    text: "Send follow-up messages and appointment confirmations with a single tap. Phone numbers are auto-formatted every time.",
    wash: "bg-sky/25",
    iconBg: "bg-sky/30",
    icon: "whatsapp",
  },
];

/* ─── Custom SVG feature icons ─── */
function FeatureIcon({ type, className }: { type: string; className?: string }) {
  if (type === "dialer") {
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={className}>
        <rect x="10" y="4" width="20" height="32" rx="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="20" cy="32" r="2" fill="currentColor" />
        <circle cx="20" cy="14" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M20 11.5v5M17.5 14h5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (type === "check") {
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={className}>
        <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="2" />
        <path
          d="M13 20.5l4.5 4.5 9-10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  /* whatsapp */
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={className}>
      <path
        d="M20 5C12.268 5 6 10.82 6 18c0 2.52.72 4.88 1.97 6.9L6 35l10.5-1.74A14.7 14.7 0 0020 34.5c7.732 0 14-5.82 14-13C34 13.64 27.732 5 20 5z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M15 17c.4-1.1.8-1.4 1.2-1.4s.7.1 1 .7l.5 1.2c.2.4.1.8-.2 1.1l-.4.4c.7 1.4 1.7 2.5 3 3.3l.5-.4c.3-.2.7-.3 1.1-.1l1.2.5c.6.3.8.7.7 1l-.3.7c-.3.8-.7 1.4-1.4 1.7-.7.3-1.7.3-3-.5s-2.3-2.1-2.9-2.9c-.4-.7-.4-1.3-.2-1.5l.5-.4z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function FeatureShowcaseAdine() {
  const v = useVariants();
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="bg-canvas py-[96px]">
      <div className="shell">
        <div className="mx-auto max-w-[720px] text-center">
          <span className="section-eyebrow">Features</span>
          <h2 className="mt-4 text-[clamp(28px,3.5vw,44px)] font-light leading-[1.15] tracking-[-0.02em] text-ink">
            Built for the way you work
          </h2>
          <p className="mt-4 text-[17px] font-light leading-[1.6] text-slate">
            Every feature is designed for speed, clarity, and zero busywork.
          </p>
        </div>

        <motion.div
          variants={v(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mt-16 grid max-w-[960px] grid-cols-1 gap-6 md:grid-cols-3"
        >
          {FEATURES.map(({ title, text, wash, iconBg, icon }, i) => (
            <motion.div
              key={title}
              variants={v(fadeUp)}
              {...(!reduce ? { whileHover: { y: -6, transition: { duration: 0.2 } } } : {})}
              className="card-surface group overflow-hidden"
            >
              {/* Accent wash top */}
              <div className={`${wash} flex items-center justify-center py-10`}>
                <div
                  className={`flex h-20 w-20 items-center justify-center rounded-[24px] ${iconBg} text-ink transition-transform duration-200 group-hover:scale-110`}
                >
                  <FeatureIcon type={icon} />
                </div>
              </div>
              {/* Content */}
              <div className="px-6 py-6">
                <h3 className="text-[18px] font-medium text-ink">{title}</h3>
                <p className="mt-2 text-[15px] font-light leading-[1.6] text-slate">{text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
