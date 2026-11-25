import { cn } from "@/lib/cn";

export interface SectionHeaderProps {
  index: string;
  title: string;
  description?: string;
  headingAs?: "h1" | "h2" | "h3";
  className?: string;
}

/**
 * Numbered editorial section header with consistent hierarchy and typography.
 */
export function SectionHeader({
  index,
  title,
  description,
  headingAs: Heading = "h2",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-b border-rule pb-5 md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className="space-y-1.5">
        <span className="block font-mono text-xs uppercase tracking-[0.22em] text-accent-text">
          {index}
        </span>
        <Heading className="font-display text-3xl font-bold uppercase leading-[0.95] tracking-tight text-ink sm:text-4xl">
          {title}
        </Heading>
      </div>
      {description ? (
        <p className="max-w-md text-sm leading-relaxed text-ink-secondary">
          {description}
        </p>
      ) : null}
    </div>
  );
}
