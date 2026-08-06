import { motion } from "framer-motion";
import { ArrowRight, Plugs } from "@phosphor-icons/react";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";

const INTEGRATIONS = [
  { name: "Google Maps", desc: "Lead scraping" },
  { name: "Google Calendar", desc: "Meet booking" },
  { name: "Google Meet", desc: "Video calls" },
  { name: "WhatsApp", desc: "Auto-dispatch" },
  { name: "CSV Import", desc: "Bulk upload" },
  { name: "Gmail", desc: "Email sync" },
  { name: "Slack", desc: "Alerts" },
  { name: "Zoom", desc: "Video calls" },
  { name: "REST API", desc: "Custom" },
  { name: "Webhooks", desc: "Automation" },
];

export default function IntegrationEcosystem() {
  const v = useVariants();

  return (
    <section id="integrations" className="bg-ash py-[80px]">
      <div className="shell">
        <h2 className="text-[clamp(28px,3.6vw,40px)] leading-[1.2] tracking-[-0.02em]">
          Built around the tools outbound reps already live in.
        </h2>
        <p className="mt-3 max-w-[560px] text-[16px] leading-[1.6] text-steel">
          SalesTracker plugs into the exact stack your team uses to scrape, call, message, and
          schedule — no re-entering data by hand.
        </p>

        <motion.ul
          variants={v(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
        >
          {INTEGRATIONS.map((item) => (
            <motion.li
              key={item.name}
              variants={v(fadeUp)}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="rounded-card bg-canvas-white px-4 py-8 text-center"
            >
              <span className="font-display text-[15px] tracking-[-0.02em] text-graphite">
                {item.name}
              </span>
              <span className="mt-1 block text-[12px] text-slate">{item.desc}</span>
            </motion.li>
          ))}
        </motion.ul>

        <p className="mt-8 flex flex-wrap items-center gap-3 text-[14px] text-steel">
          <Plugs size={16} aria-hidden="true" />
          Two-way sync with Google OAuth · refresh tokens managed securely
          <a
            href="#demo"
            className="font-display ember-underline inline-flex items-center gap-1 text-[16px] tracking-[-0.02em] text-graphite"
          >
            See it connected <ArrowRight size={16} aria-hidden="true" />
          </a>
        </p>
      </div>
    </section>
  );
}
