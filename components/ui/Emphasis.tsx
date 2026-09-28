import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

/** The italic high-contrast serif used for single emphasis words in headings. */
export function Emphasis({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <em className={cx("font-serif font-medium tracking-[-0.015em] italic", className)}>
      {children}
    </em>
  );
}
