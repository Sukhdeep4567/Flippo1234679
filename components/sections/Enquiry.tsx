import { ArrowUpRight } from "lucide-react";
import { enquiry, site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonClasses, ButtonChip } from "@/components/ui/Button";
import { EnquiryForm } from "./EnquiryForm";

export function Enquiry() {
  const comingSoon = !enquiry.reportUrl || enquiry.reportUrl === "#";
  return (
    <section id={enquiry.id} aria-labelledby="enquiry-title" className="section-y">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
        <div className="flex flex-col gap-8 lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="enquiry-title"
            eyebrow={enquiry.eyebrow}
            title={enquiry.title}
            align="left"
            titleClassName="max-w-[16ch]"
          />
          <Reveal delay={0.1} className="flex flex-col items-start gap-6">
            {comingSoon ? (
              <span
                aria-disabled="true"
                className={`${buttonClasses({ variant: "secondary" })} cursor-not-allowed text-muted`}
              >
                <span>{enquiry.reportLabel}</span>
                <span className="rounded-full bg-surface px-3 py-2 text-xs font-bold tracking-[0.1em] uppercase">
                  {enquiry.reportComingSoonLabel}
                </span>
              </span>
            ) : (
              <a
                href={enquiry.reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({ variant: "secondary" })}
              >
                <span>{enquiry.reportLabel}</span>
                <ButtonChip variant="secondary" />
              </a>
            )}
            <a
              href={`mailto:${site.contact.email}`}
              className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-muted transition-colors hover:text-ink"
            >
              {site.contact.email}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <EnquiryForm />
        </Reveal>
      </Container>
    </section>
  );
}
