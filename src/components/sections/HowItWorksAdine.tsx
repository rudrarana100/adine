import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";
import type { FeatureIconName } from "@/components/icons/FeatureIcons";
import { AnimatedFeatureIcon } from "@/components/icons/AnimatedFeatureIcon";
import { AuroraField, GridField } from "@/components/backgrounds/AnimatedBackgrounds";

const STEPS: {
  number: string;
  title: string;
  description: string;
  icon: FeatureIconName;
  accent: string;
  iconColor: string;
}[] = [
  {
    number: "01",
    title: "Build your list",
    description:
      "Scrape verified business leads from Google Maps by category, city, and target count — or import a CSV with automatic column-mapping and phone de-duplication.",
    icon: "map",
    accent: "bg-mint/30 text-green-700",
    iconColor: "text-green-600",
  },
  {
    number: "02",
    title: "Run a call session",
    description:
      "Work through a single-lead-at-a-time dialing queue, filterable by collection, with one-tap call, website, Maps, email, and WhatsApp actions.",
    icon: "phone",
    accent: "bg-sky/30 text-sky-700",
    iconColor: "text-sky-600",
  },
  {
    number: "03",
    title: "Log with one keypress",
    description:
      "Six outcome types triggered by number keys 1–6 — No Answer, Invalid, Gatekeeper, Not Interested, Interested, Schedule. No manual data entry.",
    icon: "check",
    accent: "bg-violet/10 text-violet",
    iconColor: "text-violet",
  },
  {
    number: "04",
    title: "Follow up automatically",
    description:
      "Interested leads branch into a Google Meet booking or a scheduled follow-up. No-answers auto-schedule a next-day retry for you.",
    icon: "meet",
    accent: "bg-lavender/50 text-ultraviolet",
    iconColor: "text-ultraviolet",
  },
];

export default function HowItWorksAdine() {
  const v = useVariants();
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="how" className="relative overflow-hidden bg-canvas py-[96px]">
      {/* Animated backdrop: aurora fields + grid texture */}
      <AuroraField />
      <GridField className="opacity-60" />

      <div className="shell relative z-10">
        <div className="mx-auto max-w-[720px] text-center">
          <span className="section-eyebrow">How It Works</span>
          <h2 className="mt-4 text-[clamp(28px,3.5vw,44px)] font-light leading-[1.15] tracking-[-0.02em] text-ink">
            From a raw list to a booked meeting
          </h2>
          <p className="mt-4 text-[17px] font-light leading-[1.6] text-slate">
            Four steps that map to how you actually sell on the phone — import, dial, log, and
            follow up.
          </p>
        </div>

        <motion.div
          variants={v(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mx-auto mt-16 grid max-w-[980px] grid-cols-1 gap-6 md:grid-cols-2"
        >
          {STEPS.map(({ number, title, description, icon, accent, iconColor }) => (
            <motion.div
              key={title}
              variants={v(fadeUp)}
              {...(!reduce ? { whileHover: { y: -5, transition: { duration: 0.2 } } } : {})}
              className="card-surface group relative flex gap-5 overflow-hidden p-6"
            >
              {/* hover spotlight */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(320px circle at 0% 0%, rgba(97,97,255,0.06), transparent 70%)",
                }}
                aria-hidden="true"
              />
              <div
                className={`relative flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-[20px] ${accent}`}
              >
                <AnimatedFeatureIcon name={icon} size={30} className={iconColor} />
                <span className="mt-1 text-[12px] font-bold">{number}</span>
              </div>
              <div className="relative">
                <h3 className="text-[18px] font-medium text-ink">{title}</h3>
                <p className="mt-2 text-[15px] font-light leading-[1.6] text-slate">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
