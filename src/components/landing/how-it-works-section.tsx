export function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Speak",
      body: "Describe what happened in plain language—a sale, an expense, a restock, or a customer credit.",
      example: "“Sold 3 shirts for 900 birr”",
      icon: (
        <svg
          className="size-5 text-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
          <path d="M19 10v2a7 7 0 01-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      ),
    },
    {
      step: "02",
      title: "Meri understands",
      body: "Your words are converted into structured business events, extracting amounts, items, and parties accurately.",
      example: "Intent: Record Sale (3 shirts @ 300 ETB)",
      icon: (
        <svg
          className="size-5 text-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
    },
    {
      step: "03",
      title: "Business data updates",
      body: "Your sales ledger, inventory counts, and customer balances reflect the change on the spot.",
      example: "Today's sales: +ETB 900 · Stock: -3 shirts",
      icon: (
        <svg
          className="size-5 text-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
    {
      step: "04",
      title: "Ask anything",
      body: "Ask quick operational questions anytime to know where your cash, stock, and debts stand.",
      example: "“How many shirts do I have left?”",
      icon: (
        <svg
          className="size-5 text-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 bg-background py-20 lg:py-[120px]"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
        <div className="max-w-[560px]">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-[#6B6B6B] dark:text-[#A3A3A3]">
            How Meri Works
          </p>
          <h2 className="font-display mt-3 text-[32px] leading-[1.15] font-semibold tracking-[-0.025em] text-foreground sm:text-[38px] lg:text-[44px] lg:leading-[1.1] lg:tracking-[-0.03em]">
            A continuous loop for your daily operations.
          </h2>
          <p className="font-sans mt-4 text-base leading-[1.6] text-[#6B6B6B] dark:text-[#A3A3A3] sm:text-[18px]">
            Speak your events as they occur, let Meri interpret and record them,
            and query your operational data whenever you need an answer.
          </p>
        </div>

        {/* 4-Step Connected Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => (
            <article
              key={item.step}
              className="flex flex-col justify-between rounded-[16px] border border-border bg-surface p-6 sm:p-7 transition-colors duration-200 hover:border-[var(--outline-accent)] focus-within:border-[var(--outline-accent)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-xs font-bold tracking-widest text-[#FE6904]">
                    {item.step}
                  </span>
                  <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-background">
                    {item.icon}
                  </div>
                </div>

                <h3 className="font-display mt-5 text-lg font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="font-sans mt-2.5 text-sm leading-[1.55] text-muted">
                  {item.body}
                </p>
              </div>

              <div className="mt-6 border-t border-border/80 pt-4">
                <span className="text-[11px] font-medium uppercase tracking-wider text-muted">
                  Example
                </span>
                <p className="font-sans mt-1 text-xs font-medium text-foreground">
                  {item.example}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
