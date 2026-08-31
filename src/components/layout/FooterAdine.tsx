const COLUMNS = [
  {
    title: "Features",
    links: [
      { label: "Google Maps Scraping", href: "#features" },
      { label: "Call Session", href: "#calls" },
      { label: "Analytics & Streaks", href: "#analytics" },
      { label: "How It Works", href: "#how" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "#story" },
      { label: "Contact", href: "mailto:support@adine-crm.vercel.app" },
      { label: "Open the App", href: "https://adine-crm.vercel.app/", external: true },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "https://adine-crm.vercel.app/", external: true },
      { label: "Help Center", href: "mailto:support@adine-crm.vercel.app" },
      { label: "Follow-up Re-Engagement", href: "#reengage" },
    ],
  },
];

const LEGAL = [
  {
    label: "Privacy Policy",
    href: "https://adine-crm.vercel.app/privacy",
    external: true,
  },
  {
    label: "Terms of Service",
    href: "https://adine-crm.vercel.app/terms",
    external: true,
  },
  {
    label: "Contact support",
    href: "mailto:support@adine-crm.vercel.app",
  },
];

export default function FooterAdine() {
  return (
    <footer className="bg-ink pt-[80px] pb-10 text-white/60">
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <a href="#top" className="text-[20px] font-semibold text-white">
              Adine<span className="text-violet">.</span>
            </a>
            <p className="mt-3 max-w-[260px] text-[14px] font-light leading-[1.6] text-white/50">
              The outbound CRM for high-volume cold calling in India — scrape, dial, log, and follow
              up in one place.
            </p>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-[14px] font-semibold text-white">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="text-[14px] font-light text-white/50 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-[13px] text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Adine. All rights reserved.</p>
          <ul className="flex flex-wrap gap-5">
            {LEGAL.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="transition-colors hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
