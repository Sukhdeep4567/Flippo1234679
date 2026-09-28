import { faq } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "./FaqAccordion";

export function FaqSection() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section aria-labelledby="faq-title" className="bg-white section-y">
      <JsonLd data={faqJsonLd} />
      <Container size="narrow">
        <SectionHeading id="faq-title" eyebrow={faq.eyebrow} title={faq.title} />
        <Reveal className="mt-12 md:mt-16">
          <FaqAccordion items={faq.items} />
        </Reveal>
      </Container>
    </section>
  );
}
