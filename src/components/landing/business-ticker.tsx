const operations = [
  "SALES",
  "EXPENSES",
  "PURCHASES",
  "INVENTORY",
  "CUSTOMER DEBT",
  "BUSINESS INSIGHTS",
];

function TickerRow() {
  return (
    <div className="flex shrink-0 items-center gap-6 pr-6">
      {operations.map((operation) => (
        <span key={operation} className="flex items-center gap-6 whitespace-nowrap">
          <span className="font-display text-[11px] font-semibold tracking-[0.16em] text-muted">
            {operation}
          </span>
          <span className="signal-ticker-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </span>
      ))}
    </div>
  );
}

export function BusinessTicker() {
  return (
    <div className="business-ticker border-y border-border bg-surface-subtle" aria-label="Meri business operations">
      <div className="business-ticker-track flex w-max py-4">
        <TickerRow />
        <TickerRow />
      </div>
    </div>
  );
}
