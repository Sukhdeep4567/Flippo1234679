import { cta, finalCta } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Rich } from "@/components/ui/Rich";

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="py-[clamp(96px,6rem+8vw,208px)]">
      <Container className="flex flex-col items-center text-center">
        <Reveal>
          <h2 id="final-cta-title" className="max-w-[16ch] text-h1 text-balance">
            <Rich text={finalCta.title} emphasisClassName="text-accent" />
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-10 md:mt-12">
          <Button href={cta.href}>{cta.label}</Button>
        </Reveal>
      </Container>
    </section>
  );
}
