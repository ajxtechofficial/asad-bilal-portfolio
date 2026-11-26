import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type EditorialButtonVariant = "primary" | "secondary";
type EditorialButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: EditorialButtonVariant;
  size?: EditorialButtonSize;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
}

type LinkButtonProps = BaseProps & {
  href: string;
  external?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps | "href">;

type NativeButtonProps = BaseProps & {
  href?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>;

export type EditorialButtonProps = LinkButtonProps | NativeButtonProps;

const variantStyles: Record<EditorialButtonVariant, string> = {
  primary:
    "border-accent bg-accent text-accent-ink hover:border-accent-hover hover:bg-accent-hover",
  secondary:
    "border-rule-strong bg-transparent text-ink hover:border-ink hover:bg-surface",
};

const sizeStyles: Record<EditorialButtonSize, string> = {
  sm: "px-3.5 py-2 text-xs",
  md: "px-5 py-2.5 text-xs sm:text-sm",
  lg: "px-6 py-3.5 text-sm",
};

/**
 * Editorial action button or link with sharp brutalist borders and accessible focus styling.
 */
export function EditorialButton(props: EditorialButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    icon,
    iconPosition = "right",
    className,
    ...rest
  } = props;

  const classes = cn(
    "inline-flex items-center justify-center gap-2 border font-mono uppercase tracking-[0.14em] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-3 disabled:pointer-events-none disabled:opacity-50",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  const content = (
    <>
      {icon && iconPosition === "left" ? (
        <span aria-hidden="true" className="inline-flex shrink-0">
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
      {icon && iconPosition === "right" ? (
        <span aria-hidden="true" className="inline-flex shrink-0">
          {icon}
        </span>
      ) : null}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, external, ...anchorRest } = rest as Omit<
      LinkButtonProps,
      keyof BaseProps
    >;
    const isExternal =
      external ??
      (href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:"));

    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          {...anchorRest}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...anchorRest}>
        {content}
      </Link>
    );
  }

  const buttonRest = rest as Omit<NativeButtonProps, keyof BaseProps>;

  return (
    <button
      type={buttonRest.type ?? "button"}
      className={classes}
      {...buttonRest}
    >
      {content}
    </button>
  );
}
