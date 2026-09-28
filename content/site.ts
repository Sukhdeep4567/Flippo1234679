/**
 * FLIPO landing page — ALL copy, links, images and layout data live here.
 *
 * Emphasis: wrap a word in *asterisks* inside a heading to render it in the
 * italic serif (<Emphasis>) style, e.g. "Designed for *Impact*".
 * Use at most one emphasis per heading.
 */

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */

export type ImageAsset = { src: string; alt: string };

export type LogoAsset = {
  name: string;
  src: string;
  /** Visual balance multiplier applied to the fixed logo height (1 = default). */
  scale?: number;
  href?: string;
};

/**
 * One hero card slot. Positions are the card's CENTRE, in % of the hero area.
 * `w` is the card width in px at the reference viewport (1440px desktop, 390px mobile)
 * and scales with the viewport. `ratio` = width / height.
 * `depth`: 0 = far (smaller parallax, slight blur), 2 = near (strongest parallax).
 */
export type HeroSlot = { x: number; y: number; w: number; ratio: number; depth: 0 | 1 | 2 };

/**
 * Mobile / tablet slot. Cards live in a top band (under the header) or a bottom band,
 * so the headline in between always stays readable. `y` is % within that band.
 */
export type HeroMobileSlot = HeroSlot & { band: "top" | "bottom" };

export type HeroTemplate = {
  name: string;
  images: ImageAsset[];
  layout: { desktop: HeroSlot[]; mobile: HeroMobileSlot[] };
};

export type Stat = {
  /** Numeric part that counts up. Omit for text-only stats such as "Boost". */
  value?: number;
  prefix?: string;
  suffix?: string;
  /** Shown instead of a number (e.g. "Boost"). */
  text?: string;
  label: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Optional portrait. When missing, initials are shown. */
  avatar?: string;
  /** Link to the original LinkedIn recommendation. Falls back to testimonials.defaultSourceUrl. */
  sourceUrl?: string;
};

export type Role = { title: string; description: string };

export type TeamMember = { name: string; role: string; photo: ImageAsset };

export type Faq = { question: string; answer: string };

/* ------------------------------------------------------------------ */
/* Global                                                               */
/* ------------------------------------------------------------------ */

export const site = {
  name: "FLIPO",
  url: "https://flipoteam.com",
  title: "FLIPO | Co-branding & Brand Licensing Market Intelligence",
  description:
    "Supercharge your growth with co-branding. FLIPO delivers customer-centric partnerships driven by data, not intuition: visual audience surveys, fan profiling and a super-connector network for licensors, licensees and retailers.",
  logo: { src: "/brand/flipo-logo.svg", alt: "FLIPO" },
  locale: "en_SG",
  /** Switch off the cursor-following background in "Designed for Impact" in one line. */
  enableMouseBackground: true,
  contact: {
    email: "hello@flipoteam.com",
    phone: "+65 9374 8928",
    phoneHref: "+6593748928",
    address: {
      line1: "Paya Lebar Square, Unit 06-28",
      line2: "60 Paya Lebar Road, Singapore 409051",
      street: "60 Paya Lebar Road, Paya Lebar Square, Unit 06-28",
      locality: "Singapore",
      postalCode: "409051",
      country: "SG",
    },
  },
  social: {
    linkedin: "https://www.linkedin.com/company/flipoteam/",
  },
  skipLink: "Skip to content",
};

export const cta = {
  label: "Personalize your Journey",
  href: "#enquiry",
};

export const nav = {
  links: [
    { label: "What we are", href: "#what-we-are" },
    { label: "How it works", href: "#designed-for-impact" },
  ],
  menuOpenLabel: "Open menu",
  menuCloseLabel: "Close menu",
  homeLabel: "FLIPO home",
};

/* ------------------------------------------------------------------ */
/* 1. Hero                                                              */
/* ------------------------------------------------------------------ */

