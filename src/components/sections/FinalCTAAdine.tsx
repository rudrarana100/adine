import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";
import { ArrowRight } from "@phosphor-icons/react";
import { ConicSheen, ShimmerField } from "@/components/backgrounds/AnimatedBackgrounds";

const NEXT_STEPS = ["Sign up free", "Connect Google", "Import your first list"];

/* Premium layered backdrop: rotating conic sheen + white dust + soft blobs */
function CtaBackdrop({ reduce }: { reduce: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <ConicSheen />
      {/* soft white blobs */}
      <motion.div
        className="absolute -top-24 -right-24 h-[340px] w-[340px] rounded-full bg-white/[0.07] blur-[90px]"
        animate={reduce ? {} : { scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, -12, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-cotton-candy/[0.16] blur-[90px]"
        animate={reduce ? {} : { scale: [1, 1.15, 1], x: [0, -18, 0], y: [0, 14, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute top-[40%] left-[40%] h-[200px] w-[200px] rounded-full bg-sky/[0.12] blur-[80px]"
        animate={reduce ? {} : { scale: [1, 1.3, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      <ShimmerField color="rgba(255,255,255,0.55)" />
    </div>
  );
}

export default function FinalCTAAdine() {
  const v = useVariants();
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="bg-canvas py-[96px]">
      <div className="shell">
        <motion.div
          variants={v(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative overflow-hidden rounded-[40px] bg-violet px-8 py-[80px] text-center md:px-16"
        >
          <CtaBackdrop reduce={reduce} />

          <motion.span
            variants={v(fadeUp)}
            className="relative z-10 mb-6 inline-block rounded-full bg-white/15 px-5 py-2 text-[13px] font-medium text-white/80"
          >
            Start free — no credit card
          </motion.span>

          <motion.h2
            variants={v(fadeUp)}
            className="relative z-10 mx-auto max-w-[560px] text-[clamp(30px,4vw,48px)] font-light leading-[1.15] tracking-[-0.02em] text-white"
          >
            Start your first call session today
          </motion.h2>

          <motion.p
            variants={v(fadeUp)}
            className="relative z-10 mx-auto mt-5 max-w-[480px] text-[17px] font-light leading-[1.6] text-white/70"
          >
            Scrape a list, connect your Google account, and dial your first lead within minutes —
            not setup spreadsheets.
          </motion.p>

          <motion.div
            variants={v(fadeUp)}
            className="relative z-10 mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <motion.a
              href="https://adine-crm.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-[15px] font-semibold text-violet shadow-elevated"
              animate={
                reduce
                  ? {}
                  : {
                      boxShadow: [
                        "0px 5px 45px rgba(0,0,0,0.15)",
                        "0px 8px 60px rgba(255,255,255,0.35)",
                        "0px 5px 45px rgba(0,0,0,0.15)",
                      ],
                    }
              }
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              {...(reduce ? {} : { whileHover: { scale: 1.04 } })}
            >
              Open the app
              <motion.span
                animate={reduce ? {} : { x: [0, 5, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight size={16} aria-hidden="true" />
              </motion.span>
            </motion.a>
          </motion.div>

          {/* What happens next */}
          <motion.div
            variants={v(fadeUp)}
            className="relative z-10 mx-auto mt-8 flex max-w-[520px] flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3"
          >
            {NEXT_STEPS.map((step, i) => (
              <div key={step} className="flex items-center gap-2 sm:gap-3">
                <span className="text-[13px] font-light text-white/60">{step}</span>
                {i < NEXT_STEPS.length - 1 && (
                  <motion.span
                    className="text-white/40"
                    aria-hidden="true"
                    animate={reduce ? {} : { x: [0, 4, 0] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  >
                    →
                  </motion.span>
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
