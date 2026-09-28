"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { testimonials } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cx } from "@/lib/cx";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function ArrowButton({
  dir,
  onClick,
  label,
}: {
  dir: "prev" | "next";
  onClick: () => void;
  label: string;
}) {
  const Icon = dir === "prev" ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-14 place-items-center rounded-full border border-line bg-white text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white"
    >
      <Icon className="size-5" aria-hidden="true" />
    </button>
  );
}

export function Testimonials() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);
  const items = testimonials.items;

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    embla.on("select", onSelect);
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla]);

  const prev = useCallback(() => embla?.scrollPrev(), [embla]);
  const next = useCallback(() => embla?.scrollNext(), [embla]);

  return (
    <section aria-labelledby="testimonials-title" className="overflow-hidden section-y">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] lg:gap-16">
        <div className="flex flex-col justify-between gap-10">
          <SectionHeading
            id="testimonials-title"
            eyebrow={testimonials.eyebrow}
            title={testimonials.title}
            align="left"
            titleClassName="max-w-[12ch]"
          />
          <Reveal className="hidden gap-3 lg:flex">
            <ArrowButton dir="prev" onClick={prev} label={testimonials.prevLabel} />
            <ArrowButton dir="next" onClick={next} label={testimonials.nextLabel} />
          </Reveal>
        </div>

        <Reveal className="min-w-0">
          <div
            className="overflow-visible lg:overflow-hidden"
            ref={emblaRef}
            role="region"
            aria-roledescription="carousel"
            aria-label={testimonials.eyebrow}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                prev();
              } else if (e.key === "ArrowRight") {
                e.preventDefault();
                next();
              }
            }}
          >
            <div className="-ml-4 flex touch-pan-y md:-ml-5">
              {items.map((t, i) => (
                <div
                  key={t.name}
                  className="min-w-0 shrink-0 grow-0 basis-[90%] pl-4 md:basis-[82%] md:pl-5"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} / ${items.length}`}
                >
                  <figure
                    className={cx(
                      "flex h-full flex-col justify-between gap-10 rounded-[24px] bg-surface p-7 transition-opacity duration-500 md:p-11",
                      i !== selected && "opacity-60",
                    )}
                  >
                    <blockquote className="text-[clamp(1.2rem,1rem+0.8vw,1.625rem)] leading-[1.45] font-semibold tracking-[-0.01em] text-ink">
                      <span
                        aria-hidden="true"
                        className="mb-4 block font-serif text-6xl leading-[0.6] text-accent"
                      >
                        “
                      </span>
                      <p>{t.quote}</p>
                    </blockquote>
                    <figcaption className="flex flex-wrap items-end justify-between gap-5">
                      <div className="flex items-center gap-4">
                        <span
                          aria-hidden="true"
                          className="grid size-12 shrink-0 place-items-center rounded-full text-sm font-bold text-white [background:var(--accent-gradient)]"
                        >
                          {initials(t.name)}
                        </span>
                        <span className="flex flex-col">
                          <span className="font-bold">{t.name}</span>
                          <span className="text-sm text-muted">
                            {t.role}, {t.company}
                          </span>
                        </span>
                      </div>
                      <a
                        href={t.sourceUrl ?? testimonials.defaultSourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={i === selected ? 0 : -1}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-accent underline-offset-4 hover:underline"
                      >
                        {testimonials.sourceLabel}
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                        <span className="sr-only"> ({t.name}, opens in a new tab)</span>
                      </a>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile / tablet controls */}
          <div className="mt-8 flex items-center justify-between lg:hidden">
            <div className="flex gap-2">
              {items.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => embla?.scrollTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === selected}
                  className="grid size-6 place-items-center"
                >
                  <span
                    className={cx(
                      "block h-2 rounded-full transition-all duration-300",
                      i === selected ? "w-6 bg-ink" : "w-2 bg-ink/20",
                    )}
                  />
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <ArrowButton dir="prev" onClick={prev} label={testimonials.prevLabel} />
              <ArrowButton dir="next" onClick={next} label={testimonials.nextLabel} />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