const heroDesktopA: HeroSlot[] = [
  { x: 8, y: 22, w: 150, ratio: 0.8, depth: 2 },
  { x: 22, y: 15, w: 96, ratio: 1.33, depth: 0 },
  { x: 35, y: 21, w: 78, ratio: 1, depth: 1 },
  { x: 51, y: 14, w: 124, ratio: 1.5, depth: 1 },
  { x: 66, y: 20, w: 84, ratio: 0.78, depth: 0 },
  { x: 82, y: 17, w: 168, ratio: 1.3, depth: 2 },
  { x: 94, y: 42, w: 92, ratio: 0.8, depth: 1 },
  { x: 6, y: 55, w: 104, ratio: 0.75, depth: 1 },
  { x: 93, y: 68, w: 120, ratio: 1, depth: 2 },
  { x: 11, y: 84, w: 196, ratio: 1.4, depth: 2 },
  { x: 29, y: 90, w: 86, ratio: 1, depth: 0 },
  { x: 46, y: 86, w: 118, ratio: 1.33, depth: 1 },
  { x: 63, y: 90, w: 76, ratio: 0.8, depth: 0 },
  { x: 80, y: 87, w: 156, ratio: 1.25, depth: 1 },
];

const heroDesktopB: HeroSlot[] = [
  { x: 6, y: 16, w: 110, ratio: 1.3, depth: 1 },
  { x: 19, y: 23, w: 170, ratio: 0.85, depth: 2 },
  { x: 37, y: 13, w: 88, ratio: 1.4, depth: 0 },
  { x: 55, y: 20, w: 72, ratio: 0.8, depth: 1 },
  { x: 71, y: 14, w: 140, ratio: 1.5, depth: 1 },
  { x: 91, y: 22, w: 128, ratio: 0.8, depth: 2 },
  { x: 7, y: 47, w: 84, ratio: 1, depth: 0 },
  { x: 94, y: 53, w: 100, ratio: 0.75, depth: 1 },
  { x: 8, y: 76, w: 128, ratio: 0.8, depth: 2 },
  { x: 24, y: 88, w: 150, ratio: 1.5, depth: 1 },
  { x: 41, y: 90, w: 70, ratio: 1, depth: 0 },
  { x: 57, y: 86, w: 140, ratio: 1.33, depth: 2 },
  { x: 74, y: 91, w: 90, ratio: 1.25, depth: 0 },
  { x: 90, y: 83, w: 150, ratio: 1, depth: 1 },
];

const heroMobileA: HeroMobileSlot[] = [
  { band: "top", x: 12, y: 55, w: 76, ratio: 0.8, depth: 1 },
  { band: "top", x: 34, y: 28, w: 58, ratio: 1, depth: 0 },
  { band: "top", x: 56, y: 60, w: 92, ratio: 1.33, depth: 2 },
  { band: "top", x: 80, y: 30, w: 66, ratio: 0.8, depth: 1 },
  { band: "top", x: 93, y: 78, w: 44, ratio: 1, depth: 0 },
  { band: "bottom", x: 11, y: 40, w: 84, ratio: 1.25, depth: 2 },
  { band: "bottom", x: 33, y: 72, w: 56, ratio: 1, depth: 0 },
  { band: "bottom", x: 54, y: 40, w: 74, ratio: 0.8, depth: 1 },
  { band: "bottom", x: 75, y: 70, w: 62, ratio: 1.3, depth: 0 },
  { band: "bottom", x: 91, y: 36, w: 70, ratio: 0.85, depth: 2 },
];

const heroMobileB: HeroMobileSlot[] = [
  { band: "top", x: 9, y: 34, w: 56, ratio: 1, depth: 0 },
  { band: "top", x: 30, y: 60, w: 88, ratio: 1.3, depth: 2 },
  { band: "top", x: 55, y: 30, w: 60, ratio: 0.8, depth: 1 },
  { band: "top", x: 75, y: 62, w: 70, ratio: 1, depth: 1 },
  { band: "top", x: 93, y: 30, w: 50, ratio: 0.8, depth: 0 },
  { band: "bottom", x: 10, y: 66, w: 64, ratio: 0.8, depth: 1 },
  { band: "bottom", x: 30, y: 36, w: 80, ratio: 1.33, depth: 2 },
  { band: "bottom", x: 52, y: 70, w: 52, ratio: 1, depth: 0 },
  { band: "bottom", x: 72, y: 38, w: 86, ratio: 1.25, depth: 2 },
  { band: "bottom", x: 92, y: 70, w: 50, ratio: 0.8, depth: 0 },
];

