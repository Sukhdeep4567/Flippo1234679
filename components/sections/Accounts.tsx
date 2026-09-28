import { accounts } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { LogoImage } from "@/components/ui/LogoImage";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Accounts() {
  return (
    <section aria-labelledby="accounts-title" className="bg-white section-y">
      <Container>
        <SectionHeading id="accounts-title" title={accounts.title} size="small" />
        <RevealGroup
          as="ul"
          stagger={0.06}
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:mt-16 lg:grid-cols-5 lg:gap-4"
        >
          {accounts.logos.map((logo) => (
            <RevealItem
              as="li"
              key={logo.name}
              className="grid h-24 place-items-center rounded-[20px] border border-line bg-bg px-4 md:h-28"
            >
              <LogoImage logo={logo} height={30} width={140} className="max-w-full" />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
