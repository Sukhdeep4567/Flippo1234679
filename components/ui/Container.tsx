import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cx } from "@/lib/cx";

type ContainerProps<T extends ElementType> = {
  as?: T;
  size?: "default" | "narrow" | "wide";
} & ComponentPropsWithoutRef<T>;

const sizes = {
  narrow: "max-w-[896px]",
  default: "max-w-[1264px]",
  wide: "max-w-[1504px]",
};

/** Max 1200px content width with 20px (mobile) / 32px (tablet+) side gutters. */
export function Container<T extends ElementType = "div">({
  as,
  size = "default",
  className,
  ...props
}: ContainerProps<T>) {
  const Comp: ElementType = as ?? "div";
  return <Comp className={cx("mx-auto w-full px-5 md:px-8", sizes[size], className)} {...props} />;
}