/** Mirror a layout horizontally to create a distinct but equally balanced template. */
function mirror<T extends HeroSlot>(slots: T[]): T[] {
  return slots.map((s) => ({ ...s, x: 100 - s.x }));
}

export const hero = {
  titleWords: ["Supercharge", "Your", "Growth", "with", "*Co-branding*"],
  subline: "Customer-centric Partnerships. Driven by Data, Not Intuition",
  /**
   * 4 templates; one is picked at random on every page load and its images are shuffled.
   * Replace images freely: any aspect ratio works (cards crop with object-fit: cover).
   */
  templates: [
    {
      name: "Play & collect",
      images: [
        {
          src: "/images/hero/set-1/01.webp",
          alt: "Child stacking colourful illustrated toy blocks",
        },
        { src: "/images/hero/set-1/02.webp", alt: "Child playing with toy cars on a table" },
        {
          src: "/images/hero/set-1/03.webp",
          alt: "Two boys playing on a ride-on toy car outdoors",
        },
        {
          src: "/images/hero/set-1/04.webp",
          alt: "Toddler playing in a sunlit room scattered with toys",
        },
        { src: "/images/hero/set-1/05.webp", alt: "Teddy bear sitting on a sofa" },
        { src: "/images/hero/set-1/06.webp", alt: "Red plush octopus toy" },
        { src: "/images/hero/set-1/07.webp", alt: "Soft plush toy with a hat" },
        {
          src: "/images/hero/set-1/08.webp",
          alt: "Rows of small carved animal figurines on a display shelf",
        },
        { src: "/images/hero/set-1/09.webp", alt: "Vintage blue tin robot toy" },
        { src: "/images/hero/set-1/10.webp", alt: "Wooden toy train set" },
        { src: "/images/hero/set-1/11.webp", alt: "Boy playing dress-up with a green mask" },
        { src: "/images/hero/set-1/12.webp", alt: "Child in a costume with a wand" },
        { src: "/images/hero/set-1/13.webp", alt: "Collection of ceramic figurines" },
        { src: "/images/hero/set-1/14.webp", alt: "Game controller lit in cyan and magenta neon" },
      ],
      layout: { desktop: heroDesktopA, mobile: heroMobileA },
    },
    {
      name: "Screens & stages",
      images: [
        { src: "/images/hero/set-2/01.webp", alt: "Audience watching a film in a cinema" },
        { src: "/images/hero/set-2/02.webp", alt: "Cinema audience facing a bright screen" },
        { src: "/images/hero/set-2/03.webp", alt: "Black and white photo of a theatre audience" },
        { src: "/images/hero/set-2/04.webp", alt: "Large crowd in front of a lit concert stage" },
        { src: "/images/hero/set-2/05.webp", alt: "Crowd watching a colourful concert" },
        { src: "/images/hero/set-2/06.webp", alt: "Excited fans cheering at a live event" },
        {
          src: "/images/hero/set-2/07.webp",
          alt: "Family eating popcorn during a movie night at home",
        },
        { src: "/images/hero/set-2/08.webp", alt: "Couple relaxing on a sofa watching TV" },
        { src: "/images/hero/set-2/09.webp", alt: "Friends watching together in a living room" },
        { src: "/images/hero/set-2/10.webp", alt: "Striped cup of popcorn" },
        { src: "/images/hero/set-2/11.webp", alt: "Popcorn boxes at a cinema counter" },
        { src: "/images/hero/set-2/12.webp", alt: "Gaming room with arcade machines" },
        { src: "/images/hero/set-2/13.webp", alt: "Neon-lit arcade game station" },
        { src: "/images/hero/set-2/14.webp", alt: "Retro arcade cabinet" },
      ],
      layout: { desktop: heroDesktopB, mobile: heroMobileB },
    },
    {
      name: "Culture & style",
      images: [
        { src: "/images/hero/set-3/01.webp", alt: "Colourful sneakers on a white box" },
        { src: "/images/hero/set-3/02.webp", alt: "Two friends in streetwear" },
        { src: "/images/hero/set-3/03.webp", alt: "Man in streetwear jacket outdoors" },
        { src: "/images/hero/set-3/04.webp", alt: "Man in a bold jacket by a graffiti wall" },
        { src: "/images/hero/set-3/05.webp", alt: "Woman in a yellow puffer jacket" },
        { src: "/images/hero/set-3/06.webp", alt: "Woman in streetwear sitting on concrete steps" },
        { src: "/images/hero/set-3/07.webp", alt: "Skateboarder mid-air" },
        {
          src: "/images/hero/set-3/08.webp",
          alt: "Skateboarder jumping at a skatepark at golden hour",
        },
        { src: "/images/hero/set-3/09.webp", alt: "Colourful skateboard against a yellow wall" },
        { src: "/images/hero/set-3/10.webp", alt: "Amber vinyl record spinning on a turntable" },
        { src: "/images/hero/set-3/11.webp", alt: "Shelf full of vinyl records" },
        { src: "/images/hero/set-3/12.webp", alt: "Mannequins in a colourful shop window" },
        { src: "/images/hero/set-3/13.webp", alt: "Shop interior with apparel and accessories" },
        { src: "/images/hero/set-3/14.webp", alt: "T-shirts hanging on a rack" },
      ],
      layout: { desktop: mirror(heroDesktopA), mobile: mirror(heroMobileA) },
    },
    {
      name: "Fans & makers",
      images: [
        { src: "/images/hero/set-4/01.webp", alt: "Man with a delighted, surprised expression" },
        { src: "/images/hero/set-4/02.webp", alt: "Fan shouting with excitement at an event" },
        { src: "/images/hero/set-4/03.webp", alt: "Fan cheering with hands up in a crowd" },
        { src: "/images/hero/set-4/04.webp", alt: "Woman making a playful surprised face" },
        { src: "/images/hero/set-4/05.webp", alt: "Woman with glitter makeup shouting with joy" },
        { src: "/images/hero/set-4/06.webp", alt: "Illustrator drawing a caricature" },
        { src: "/images/hero/set-4/07.webp", alt: "Artist lettering on tracing paper" },
        { src: "/images/hero/set-4/08.webp", alt: "Artist drawing at a drafting table" },
        { src: "/images/hero/set-4/09.webp", alt: "Hand sketching a cartoon character" },
        {
          src: "/images/hero/set-4/10.webp",
          alt: "People on a swing carousel at an amusement park",
        },
        {
          src: "/images/hero/set-4/11.webp",
          alt: "Visitors at a theme park with a roller coaster",
        },
        { src: "/images/hero/set-4/12.webp", alt: "Colourful ferris wheel against a blue sky" },
        { src: "/images/hero/set-4/13.webp", alt: "Colourful board game pieces on a game board" },
        { src: "/images/hero/set-4/14.webp", alt: "Wooden board game pieces" },
      ],
      layout: { desktop: mirror(heroDesktopB), mobile: mirror(heroMobileB) },
    },
  ] satisfies HeroTemplate[],
};

