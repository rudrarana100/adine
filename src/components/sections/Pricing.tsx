import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "@phosphor-icons/react";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";

const PRICING_TIERS = [
  {
    name: "Starter",
    tag: "FREE FOREVER",
    monthly: 0,
    priceLabel: "$0",
    forWho: "Up to 3 users, 500 contacts",
    features: [
      "Pipeline visibility for 3 users",
      "500 contacts",
      "Email + calendar sync",
      "Basic reporting",
      "Community support",
    ],
    cta: "Start free",
    featured: false,
    aria: "Starter plan, free forever, up to 3 users",
  },
  {
    name: "Growth",
    tag: "MOST POPULAR",
    monthly: 29,
    priceLabel: "$29",
    forWho: "Unlimited contacts, AI scoring, forecasting",
    features: [
      "Unlimited contacts and deals",
      "AI lead scoring (47 signals)",
      "Revenue forecasting",
      "Contact intelligence",
      "Custom reporting",
      "40+ integrations",
      "Automatic activity capture",
      "Priority support",
    ],
    cta: "Start Growth trial",
    featured: true,
    aria: "Growth plan, $29 per user per month, most popular",
  },
  {
    name: "Enterprise",
    tag: null,
    monthly: null,
    priceLabel: "Custom",
    forWho: "SSO, SLAs, dedicated CSM, custom onboarding",
    features: [
      "Everything in Growth",
      "SSO / SAML and SCIM",
      "99.9% uptime SLA",
      "Dedicated customer success manager",
      "Custom onboarding and migration",
      "Audit logs and data residency",
    ],
    cta: "Talk to sales",
    featured: false,
    aria: "Enterprise plan, custom pricing",
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const v = useVariants();

  return (
    <section id="pricing" className="bg-canvas-white py-[80px]">
      <div className="shell">
        <h2 className="text-[clamp(28px,3.6vw,40px)] leading-[1.2] tracking-[-0.02em]">
          Pricing that scales with your team.
        </h2>

        <div className="mt-6 inline-flex items-center gap-1 rounded-pill bg-ash p-1">
          {[
            { label: "Monthly", value: false },
            { label: "Annual (save 20%)", value: true },
          ].map((opt) => (
            <button
              key={opt.label}
              type="button"
              onClick={() => setAnnual(opt.value)}
              aria-pressed={annual === opt.value}
              className={`rounded-pill px-4 py-2 text-[14px] ${
                annual === opt.value ? "bg-graphite text-canvas-white" : "text-steel"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <motion.div
          variants={v(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 grid gap-4 lg:grid-cols-3"
        >
          {PRICING_TIERS.map((tier) => {
            const price =
              tier.monthly === null
                ? "Custom"
                : tier.monthly === 0
                  ? "$0"
                  : `$${annual ? Math.round(tier.monthly * 0.8) : tier.monthly}`;

            return (
              <motion.article
                key={tier.name}
                variants={v(fadeUp)}
                whileHover={{ y: -4 }}
                aria-label={tier.aria}
                className={`rounded-card p-8 ${
                  tier.featured
                    ? "bg-graphite text-canvas-white"
                    : "border border-mist bg-canvas-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3
                    className={`text-[18px] tracking-[-0.02em] ${tier.featured ? "text-canvas-white" : ""}`}
                  >
                    {tier.name}
                  </h3>
                  {tier.tag && (
                    <span
                      className={`rounded-2xl px-2.5 py-1 text-[11px] ${
                        tier.featured ? "bg-ember text-canvas-white" : "bg-ivory text-brass"
                      }`}
                    >
                      {tier.tag}
                    </span>
                  )}
                </div>

                <p className="font-display mt-5 text-[40px] leading-none tracking-[-0.02em]">
                  {price}
                  {tier.monthly ? (
                    <span
                      className={`text-[14px] ${tier.featured ? "text-mist" : "text-slate"}`}
                    >{`/user/mo`}</span>
                  ) : null}
                </p>
                <p className={`mt-2 text-[13px] ${tier.featured ? "text-mist" : "text-slate"}`}>
                  {tier.forWho}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[14px]">
                      <Check
                        size={16}
                        aria-hidden="true"
                        color={tier.featured ? "var(--color-ember)" : "var(--color-graphite)"}
                        className="mt-0.5 shrink-0"
                      />
                      <span className={tier.featured ? "text-ash" : "text-steel"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#demo"
                  className={`mt-8 w-full ${tier.featured ? "btn-solid !bg-canvas-white !text-graphite" : "btn-ghost"}`}
                >
                  {tier.cta}
                </a>
              </motion.article>
            );
          })}
        </motion.div>

        <p className="mt-8 text-center text-[13px] text-slate">
          All plans include: SOC 2 Type II · 99.9% uptime SLA · GDPR compliant · 24/7 support
        </p>
      </div>
    </section>
  );
}
