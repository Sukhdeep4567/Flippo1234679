"use client";

import Image from "next/image";
import { m } from "motion/react";
import { Check } from "lucide-react";
import { impact } from "@/content/site";
import { cx } from "@/lib/cx";

const EASE = [0.16, 1, 0.3, 1] as const;
const viewport = { once: true, margin: "0px 0px -15% 0px" } as const;

function Frame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cx(
        "relative mx-auto w-full max-w-[440px] rounded-[24px] bg-surface p-5 md:p-7",
        className,
      )}
    >
      <div className="rounded-[18px] bg-white p-5 shadow-[0_20px_50px_-30px_rgb(17_17_17/0.35)] ring-1 ring-black/[0.04] md:p-6">
        {children}
      </div>
    </div>
  );
}

/** Visual choice-based surveying: 4 tiles, one gets picked. */
export function EmotionsVisual() {
  const v = impact.visuals.emotions;
  return (
    <Frame>
      <p className="text-sm font-semibold">{v.prompt}</p>
      <m.div
        className="mt-4 grid grid-cols-2 gap-3"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      >
        {v.tiles.map((tile, i) => {
          const picked = i === v.pickedIndex;
          return (
            <m.div
              key={tile.src}
              className="relative aspect-square overflow-visible"
              variants={{
                hidden: { opacity: 0, scale: 0.92 },
                show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
              }}
            >
              <m.div
                className="relative size-full overflow-hidden rounded-xl"
                initial={{ boxShadow: "0 0 0 0px rgba(91,63,224,0)" }}
                whileInView={
                  picked
                    ? { boxShadow: "0 0 0 3px rgba(91,63,224,1)", scale: 1.03 }
                    : { opacity: 0.55 }
                }
                viewport={viewport}
                transition={{ delay: 0.9, duration: 0.5, ease: EASE }}
              >
                <Image src={tile.src} alt="" fill sizes="180px" className="object-cover" />
              </m.div>
              {picked && (
                <m.span
                  className="absolute -top-2 -right-2 grid size-7 place-items-center rounded-full bg-accent text-white shadow-lg"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={viewport}
                  transition={{ delay: 1.05, type: "spring", stiffness: 400, damping: 18 }}
                >
                  <Check className="size-4" strokeWidth={3} />
                </m.span>
              )}
            </m.div>
          );
        })}
      </m.div>
    </Frame>
  );
}

/** Hyper profiling: a fan card with resonance bars and tags. */
export function ProfilingVisual() {
  const v = impact.visuals.profiling;
  return (
    <Frame>
      <div className="flex items-center gap-3">
        <span className="relative size-11 overflow-hidden rounded-full">
          <Image src={v.avatar.src} alt="" fill sizes="44px" className="object-cover" />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-sm font-bold">{v.name}</span>
          <span className="text-xs text-muted">{v.caption}</span>
        </span>
      </div>
      <div className="mt-6 flex flex-col gap-4">
        {v.bars.map((bar, i) => (
          <div key={bar.label} className="flex items-center gap-3">
            <span className="w-16 text-xs font-semibold text-muted">{bar.label}</span>
            <span className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-surface">
              <m.span
                className="absolute inset-y-0 left-0 block origin-left rounded-full"
                style={{
                  width: `${bar.value}%`,
                  background:
                    i === v.bars.length - 1
                      ? "var(--accent-gradient)"
                      : "color-mix(in oklab, var(--accent) 35%, white)",
                }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={viewport}
                transition={{ duration: 1.1, ease: EASE, delay: 0.2 + i * 0.15 }}
              />
            </span>
            <span className="w-9 text-right tabular text-xs font-semibold">{bar.value}%</span>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {v.tags.map((tag, i) => (
          <m.span
            key={tag}
            className="rounded-full border border-line px-3 py-1 text-xs font-semibold"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.4, delay: 0.8 + i * 0.08 }}
          >
            {tag}
          </m.span>
        ))}
      </div>
    </Frame>
  );
}

const SAMPLE = Array.from({ length: 12 }, (_, i) => i);
const FIELD = Array.from({ length: 96 }, (_, i) => i);

/** Sample → population: a few dots expand into a large dot field. */
export function DataVisual() {
  const v = impact.visuals.data;
  return (
    <Frame>
      <div className="grid grid-cols-[auto_1fr] items-center gap-5">
        <div className="flex flex-col items-center gap-2">
          <div className="grid grid-cols-3 gap-1.5">
            {SAMPLE.map((i) => (
              <m.span
                key={i}
                className="size-2.5 rounded-full bg-accent"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewport}
                transition={{ delay: i * 0.03, duration: 0.3 }}
              />
            ))}
          </div>
          <span className="text-[11px] font-semibold tracking-[0.12em] text-muted uppercase">
            {v.sampleLabel}
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="grid grid-cols-12 gap-1">
            {FIELD.map((i) => (
              <m.span
                key={i}
                className="size-1.5 rounded-full sm:size-2"
                style={{
                  background:
                    i % 7 === 0 ? "var(--teal)" : i % 5 === 0 ? "var(--accent-2)" : "var(--accent)",
                }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 0.35 + ((i * 13) % 10) / 16, scale: 1 }}
                viewport={viewport}
                transition={{ delay: 0.5 + ((i * 7) % 24) * 0.03, duration: 0.35 }}
              />
            ))}
          </div>
          <span className="text-[11px] font-semibold tracking-[0.12em] text-muted uppercase">
            {v.populationLabel}
          </span>
        </div>
      </div>
      <m.p
        className="mt-6 inline-flex rounded-full bg-surface px-3.5 py-1.5 text-xs font-bold"
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ delay: 1.3, duration: 0.4 }}
      >
        {v.caption}
      </m.p>
    </Frame>
  );
}
