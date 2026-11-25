"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/cn";

function isRouteActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Lightweight accessible mobile navigation menu with Escape support and focus management.
 */
export function MobileMenu() {
  const pathname = usePathname();
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const isOpen = openOnPath === pathname;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  const closeMenu = useCallback(() => {
    setOpenOnPath(null);
  }, []);

  const toggleMenu = useCallback(() => {
    setOpenOnPath((prev) => (prev === pathname ? null : pathname));
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) {
      if (wasOpenRef.current) {
        triggerRef.current?.focus();
      }
      wasOpenRef.current = false;
      return;
    }

    wasOpenRef.current = true;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key === "Tab" && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeMenu]);

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className="inline-flex h-9 w-9 cursor-pointer items-center justify-center border border-rule bg-transparent text-ink transition-colors duration-150 hover:border-accent hover:text-accent-text"
      >
        {isOpen ? (
          <X className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Menu className="h-4 w-4" aria-hidden="true" />
        )}
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            aria-hidden="true"
            onClick={closeMenu}
            className="fixed inset-0 bg-canvas/85"
          />

          <div
            ref={drawerRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="relative z-10 flex h-full w-full max-w-xs flex-col justify-between border-l border-rule-strong bg-canvas px-6 py-6"
          >
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-rule pb-4">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-secondary">
                  Navigation
                </span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close navigation menu"
                  className="inline-flex h-9 w-9 cursor-pointer items-center justify-center border border-rule text-ink transition-colors duration-150 hover:border-accent hover:text-accent-text"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <nav aria-label="Mobile primary navigation">
                <ul className="space-y-2">
                  {siteConfig.navLinks.map((item, idx) => {
                    const active = isRouteActive(pathname, item.href);
                    const indexLabel = String(idx + 1).padStart(2, "0");

                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex items-baseline justify-between border-b border-rule py-3.5 transition-colors duration-150",
                            active
                              ? "border-accent text-accent-text"
                              : "text-ink hover:text-accent-text"
                          )}
                        >
                          <span className="font-display text-3xl font-bold uppercase tracking-tight">
                            {item.label}
                          </span>
                          <span className="font-mono text-xs tracking-widest text-ink-secondary">
                            {indexLabel}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            <div className="space-y-3 border-t border-rule pt-5">
              {siteConfig.availability.active ? (
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-secondary">
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 shrink-0 rounded-full bg-accent"
                  />
                  <span>{siteConfig.availability.label}</span>
                </div>
              ) : null}
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                {siteConfig.location}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
