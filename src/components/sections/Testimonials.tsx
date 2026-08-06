import { useRef } from "react";
import { motion } from "framer-motion";
import { Star } from "@phosphor-icons/react";

const TESTIMONIALS = [
  {
    quote:
      "We went from 25 dials a day to 140. The sequential dialer keeps reps focused, and meetings booked tripled in the first month.",
    author: "— Marcus Webb, Head of Sales, Coralth",
  },
  {
    quote:
      "The Google Maps scraper filled our pipeline with qualified local leads in a week. Numbers were 96% valid — we just started calling.",
    author: "— Priya Nair, Founder, Paravox Labs",
  },
  {
    quote:
      "WhatsApp follow-ups go out the moment I hang up, and the Meet link is already in the calendar. Nothing slips through anymore.",
    author: "— James Okafor, BD Manager, Tenloft",
  },
];

export default function Testimonials() {
  const constraintsRef = useRef<HTMLDivElement | null>(null);

  return (
    <section id="testimonials" className="bg-ash py-[80px]">
      <div className="shell">
        <h2 className="text-[clamp(28px,3.6vw,40px)] leading-[1.2] tracking-[-0.02em]">
          What outbound teams say.
        </h2>

        <div ref={constraintsRef} className="mt-10 overflow-hidden">
          <motion.div
            drag="x"
            dragConstraints={constraintsRef}
            className="flex cursor-grab gap-4 active:cursor-grabbing lg:grid lg:cursor-auto lg:grid-cols-3"
          >
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.author}
                className="rounded-card w-[85%] shrink-0 bg-canvas-white p-8 lg:w-auto"
              >
                <div className="flex gap-1" aria-label="Rated 5 out of 5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      weight="fill"
                      color="var(--color-ember)"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote className="mt-5 text-[18px] leading-[1.5] text-graphite">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 text-[13px] text-slate">{t.author}</figcaption>
              </figure>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
