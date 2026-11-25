"use client";

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
 * Global editorial navigation bar with brand mark, active route state,
 * subtle availability indicator, theme toggle, and accessible mobile menu.
 */
export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-rule bg-canvas">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <div className="flex min-w-0 items-center gap-5">
          <Link
            href="/"
            className="group inline-flex shrink-0 items-center gap-2.5 font-display text-xl font-extrabold uppercase tracking-[0.06em] text-ink transition-colors duration-150 hover:text-accent-text sm:text-2xl"
          >
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 bg-accent transition-transform duration-150 group-hover:scale-110"
            />
            <span>{siteConfig.wordmark}</span>
          </Link>

          {siteConfig.availability.active ? (
            <div className="hidden items-center gap-2 border-l border-rule pl-5 lg:inline-flex">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-accent"
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-secondary">
                {siteConfig.availability.label}
              </span>
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <nav aria-label="Primary navigation" className="hidden md:block">
            <ul className="flex items-center gap-6 lg:gap-8">
              {siteConfig.navLinks.map((item) => {
                const active = isRouteActive(pathname, item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative inline-block py-1 font-mono text-xs uppercase tracking-[0.16em] transition-colors duration-150",
                        active
                          ? "text-accent-text after:absolute after:right-0 after:bottom-0 after:left-0 after:h-[2px] after:bg-accent"
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

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
