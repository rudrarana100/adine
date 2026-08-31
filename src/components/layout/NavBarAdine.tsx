import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how" },
  { label: "Why Adine", href: "#why" },
];

export default function NavBarAdine() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <nav
        aria-label="Primary"
        className={`flex w-full max-w-[1080px] items-center justify-between gap-4 rounded-[40px] px-6 py-3 transition-all duration-300 ${
          scrolled
            ? "bg-card/90 backdrop-blur-xl shadow-card border border-pebble/50"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <a
          href="#top"
          className="text-[20px] font-semibold tracking-[-0.02em] text-ink"
          aria-label="Adine home"
        >
          Adine<span className="text-violet">.</span>
        </a>

        {/* Nav links — desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-[15px] font-medium text-slate transition-colors hover:text-violet"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="https://adine-crm.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill !min-h-0 !px-6 !py-2.5 !text-[14px] hidden md:inline-flex"
          >
            Open the app
          </a>
          <a
            href="https://adine-crm.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill !min-h-0 !px-5 !py-2.5 !text-[14px] md:hidden"
          >
            Get started
          </a>
        </div>
      </nav>
    </header>
  );
}
