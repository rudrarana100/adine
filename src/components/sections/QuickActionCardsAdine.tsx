import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";

/* ─── Custom SVG icons (rounded caps, consistent stroke) ─── */
function PhoneDialerIcon({ className }: { className?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className={className}>
      <rect x="6" y="2" width="16" height="24" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="14" cy="22" r="1.5" fill="currentColor" />
      <path d="M10 9h8M10 12.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className={className}>
      <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M9.5 14.5l3 3 6-6.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className={className}>
      <path
        d="M14 3C8.477 3 4 7.18 4 12.36c0 1.76.51 3.4 1.39 4.8L4 25l8.02-1.34A10.9 10.9 0 0014 24.5c5.523 0 10-4.18 10-9.36C24 9.87 19.523 3 14 3z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 12c.3-.8.6-1 .9-1s.5.1.7.5l.4.9c.1.3 0 .6-.2.8l-.3.3c.5 1 1.2 1.8 2.1 2.4l.4-.3c.2-.2.5-.2.8-.1l.8.4c.4.2.6.4.5.7l-.2.5c-.2.6-.5 1-1 1.2-.5.2-1.2.2-2.2-.4s-1.7-1.5-2.1-2.1c-.3-.5-.3-.9-.1-1.1l.4-.3z"
        fill="currentColor"
      />
    </svg>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className={className}>
      <path
        d="M10 21a3 3 0 006 0M6 17.5c0-4.14 3.58-7.5 8-7.5s8 3.36 8 7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M14 10V6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="14" cy="4" r="1" fill="currentColor" />
    </svg>
  );
}

const ACTIONS = [
  {
    label: "Cold Call Sessions",
    description: "Start dialing in seconds",
    Icon: PhoneDialerIcon,
    bg: "bg-violet/8",
    iconColor: "text-violet",
    accentBorder: "border-l-violet",
  },
  {
    label: "Auto Status Updates",
    description: "Every call, logged",
    Icon: CheckCircleIcon,
    bg: "bg-mint/30",
    iconColor: "text-green-600",
    accentBorder: "border-l-green-500",
  },
  {
    label: "WhatsApp One-Click",
    description: "Follow up instantly",
    Icon: WhatsAppIcon,
    bg: "bg-mint/40",
    iconColor: "text-green-600",
    accentBorder: "border-l-emerald-400",
  },
  {
    label: "Follow-up Center",
    description: "Never lose a lead",
    Icon: BellIcon,
    bg: "bg-apricot/10",
    iconColor: "text-apricot",
    accentBorder: "border-l-apricot",
  },
];

export default function QuickActionCardsAdine() {
  const v = useVariants();
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="features" className="bg-canvas py-[80px]">
      <div className="shell">
        <div className="mx-auto max-w-[720px] text-center">
          <span className="section-eyebrow">Quick Actions</span>
          <h2 className="mt-4 text-[clamp(28px,3.5vw,40px)] font-light leading-[1.15] tracking-[-0.02em] text-ink">
            Everything you need, one tap away
          </h2>
          <p className="mt-4 text-[16px] font-light leading-[1.6] text-slate">
            Adine puts your most-used tools at your fingertips — no digging through menus.
          </p>
        </div>

        <motion.div
          variants={v(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {ACTIONS.map(({ label, description, Icon, bg, iconColor, accentBorder }) => (
            <motion.article
              key={label}
              variants={v(fadeUp)}
              {...(!reduce ? { whileHover: { y: -6, transition: { duration: 0.2 } } } : {})}
              className={`card-surface group cursor-pointer overflow-hidden border-l-[3px] ${accentBorder} p-6`}
            >
              <div
                className={`mb-4 flex h-14 w-14 items-center justify-center rounded-[16px] ${bg} transition-transform duration-200 group-hover:scale-110`}
              >
                <Icon className={iconColor} />
              </div>
              <h3 className="text-[16px] font-semibold text-ink">{label}</h3>
              <p className="mt-1 text-[14px] font-light text-iron">{description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
