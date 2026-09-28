"use client";

import { m } from "motion/react";
import { cx } from "@/lib/cx";

/** Hairline that draws toward the loop, ending in a small dot where it meets it. */
export function ConnectorLine({
  direction,
  className,
}: {
  direction: "left" | "right" | "up" | "down";
  className?: string;
}) {
  const horizontal = direction === "left" || direction === "right";
  const origin = { right: "left", left: "right", down: "top", up: "bottom" }[direction];
  return (
    <span
      aria-hidden="true"
      className={cx("relative block", horizontal ? "h-px" : "w-px", className)}
    >
      <m.span
        className="absolute inset-0 block bg-ink/20"
        style={{ transformOrigin: origin }}
        initial={horizontal ? { scaleX: 0 } : { scaleY: 0 }}
        whileInView={horizontal ? { scaleX: 1 } : { scaleY: 1 }}
        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
        transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <span
        className={cx(
          "absolute size-1.5 rounded-full bg-ink/40",
          direction === "right" && "top-1/2 right-0 translate-x-1/2 -translate-y-1/2",
          direction === "left" && "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2",
          direction === "down" && "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
          direction === "up" && "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
        )}
      />
    </span>
  );
}
