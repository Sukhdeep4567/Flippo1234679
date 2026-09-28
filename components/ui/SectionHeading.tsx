import { cx } from "@/lib/cx";
import { Rich } from "./Rich";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
  size?: "default" | "small";
  className?: string;
  titleClassName?: string;
};

/** Eyebrow label + H2 with an optional serif emphasis word. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  align = "center",
  size = "default",
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cx(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2
        id={id}
        className={cx(
          size === "default" ? "max-w-[20ch] text-h2" : "max-w-[32ch] text-h3",
          "text-balance",
          titleClassName,
        )}
      >
        <Rich text={title} />
      </h2>
    </Reveal>
  );
}
