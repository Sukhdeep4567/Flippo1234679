import { Suspense, type ReactNode } from "react";
import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { Research } from "@/components/sections/Research";
import { FlipStats } from "@/components/sections/FlipStats";
import { SmarterWay } from "@/components/sections/SmarterWay";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhoWeHelp } from "@/components/sections/WhoWeHelp";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { DesignedForImpact } from "@/components/sections/DesignedForImpact";
import { Accounts } from "@/components/sections/Accounts";
import { Team } from "@/components/sections/Team";
import { Enquiry } from "@/components/sections/Enquiry";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";

/**
 * Each below-the-fold section is its own Suspense boundary and uses content-visibility.
 * Everything is still server-rendered, but React hydrates the boundaries one at a time and
 * the browser skips layout/paint for off-screen sections, keeping the main thread free
 * (low Total Blocking Time) on slower phones.
 */
function Hydrate({ children }: { children: ReactNode }) {
  return (
    <div className="cv-auto">
      <Suspense>{children}</Suspense>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Hydrate>
        <LogoMarquee />
      </Hydrate>
      <Hydrate>
        <Research />
      </Hydrate>
      <Hydrate>
        <FlipStats />
      </Hydrate>
      <Hydrate>
        <SmarterWay />
      </Hydrate>
      <Hydrate>
        <Testimonials />
      </Hydrate>
      <Hydrate>
        <WhoWeHelp />
      </Hydrate>
      <Hydrate>
        <HowItWorks />
      </Hydrate>
      <Hydrate>
        <DesignedForImpact />
      </Hydrate>
      <Hydrate>
        <Accounts />
      </Hydrate>
      <Hydrate>
        <Team />
      </Hydrate>
      <Hydrate>
        <Enquiry />
      </Hydrate>
      <Hydrate>
        <FaqSection />
      </Hydrate>
      <Hydrate>
        <FinalCta />
      </Hydrate>
    </>
  );
}
