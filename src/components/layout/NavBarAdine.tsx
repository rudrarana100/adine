import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function NavBarAdine() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scroll-spy: the link for the section crossing the viewport's middle band
     gets a soft violet highlight, and the pill springs between links. */
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.href.slice(1))).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0.05 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <nav
        aria-label="Primary"
        className={`flex w-full max-w-[1080px] items-center justify-between gap-4 rounded-[40px] px-6 py-3 transition-all duration-300 ${
          scrolled
            ? "translate-y-0 border border-pebble/50 bg-card/90 shadow-card backdrop-blur-xl"
            : "translate-y-0 border border-transparent bg-transparent"
        }`}
      >
        <a
          href="#top"
          className="text-[20px] font-semibold tracking-[-0.02em] text-ink"
          aria-label="Adine home"
        >
          Adine<span className="text-violet">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.label} className="relative">
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-violet/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <a
                  href={link.href}
                  className={`relative z-10 block rounded-full px-4 py-2 text-[15px] font-medium transition-colors duration-200 ${
                    isActive ? "text-violet" : "text-slate hover:bg-violet-soft hover:text-violet"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="https://adine-crm.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill !min-h-0 !px-6 !py-2.5 !text-[14px] hidden md:inline-flex"
          >
            Start Free
          </a>
          <a
            href="https://adine-crm.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill !min-h-0 !px-5 !py-2.5 !text-[14px] md:hidden"
          >
            Start Free
          </a>
        </div>
      </nav>
    </header>
  );
}
