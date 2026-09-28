"use client";

import { useEffect, useRef } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Soft violet/teal glow that follows the cursor with easing (lerp in rAF), like Squarespace's
 * moving backgrounds. Desktop only; off on touch devices and under reduced motion.
 * Only runs while the pointer is over the parent section.
 */
export function MouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduce = usePrefersReducedMotion();
  const enabled = fine && !reduce;

  useEffect(() => {
    const el = ref.current;
    const section = el?.parentElement;
    if (!enabled || !el || !section) return;

    let raf = 0;
    let running = false;
    const target = { x: 0.5, y: 0.35 };
    const pos = { x: 0.5, y: 0.35 };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.08;
      pos.y += (target.y - pos.y) * 0.08;
      el.style.transform = `translate3d(${pos.x * section.clientWidth}px, ${pos.y * section.clientHeight}px, 0) translate(-50%, -50%)`;
      if (Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.0005) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = (e.clientY - r.top) / r.height;
      el.style.opacity = "1";
      start();
    };
    const onLeave = () => {
      el.style.opacity = "0.55";
    };

    tick();
    section.addEventListener("pointermove", onMove, { passive: true });
    section.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-0 -z-10 size-[720px] opacity-55 transition-opacity duration-700"
      style={{
        background:
          "radial-gradient(closest-side, rgb(142 116 255 / 0.20), rgb(57 181 154 / 0.10) 55%, transparent 100%)",
        filter: "blur(30px)",
      }}
    />
  );
}
