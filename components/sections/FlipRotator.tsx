"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useInView } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/hooks";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * "FLIP" + a rotating serif ending that flips vertically (rotateX), letter by letter.
 * Screen readers get one static sentence; the animated letters are hidden from them.
 */
export function FlipRotator({
  prefix,
  endings,
  interval,
}: {
  prefix: string;
  endings: string[];
  interval: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" });
  const reduce = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % endings.length), interval);
    return () => window.clearInterval(id);
  }, [inView, reduce, interval, endings.length]);

  const word = endings[reduce ? 0 : index];

  return (
    <div ref={ref}>
      <p className="sr-only">
        {prefix}: {endings.join(", ")}
      </p>
      <div
        aria-hidden="true"
        className="flex flex-col leading-[0.86] lg:flex-row lg:items-end lg:gap-[2vw]"
      >
        <span className="shrink-0 text-[clamp(5.5rem,19vw,17rem)] font-extrabold tracking-[-0.055em] text-ink lg:text-[clamp(8rem,14.5vw,14rem)]">
          {prefix}
        </span>
        {/* Fixed height = no layout shift. Two lines on small screens for long endings. */}
        <span className="relative block h-[2.3em] text-[clamp(2.5rem,8.6vw,8.25rem)] [perspective:900px] sm:h-[1.25em] lg:mb-[-0.12em] lg:flex-1 lg:text-[clamp(3.5rem,5.6vw,5.5rem)]">
          <AnimatePresence mode="popLayout" initial={false}>
            <m.span
              key={word}
              className="absolute inset-x-0 top-0 block font-serif font-medium tracking-[-0.02em] text-accent italic"
              style={{ lineHeight: 1.1 }}
            >
              {word.split(" ").map((part, wi, arr) => (
                <Fragment key={wi}>
                  <span className="inline-block whitespace-nowrap">
                    {part.split("").map((ch, ci) => {
                      const n = arr.slice(0, wi).join("").length + ci;
                      return (
                        <m.span
                          key={ci}
                          className="inline-block origin-[50%_50%_-0.3em] [backface-visibility:hidden]"
                          initial={{ rotateX: -90, opacity: 0 }}
                          animate={{ rotateX: 0, opacity: 1 }}
                          exit={{ rotateX: 90, opacity: 0 }}
                          transition={{ duration: 0.55, ease: EASE, delay: n * 0.028 }}
                        >
                          {ch}
                        </m.span>
                      );
                    })}
                  </span>
                  {wi < arr.length - 1 && " "}
                </Fragment>
              ))}
            </m.span>
          </AnimatePresence>
        </span>
      </div>
    </div>
  );
}
