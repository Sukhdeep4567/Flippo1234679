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

    const observeTarget = (el: Element) => {
      if (el.matches("[data-reveal], [data-reveal-group]")) io.observe(el);
      el.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-group]").forEach((target) =>
        io.observe(target),
      );
    };

    targets.forEach((el) => io.observe(el));

    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (node instanceof Element) observeTarget(node);
        });
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });
    root.dataset.reveal = "ready";
    return () => {
      mutations.disconnect();
      io.disconnect();
      delete root.dataset.reveal;
    };
  }, []);

  return null;
}
