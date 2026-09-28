import { Building2, ChartLine, UserRound, type LucideIcon } from "lucide-react";
import { cta, smarterWay } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LogoMark } from "@/components/ui/Logo";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons: Record<(typeof smarterWay.options)[number]["icon"], LucideIcon> = {
  hire: UserRound,
  research: ChartLine,
  agency: Building2,
};

export function SmarterWay() {
  const { highlight } = smarterWay;
  return (
    <section aria-labelledby="smarter-title" className="section-y">
      <Container>
        <SectionHeading id="smarter-title" eyebrow={smarterWay.eyebrow} title={smarterWay.title} />

        <RevealGroup
          as="ol"
          stagger={0.12}
          className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-5"
        >
          {smarterWay.options.map((option, i) => {
            const Icon = icons[option.icon];
            return (
              <RevealItem
                as="li"
                key={option.title}
                className="flex flex-col gap-5 rounded-[22px] bg-surface p-7 md:p-9"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-full bg-white text-muted">
                    <Icon className="size-5" aria-hidden="true" strokeWidth={1.8} />
                  </span>
                  <span className="tabular text-sm font-semibold text-muted">{i + 1}.</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-xl font-bold tracking-[-0.01em] text-ink/80 md:text-2xl">
                    {option.title}
                  </h3>
                  <p className="text-muted">{option.body}</p>
                </div>
              </RevealItem>
            );
          })}
          <RevealItem as="li" emphasis className="relative md:-top-2">
            <article className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-[22px] p-7 text-white shadow-[0_30px_70px_-30px_rgb(91_63_224/0.75)] ring-1 ring-accent/40 transition-[transform,box-shadow] duration-500 ease-out-expo [background:var(--accent-gradient)] hover:-translate-y-1.5 hover:shadow-[0_40px_90px_-30px_rgb(91_63_224/0.9)] md:p-9">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-white/15 blur-3xl transition-transform duration-700 group-hover:scale-125"
              />
              <div className="relative flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-full bg-white">
                  <LogoMark className="h-5 w-auto" />
                </span>
                <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold tracking-[0.12em] text-accent uppercase">
                  {highlight.badge}
                </span>
              </div>
              <div className="relative flex flex-col gap-2.5">
                <h3 className="text-2xl font-extrabold tracking-[0.2em] md:text-[1.75rem]">
                  {highlight.title}
                </h3>
                <p className="text-white/85">{highlight.body}</p>
              </div>
            </article>
          </RevealItem>
        </RevealGroup>

        <Reveal className="mt-14 flex justify-center md:mt-16">
          <Button href={cta.href}>{cta.label}</Button>
        </Reveal>
      </Container>
    </section>
  );
}
