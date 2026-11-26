"use client";

import { Mail } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/cn";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";

function isRouteActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Minimal cinematic editorial navigation bar with centered route links,
 * subtle availability indicator, direct email utility, theme toggle, and mobile menu.
 */
export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-rule bg-canvas">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        {/* Brand Identity */}
        <div className="flex min-w-0 items-center gap-4">
          <Link
            href="/"
            className="group inline-flex shrink-0 items-center gap-2.5 text-ink transition-colors duration-200 hover:text-accent-text"
          >
            <span
              aria-hidden="true"
              className="grid h-5 w-5 place-items-center border border-rule-strong transition-colors duration-200 group-hover:border-accent"
            >
              <span className="h-1.5 w-1.5 bg-accent" />
            </span>
            <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] sm:text-[13px]">
              {siteConfig.wordmark}
            </span>
          </Link>

          {siteConfig.availability.active ? (
            <div className="hidden items-center gap-2 border-l border-rule pl-4 xl:inline-flex">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-accent"
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-secondary">
                {siteConfig.availability.label}
              </span>
            </div>
          ) : null}
        </div>

        {/* Centered Editorial Links */}
        <nav aria-label="Primary navigation" className="hidden md:block">
          <ul className="flex items-center gap-7 lg:gap-9">
            {siteConfig.navLinks.map((item) => {
              const active = isRouteActive(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-block py-1.5 text-[13px] tracking-[0.04em] transition-colors duration-200",
                      active
                        ? "text-ink after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:bg-accent"
                        : "text-ink-secondary hover:text-ink"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Utility Cluster */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href={`mailto:${siteConfig.email}`}
            className="hidden items-center gap-2 border border-rule bg-surface/70 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-secondary transition-colors duration-200 hover:border-rule-strong hover:bg-surface hover:text-ink lg:inline-flex"
          >
            <Mail className="h-3.5 w-3.5 text-accent-text" aria-hidden="true" />
            <span>Email</span>
          </a>

          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
