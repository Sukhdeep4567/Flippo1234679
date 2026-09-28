"use client";

import { useRef } from "react";
import { m, useInView } from "motion/react";
import { cta, howItWorks } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cx } from "@/lib/cx";

const EASE = [0.16, 1, 0.3, 1] as const;
const LINE_DURATION = 1.6;

export function HowItWorks() {
  const listRef = useRef<HTMLOListElement>(null);
  const inView = useInView(listRef, { once: true, margin: "0px 0px -20% 0px" });
  const steps = howItWorks.steps;
  const at = (i: number) => (i / steps.length) * LINE_DURATION;

  return (
    <section aria-labelledby="how-title" className="section-y">
      <Container>
        <SectionHeading id="how-title" eyebrow={howItWorks.eyebrow} title={howItWorks.title} />

        <ol
          ref={listRef}
          className="relative mt-14 grid gap-10 pl-11 md:mt-20 lg:grid-cols-3 lg:gap-6 lg:pl-0"
        >
          {/* Connector line: vertical on mobile, horizontal on desktop */}
          <span
            aria-hidden="true"
            className="absolute top-3 bottom-6 left-[11px] w-px bg-line lg:hidden"
          >
            <m.span
              className="absolute inset-0 block origin-top bg-accent"
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : undefined}
              transition={{ duration: LINE_DURATION, ease: "easeInOut" }}
            />
          </span>
          <span
            aria-hidden="true"
            className="absolute top-[66px] right-0 left-0 hidden h-px bg-line lg:block"
          >
            <m.span
              className="absolute inset-0 block origin-left bg-accent"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : undefined}
              transition={{ duration: LINE_DURATION, ease: "easeInOut" }}
            />
          </span>

          {steps.map((step, i) => {
            const last = i === steps.length - 1;
            return (
              <li key={step.title} className="relative flex flex-col gap-4 lg:gap-0">
                <span
                  className={cx(
                    "w-fit rounded-full px-4 py-2 text-sm font-semibold",
                    last
                      ? "border border-accent bg-accent text-white"
                      : "border border-line bg-white text-ink",
                  )}
                >
                  {howItWorks.stepLabel} {i + 1}
                </span>

                {/* Dot on the line */}
                <span
                  aria-hidden="true"
                  className="absolute top-2 -left-11 grid size-6 place-items-center lg:static lg:mt-[18px] lg:mb-7"
                >
                  <span className="absolute size-6 rounded-full bg-bg" />
                  <span
                    className={cx(
                      "relative size-3.5 rounded-full border-2 transition-[background-color,border-color,box-shadow] duration-500",
                      inView
                        ? "border-accent bg-accent shadow-[0_0_0_5px_rgb(91_63_224/0.15)]"
                        : "border-line bg-white",
                    )}
                    style={{ transitionDelay: `${at(i)}s` }}
                  />
                </span>

                <m.div
                  className="flex h-full flex-col gap-3 rounded-[22px] bg-surface p-7 md:p-8"
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 0.7, ease: EASE, delay: at(i) + 0.15 }}
                >
                  <h3 className="text-xl font-bold tracking-[-0.01em] md:text-[1.4rem]">
                    {step.title}
                  </h3>
                  <p className="text-muted">{step.body}</p>
                </m.div>
              </li>
            );
          })}
        </ol>

        <Reveal className="mt-14 flex justify-center md:mt-16">
          <Button href={cta.href}>{cta.label}</Button>
        </Reveal>
      </Container>
    </section>
  );
}
