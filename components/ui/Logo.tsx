import { cx } from "@/lib/cx";

/**
 * FLIPO placeholder logo: two overlapping circles + letter-spaced wordmark.
 * Swap this component's contents (or public/brand/flipo-logo.svg) for the official file.
 */
export function Logo({ className, markOnly = false }: { className?: string; markOnly?: boolean }) {
  return (
    <span className={cx("inline-flex items-center gap-2.5 text-ink", className)}>
      <LogoMark className="h-[1.35em] w-auto" />
      {!markOnly && (
        <span className="text-[1em] leading-none font-bold tracking-[0.26em]">FLIPO</span>
      )}
    </span>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 46 28" className={className} aria-hidden="true" focusable="false">
      <circle cx="14" cy="14" r="12.5" fill="var(--accent)" />
      <circle cx="32" cy="14" r="12.5" fill="var(--accent-2)" fillOpacity="0.75" />
    </svg>
  );
}
