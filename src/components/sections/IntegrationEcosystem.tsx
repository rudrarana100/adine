import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";

const INTEGRATIONS = [
  "Gmail",
  "Outlook",
  "Slack",
  "HubSpot",
  "Salesforce",
  "LinkedIn",
  "Zoom",
  "Zapier",
  "Pipedrive",
  "REST API",
];

export default function IntegrationEcosystem() {
  const v = useVariants();

  return (
    <section id="integrations" className="bg-ash py-[80px]">
      <div className="shell">
        <h2 className="text-[clamp(28px,3.6vw,40px)] leading-[1.2] tracking-[-0.02em]">
          Works where your team already works.
        </h2>
        <p className="mt-3 max-w-[560px] text-[16px] leading-[1.6] text-steel">
          SalesTracker CRM syncs bidirectionally with the tools your revenue team already runs, so
          nothing has to be re-entered by hand.
        </p>

        <motion.ul
          variants={v(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
        >
          {INTEGRATIONS.map((name) => (
            <motion.li
              key={name}
              variants={v(fadeUp)}
              className="rounded-card bg-canvas-white px-4 py-8 text-center"
            >
              <span className="font-display text-[15px] tracking-[-0.02em] text-graphite">
                {name}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        <p className="mt-8 flex flex-wrap items-center gap-3 text-[14px] text-steel">
          + 40 more integrations
          <a
            href="#integrations"
            className="font-display ember-underline inline-flex items-center gap-1 text-[16px] tracking-[-0.02em] text-graphite"
          >
            View all integrations <ArrowRight size={16} aria-hidden="true" />
          </a>
        </p>
      </div>
    </section>
  );
}
