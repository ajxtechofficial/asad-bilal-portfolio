"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { Tag } from "@/components/ui/tag";
import type { ProjectShowcaseItem } from "@/data/home";
import { cn } from "@/lib/cn";

export interface ProjectCarouselProps {
  indexLabel: string;
  heading: string;
  subheading: string;
  projects: readonly ProjectShowcaseItem[];
}

function getCircularOffset(idx: number, active: number, total: number): number {
  let diff = idx - active;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

/**
 * Accessible, touch-friendly project stage carousel using CSS perspective
 * transitions and native state management (zero external motion libraries).
 */
export function ProjectCarousel({
  indexLabel,
  heading,
  subheading,
  projects,
}: ProjectCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartXRef = useRef<number | null>(null);
  const total = projects.length;
  const activeProject = projects[activeIndex];

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) return;
    const endX = event.changedTouches[0]?.clientX;
    if (typeof endX !== "number") return;

    const deltaX = endX - touchStartXRef.current;
    touchStartXRef.current = null;

    if (Math.abs(deltaX) < 42) return;
    if (deltaX > 0) {
      goPrev();
    } else {
      goNext();
    }
  };

  return (
    <section
      id="selected-work"
      aria-labelledby="selected-work-heading"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative overflow-hidden border-t border-rule bg-canvas py-20 focus:outline-none sm:py-28"
    >
      {/* Subtle Studio Horizon Ambient Wash (CSS fallback + atmosphere) */}
      <div
        aria-hidden="true"
        style={{ backgroundImage: "var(--carousel-ambient-wash)" }}
        className="pointer-events-none absolute inset-x-0 top-1/2 h-[380px] -translate-y-1/2"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        {/* Centered Editorial Header */}
        <div className="mx-auto max-w-2xl space-y-3 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-text">
            {indexLabel}
          </p>
          <h2
            id="selected-work-heading"
            className="font-display text-4xl font-normal tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            {heading}
          </h2>
          <p className="text-sm leading-relaxed text-ink-secondary sm:text-base">
            {subheading}
          </p>
        </div>

        {/* Active Project Meta Readout */}
        <div
          aria-live="polite"
          className="mt-10 flex flex-col items-center gap-2 text-center"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-secondary">
            <span>{activeProject.index} / {String(total).padStart(2, "0")}</span>
            <span aria-hidden="true" className="mx-2 text-ink-muted">
              ·
            </span>
            <span>{activeProject.subtitle}</span>
          </p>
          <h3 className="font-display text-2xl font-normal tracking-tight text-ink transition-opacity duration-300 sm:text-3xl">
            {activeProject.title}
          </h3>
        </div>

        {/* Perspective Stage */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative mt-8 flex items-center justify-center"
        >
          {projects.map((project, idx) => {
            const offset = getCircularOffset(idx, activeIndex, total);
            const isActive = offset === 0;
            const isLeft = offset < 0;

            return (
              <article
                key={project.slug}
                aria-hidden={!isActive}
                onClick={() => {
                  if (!isActive) setActiveIndex(idx);
                }}
                style={{
                  boxShadow: isActive ? "var(--card-shadow)" : undefined,
                }}
                className={cn(
                  "w-full max-w-2xl border bg-surface p-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-8 lg:p-10",
                  isActive
                    ? "relative z-20 translate-x-0 scale-100 border-rule-strong opacity-100"
                    : cn(
                        "pointer-events-none absolute z-10 hidden cursor-pointer border-rule opacity-45 hover:opacity-75 md:pointer-events-auto md:block",
                        isLeft
                          ? "-translate-x-[58%] scale-[0.86] lg:-translate-x-[68%]"
                          : "translate-x-[58%] scale-[0.86] lg:translate-x-[68%]"
                      )
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule pb-4">
                  <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em]">
                    <span className="text-accent-text">{project.index}</span>
                    <span className="text-ink-muted">{project.category}</span>
                  </div>
                  <Tag variant={project.highlighted ? "accent" : "muted"}>
                    {project.status}
                  </Tag>
                </div>

                <div className="mt-6 space-y-4">
                  <h4 className="font-display text-2xl font-normal tracking-tight text-ink sm:text-3xl">
                    {project.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-ink-secondary sm:text-base">
                    {project.summary}
                  </p>
                  <p className="border-l border-rule-strong pl-3.5 font-mono text-xs leading-relaxed text-ink-muted">
                    {project.architectureNote}
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-5">
                  <ul className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li key={tag}>
                        <Tag>{tag}</Tag>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/projects"
                    tabIndex={isActive ? 0 : -1}
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors duration-150 hover:text-accent-text"
                  >
                    <span>Explore Archive</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Carousel Controls & Pagination */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous project"
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center border border-rule-strong bg-surface text-ink transition-colors duration-150 hover:border-accent hover:text-accent-text"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>

          <div
            role="tablist"
            aria-label="Select project slide"
            className="flex items-center gap-2.5"
          >
            {projects.map((project, idx) => {
              const isSelected = idx === activeIndex;

              return (
                <button
                  key={project.slug}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-label={`Show project ${idx + 1}: ${project.title}`}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "h-2 cursor-pointer transition-all duration-200",
                    isSelected
                      ? "w-7 bg-accent"
                      : "w-2 bg-rule-strong hover:bg-ink-secondary"
                  )}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next project"
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center border border-rule-strong bg-surface text-ink transition-colors duration-150 hover:border-accent hover:text-accent-text"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
