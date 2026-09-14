import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { List, X } from "@phosphor-icons/react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const APP_URL = "https://salestrackercrm.vercel.app/";

export default function NavBarAdine() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

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

  useEffect(() => {
    /* close the mobile panel when it's interacted with or the viewport grows */
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <div className="w-full max-w-[1080px]">
        <nav
          aria-label="Primary"
          className={`flex w-full items-center justify-between gap-4 rounded-[40px] px-6 py-3 transition-all duration-300 ${
            scrolled
              ? "border border-pebble/50 bg-card/90 shadow-card backdrop-blur-xl"
              : "border border-transparent bg-transparent"
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
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill !min-h-0 !px-6 !py-2.5 !text-[14px] hidden md:inline-flex"
            >
              Start Free
            </a>
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill !min-h-0 !px-5 !py-2.5 !text-[14px] md:hidden"
            >
              Start Free
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-panel"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-pebble bg-card text-slate transition-colors hover:text-violet md:hidden"
            >
              {menuOpen ? (
                <X size={20} aria-hidden="true" />
              ) : (
                <List size={20} aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-nav-panel"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mt-2 rounded-[24px] border border-pebble/60 bg-card/95 p-3 shadow-elevated backdrop-blur-xl md:hidden"
            >
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-[14px] px-4 py-3 text-[15px] font-medium text-slate transition-colors hover:bg-violet-soft hover:text-violet"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
