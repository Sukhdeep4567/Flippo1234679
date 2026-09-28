import Image from "next/image";
import { cta, team } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LogoImage } from "@/components/ui/LogoImage";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AudienceFaces } from "./AudienceFaces";

export function Team() {
  const { founder, audience } = team;
  return (
    <section aria-labelledby="team-title" className="section-y">
      <Container>
        <SectionHeading id="team-title" eyebrow={team.eyebrow} title={team.title} />

        {/* Founder */}
        <div className="mt-14 grid items-center gap-10 md:mt-20 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14 lg:gap-20">
          <Reveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] bg-surface">
              <Image
                src={founder.photo.src}
                alt={founder.photo.alt}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-contain object-center"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-6">
            <h3 className="text-h3 md:text-[2.25rem]">{founder.name}</h3>
            <p className="text-lead text-muted">{founder.bio}</p>
          </Reveal>
        </div>

        {/* Team */}
        <Reveal className="mt-24 md:mt-32">
          <h3 className="text-center text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] leading-tight font-bold tracking-[-0.02em]">
            {team.subtitle}
          </h3>
        </Reveal>
        <RevealGroup
          as="ul"
          className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 md:mt-14 lg:grid-cols-4 lg:gap-5"
        >
          {team.members.map((member) => (
            <RevealItem as="li" key={member.name} className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-surface">
                <Image
                  src={member.photo.src}
                  alt={member.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 280px, 50vw"
                  className="object-cover grayscale transition-[filter,transform] duration-700 ease-out-expo group-hover:scale-[1.03] group-hover:grayscale-0"
                />
              </div>
              <p className="mt-4 text-lg font-bold">{member.name}</p>
              <p className="text-sm text-muted">{member.role}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Audience reach */}
        <div className="mt-24 flex flex-col items-center rounded-[28px] bg-white px-6 py-14 text-center ring-1 ring-line md:mt-32 md:px-12 md:py-20">
          <AudienceFaces avatars={audience.avatars} count={audience.count} />
          <Reveal className="mt-8">
            <h3 className="max-w-[18ch] text-[clamp(1.75rem,1.3rem+2vw,3rem)] leading-[1.08] font-bold tracking-[-0.025em] text-balance">
              {audience.title}
            </h3>
          </Reveal>
          <Reveal delay={0.05} className="mt-12 w-full border-t border-line pt-10">
            <p className="eyebrow">{audience.panelsTitle}</p>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14">
              {audience.panels.map((logo) => (
                <li key={logo.name}>
                  <LogoImage logo={logo} height={28} width={130} />
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="mt-12">
            <Button href={cta.href}>{cta.label}</Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
