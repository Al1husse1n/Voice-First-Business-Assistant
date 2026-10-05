import Link from "next/link";

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden py-20 lg:py-[120px]">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            Voice-first business assistant
          </p>
          <h1 className="font-display mt-4 text-[42px] leading-[1.08] font-bold tracking-[-0.035em] text-foreground sm:text-[54px] sm:leading-[1.06] lg:text-[64px] lg:leading-[1.05] lg:tracking-[-0.04em]">
            Run your business by voice.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-[1.6] text-muted sm:text-[18px]">
            Record sales, expenses, purchases, inventory, and customer debts.
            Ask questions about your business in the same natural way.
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
              className="inline-flex items-center justify-center rounded-full border border-border-strong bg-transparent px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              See how it works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
