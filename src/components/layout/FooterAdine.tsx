const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how" },
      { label: "Why Adine", href: "#why" },
      { label: "Open the App", href: "https://adine-crm.vercel.app/", external: true },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#why" },
      { label: "Contact", href: "mailto:support@adine-crm.vercel.app" },
      { label: "Careers", href: "#why" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "https://adine-crm.vercel.app/", external: true },
      { label: "Help Center", href: "mailto:support@adine-crm.vercel.app" },
      { label: "Outbound Playbook", href: "#how" },
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
              The outbound CRM built for agency founders and solo salespeople doing high-volume cold
              calling.
            </p>
            <div className="mt-5 flex gap-4">
              {["Twitter", "LinkedIn"].map((label) => (
                <a
                  key={label}
                  href={
                    label === "Twitter"
                      ? "https://twitter.com/adine_crm"
                      : "https://linkedin.com/company/adine"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/40 transition-colors hover:text-white"
                >
                  <span className="text-[13px] font-medium">{label}</span>
                </a>
              ))}
            </div>
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
