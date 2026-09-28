"use client";

import { useEffect } from "react";

/** One IntersectionObserver for every [data-reveal] / [data-reveal-group] on the page. */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-group]");

    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    targets.forEach((el) => io.observe(el));
    root.dataset.reveal = "ready";
    return () => io.disconnect();
  }, []);

  return null;
}
