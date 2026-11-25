import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { siteConfig, type SocialLink } from "@/data/site";
import { CopyrightYear } from "./copyright-year";

const socialIcons: Record<SocialLink["id"], typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
};

/**
 * Editorial global footer with brand details, primary navigation, verified social links, and copyright.
 */
export function Footer() {
  return (
    <footer className="border-t border-rule bg-canvas">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="space-y-3 md:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 font-display text-2xl font-extrabold uppercase tracking-[0.06em] text-ink transition-colors duration-150 hover:text-accent-text"
            >
              <span aria-hidden="true" className="inline-block h-2.5 w-2.5 bg-accent" />
              <span>{siteConfig.wordmark}</span>
            </Link>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-secondary">
              {siteConfig.title}
            </p>
            <p className="text-sm text-ink-secondary">{siteConfig.location}</p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="space-y-3 md:col-span-3"
          >
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
              Navigation
            </h2>
            <ul className="space-y-2">
              {siteConfig.navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block font-mono text-xs uppercase tracking-[0.14em] text-ink-secondary transition-colors duration-150 hover:text-accent-text"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3 md:col-span-4">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
              Connect
            </h2>
            <ul className="space-y-2.5">
              {siteConfig.socialLinks.map((social) => {
                const Icon = socialIcons[social.id];

                return (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target={social.external ? "_blank" : undefined}
                      rel={social.external ? "noopener noreferrer" : undefined}
                      aria-label={
                        social.external
                          ? `${social.label} (opens in a new tab)`
                          : `${social.label}: ${siteConfig.email}`
                      }
                      className="group inline-flex items-center gap-2.5 text-sm text-ink-secondary transition-colors duration-150 hover:text-accent-text"
                    >
                      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span className="font-mono text-xs tracking-wide">
                        {social.displayValue}
                      </span>
                      {social.external ? (
                        <ArrowUpRight
                          className="h-3.5 w-3.5 shrink-0 opacity-60 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      ) : null}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-rule pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; <CopyrightYear fallbackYear={2026} /> {siteConfig.copyrightStatement}
          </p>
          {siteConfig.availability.active ? (
            <p className="inline-flex items-center gap-2 text-ink-secondary">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-accent"
              />
              <span>{siteConfig.availability.label}</span>
            </p>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