/* ------------------------------------------------------------------ */
/* 2. Logo marquee                                                      */
/* ------------------------------------------------------------------ */

/** Placeholder wordmarks — replace with the real client logos (SVG or PNG) when FLIPO sends them. */
export const clientLogos: LogoAsset[] = [
  { name: "Brand One", src: "/logos/clients/brand-01.svg" },
  { name: "Brand Two", src: "/logos/clients/brand-02.svg", scale: 0.9 },
  { name: "Brand Three", src: "/logos/clients/brand-03.svg", scale: 1.1 },
  { name: "Brand Four", src: "/logos/clients/brand-04.svg" },
  { name: "Brand Five", src: "/logos/clients/brand-05.svg", scale: 1.15 },
  { name: "Brand Six", src: "/logos/clients/brand-06.svg", scale: 0.95 },
  { name: "Brand Seven", src: "/logos/clients/brand-07.svg" },
  { name: "Brand Eight", src: "/logos/clients/brand-08.svg", scale: 1.05 },
  { name: "Brand Nine", src: "/logos/clients/brand-09.svg", scale: 0.9 },
  { name: "Brand Ten", src: "/logos/clients/brand-10.svg" },
];

export const logoMarquee = {
  line: "For every audience segment, there is only *one* leading brand.",
  logos: clientLogos,
  /** Seconds for one full loop. */
  duration: 45,
};

