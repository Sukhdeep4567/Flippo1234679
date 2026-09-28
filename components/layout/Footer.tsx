import { footer, nav, site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";
import { FooterWordmark } from "./FooterWordmark";

export function Footer() {
  const year = new Date().getFullYear();
  const { contact } = site;

  return (
    <footer className="overflow-hidden border-t border-line bg-bg pt-16 cv-auto md:pt-20">
      <Container className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
        <div className="flex flex-col gap-5">
          <a href="#top" aria-label={nav.homeLabel} className="w-fit text-[17px]">
            <Logo />
          </a>
          <address className="text-[15px] leading-relaxed text-muted not-italic">
            {contact.address.line1}
            <br />
            {contact.address.line2}
          </address>
        </div>

        <div>
          <h2 className="mb-4 eyebrow">{footer.navTitle}</h2>
          <ul className="flex flex-col gap-2.5 text-[15px]">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-accent">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-accent"
              >
                <LinkedInIcon className="size-4" />
                {footer.linkedinLabel}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 eyebrow">{footer.contactTitle}</h2>
          <ul className="flex flex-col gap-2.5 text-[15px]">
            <li>
              <a href={`mailto:${contact.email}`} className="transition-colors hover:text-accent">
                {contact.email}
              </a>
            </li>
            <li>
              <a href={`tel:${contact.phoneHref}`} className="transition-colors hover:text-accent">
                {contact.phone}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <Container className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:justify-between">
        <p>
          © {year} {site.name}. {footer.rights}
        </p>
      </Container>

      <FooterWordmark images={footer.wordmarkImages} />
    </footer>
  );
}
