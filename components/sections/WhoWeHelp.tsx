"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { roles, whoWeHelp } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Emphasis } from "@/components/ui/Emphasis";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cx } from "@/lib/cx";
import { selectRole } from "@/lib/events";
import { useFinePointer } from "@/lib/hooks";

/**
 * Only role titles are shown. Hover (desktop), focus (keyboard) or tap (touch) unveils the
 * description. Clicking a role on desktop — or its arrow link anywhere — scrolls to the
 * enquiry form and pre-selects that role.
 */
export function WhoWeHelp() {
  const [open, setOpen] = useState<number | null>(null);
  const fine = useFinePointer();

  return (
    <section aria-labelledby="who-title" className="bg-white section-y">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="who-title"
            eyebrow={whoWeHelp.eyebrow}
            title={whoWeHelp.title}
            align="left"
            size="small"
            titleClassName="text-[clamp(1.75rem,1.3rem+1.6vw,2.625rem)] leading-[1.12]"
          />
          <p className="mt-5 text-sm text-muted">{whoWeHelp.hint}</p>
        </div>

        <RevealGroup as="ul" stagger={0.05} className="border-t border-line">
          {roles.map((role, i) => {
            const isOpen = open === i;
            const panelId = `role-panel-${i}`;
            return (
              <RevealItem as="li" key={role.title} className="border-b border-line">
                <div
                  onMouseEnter={() => fine && setOpen(i)}
                  onMouseLeave={() => fine && setOpen((cur) => (cur === i ? null : cur))}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onFocus={(e) => {
                      // Keyboard focus unveils the row; taps are handled by onClick.
                      if (e.currentTarget.matches(":focus-visible")) setOpen(i);
                    }}
                    onClick={() => {
                      if (fine) selectRole(role.title);
                      else setOpen(isOpen ? null : i);
                    }}
                    className="group flex w-full items-center gap-5 py-5 text-left md:gap-8 md:py-6"
                  >
                    <span className="w-7 shrink-0 tabular text-xs font-semibold text-muted md:text-sm">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cx(
                        "flex-1 text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] leading-[1.1] font-bold tracking-[-0.025em] transition-colors duration-300",
                        isOpen ? "text-accent" : "text-ink",
                      )}
                    >
                      {isOpen ? <Emphasis>{role.title}</Emphasis> : role.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cx(
                        "grid size-11 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-out-expo",
                        isOpen
                          ? "translate-x-0 border-accent bg-accent text-white opacity-100"
                          : "-translate-x-2 border-line text-ink opacity-0 md:opacity-0",
                      )}
                    >
                      <ArrowRight className="size-5" />
                    </span>
                  </button>
                  <div id={panelId} className="collapse-grid" data-open={isOpen}>
                    <div>
                      <div className="flex flex-col gap-4 pb-7 pl-12 sm:flex-row sm:items-center sm:justify-between md:pl-15">
                        <p className="max-w-[40ch] text-lead text-muted">{role.description}</p>
                        <button
                          type="button"
                          tabIndex={isOpen ? 0 : -1}
                          onClick={() => selectRole(role.title)}
                          className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-surface px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white sm:self-auto"
                        >
                          {whoWeHelp.enquireLabel} {role.title}
                          <ArrowRight className="size-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
