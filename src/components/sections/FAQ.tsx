import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "@phosphor-icons/react";
import { FAQ_ITEMS } from "@/lib/schema";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="bg-canvas-white py-[80px]"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className="shell grid gap-10 lg:grid-cols-[35%_1fr]">
        <h2 className="text-[clamp(28px,3.6vw,40px)] leading-[1.2] tracking-[-0.02em]">
          Questions we get every day.
        </h2>

        <div>
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="border-b border-mist"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  className="flex min-h-[48px] w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span
                    itemProp="name"
                    className="font-display text-[18px] tracking-[-0.02em] text-graphite"
                  >
                    {item.q}
                  </span>
                  {isOpen ? (
                    <Minus size={18} aria-hidden="true" className="shrink-0" />
                  ) : (
                    <Plus size={18} aria-hidden="true" className="shrink-0" />
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
                      itemScope
                      itemProp="acceptedAnswer"
                      itemType="https://schema.org/Answer"
                    >
                      <p
                        itemProp="text"
                        className="max-w-[640px] pb-6 text-[16px] leading-[1.6] text-steel"
                      >
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
