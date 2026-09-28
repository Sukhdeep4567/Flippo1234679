"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "motion/react";
import { cx } from "@/lib/cx";
import { usePrefersReducedMotion } from "@/lib/hooks";

/** Giant edge-to-edge "FLIPO" where the "O" is a circular window cycling through images. */
export function FooterWordmark({ images }: { images: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px 10% 0px" });
  const reduce = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!inView || reduce || images.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % images.length), 2000);
    return () => window.clearInterval(id);
  }, [inView, reduce, images.length]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none mt-6 flex justify-center overflow-hidden select-none"
    >
      <p className="pb-[0.06em] text-[25vw] leading-[0.9] whitespace-nowrap">
        {/* Logotype drawn as SVG: decorative brand mark, exempt from text-contrast rules. */}
        <svg
          viewBox="0 0 176 72.3"
          className="inline-block h-[0.723em] w-auto overflow-visible align-baseline"
        >
          <text
            x="0"
            y="72.3"
            fontSize="100"
            textLength="176"
            lengthAdjust="spacingAndGlyphs"
            className="fill-[#ECE9E4] font-sans font-extrabold"
          >
            FLIP
          </text>
        </svg>
        <span className="relative ml-[0.07em] inline-block size-[0.72em] overflow-hidden rounded-full bg-line align-baseline">
          {images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt=""
              fill
              sizes="25vw"
              className={cx(
                "object-cover transition-opacity duration-700",
                i === index ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </span>
      </p>
    </div>
  );
}
