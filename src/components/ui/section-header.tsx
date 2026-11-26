import { cn } from "@/lib/cn";

export interface SectionHeaderProps {
  index: string;
  title: string;
  description?: string;
  headingAs?: "h1" | "h2" | "h3";
  headingId?: string;
  className?: string;
}

/**
 * Editorial section header with serif headline and monospace index.
 */
export function SectionHeader({
  index,
  title,
  description,
  headingAs: Heading = "h2",
  headingId,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-b border-rule pb-6 md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className="space-y-2">
        <span className="block font-mono text-[11px] uppercase tracking-[0.22em] text-accent-text">
          {index}
        </span>
        <Heading
          id={headingId}
          className="font-display text-3xl font-normal leading-[1.05] tracking-tight text-ink sm:text-4xl lg:text-5xl"
        >
          {title}
        </Heading>
      </div>
      {description ? (
        <p className="max-w-md text-sm leading-relaxed text-ink-secondary sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
