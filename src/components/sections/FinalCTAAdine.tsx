import { motion } from "framer-motion";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";
import { ArrowRight } from "@phosphor-icons/react";

const logos = ["AgencyHub", "ColdCall Co.", "RevStack", "Pipeline.ai", "Dialwise"];

export default function FinalCTAAdine() {
  const v = useVariants();

  return (
    <section className="bg-canvas py-[96px]">
      <div className="shell">
        {/* Brand-violet full-bleed section */}
        <motion.div
          variants={v(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative overflow-hidden rounded-[40px] bg-violet px-8 py-[80px] text-center md:px-16"
        >
          {/* Decorative blobs inside */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -top-20 -right-20 h-[300px] w-[300px] rounded-full bg-white/[0.06] blur-[80px]" />
            <div className="absolute -bottom-16 -left-16 h-[250px] w-[250px] rounded-full bg-cotton-candy/[0.12] blur-[80px]" />
          </div>

          <motion.span
            variants={v(fadeUp)}
            className="relative z-10 mb-6 inline-block rounded-full bg-white/15 px-5 py-2 text-[13px] font-medium text-white/80"
          >
            Start for free today
          </motion.span>

          <motion.h2
            variants={v(fadeUp)}
            className="relative z-10 mx-auto max-w-[560px] text-[clamp(30px,4vw,48px)] font-light leading-[1.15] tracking-[-0.02em] text-white"
          >
            Ready to run cold calling like a pipeline?
          </motion.h2>

          <motion.p
            variants={v(fadeUp)}
            className="relative z-10 mx-auto mt-5 max-w-[480px] text-[17px] font-light leading-[1.6] text-white/70"
          >
            Sign up for Adine and start your first cold call session in minutes. No credit card
            required.
          </motion.p>

          <motion.div
            variants={v(fadeUp)}
            className="relative z-10 mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href="https://adine-crm.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-[15px] font-semibold text-violet shadow-elevated transition-transform duration-200 hover:scale-[1.03]"
            >
              Open the app
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-3.5 text-[15px] font-medium text-white/80 transition-colors duration-200 hover:bg-white/10"
            >
              See how it works
            </a>
          </motion.div>
        </motion.div>

        {/* Social proof — logo row */}
        <motion.div
          variants={v(fadeUp)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="mb-6 text-[13px] font-medium uppercase tracking-[0.08em] text-iron">
            Trusted by founders and agencies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {logos.map((name) => (
              <span
                key={name}
                className="text-[16px] font-medium text-pebble transition-colors hover:text-iron"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
