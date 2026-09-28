import { research } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Rich } from "@/components/ui/Rich";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cx } from "@/lib/cx";
import { IntegrationLoop } from "./IntegrationLoop";
import { ConnectorLine } from "./ConnectorLine";

function Block({
  title,
  body,
  align,
  dotColor,
}: {
  title: string;
  body: string;
  align: "left" | "right" | "center";
  dotColor: string;
}) {
  return (
    <div
      className={cx(
        "flex max-w-[330px] flex-col gap-3",
        align === "right" && "items-end text-right",
        align === "center" && "mx-auto items-center text-center",
      )}
    >
      <span aria-hidden="true" className="size-2.5 rounded-full" style={{ background: dotColor }} />
      <h3 className="text-h3">
        <Rich text={title} />
      </h3>
      <p className="text-muted">{body}</p>
    </div>
  );
}

export function Research() {
  const [a, b] = research.blocks;
  return (
    <section id={research.id} aria-labelledby="research-title" className="bg-white section-y">
      <Container>
        <SectionHeading id="research-title" eyebrow={research.eyebrow} title={research.title} />

        {/* Desktop: text | horizontal loop | text, joined by connector lines */}
        <div className="mt-20 hidden grid-cols-[minmax(0,1fr)_minmax(360px,480px)_minmax(0,1fr)] items-center lg:grid">
          <Reveal className="flex items-center">
            <Block title={a.title} body={a.body} align="right" dotColor="var(--warm)" />
            <ConnectorLine direction="right" className="ml-6 min-w-8 flex-1" />
          </Reveal>
          <IntegrationLoop
            orientation="horizontal"
            labels={research.loopLabels}
            ariaLabel={research.loopAriaLabel}
            className="h-auto w-full overflow-visible"
          />
          <Reveal className="flex items-center" delay={0.1}>
            <ConnectorLine direction="left" className="mr-6 min-w-8 flex-1" />
            <Block title={b.title} body={b.body} align="left" dotColor="var(--teal)" />
          </Reveal>
        </div>

        {/* Mobile / tablet: stacked with a vertical figure-8 */}
        <div className="mt-14 flex flex-col items-center lg:hidden">
          <Reveal>
            <Block title={a.title} body={a.body} align="center" dotColor="var(--warm)" />
          </Reveal>
          <ConnectorLine direction="down" className="my-5 h-12" />
          <IntegrationLoop
            orientation="vertical"
            labels={research.loopLabels}
            ariaLabel={research.loopAriaLabel}
            className="h-auto w-[min(62vw,250px)] overflow-visible"
          />
          <ConnectorLine direction="up" className="my-5 h-12" />
          <Reveal>
            <Block title={b.title} body={b.body} align="center" dotColor="var(--teal)" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
