/**
 * Accessible skip link allowing keyboard users to jump straight to the main content.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only fixed top-3 left-3 z-50 border border-accent bg-accent px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-accent-ink focus:not-sr-only focus:outline-2 focus:outline-offset-2 focus:outline-ink"
    >
      Skip to content
    </a>
  );
}
