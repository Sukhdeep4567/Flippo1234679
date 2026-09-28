"use client";

import { useRef, useState } from "react";
import { m, useMotionValueEvent, useScroll } from "motion/react";
import { Menu } from "lucide-react";
import { cta, nav } from "@/content/site";
import { cx } from "@/lib/cx";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "./MobileMenu";

const HIDE_AFTER = 120; // px from top before the header may hide
const DELTA = 6; // ignore tiny scroll jitters

/** Transparent at the top; hides on scroll down, reappears on scroll up. */
export function Header() {
  const { scrollY } = useScroll();
  const last = useRef(0);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const diff = y - last.current;
    setScrolled(y > 12);
    if (Math.abs(diff) < DELTA) return;
    setHidden(diff > 0 && y > HIDE_AFTER);
    last.current = y;
  });

  return (
    <>
      <m.header
        className={cx(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled && !menuOpen
            ? "border-line/80 bg-bg/80 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent",
        )}
        initial={false}
        animate={{ y: hidden && !menuOpen ? "calc(-100% - 32px)" : "0%" }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto grid h-[var(--header-h)] w-full max-w-[1504px] grid-cols-[1fr_auto] items-center px-5 md:px-8 lg:grid-cols-[1fr_auto_1fr]">
          <a href="#top" aria-label={nav.homeLabel} className="justify-self-start text-[17px]">
            <Logo />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="rounded-full px-4 py-2 text-[15px] font-medium text-ink/75 transition-colors hover:bg-surface hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 justify-self-end">
            <span className="hidden sm:block">
              <Button href={cta.href} size="sm">
                {cta.label}
              </Button>
            </span>
            <button
              ref={menuButton}
              type="button"
              className="grid size-11 place-items-center rounded-full border border-line bg-white text-ink lg:hidden"
              aria-label={nav.menuOpenLabel}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </m.header>

      <MobileMenu
        open={menuOpen}
        onClose={() => {
          setMenuOpen(false);
          menuButton.current?.focus();
        }}
      />
    </>
  );
}
