"use client";

import Image from "next/image";
import { m } from "motion/react";
import type { ImageAsset } from "@/content/site";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Large version of closewithcopy's hero pill: overlapping faces + a count bubble. */
export function AudienceFaces({ avatars, count }: { avatars: ImageAsset[]; count: string }) {
  return (
    <m.ul
      aria-hidden="true"
      className="flex items-center"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
    >
      {avatars.map((a, i) => (
        <m.li
          key={a.src}
          className={`-ml-3 first:ml-0 md:-ml-4 ${i >= 6 ? "max-sm:hidden" : ""}`}
          style={{ zIndex: avatars.length - i }}
          variants={{
            hidden: { opacity: 0, x: -18, scale: 0.8 },
            show: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
          }}
        >
          <span className="relative block size-11 overflow-hidden rounded-full border-[3px] border-white bg-surface shadow-[0_8px_20px_-10px_rgb(17_17_17/0.4)] transition-transform duration-300 ease-out-expo hover:-translate-y-1.5 sm:size-14 md:size-[68px]">
            <Image src={a.src} alt={a.alt} fill sizes="68px" className="object-cover" />
          </span>
        </m.li>
      ))}
      <m.li
        className="-ml-3 md:-ml-4"
        variants={{
          hidden: { opacity: 0, scale: 0.6 },
          show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
        }}
      >
        <span className="grid h-12 min-w-12 place-items-center rounded-full border-[3px] border-white px-3 text-sm font-extrabold whitespace-nowrap text-white shadow-[0_8px_20px_-10px_rgb(91_63_224/0.8)] [background:var(--accent-gradient)] sm:h-14 sm:px-4 sm:text-base md:h-[68px] md:px-5 md:text-lg">
          {count}
        </span>
      </m.li>
    </m.ul>
  );
}
