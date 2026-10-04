export function CapabilitiesSection() {
  const capabilities = [
    {
      title: "Sales",
      description:
        "Record sales as they happen at the counter. Meri logs the item, quantity, and total amount instantly.",
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
          <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 12v-2m0 0c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Expenses",
      description:
        "Log operational costs—transportation, lunch, utilities, or packaging—the moment money leaves your hand.",
      example: "“Spent 250 birr on bajaj transport”",
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
          <path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: "Purchases",
      description:
        "Capture wholesale inventory restocking purchases and supplier costs to keep your procurement clear.",
      example: "“Bought 20 new jackets for 8,000 birr”",
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
          <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      title: "Inventory",
      description:
        "Adjust stock counts directly when merchandise is received, sold, damaged, or verified on shelf.",
      example: "“Add 15 scarfs to stock”",
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
          <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      title: "Customer debts",
      description:
        "Record customer credit and outstanding balances on trust without flipping through paper ledgers.",
      example: "“Hana took two dresses, owes 1,200 birr”",
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
          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: "Business questions",
      description:
        "Ask plain questions about what you sold today, what is left in inventory, or who currently owes you money.",
      example: "“How much did I sell today?”",
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
  ];

  return (
    <section
      id="capabilities"
      className="scroll-mt-20 bg-surface-subtle py-20 lg:py-[120px]"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
        <div className="max-w-[560px]">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-[#6B6B6B] dark:text-[#A3A3A3]">
            What Meri Can Handle
          </p>
          <h2 className="font-display mt-3 text-[32px] leading-[1.15] font-semibold tracking-[-0.025em] text-foreground sm:text-[38px] lg:text-[44px] lg:leading-[1.1] lg:tracking-[-0.03em]">
            Six core capabilities for everyday business.
          </h2>
          <p className="font-sans mt-4 text-base leading-[1.6] text-[#6B6B6B] dark:text-[#A3A3A3] sm:text-[18px]">
            No complex accounting suites, no bloated menus. Meri handles the
            core operational records your shop relies on every day.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item) => (
            <div
              key={item.title}
              className="flex flex-col justify-between rounded-[16px] border border-border bg-surface p-6 sm:p-7 transition-colors duration-200 hover:border-[var(--outline-accent)] focus-within:border-[var(--outline-accent)]"
            >
              <div>
                <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-background">
                  {item.icon}
                </div>
                <h3 className="font-display mt-5 text-xl font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="font-sans mt-2.5 text-sm leading-[1.55] text-muted">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 border-t border-border/80 pt-4">
                <span className="text-[11px] font-medium uppercase tracking-wider text-muted">
                  Try asking / saying
                </span>
                <p className="font-sans mt-1 text-xs font-medium text-foreground">
                  {item.example}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
