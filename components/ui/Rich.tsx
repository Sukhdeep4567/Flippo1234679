import { Fragment } from "react";
import { Emphasis } from "./Emphasis";

/** Renders copy from content/site.ts, turning *word* into <Emphasis>word</Emphasis>. */
export function Rich({ text, emphasisClassName }: { text: string; emphasisClassName?: string }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <Emphasis key={i} className={emphasisClassName}>
            {part.slice(1, -1)}
          </Emphasis>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

/** Plain-text version of a Rich string (for aria labels, metadata, JSON-LD). */
export function plain(text: string): string {
  return text.replace(/\*/g, "");
}
