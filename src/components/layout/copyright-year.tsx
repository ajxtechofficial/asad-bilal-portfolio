"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Hydration-safe client year display compatible with Next.js Cache Components.
 */
export function CopyrightYear({ fallbackYear }: { fallbackYear: number }) {
  const year = useSyncExternalStore(
    emptySubscribe,
    () => new Date().getFullYear(),
    () => fallbackYear
  );

  return <span>{year}</span>;
}
