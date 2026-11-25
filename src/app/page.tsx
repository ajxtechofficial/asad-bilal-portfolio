import { ArrowRight } from "lucide-react";
import { Divider } from "@/components/ui/divider";
import { EditorialButton } from "@/components/ui/editorial-button";
import { SectionHeader } from "@/components/ui/section-header";
import { Tag } from "@/components/ui/tag";
import { siteConfig } from "@/data/site";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
      <div className="space-y-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-secondary">
          Phase 02 / Shared Layout &amp; UI Primitives Verification
        </p>

        <h1 className="font-display text-[clamp(4.25rem,17vw,12rem)] font-extrabold uppercase leading-[0.82] tracking-tight text-accent">
          PORTFOLIO
        </h1>

        <p className="max-w-2xl text-base leading-relaxed text-ink-secondary sm:text-lg">
          Temporary verification view for{" "}
          <span className="text-ink">{siteConfig.name}</span> ({siteConfig.title}
          ) confirming the global navigation bar, theme toggle, mobile drawer,
          footer, and reusable editorial UI primitives.
        </p>
      </div>

      <Divider spacing="lg" />

      <section aria-labelledby="ui-primitives-heading" className="space-y-8">
        <SectionHeader
          index="01 / UI PRIMITIVES"
          title="Editorial Components"
          description="Reusable button, tag, divider, and section header components verified across dark and light themes."
          headingAs="h2"
        />

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4 border border-rule bg-surface p-6">
            <h3
              id="ui-primitives-heading"
              className="font-mono text-xs uppercase tracking-[0.18em] text-ink-secondary"
            >
              Editorial Buttons
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <EditorialButton
                href="/projects"
                variant="primary"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Primary Action
              </EditorialButton>
              <EditorialButton href="/about" variant="secondary">
                Secondary Link
              </EditorialButton>
              <EditorialButton variant="secondary" size="sm" disabled>
                Disabled State
              </EditorialButton>
            </div>
          </div>

          <div className="space-y-4 border border-rule bg-surface p-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-ink-secondary">
              Technical Tags
            </h3>
            <div className="flex flex-wrap items-center gap-2.5">
              <Tag>Python</Tag>
              <Tag>FastAPI</Tag>
              <Tag>PostgreSQL</Tag>
              <Tag variant="accent">BioBERT / NLP</Tag>
              <Tag variant="muted">TypeScript</Tag>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
