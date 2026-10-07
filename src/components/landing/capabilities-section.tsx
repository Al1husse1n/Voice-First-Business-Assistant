import React from "react";

const capabilities = [
  {
    title: "Voice-Recorded Sales",
    description: "Record counter sales hands-free the moment they happen.",
    example: "Sold 3 shirts for 900 birr",
    iconKey: "sale",
  },
  {
    title: "Customer Debt & Credit Book",
    description: "Keep customer credit, tabs, and balances immediately visible.",
    example: "Abebe took 2 jeans on credit, 1,400 birr",
    iconKey: "debt",
  },
  {
    title: "Automatic Inventory Depletion",
    description: "Deplete or restock items instantly with every sale or delivery.",
    example: "Add 15 scarves to stock",
    iconKey: "inventory",
  },
  {
    title: "Daily Financial Summaries",
    description: "Ask about revenue, total cash in, expenses, or money owed anytime.",
    example: "How much did I sell today?",
    iconKey: "question",
  },
  {
    title: "Wholesale Purchases",
    description: "Capture supplier restocking costs and bulk wholesale inventory.",
    example: "Bought 20 jackets for 8,000 birr",
    iconKey: "purchase",
  },
  {
    title: "Operating Expenses",
    description: "Log shop utilities, transport, packaging, and daily merchant costs.",
    example: "Spent 250 birr on transport",
    iconKey: "expense",
  },
] as const;

function CapabilityIcon({ iconKey }: { iconKey: string }) {
  const iconPaths: Record<string, React.ReactNode> = {
    sale: (
      <path d="M12 6v12m4-9.5C16 7.12 14.21 6 12 6S8 7.12 8 8.5 9.79 11 12 11s4 1.12 4 2.5-1.79 2.5-4 2.5-4-1.12-4-2.5" />
    ),
    debt: (
      <path d="M16 20v-1a4 4 0 0 0-8 0v1m4-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5 1a2.5 2.5 0 0 1 2 2.5V17" />
    ),
    inventory: (
      <path d="m12 3 8 4-8 4-8-4 8-4Zm-8 8 8 4 8-4M4 16l8 4 8-4" />
    ),
    question: (
      <path d="M9.5 9a2.7 2.7 0 1 1 4.6 1.9c-1.1 1-2.1 1.4-2.1 3m.01 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    ),
    purchase: (
      <path d="M5 9h14l-1 10H6L5 9Zm3 0V7a4 4 0 0 1 8 0v2" />
    ),
    expense: (
      <path d="M4 7h16v10H4zM8 12h3m5 0h.01" />
    ),
  };

  return (
    <svg
      className="size-5 text-accent"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[iconKey]}
    </svg>
  );
}

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="scroll-mt-20 bg-background py-20 lg:py-[120px]">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-[620px]">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              Built for daily operations
            </p>
            <h2 className="mt-3 font-display text-[32px] leading-[1.15] font-semibold tracking-[-0.025em] text-foreground sm:text-[38px] lg:text-[44px]">
              The work your business already does.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-muted">
            One calm place for the records and answers you need to keep the
            day moving.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((card) => (
            <article
              key={card.title}
              className="group flex min-h-[220px] flex-col justify-between rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_14px_35px_rgba(254,105,4,0.08)]"
            >
              <div>
                <div className="flex size-10 items-center justify-center rounded-xl border border-accent/20 bg-accent-dim transition-colors group-hover:border-accent/50">
                  <CapabilityIcon iconKey={card.iconKey} />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-foreground">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">{card.description}</p>
              </div>
              <div className="mt-6 border-t border-border pt-4">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">
                  Try saying
                </span>
                <p className="mt-1 text-xs font-medium text-foreground">“{card.example}”</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
