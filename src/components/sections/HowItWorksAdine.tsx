import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";
import {
  MapPinIcon,
  PhoneIcon,
  CheckIcon,
  CalendarMeetIcon,
} from "@/components/icons/FeatureIcons";

const STEPS = [
  {
    number: "01",
    title: "Build your list",
    description:
      "Scrape verified business leads from Google Maps by category, city, and target count — or import a CSV with automatic column-mapping and phone de-duplication.",
    Icon: MapPinIcon,
    accent: "bg-mint/30 text-green-700",
    iconColor: "text-green-600",
  },
  {
    number: "02",
    title: "Run a call session",
    description:
      "Work through a single-lead-at-a-time dialing queue, filterable by collection, with one-tap call, website, Maps, email, and WhatsApp actions.",
    Icon: PhoneIcon,
    accent: "bg-sky/30 text-sky-700",
    iconColor: "text-sky-600",
  },
  {
    number: "03",
    title: "Log with one keypress",
    description:
      "Six outcome types triggered by number keys 1–6 — No Answer, Invalid, Gatekeeper, Not Interested, Interested, Schedule. No manual data entry.",
    Icon: CheckIcon,
    accent: "bg-violet/10 text-violet",
    iconColor: "text-violet",
  },
  {
    number: "04",
    title: "Follow up automatically",
    description:
      "Interested leads branch into a Google Meet booking or a scheduled follow-up. No-answers auto-schedule a next-day retry for you.",
    Icon: CalendarMeetIcon,
    accent: "bg-lavender/50 text-ultraviolet",
    iconColor: "text-ultraviolet",
  },
];

export default function HowItWorksAdine() {
  const v = useVariants();
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="how" className="bg-canvas py-[96px]">
      <div className="shell">
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
          {STEPS.map(({ number, title, description, Icon, accent, iconColor }) => (
            <motion.div
              key={title}
              variants={v(fadeUp)}
              {...(!reduce ? { whileHover: { y: -4, transition: { duration: 0.2 } } } : {})}
              className="card-surface flex gap-5 p-6"
            >
              <div
                className={`flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-[20px] ${accent}`}
              >
                <Icon size={30} className={iconColor} />
                <span className="mt-1 text-[12px] font-bold">{number}</span>
              </div>
              <div>
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
