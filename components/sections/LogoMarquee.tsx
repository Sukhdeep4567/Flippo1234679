import { logoMarquee } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { LogoImage } from "@/components/ui/LogoImage";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { Rich, plain } from "@/components/ui/Rich";

export function LogoMarquee() {
  return (
    <section aria-labelledby="leading-brand" className="pt-10 pb-20 md:pt-14 md:pb-28">
      <Container>
        <Reveal>
          <p
            id="leading-brand"
            className="mx-auto max-w-[24ch] text-center text-[clamp(1.375rem,1.1rem+1.1vw,2rem)] leading-tight font-semibold tracking-[-0.015em] text-balance"
          >
            <Rich text={logoMarquee.line} />
          </p>
        </Reveal>
      </Container>
      <Reveal delay={0.1} className="mt-12 md:mt-16">
        <Marquee
          label={plain(logoMarquee.line)}
          duration={logoMarquee.duration}
          items={logoMarquee.logos.map((logo) => (
            <LogoImage key={logo.name} logo={logo} height={32} width={150} />
          ))}
        />
      </Reveal>
    </section>
  );
}
