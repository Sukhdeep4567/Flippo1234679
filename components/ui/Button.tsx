import type { ComponentPropsWithoutRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { cx } from "@/lib/cx";

type ButtonProps = ComponentPropsWithoutRef<"a"> & {
  variant?: "primary" | "secondary";
  size?: "md" | "sm";
  /** Show the round arrow chip on the right. */
  chip?: boolean;
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  chip = true,
}: Pick<ButtonProps, "variant" | "size" | "chip">) {
  return cx(
    "group inline-flex items-center justify-center gap-3 rounded-full font-semibold whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-out-expo active:scale-[0.98]",
    size === "md" ? "h-14 text-[15px]" : "h-11 text-sm",
    chip ? (size === "md" ? "pr-1.5 pl-6" : "pr-1 pl-4") : size === "md" ? "px-7" : "px-5",
    variant === "primary"
      ? "bg-ink text-white shadow-[0_8px_24px_-12px_rgb(17_17_17/0.5)] hover:bg-[#262626] hover:shadow-[0_14px_30px_-12px_rgb(91_63_224/0.55)]"
      : "border border-line bg-white text-ink hover:border-ink/30",
  );
}

export function ButtonChip({
  variant = "primary",
  size = "md",
}: Pick<ButtonProps, "variant" | "size">) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        "grid place-items-center rounded-full transition-transform duration-300 ease-out-expo group-hover:rotate-45",
        size === "md" ? "size-11" : "size-9",
        variant === "primary" ? "bg-white text-ink" : "bg-ink text-white",
      )}
    >
      <ArrowUpRight className="size-[18px]" strokeWidth={2.2} />
    </span>
  );
}

/** Pill-shaped link button. Primary = ink with a circular arrow chip (closewithcopy style). */
export function Button({
  variant = "primary",
  size = "md",
  chip = true,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <a className={cx(buttonClasses({ variant, size, chip }), className)} {...props}>
      <span>{children}</span>
      {chip && <ButtonChip variant={variant} size={size} />}
    </a>
  );
}
