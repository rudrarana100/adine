import { useEffect, useState } from "react";
import { List, X, CaretDown } from "@phosphor-icons/react";

const LINKS = ["Features", "Integrations", "Pricing", "Changelog", "Blog"];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-5 z-50">
      <nav aria-label="Primary" className="shell flex items-center justify-between gap-4">
        <a
          href="#top"
          className="font-display text-[18px] tracking-[-0.02em] text-graphite"
          aria-label="SalesTracker CRM home"
        >
          SalesTracker<span className="text-ember">.</span>
        </a>

        <ul
          className={`hidden items-center gap-5 rounded-pill px-[18px] py-2 transition-colors md:flex ${
            scrolled ? "bg-ash/85 backdrop-blur-[12px]" : "bg-ash"
          }`}
        >
          {LINKS.map((link, i) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="font-display flex items-center gap-1 text-[16px] tracking-[-0.02em] text-graphite hover:text-ember"
              >
                {link}
                {i === 0 && <CaretDown size={13} weight="regular" aria-hidden="true" />}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#demo" className="btn-solid hidden !min-h-0 !py-2.5 md:inline-flex">
            Request demo
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex h-12 w-12 items-center justify-center rounded-pill bg-ash md:hidden"
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
              className="mb-8 flex h-12 w-12 items-center justify-center self-end rounded-pill bg-ash"
            >
              <X size={20} aria-hidden="true" />
            </button>
            <ul className="flex flex-col gap-2">
              {LINKS.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className="font-display block py-3 text-[20px] tracking-[-0.02em] text-graphite"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#demo" onClick={() => setOpen(false)} className="btn-solid mt-auto w-full">
              Request demo
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
