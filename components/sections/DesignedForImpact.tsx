import { impact, site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cx } from "@/lib/cx";
import { DataVisual, EmotionsVisual, ProfilingVisual } from "./ImpactVisuals";
import { MouseSpotlight } from "./MouseSpotlight";

const visuals = {
  emotions: EmotionsVisual,
  profiling: ProfilingVisual,
  data: DataVisual,
};

export function DesignedForImpact() {
  return (
    <section
      id={impact.id}
      aria-labelledby="impact-title"
      className="relative isolate overflow-hidden section-y"
    >
      {site.enableMouseBackground && <MouseSpotlight />}
      <Container>
        <SectionHeading id="impact-title" eyebrow={impact.eyebrow} title={impact.title} />

        <div className="mt-16 flex flex-col gap-20 md:mt-24 md:gap-28">
          {impact.rows.map((row, i) => {
            const Visual = visuals[row.visual];
            const reversed = i % 2 === 1;
            return (
              <article
                key={row.title}
                className="grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24"
              >
                <Reveal className={cx("flex flex-col gap-4", reversed && "md:order-2")}>
                  <span className="tabular eyebrow">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-h3 md:text-[2.25rem]">{row.title}</h3>
                  <p className="max-w-[46ch] text-lead text-muted">{row.body}</p>
                </Reveal>
                <Reveal delay={0.1} className={cx(reversed && "md:order-1")}>
                  <Visual />
                </Reveal>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
