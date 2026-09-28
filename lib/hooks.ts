"use client";

import { useSyncExternalStore } from "react";

/** Subscribe to a CSS media query. Returns `false` during SSR and hydration. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** True on devices with a precise pointer that can hover (desktop mouse / trackpad). */
export function useFinePointer(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

/**
 * prefers-reduced-motion, hydration-safe: `false` on the server and during hydration,
 * then the real value. (motion's useReducedMotion returns null on the server, which can
 * cause hydration mismatches when render output depends on it.)
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
