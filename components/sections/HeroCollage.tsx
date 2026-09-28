"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import {
  m,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { hero, type HeroSlot, type ImageAsset } from "@/content/site";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/hooks";

/* ------------------------------------------------------------------ */
/* Random template, chosen once per page load on the client only.       */
/* The server snapshot is `null`, so nothing renders until hydration    */
/* is complete: no hydration mismatch, and the SSR'd H1 stays the LCP.  */
/* ------------------------------------------------------------------ */

type Choice = { template: number; order: number[] };
let choice: Choice | null = null;

function getChoice(): Choice {
  if (!choice) {
    const template = Math.floor(Math.random() * hero.templates.length);
    const order = hero.templates[template].images.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    choice = { template, order };
  }
  return choice;
}
const noopSubscribe = () => () => {};

/* ------------------------------------------------------------------ */

const EASE = [0.16, 1, 0.3, 1] as const;
const PARALLAX = [6, 13, 24]; // px per depth layer (far → near)
const FAR_BLUR = [1.2, 0.3, 0]; // px blur at rest per depth layer (desktop)
const FAR_BLUR_MOBILE = [0, 0, 0];
const MOBILE_BAND = { base: 150, md: 200 };

type Placed = {
  key: string;
  image: ImageAsset;
  cx: number; // centre x in px
  cy: number; // centre y in px
  w: number;
  h: number;
  depth: 0 | 1 | 2;
  index: number;
  blur: number;
  /** Animate the blur-to-sharp entry (desktop only; filters are costly on phones). */
  entryBlur: boolean;
};

function placeCards(
  images: ImageAsset[],
  order: number[],
  W: number,
  H: number,
  desktop: boolean,
  templateIndex: number,
): Placed[] {
  const tpl = hero.templates[templateIndex];
  if (desktop) {
    const s = Math.min(1.25, Math.max(0.68, Math.min(W / 1440, H / 900)));
    return tpl.layout.desktop.map((slot: HeroSlot, i) => {
      const image = images[order[i % order.length]];
      const w = slot.w * s;
      return {
        key: `d-${i}`,
        image,
        cx: (slot.x / 100) * W,
        cy: (slot.y / 100) * H,
        w,
        h: w / slot.ratio,
        depth: slot.depth,
        index: i,
        blur: FAR_BLUR[slot.depth],
        entryBlur: true,
      };
    });
  }
  const band = W >= 768 ? MOBILE_BAND.md : MOBILE_BAND.base;
  const headerH = 72;
  const s = Math.min(1.5, Math.max(0.85, W / 390));
  return tpl.layout.mobile.map((slot, i) => {
    const image = images[order[i % order.length]];
    const w = slot.w * s;
    const top = slot.band === "top" ? headerH : H - band;
    return {
      key: `m-${i}`,
      image,
      cx: (slot.x / 100) * W,
      cy: top + (slot.y / 100) * band,
      w,
      h: w / slot.ratio,
      depth: slot.depth,
      index: i,
      blur: FAR_BLUR_MOBILE[slot.depth],
      entryBlur: false,
    };
  });
}

export function HeroCollage({ progress }: { progress: MotionValue<number> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const picked = useSyncExternalStore(noopSubscribe, getChoice, () => null);
  const desktop = useMediaQuery("(min-width: 1024px)");
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduce = usePrefersReducedMotion();
  const inView = useInView(containerRef, { margin: "0px 0px 0px 0px" });

  // Mouse parallax (desktop, fine pointer, motion allowed)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });
  const parallaxOn = desktop && finePointer && !reduce;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Mount the cards once the browser is idle after hydration, so their setup never
  // lengthens the hydration task (the SSR'd headline is already on screen).
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const onIdle = () => setReady(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(onIdle, { timeout: 700 });
      return () => window.cancelIdleCallback(id);
    }
    const id = globalThis.setTimeout(onIdle, 120);
    return () => globalThis.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!parallaxOn) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [parallaxOn, mx, my]);

  const cards =
    picked && size && ready
      ? placeCards(
          hero.templates[picked.template].images,
          picked.order,
          size.w,
          size.h,
          desktop,
          picked.template,
        )
      : [];

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      data-paused={!inView}
      className="pointer-events-none absolute inset-0 -z-0"
    >
      {size &&
        cards.map((card) => (
          <HeroCard
            key={`${picked?.template}-${card.key}`}
            card={card}
            W={size.w}
            H={size.h}
            progress={progress}
            sx={sx}
            sy={sy}
            parallax={parallaxOn}
            reduce={reduce}
          />
        ))}
    </div>
  );
}

