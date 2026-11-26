import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AmbientCanvas } from "@/components/sections/ambient-canvas";
import { ProjectCarousel } from "@/components/sections/project-carousel";
import { EditorialButton } from "@/components/ui/editorial-button";
import { SectionHeader } from "@/components/ui/section-header";
import { homeData } from "@/data/home";

export default function HomePage() {
  const { hero, selectedWork, foundation } = homeData;

  return (
    <>
      {/* Band 1: Cinematic Asymmetrical Hero */}
      <section
        aria-labelledby="hero-heading"
        className="relative overflow-hidden bg-canvas"
      >
        {/* CSS Studio Lighting Fallback */}
        <div
          aria-hidden="true"
          style={{ backgroundImage: "var(--hero-ambient-wash)" }}
          className="pointer-events-none absolute inset-0"
        />

        {/* Restrained Ambient Canvas Layer */}
        <AmbientCanvas />

        <div className="relative mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-6xl flex-col justify-between px-5 pb-10 pt-10 sm:px-8 sm:pt-14 lg:px-10 lg:pt-16">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Left Column: Editorial Serif Headline & Positioning */}
            <div className="space-y-8 lg:col-span-7">
              <div className="space-y-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-secondary">
                  {hero.eyebrow}
                </p>

                <h1
                  id="hero-heading"
                  className="font-display text-[clamp(2.85rem,6.2vw,5.4rem)] font-normal leading-[0.98] tracking-[-0.025em] text-ink"
                >
                  <span className="block">{hero.headlineLead}</span>
                  <span className="block italic text-ink/95">
                    {hero.headlineItalic}
                  </span>
                  <span className="block">{hero.headlineEnd}</span>
                </h1>

                <p className="max-w-xl text-base leading-relaxed text-ink-secondary sm:text-lg">
                  {hero.intro}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <EditorialButton
                  href="#selected-work"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  Explore Selected Work
                </EditorialButton>

                <EditorialButton href="/about" variant="secondary" size="lg">
                  About &amp; Process
                </EditorialButton>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 px-2 py-2 font-mono text-xs uppercase tracking-[0.16em] text-ink-secondary transition-colors duration-150 hover:text-ink"
                >
                  <span>Contact</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>

              <dl className="grid gap-5 border-t border-rule pt-6 sm:grid-cols-3">
                {hero.specs.map((spec) => (
                  <div key={spec.label} className="space-y-1">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                      {spec.label}
                    </dt>
                    <dd className="font-mono text-xs leading-snug text-ink">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Right Column: Atmospheric Studio Portrait Stage */}
            <div className="lg:col-span-5">
              <figure
                style={{ boxShadow: "var(--card-shadow)" }}
                className="relative mx-auto max-w-md border border-rule-strong bg-surface lg:max-w-none"
              >
                {/* Architectural Corner Hairlines */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-3 left-3 z-20 h-3.5 w-3.5 border-t border-l border-accent"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-3 right-3 z-20 h-3.5 w-3.5 border-t border-r border-accent"
                />

                {/* Theme-Tuned Volumetric Studio Backdrop */}
                <div
                  style={{ backgroundImage: "var(--portrait-studio-bg)" }}
                  className="relative aspect-[3/4] w-full overflow-hidden"
                >
                  <Image
                    src="/images/profile.png"
                    alt={hero.portraitAlt}
                    width={1086}
                    height={1448}
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="relative z-10 h-full w-full object-cover object-top drop-shadow-[0_14px_24px_rgba(20,21,24,0.14)] dark:drop-shadow-none"
                  />

                  {/* Subtle dark-mode bottom studio fade; omitted in light mode so dark suit stays crisp */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden h-28 bg-gradient-to-t from-canvas via-canvas/45 to-transparent dark:block"
                  />
                </div>

                <figcaption className="relative z-20 flex flex-wrap items-center justify-between gap-2 border-t border-rule bg-surface px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-secondary">
                  <span>{hero.portraitLabel}</span>
                  <span className="text-ink-muted">
                    {hero.portraitSpecs.join(" · ")}
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Scroll Prompt */}
          <div className="mt-12 flex items-center justify-between border-t border-rule pt-5">
            <a
              href="#selected-work"
              className="group inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-secondary transition-colors duration-150 hover:text-ink"
            >
              <span>{hero.scrollPrompt}</span>
              <ArrowDown
                className="h-3.5 w-3.5 text-accent-text transition-transform duration-200 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </a>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted sm:inline">
              00 // HERO
            </span>
          </div>
        </div>
      </section>

      {/* Band 2: Interactive Selected Work Showcase */}
      <ProjectCarousel
        indexLabel={selectedWork.index}
        heading={selectedWork.heading}
        subheading={selectedWork.subheading}
        projects={selectedWork.projects}
      />

      {/* Band 3: Foundation & Technical Stack */}
      <section
        aria-labelledby="foundation-heading"
        className="border-t border-rule bg-canvas py-20 text-ink sm:py-28"
      >
        <div className="mx-auto max-w-6xl space-y-12 px-5 sm:px-8 lg:px-10">
          <SectionHeader
            index={foundation.index}
            title={foundation.title}
            description={foundation.summary}
            headingAs="h2"
            headingId="foundation-heading"
          />

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Academic Foundation */}
            <aside className="flex flex-col justify-between space-y-6 border border-rule-strong bg-surface p-6 sm:p-8 lg:col-span-5">
              <div className="space-y-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-text">
                  {foundation.education.eyebrow}
                </p>
                <h3 className="font-display text-2xl font-normal leading-tight tracking-tight text-ink sm:text-3xl">
                  {foundation.education.degree}
                </h3>
                <p className="text-sm leading-relaxed text-ink-secondary sm:text-base">
                  {foundation.education.institution}
                </p>
              </div>

              <dl className="grid grid-cols-2 gap-4 border-t border-rule pt-5 font-mono text-xs">
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                    Timeline
                  </dt>
                  <dd className="mt-1 text-ink">
                    {foundation.education.period}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                    CGPA
                  </dt>
                  <dd className="mt-1 text-ink">
                    {foundation.education.cgpa}
                  </dd>
                </div>
              </dl>

              <div className="flex items-center justify-between border-t border-rule pt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-secondary">
                <span>{foundation.education.location}</span>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1 text-ink transition-colors duration-150 hover:text-accent-text"
                >
                  <span>Full Profile</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </aside>

            {/* Technical Stack Ledger */}
            <div className="divide-y divide-rule border-t border-b border-rule lg:col-span-7">
              {foundation.skillGroups.map((group) => (
                <div
                  key={group.index}
                  className="grid gap-4 py-6 sm:grid-cols-12 sm:items-baseline"
                >
                  <div className="flex items-baseline gap-3 sm:col-span-5">
                    <span className="font-mono text-[11px] text-accent-text">
                      {group.index}
                    </span>
                    <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-ink">
                      {group.label}
                    </h3>
                  </div>

                  <ul className="flex flex-wrap gap-2 sm:col-span-7">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="border border-rule bg-surface px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
