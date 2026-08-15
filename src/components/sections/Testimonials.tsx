import { motion } from "framer-motion";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";

const TESTIMONIALS = [
  {
    quote:
      "We went from 25 dials a day to 140. The sequential dialer keeps reps focused, and meetings booked tripled in the first month.",
    author: "Marcus Webb",
    role: "Head of Sales, Coralth",
  },
  {
    quote:
      "The Google Maps scraper filled our pipeline with qualified local leads in a week. Numbers were 96% valid — we just started calling.",
    author: "Priya Nair",
    role: "Founder, Paravox Labs",
  },
  {
    quote:
      "WhatsApp follow-ups go out the moment I hang up, and the Meet link is already in the calendar. Nothing slips through anymore.",
    author: "James Okafor",
    role: "BD Manager, Tenloft",
  },
];

export default function Testimonials() {
  const v = useVariants();
  return (
    <section id="testimonials" className="bg-canvas-white py-[96px]">
      <div className="shell">
        <p className="eyebrow !text-ember">What outbound teams say</p>

        <motion.div
          variants={v(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-12 lg:grid-cols-3 lg:gap-8"
        >
          {TESTIMONIALS.map((t) => (
            <motion.figure
              key={t.author}
              variants={v(fadeUp)}
              className="flex flex-col border-t border-mist pt-8"
            >
              <blockquote className="flex-1 text-[clamp(20px,2.2vw,26px)] leading-[1.3] tracking-[-0.02em]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6">
                <p className="font-display text-[15px] tracking-[-0.02em] text-graphite">
                  {t.author}
                </p>
                <p className="mt-0.5 text-[13px] text-slate">{t.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
