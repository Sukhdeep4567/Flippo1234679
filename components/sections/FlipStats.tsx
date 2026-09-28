import { Check } from "lucide-react";
import { flip } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { FlipRotator } from "./FlipRotator";

export function FlipStats() {
  return (
    <section aria-labelledby="expect-title" className="overflow-hidden section-y">
      <Container>
        <FlipRotator prefix={flip.prefix} endings={flip.endings} interval={flip.interval} />

        <div className="mt-16 md:mt-24">
          <h2 id="expect-title" className="eyebrow">
            {flip.statsTitle}
          </h2>
          <RevealGroup
            as="ul"
            className="mt-8 grid grid-cols-2 gap-x-6 gap-y-12 md:gap-x-10 lg:grid-cols-3 lg:gap-y-16"
          >
            {flip.stats.map((stat) => (
              <RevealItem as="li" key={stat.label} className="border-t border-line pt-6 md:pt-8">
                <p className="flex items-center gap-3 text-[clamp(2.75rem,1.8rem+4vw,5.25rem)] leading-none font-bold tracking-[-0.04em]">
                  {stat.value !== undefined ? (
                    <span>
                      {stat.prefix}
                      <CountUp value={stat.value} />
                      {stat.suffix}
                    </span>
                  ) : (
                    <>
                      <span>{stat.text}</span>
                      <span
                        aria-hidden="true"
                        className="grid size-[0.5em] place-items-center rounded-full bg-accent text-white"
                      >
                        <Check className="size-[0.32em]" strokeWidth={3} />
                      </span>
                    </>
                  )}
                </p>
                <p className="mt-3 text-[15px] font-medium text-muted md:text-base">{stat.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
