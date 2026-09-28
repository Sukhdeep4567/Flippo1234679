import type { CSSProperties, ReactNode } from "react";

/*
 * Scroll reveals without per-element JS: these render plain server HTML with data attributes.
 * A single <RevealObserver/> (mounted once in the layout) adds `is-in` when an element enters
 * the viewport, and CSS in globals.css does the fade-up. Keeps hydration light.
 */

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section" | "article";
};

/** Subtle one-time fade-up when the element scrolls into view. */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Comp = as;
  return (
    <Comp
      data-reveal=""
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined}
    >
      {children}
    </Comp>
  );
}

/** Parent that staggers its <RevealItem> children. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "ol";
}) {
  const Comp = as;
  return (
    <Comp
      data-reveal-group=""
      className={className}
      style={{ "--reveal-stagger": `${stagger}s` } as CSSProperties}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
  emphasis = false,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
  /** Arrives last, with a slight scale-up, so the eye lands on it. */
  emphasis?: boolean;
}) {
  const Comp = as;
  return (
    <Comp data-reveal-item={emphasis ? "emphasis" : ""} className={className}>
      {children}
    </Comp>
  );
}