/* ------------------------------------------------------------------ */
/* 3. Meet the Research that Converts                                   */
/* ------------------------------------------------------------------ */

export const research = {
  id: "what-we-are",
  eyebrow: "What we are",
  title: "Meet the Research that Converts",
  loopLabels: { left: "Tech", right: "Network" },
  loopAriaLabel:
    "FLIPO integration model: an infinity loop joining Tech and Network into one connected system.",
  blocks: [
    {
      title: "Market *Intelligence*",
      body: "Measure your audience's preferences across fandoms, products and any element within an intellectual property universe. No guesswork, just objective, winning insights.",
    },
    {
      title: "The Super-*Connector*",
      body: "We transform data into partnerships. Functioning as the single access point to the global brand ecosystem, streamlining an industry into one seamless workflow.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* 4. FLIP____ + What to expect                                         */
/* ------------------------------------------------------------------ */

export const flip = {
  prefix: "FLIP",
  endings: [
    "Technology",
    "Market Intelligence",
    "Brand Licensing",
    "Specialization",
    "Entertainment",
    "Audience",
  ],
  /** Milliseconds each ending stays on screen. */
  interval: 2200,
  statsTitle: "What to expect:",
  stats: [
    { value: 130, suffix: "+", label: "Countries Unlocked" },
    { value: 3, prefix: "+", label: "Kids and Above" },
    { value: 2, prefix: "<", label: "Weeks Results" },
    { value: 50, suffix: "%", label: "Lower Marketing Cost" },
    { value: 2, suffix: "x", label: "More New Customers" },
    { text: "Boost", label: "Brand Credibility" },
  ] satisfies Stat[],
};

/* ------------------------------------------------------------------ */
/* 5. The Smarter Way to Scale                                          */
/* ------------------------------------------------------------------ */

export const smarterWay = {
  eyebrow: "Your options",
  title: "The Smarter Way *to Scale*",
  options: [
    {
      icon: "hire",
      title: "Full time hire",
      body: "Hire an in-house expert on a payroll with a fixed overhead $10-15k/mo. For much less, we launch a full scale report and serve you with our network",
    },
    {
      icon: "research",
      title: "Generalist Market Intelligence",
      body: "Engage a market intelligence firm that takes months to deliver and costs $15-50k per research",
    },
    {
      icon: "agency",
      title: "Agency",
      body: "Engage a traditional agency that charges monthly retainers of 5k/mo",
    },
  ] as const,
  highlight: {
    title: "FLIPO",
    body: "Work with us full stop house solution. An extension of your team, at a fraction of the cost",
    badge: "Recommended",
  },
};

/* ------------------------------------------------------------------ */
/* 6. Testimonials                                                      */
/* ------------------------------------------------------------------ */

export const testimonials = {
  eyebrow: "Testimonials",
  title: "Don't just take *our word* for it",
  defaultSourceUrl: "https://www.linkedin.com/in/nico-ortiz-flipo/details/featured/",
  sourceLabel: "View on LinkedIn",
  prevLabel: "Previous testimonial",
  nextLabel: "Next testimonial",
  /** Copied verbatim from flipoteam.com. Add the 2 new reviews (mid-October) to the end of this list. */
  items: [
    {
      quote:
        "I’m very glad to have worked with Nico as a colleague and subsequently as a client. During the time that I have known him, he was been able to bring business opportunities with big industry players in the entertainment and leisure industry. All in all, he is a great partnerships builder. For many more years to come!",
      name: "BM Rojanarowan",
      role: "Managing Director",
      company: "amc asia!",
    },
    {
      quote:
        "Nico is an efficient operator. He is very capable of understanding client’s objectives and creating tailored solutions in a simple yet innovative ways.",
      name: "Yogender Sharma",
      role: "Head of Innovation, Product & Design",
      company: "The HEINEKEN Company",
    },
    {
      quote:
        "Working with Nico for several years on complex IP licensing and collaboration deals was a pleasure. Nico brings great foresight to deals, and proactively anticipates challenges to ensure the long-term success of any partnership. More than that, Nico's affable nature means that he is able to skillfully brings diverse parties into alignment, even in challenging environments.",
      name: "Mark Cheng",
      role: "Senior Legal Counsel",
      company: "Changi Airport Group",
    },
  ] as Testimonial[],
};

/* ------------------------------------------------------------------ */
/* 7. Who we help                                                       */
/* ------------------------------------------------------------------ */

export const roles: Role[] = [
  { title: "Licensors", description: "Understand your audience across markets." },
  { title: "Licensee", description: "Invest in the trends that drive behaviour." },
  { title: "Retailers", description: "Commercialize products and experiences that resonate." },
  { title: "Creative Studios", description: "Validates new original content." },
  { title: "Investors", description: "Valuate intellectual properties." },
  { title: "Industry Experts", description: "Convince with market signals." },
  { title: "Marketers", description: "Target consumers with confidence." },
  { title: "Sales Teams", description: "Find the data points that drive conversion." },
];

export const whoWeHelp = {
  eyebrow: "Who we help",
  title: "We bring audiences closer to decision makers with intent:",
  hint: "Hover or tap a role to learn more.",
  enquireLabel: "Enquire as",
};

/* ------------------------------------------------------------------ */
/* 8. How it works                                                      */
/* ------------------------------------------------------------------ */

export const howItWorks = {
  eyebrow: "The process",
  title: "How it works",
  stepLabel: "Step",
  steps: [
    {
      title: "Hop on an alignment call",
      body: "No obligations or pressure to commit. Just a conversation to understand your journey, audience and ambitions.",
    },
    {
      title: "Separate the signal from the noise.",
      body: "We find and survey your ideal customers at scale. Surfacing the truth, anchored in the population's shared reality.",
    },
    {
      title: "Wait for the partnership to come to you",
      body: "Our network extends across the entire co-branding ecosystem. As a result of servicing the industry, our team is uniquely positioned to bridge partnerships.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* 9. Designed for Impact                                               */
/* ------------------------------------------------------------------ */

export const impact = {
  id: "designed-for-impact",
  eyebrow: "Our methodology",
  title: "Designed for *Impact*",
  rows: [
    {
      visual: "emotions",
      title: "Capturing Emotions",
      body: "We speak the language consumers already understand. Our surveying methodology is purely visual to capture instinctive preferences.",
    },
    {
      visual: "profiling",
      title: "Audience Profiling",
      body: "Being a fan can mean a lot of different things. We hyper profile audiences by exposing them to visual stimuli. Enabling a deep categorization based on levels of resonance.",
    },
    {
      visual: "data",
      title: "Data Experts",
      body: "Statistical modeling turns a sample's response into a population's truth, where a few thousand voices reveal what millions actually think.",
    },
  ] as const,
  visuals: {
    emotions: {
      prompt: "Which one feels like you?",
      tiles: [
        { src: "/images/hero/set-1/06.webp", alt: "" },
        { src: "/images/hero/set-3/10.webp", alt: "" },
        { src: "/images/hero/set-4/12.webp", alt: "" },
        { src: "/images/hero/set-3/01.webp", alt: "" },
      ],
      pickedIndex: 1,
      pickedLabel: "Selected",
    },
    profiling: {
      name: "Fan profile",
      caption: "Respondent #2481",
      avatar: { src: "/images/avatars/avatar-3.webp", alt: "" },
      bars: [
        { label: "Low", value: 28 },
        { label: "Medium", value: 58 },
        { label: "High", value: 92 },
      ],
      tags: ["Fandom", "Product", "Character"],
    },
    data: {
      sampleLabel: "Sample",
      populationLabel: "Population",
      caption: "3,000 voices → 3M insights",
    },
  },
};

/* ------------------------------------------------------------------ */
/* 10. Accounts                                                         */
/* ------------------------------------------------------------------ */

export const accounts = {
  title: "Accounts we have experience working with",
  logos: clientLogos,
};

/* ------------------------------------------------------------------ */
/* 11. About the team                                                   */
/* ------------------------------------------------------------------ */

export const team = {
  eyebrow: "About the team",
  title: "About the team",
  founder: {
    name: "Nico - Founder",
    bio: "With close to a decade of corporate experience building and managing licensing programs, our team has served the industry, from leading the expansion of multi-million dollar franchises for entertainment powerhouses, like Transformers, My Little Pony, and Power Rangers, to enabling a single startup to grow its annual revenue from $2M to over $30M through strategic partnering",
    /** Replace with the real founder photo from the client's Google Drive folder. */
    photo: { src: "/images/team/founder.jpg", alt: "Nico, Founder of FLIPO" },
  },
  subtitle: "A team commitment to your success",
  /** Replace photos with the real team images (same file names keep things simple). */
  members: [
    {
      name: "Riko",
      role: "Head of Tech",
      photo: { src: "/images/team/riko.jpeg", alt: "Riko, Head of Tech" },
    },
    {
      name: "Muhammad",
      role: "Head of Data",
      photo: { src: "/images/team/muhammad.jpeg", alt: "Muhammad, Head of Data" },
    },
    {
      name: "Helena",
      role: "Chief Editor",
      photo: { src: "/images/team/helena.webp", alt: "Helena, Chief Editor" },
    },
    {
      name: "Beltran",
      role: "Survey Designer",
      photo: { src: "/images/team/beltran.jpeg", alt: "Beltran, Survey Designer" },
    },
  ] satisfies TeamMember[],
  audience: {
    count: "+300M",
    title: "Over +300 Million respondents pool",
    /** Audience faces. Replace with the client's approved audience images. */
    avatars: [
      { src: "/images/avatars/avatar-1.webp", alt: "" },
      { src: "/images/avatars/avatar-2.webp", alt: "" },
      { src: "/images/avatars/avatar-3.webp", alt: "" },
      { src: "/images/avatars/avatar-4.webp", alt: "" },
      { src: "/images/avatars/avatar-5.webp", alt: "" },
      { src: "/images/avatars/avatar-6.webp", alt: "" },
      { src: "/images/avatars/avatar-7.webp", alt: "" },
      { src: "/images/avatars/avatar-8.webp", alt: "" },
    ] satisfies ImageAsset[],
    panelsTitle: "Coming from the panels you trust.",
    /** Placeholder panel partner logos — replace with the real ones. */
    panels: [
      { name: "Panel One", src: "/logos/panels/panel-01.svg" },
      { name: "Panel Two", src: "/logos/panels/panel-02.svg", scale: 0.9 },
      { name: "Panel Three", src: "/logos/panels/panel-03.svg", scale: 1.1 },
      { name: "Panel Four", src: "/logos/panels/panel-04.svg" },
      { name: "Panel Five", src: "/logos/panels/panel-05.svg", scale: 1.05 },
      { name: "Panel Six", src: "/logos/panels/panel-06.svg", scale: 0.95 },
    ] satisfies LogoAsset[],
  },
};

/* ------------------------------------------------------------------ */
/* 12. Published work + enquiry form                                    */
/* ------------------------------------------------------------------ */

export const enquiry = {
  id: "enquiry",
  eyebrow: "Published work",
  title: "Read our published work. Get access to the answers",
  /** Set the real report URL on 9 October. While it is "#", the button shows "Coming soon". */
  reportUrl: "#",
  reportLabel: "Read the report",
  reportComingSoonLabel: "Coming soon",
  form: {
    title: "Tell us about your journey",
    fields: {
      name: {
        label: "Full name",
        placeholder: "Jane Tan",
        required: "Please enter your full name.",
      },
      email: {
        label: "Work email",
        placeholder: "jane@company.com",
        required: "Please enter your work email.",
        invalid: "Please enter a valid email address.",
      },
      company: {
        label: "Company",
        placeholder: "Company name",
        required: "Please enter your company.",
      },
      role: { label: "I am a…", placeholder: "Select one", otherLabel: "Other" },
      message: {
        label: "Message",
        optional: "(optional)",
        placeholder: "What would you like to learn?",
      },
      consent: {
        label: "I agree to FLIPO contacting me about my enquiry.",
        required: "Please confirm we can contact you.",
      },
      honeypot: "Leave this field empty",
    },
    requiredMark: "*",
    submit: "Personalize your Journey",
    submitting: "Sending…",
    success: "Thank you. We'll be in touch within one business day.",
    error: "Something went wrong. Please try again, or email us at hello@flipoteam.com.",
    sendAnother: "Send another enquiry",
  },
};

/* ------------------------------------------------------------------ */
/* 13. FAQ                                                              */
/* ------------------------------------------------------------------ */

export const faq = {
  eyebrow: "FAQ",
  title: "Frequently Asked *Questions*",
  items: [
    {
      question: "What services do you offer?",
      answer:
        "We provide market intelligence and networking referrals, bridging optimal partners within the co-branding industry.",
    },
    {
      question: "How Do We Ensure Our Interests Are Aligned with Yours?",
      answer: "Our referral framework is built upon a revenue-success model.",
    },
    {
      question: "Do you represent any intellectual properties?",
      answer:
        "No. Our independence from IP representation guarantees honest and unbiased insights.",
    },
    {
      question: "How do you access respondents?",
      answer: "Research panels enable access to pre-recruited pool of respondents.",
    },
    {
      question: "Tell me more about your technology?",
      answer: "Our patent technology recreates purchasing scenarios through images.",
    },
    {
      question: "What is brand licensing?",
      answer:
        "A model in which two entities come together, a content and industry expert empower each other to co-create products and experiences to serve market segments.",
    },
    {
      question: "How do you work with panels?",
      answer:
        "Our application programming interface enables us to leverage any selected panel while maintaining control over the respondents' journey.",
    },
    {
      question: "Is artificial intelligence involved when surveying?",
      answer: "No.",
    },
    // Marked "Not so important" in the client doc, with no answers yet. Hidden on purpose.
    // { question: "Signing party who?", answer: "" },
    // { question: "Can you help manufacturers acquire a brand?", answer: "" },
  ] satisfies Faq[],
};

/* ------------------------------------------------------------------ */
/* 14. Final CTA + footer                                               */
/* ------------------------------------------------------------------ */

export const finalCta = {
  title: "Let's find the *partnership* that moves you.",
};

export const footer = {
  navTitle: "Explore",
  contactTitle: "Contact",
  linkedinLabel: "LinkedIn",
  rights: "All rights reserved.",
  /** Images that cycle inside the "O" of the giant footer wordmark. */
  wordmarkImages: [
    "/images/hero/set-1/06.webp",
    "/images/hero/set-2/06.webp",
    "/images/hero/set-3/08.webp",
    "/images/hero/set-4/12.webp",
    "/images/hero/set-2/04.webp",
    "/images/hero/set-1/09.webp",
  ],
};
