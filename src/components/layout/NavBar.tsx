import { useEffect, useLayoutEffect, useState } from "react";
import { List, X, Sun, Moon } from "@phosphor-icons/react";

const LINKS = [
  { label: "Why SalesTracker", href: "#why" },
  { label: "FAQ", href: "#faq" },
];

function useTheme() {
  const [dark, setDark] = useState<boolean>(false);

  useLayoutEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem("salestracker-theme");
    } catch {
      stored = null;
    }
    const preferred = stored
      ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(preferred);
  }, []);

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      window.localStorage.setItem("salestracker-theme", dark ? "dark" : "light");
    } catch {
      /* storage unavailable — theme still applies for this session */
    }
  }, [dark]);

  return { dark, toggle: () => setDark((d) => !d) };
}

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { dark, toggle } = useTheme();

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
          ? "border-b border-mist bg-canvas-white/90 backdrop-blur-[12px]"
          : "bg-canvas-white"
      }`}
    >
      <nav aria-label="Primary" className="shell flex h-[72px] items-center justify-between gap-4">
        <a
          href="#top"
          className="font-display text-[19px] tracking-[-0.02em] text-graphite"
          aria-label="SalesTracker home"
        >
          SalesTracker<span className="text-ember">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-[15px] text-graphite transition-colors hover:text-ember"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-11 w-11 items-center justify-center rounded-sm border border-mist text-graphite transition-colors hover:bg-ash"
          >
            {dark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
          <a
            href="https://salestrackercrm.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-solid hidden !min-h-0 !px-5 !py-2.5 md:inline-flex"
          >
            Open the app
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex h-11 w-11 items-center justify-center rounded-sm border border-mist text-graphite md:hidden"
          >
            <List size={20} aria-hidden="true" />
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-graphite/30"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex w-[82%] max-w-sm flex-col bg-canvas-white p-6">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="mb-8 flex h-12 w-12 items-center justify-center self-end rounded-sm border border-mist"
            >
              <X size={20} aria-hidden="true" />
            </button>
            <ul className="flex flex-col gap-2">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-display block py-3 text-[20px] tracking-[-0.02em] text-graphite"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <button
                type="button"
                onClick={toggle}
                className="flex h-12 w-12 items-center justify-center rounded-sm border border-mist"
                aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {dark ? (
                  <Sun size={19} aria-hidden="true" />
                ) : (
                  <Moon size={19} aria-hidden="true" />
                )}
              </button>
            </div>
            <a
              href="https://salestrackercrm.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn-solid mt-auto w-full"
            >
              Open the app
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
