export function ProblemSection() {
  return (
    <section className="bg-surface-subtle py-20 lg:py-[120px]">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
        <div className="max-w-[560px]">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-[#6B6B6B] dark:text-[#A3A3A3]">
            The Problem
          </p>
          <h2 className="font-display mt-3 text-[32px] leading-[1.15] font-semibold tracking-[-0.025em] text-foreground sm:text-[38px] lg:text-[44px] lg:leading-[1.1] lg:tracking-[-0.03em]">
            Owners shouldn&apos;t stop working to maintain complicated records.
          </h2>
          <p className="font-sans mt-4 text-base leading-[1.6] text-[#6B6B6B] dark:text-[#A3A3A3] sm:text-[18px]">
            When you are serving customers, unpacking deliveries, or negotiating
            prices, typing into spreadsheets and complex accounting menus is
            the last thing you have time for.
          </p>
        </div>

        {/* 3 Concise Operational Pain Points */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-[16px] border border-border bg-surface p-6 sm:p-7">
            <span
              className="flex size-10 items-center justify-center rounded-lg border border-border bg-background text-foreground"
              aria-hidden="true"
            >
              <svg
                className="size-5 text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <h3 className="font-display mt-4 text-lg font-semibold tracking-tight text-foreground">
              Form entry breaks your flow
            </h3>
            <p className="font-sans mt-2 text-sm leading-[1.55] text-muted">
              Navigating nested dropdowns, dates, and number pads while a
              customer waits at the counter is slow and awkward.
            </p>
          </div>

          <div className="rounded-[16px] border border-border bg-surface p-6 sm:p-7">
            <span
              className="flex size-10 items-center justify-center rounded-lg border border-border bg-background text-foreground"
              aria-hidden="true"
            >
              <svg
                className="size-5 text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </span>
            <h3 className="font-display mt-4 text-lg font-semibold tracking-tight text-foreground">
              Delayed logging causes errors
            </h3>
            <p className="font-sans mt-2 text-sm leading-[1.55] text-muted">
              Postponing entries until the end of the day leads to forgotten
              sales, unaccounted expenses, and inventory discrepancies.
            </p>
          </div>

          <div className="rounded-[16px] border border-border bg-surface p-6 sm:p-7">
            <span
              className="flex size-10 items-center justify-center rounded-lg border border-border bg-background text-foreground"
              aria-hidden="true"
            >
              <svg
                className="size-5 text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </span>
            <h3 className="font-display mt-4 text-lg font-semibold tracking-tight text-foreground">
              Complex software is overkill
            </h3>
            <p className="font-sans mt-2 text-sm leading-[1.55] text-muted">
              Most tools are built for accountants rather than shop owners who
              simply need quick records and immediate answers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
