"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { Faq } from "@/content/site";
import { cx } from "@/lib/cx";

/** One item open at a time; smooth height; + rotates to ×. Answers stay in the DOM for crawlers. */
export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const id = `faq-${i}`;
        return (
          <li key={item.question} className="border-b border-line">
            <h3>
              <button
                type="button"
                id={`${id}-q`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
              >
                <span className="text-lg font-semibold tracking-[-0.01em] md:text-xl">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cx(
                    "grid size-10 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color,color] duration-500 ease-out-expo",
                    isOpen
                      ? "rotate-45 border-ink bg-ink text-white"
                      : "border-line bg-white text-ink group-hover:border-ink/40",
                  )}
                >
                  <Plus className="size-4" strokeWidth={2.2} />
                </span>
              </button>
            </h3>
            <div
              id={`${id}-a`}
              role="region"
              aria-labelledby={`${id}-q`}
              className="collapse-grid"
              data-open={isOpen}
            >
              <div>
                <p className="max-w-[62ch] pr-14 pb-7 text-muted">{item.answer}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
