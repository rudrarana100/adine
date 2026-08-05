import { TwitterLogo, LinkedinLogo, GithubLogo } from "@phosphor-icons/react";

const COLUMNS = [
  {
    title: "Product",
    links: ["Features", "Integrations", "Pricing", "Changelog", "Security", "API Docs"],
  },
  { title: "Company", links: ["About", "Blog", "Careers", "Press", "Contact"] },
  {
    title: "Resources",
    links: ["Documentation", "Help Center", "Status Page", "Affiliate Program"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-graphite pt-[60px] pb-10 text-ash">
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-[18px] tracking-[-0.02em] text-ash">
              SalesTracker<span className="text-ember">.</span>
            </p>
            <p className="mt-3 max-w-[240px] text-[13px] text-slate">
              Pipeline intelligence for B2B revenue teams.
            </p>
            <div className="mt-5 flex gap-4">
              {[
                { Icon: TwitterLogo, label: "Twitter" },
                { Icon: LinkedinLogo, label: "LinkedIn" },
                { Icon: GithubLogo, label: "GitHub" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="text-slate transition-colors hover:text-canvas-white"
                >
                  <Icon size={20} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="font-display text-[14px] tracking-[-0.02em] text-ash">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[13px] text-slate transition-colors hover:text-canvas-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-steel pt-6 text-[13px] text-slate md:flex-row md:items-center md:justify-between">
          <p>© 2025 SalesTracker. All rights reserved.</p>
          <ul className="flex flex-wrap gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Preferences"].map((l) => (
              <li key={l}>
                <a href="#" className="transition-colors hover:text-canvas-white">
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <p className="font-display text-[14px] tracking-[-0.02em]">English (US)</p>
        </div>
      </div>
    </footer>
  );
}
