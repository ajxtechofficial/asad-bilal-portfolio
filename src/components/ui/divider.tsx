import { cn } from "@/lib/cn";

type DividerSpacing = "none" | "sm" | "md" | "lg";

export interface DividerProps {
  spacing?: DividerSpacing;
  strong?: boolean;
  className?: string;
}

const spacingStyles: Record<DividerSpacing, string> = {
  none: "my-0",
  sm: "my-4",
  md: "my-8",
  lg: "my-12",
};

/**
 * Thin editorial horizontal divider using theme-aware border tokens.
 */
export function Divider({
  spacing = "md",
  strong = false,
  className,
}: DividerProps) {
  return (
    <hr
      aria-hidden="true"
      className={cn(
        "w-full border-0 border-t",
        strong ? "border-rule-strong" : "border-rule",
        spacingStyles[spacing],
        className
      )}
    />
  );
}
