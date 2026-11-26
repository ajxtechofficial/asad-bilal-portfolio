import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TagVariant = "default" | "accent" | "muted";

export interface TagProps {
  children: ReactNode;
  variant?: TagVariant;
  className?: string;
}

const variantStyles: Record<TagVariant, string> = {
  default: "border-rule bg-surface-muted/60 text-ink",
  accent: "border-accent/45 bg-accent/10 text-accent-text",
  muted: "border-rule bg-transparent text-ink-secondary",
};

/**
 * Compact technical/category label styled for editorial grids and project metadata.
 */
export function Tag({ children, variant = "default", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] leading-none",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