function HeroCard({
  card,
  W,
  H,
  progress,
  sx,
  sy,
  parallax,
  reduce,
}: {
  card: Placed;
  W: number;
  H: number;
  progress: MotionValue<number>;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  parallax: boolean;
  reduce: boolean;
}) {
  const { cx, cy, w, h, depth, index } = card;
  const dx = cx - W / 2;
  const dy = cy - H / 2;
  const push = 0.7 + depth * 0.45;

  // Scroll fly-through: cards keep flying outward and scale past the viewer.
  const scrollX = useTransform(progress, [0, 1], [0, dx * push]);
  const scrollY = useTransform(progress, [0, 1], [0, dy * push]);
  const scrollScale = useTransform(progress, [0, 1], [1, 1.6 + depth * 0.9]);
  const scrollOpacity = useTransform(progress, [0, 0.6, 1], [1, 1, 0]);

  // Mouse parallax: nearer layers move more (opposite to the cursor).
  const px = useTransform(sx, (v) => -v * PARALLAX[depth]);
  const py = useTransform(sy, (v) => -v * PARALLAX[depth]);

  // Deterministic per-card idle drift
  const seed = (index * 37) % 11;
  const floatVars = {
    ["--fx" as string]: `${(seed % 2 ? 1 : -1) * (3 + (seed % 4))}px`,
    ["--fy" as string]: `${(seed % 3 ? -1 : 1) * (4 + (seed % 5))}px`,
    ["--fd" as string]: `${6 + (seed % 5)}s`,
    ["--fdelay" as string]: `${-(seed * 0.7)}s`,
  };

  const delay = Math.min(1.4, (index % 14) * 0.1);
  const eager = index < 4;

  return (
    <div
      className="absolute"
      style={{ left: cx - w / 2, top: cy - h / 2, width: w, height: h, zIndex: depth + 1 }}
    >
      <m.div
        className="size-full"
        style={
          reduce
            ? undefined
            : { x: scrollX, y: scrollY, scale: scrollScale, opacity: scrollOpacity }
        }
      >
        <m.div className="size-full" style={parallax ? { x: px, y: py } : undefined}>
          {/* Idle drift sits outside the (possibly blurred) card so it stays compositor-only. */}
          <div className="hero-float size-full will-change-transform" style={floatVars}>
            <m.div
              className="size-full"
              initial={
                reduce
                  ? false
                  : {
                      x: -dx,
                      y: -dy,
                      scale: 0.2,
                      opacity: 0,
                      ...(card.entryBlur && { filter: "blur(12px)" }),
                    }
              }
              animate={{
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
                ...(card.entryBlur && {
                  filter: `blur(${card.blur}px)`,
                  // Drop the filter entirely once sharp, so no filter layer lingers.
                  transitionEnd: card.blur ? undefined : { filter: "none" },
                }),
              }}
              transition={{ duration: 1.5, delay, ease: EASE }}
            >
              <div className="relative size-full overflow-hidden rounded-[14px] bg-surface shadow-[0_18px_40px_-18px_rgb(17_17_17/0.35)] ring-1 ring-black/5 lg:rounded-[18px]">
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  fill
                  sizes={`${Math.ceil(w)}px`}
                  loading={eager ? "eager" : "lazy"}
                  fetchPriority={eager ? "high" : "auto"}
                  className="object-cover"
                />
              </div>
            </m.div>
          </div>
        </m.div>
      </m.div>
    </div>
  );
}
