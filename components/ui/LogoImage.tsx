import Image from "next/image";
import type { LogoAsset } from "@/content/site";
import { cx } from "@/lib/cx";

/**
 * Logos normalised to the same visual weight: a fixed-height box, object-contain,
 * and an optional per-logo `scale` from content/site.ts. Grayscale until hover.
 */
export function LogoImage({
  logo,
  height = 32,
  width = 150,
  className,
}: {
  logo: LogoAsset;
  height?: number;
  width?: number;
  className?: string;
}) {
  const scale = logo.scale ?? 1;
  return (
    <span
      className={cx(
        "relative block opacity-60 grayscale transition-[filter,opacity] duration-500 hover:opacity-100 hover:grayscale-0",
        className,
      )}
      style={{ height, width }}
    >
      <Image
        src={logo.src}
        alt={logo.name}
        fill
        sizes={`${width}px`}
        unoptimized={logo.src.endsWith(".svg")}
        className="object-contain"
        style={{ transform: scale !== 1 ? `scale(${scale})` : undefined }}
      />
    </span>
  );
}
