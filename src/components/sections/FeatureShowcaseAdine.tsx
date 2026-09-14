import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";
import { AnimatedFeatureIcon } from "@/components/icons/AnimatedFeatureIcon";
import type { FeatureIconName } from "@/components/icons/FeatureIcons";
import { DotGrid } from "@/components/backgrounds/AnimatedBackgrounds";
import { Ambient } from "@/components/backgrounds/Ambient";
import SectionHeading from "@/components/sections/SectionHeading";

const FEATURES: {
  title: string;
  text: string;
  icon: FeatureIconName;
  wash: string;
  iconBg: string;
  iconColor: string;
}[] = [
  {
    title: "Google Maps Lead Scraping",
    text: "Skip the data-entry — pull verified businesses by category and city with a live progress bar, and they land in your queue ready to dial.",
    icon: "map",
    wash: "bg-mint/20",
    iconBg: "bg-mint/40",
    iconColor: "text-green-700",
  },
  {
    title: "Call Session Queue",
    text: "One lead per screen keeps your head in the call — quick actions and keyboard outcomes mean you never stop to type.",
    icon: "phone",
    wash: "bg-sky/20",
    iconBg: "bg-sky/30",
    iconColor: "text-sky-700",
  },
  {
    title: "One-Click Google Meet",
    text: "Turn an Interested into a booked meeting on the spot — the Meet invite lands in their calendar and the WhatsApp confirmation sends itself.",
    icon: "meet",
    wash: "bg-lavender/30",
    iconBg: "bg-lavender/50",
    iconColor: "text-ultraviolet",
  },
  {
    title: "Smart CSV Import",
    text: "Drop in the spreadsheet you've been avoiding — columns map themselves and duplicates disappear, so it's callable tonight.",
    icon: "sheet",
    wash: "bg-periwinkle/50",
    iconBg: "bg-violet/10",
    iconColor: "text-violet",
  },
  {
    title: "Follow-up Queue",
    text: "Nothing slips anymore — the queue surfaces exactly who to call today, and no-answers already have a retry waiting.",
    icon: "bell",
    wash: "bg-aqua/30",
    iconBg: "bg-aqua/40",
    iconColor: "text-cyan-700",
  },
  {
    title: "Pipeline Kanban",
    text: "See every conversation in one board — drag a lead from Interested to Booked and the whole pipeline updates instantly.",
    icon: "kanban",
    wash: "bg-cornflower/20",
    iconBg: "bg-cornflower/30",
    iconColor: "text-blue-700",
  },
  {
    title: "Call Analytics",
    text: "Know exactly what your calls produce — daily goals, a streak heatmap, peak-hour patterns, and how many dials turn into Won.",
    icon: "chart",
    wash: "bg-peony/30",
    iconBg: "bg-peony/40",
    iconColor: "text-pink-700",
  },
  {
    title: "Command Palette (⌘K)",
    text: "Never lift your hands off the keyboard — open any lead, start a session, or search mid-call in one keystroke.",
    icon: "command",
    wash: "bg-periwinkle/40",
    iconBg: "bg-violet/10",
    iconColor: "text-violet",
  },
];

export default function FeatureShowcaseAdine() {
  const v = useVariants();
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="features" className="relative bg-card py-[96px]">
      {/* Soft animated accent background (paused off-screen) */}
      <Ambient className="absolute inset-0 overflow-hidden">
        <DotGrid className="opacity-50" />
      </Ambient>

      <div className="shell relative z-10">
        <SectionHeading
          eyebrow="Features"
          title="Everything the phone workday needs"
          subtitle="Every step of the phone workday — designed so each click moves a lead toward yes."
        />

        <motion.div
          variants={v(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mx-auto mt-16 grid max-w-[1080px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURES.map(({ title, text, icon, wash, iconBg, iconColor }) => (
            <motion.div
              key={title}
              variants={v(fadeUp)}
              {...(!reduce ? { whileHover: { y: -6, transition: { duration: 0.2 } } } : {})}
              className="card-surface group relative overflow-hidden"
            >
              {/* hover spotlight */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(300px circle at 50% 0%, rgba(97,97,255,0.08), transparent 70%)",
                }}
                aria-hidden="true"
              />
              <div className={`${wash} relative flex items-center justify-center py-8`}>
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-[20px] ${iconBg} transition-transform duration-200 group-hover:scale-110`}
                >
                  <AnimatedFeatureIcon name={icon} size={30} className={iconColor} />
                </div>
              </div>
              <div className="relative px-5 py-5">
                <h3 className="text-[16px] font-medium text-ink">{title}</h3>
                <p className="mt-2 text-[14px] font-light leading-[1.6] text-slate">{text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
