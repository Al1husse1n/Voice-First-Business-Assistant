import Link from "next/link";

export function CtaSection() {
  return (
    <section className="bg-background py-20 lg:py-[120px]">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[16px] border border-border bg-surface px-6 py-14 text-center sm:px-12 sm:py-18">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-[#6B6B6B] dark:text-[#A3A3A3]">
            Start with one request
          </p>
          <h2 className="font-display mt-3 text-[32px] leading-[1.15] font-semibold tracking-[-0.025em] text-foreground sm:text-[38px] lg:text-[44px] lg:leading-[1.1] lg:tracking-[-0.03em]">
            Run your business by voice.
          </h2>
          <p className="font-sans mx-auto mt-4 max-w-[560px] text-base leading-[1.6] text-[#6B6B6B] dark:text-[#A3A3A3] sm:text-[18px]">
            Your next sale, expense, or business question can start here.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:mt-10">
            <Link
              href="/assistant"
              className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Try Meri
            </Link>

            <a
              href="#demo"
              className="inline-flex items-center justify-center rounded-full border border-[var(--outline-accent)] bg-transparent px-6 py-3 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-[rgba(254,105,4,0.06)] hover:border-[var(--outline-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--outline-accent)]"
            >
              See how it works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
