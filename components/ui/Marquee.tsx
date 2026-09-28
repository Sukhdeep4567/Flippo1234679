import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

/**
 * CSS-only infinite marquee. Items are rendered twice and the track slides by 50%.
 * Pauses on hover/focus and stops under prefers-reduced-motion.
 */
export function Marquee({
  items,
  duration = 40,
  className,
  label,
}: {
  items: ReactNode[];
  duration?: number;
  className?: string;
  label: string;
}) {
  return (
    <div
      className={cx("marquee fade-mask-x overflow-hidden", className)}
      aria-label={label}
      role="region"
    >
      <div
        className="marquee-track flex w-max"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="flex shrink-0 items-center gap-14 pr-14 md:gap-20 md:pr-20"
            aria-hidden={copy === 1 ? true : undefined}
          >
            {items.map((item, i) => (
              <li key={i} className="shrink-0">
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
