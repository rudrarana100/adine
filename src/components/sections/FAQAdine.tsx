import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "@phosphor-icons/react";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";
import SectionHeading from "@/components/sections/SectionHeading";

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "Can I import leads I already have?",
    a: "Yes — CSV bulk import with column mapping is built in.",
  },
  {
    q: "Is the WhatsApp automation compliant?",
    a: "It uses standard WhatsApp messaging, not bulk or spam sending. Templated messages are one-to-one, never broadcast.",
  },
  {
    q: "Does this work if I'm a solo rep, not a team?",
    a: "Yes. The sequential call queue and follow-up hub are built around one person working a list — teams are a bonus, not the baseline.",
  },
  {
    q: "What happens when my trial ends?",
    a: "Your data stays. You just need a plan to keep working leads past day 14.",
  },
  {
    q: "Do I need to be tech-savvy to set this up?",
    a: "No. The only integration is connecting Google Calendar for meeting links — everything else works out of the box.",
  },
];

export default function FAQAdine() {
  const v = useVariants();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-canvas py-[96px]">
      <div className="shell">
        <SectionHeading eyebrow="FAQ" title="Questions we get every day." align="center" />

        <motion.div
          variants={v(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="mx-auto mt-14 max-w-[760px]"
        >
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div key={item.q} variants={v(fadeUp)} className="border-b border-mist">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  className="flex min-h-[48px] w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="text-[17px] font-medium tracking-[-0.01em] text-ink">
                    {item.q}
                  </span>
                  {isOpen ? (
                    <Minus size={18} aria-hidden="true" className="shrink-0 text-slate" />
                  ) : (
                    <Plus size={18} aria-hidden="true" className="shrink-0 text-slate" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="panel"
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[640px] pb-6 text-[15px] font-light leading-[1.6] text-slate">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
