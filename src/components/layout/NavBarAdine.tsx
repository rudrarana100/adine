import { useEffect, useLayoutEffect, useState } from "react";

const LINKS = [
  { label: "Why Adine", href: "#why" },
  { label: "How It Works", href: "#how" },
  { label: "Features", href: "#features" },
];

export default function NavBarAdine() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled
          ? "border-b border-border-subtle bg-surface-white/90 backdrop-blur-[12px]"
          : "bg-surface-white"
      }`}
    >
      <nav aria-label="Primary" className="shell flex h-[72px] items-center justify-between gap-4">
        <a
          href="#top"
          className="font-display text-[19px] tracking-[-0.02em] text-text-primary"
          aria-label="Adine home"
        >
          Adine<span className="text-accent-blue">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-[15px] text-text-secondary transition-colors hover:text-accent-blue"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="https://adine-crm.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-solid hidden !min-h-0 !px-5 !py-2.5 md:inline-flex"
          >
            Open the app
          </a>
          <button
            type="button"
            onClick={() => window.open("https://adine-crm.vercel.app/", "_blank")}
            aria-label="Sign up"
            className="btn-ghost !px-5 !py-2.5 md:hidden"
          >
            Get started
          </button>
        </div>
      </nav>
    </header>
  );
}
