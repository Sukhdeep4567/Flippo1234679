"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";
import { cta, hero } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Emphasis } from "@/components/ui/Emphasis";
import { HeroCollage } from "./HeroCollage";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden"
    >
      <div className="relative flex min-h-[100svh] items-center justify-center pt-[calc(var(--header-h)+150px)] pb-[150px] md:pt-[calc(var(--header-h)+200px)] md:pb-[200px] lg:min-h-[max(100svh,760px)] lg:py-24">
        <HeroCollage progress={scrollYProgress} />

        <m.div
          style={reduce ? undefined : { opacity: textOpacity, y: textY, scale: textScale }}
          className="relative z-10 mx-auto flex max-w-[1000px] flex-col items-center px-5 py-4 text-center"
        >
          <h1 id="hero-title" className="max-w-[14ch] text-h1 text-balance lg:max-w-[16ch]">
            {hero.titleWords.map((word, i) => {
              const isEm = word.startsWith("*") && word.endsWith("*");
              return (
                <span key={i}>
                  <span className="word-reveal-inline" style={{ ["--i" as string]: i }}>
                    {isEm ? <Emphasis>{word.slice(1, -1)}</Emphasis> : word}
                  </span>
                  {i < hero.titleWords.length - 1 && " "}
                </span>
              );
            })}
          </h1>
          <p
            className="word-reveal mt-6 max-w-[38ch] text-lead text-muted md:mt-7"
            style={{ ["--i" as string]: hero.titleWords.length }}
          >
            {hero.subline}
          </p>
          <div
            className="word-reveal mt-9 md:mt-10"
            style={{ ["--i" as string]: hero.titleWords.length + 1.5 }}
          >
            <Button href={cta.href}>{cta.label}</Button>
          </div>
        </m.div>
      </div>
    </section>
  );
}
