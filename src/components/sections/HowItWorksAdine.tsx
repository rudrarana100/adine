import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";
import type { FeatureIconName } from "@/components/icons/FeatureIcons";
import { AnimatedFeatureIcon } from "@/components/icons/AnimatedFeatureIcon";
import { AuroraField, GridField } from "@/components/backgrounds/AnimatedBackgrounds";
import { Ambient } from "@/components/backgrounds/Ambient";
import SectionHeading from "@/components/sections/SectionHeading";

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
      "Pull only businesses that actually pick up the phone — verified Google Maps leads by category and city, or a CSV import that maps columns and de-duplicates numbers for you.",
    icon: "map",
    accent: "bg-mint/30 text-green-700",
    iconColor: "text-green-600",
  },
  {
    number: "02",
    title: "Run a call session",
    description:
      "One lead on screen, one tap to dial — with website, Maps, email, and WhatsApp one click away. No tab-hopping while a prospect waits.",
    icon: "phone",
    accent: "bg-sky/30 text-sky-700",
    iconColor: "text-sky-600",
  },
  {
    number: "03",
    title: "Log with one keypress",
    description:
      "Every outcome lives on the number keys — no form to tab through, no detail lost, hands never leave the keyboard.",
    icon: "check",
    accent: "bg-violet/10 text-violet",
    iconColor: "text-violet",
  },
  {
    number: "04",
    title: "Follow up automatically",
    description:
      "Interested leads offer a Meet booking on the spot; no-answers get a next-day retry scheduled without lifting a finger. The follow-up that used to slip just happens.",
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
      {/* Animated backdrop: aurora fields + grid texture (paused off-screen) */}
      <Ambient className="absolute inset-0 overflow-hidden">
        <AuroraField />
        <GridField className="opacity-60" />
      </Ambient>

      <div className="shell relative z-10">
        <SectionHeading
          eyebrow="How It Works"
          title="From a raw list to a booked meeting"
          subtitle="The exact arc of a sales call — import, dial, log, follow up — with nothing left to remember."
        />

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
