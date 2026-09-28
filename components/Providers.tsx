"use client";

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig } from "motion/react";

// Animation features load asynchronously after the page is interactive; SSR'd initial
// styles apply meanwhile, so nothing flashes.
const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

/** Lazily loads the light motion feature bundle and honours prefers-reduced-motion site-wide. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
