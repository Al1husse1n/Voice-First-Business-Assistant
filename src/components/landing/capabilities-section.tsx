const capabilities = [
  ["Sales", "Record what you sell as it happens."],
  ["Expenses", "Keep everyday costs in one place."],
  ["Purchases", "Track restocking and supplier costs."],
  ["Inventory", "Know what is available on the shelf."],
  ["Customer debt", "Remember who owes you and how much."],
  ["Business insights", "Ask questions and get clear answers."],
];

export function CapabilitiesSection() {
  return (
    <section
      id="capabilities"
      className="scroll-mt-20 bg-surface-subtle py-20 lg:py-[120px]"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
        <div className="max-w-[620px]">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            One place for the daily work
          </p>
          <h2 className="font-display mt-3 text-[32px] leading-[1.15] font-semibold tracking-[-0.025em] text-foreground sm:text-[38px] lg:text-[44px] lg:leading-[1.1] lg:tracking-[-0.03em]">
            The records your business relies on.
          </h2>
          <p className="mt-4 text-base leading-[1.6] text-muted sm:text-[18px]">
            Speak or type what happened. Meri keeps the important details
            organized without making you learn a new system.
          </p>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-[16px] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map(([title, description]) => (
            <div key={title} className="bg-surface p-5 sm:p-6">
              <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-[1.55] text-muted">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
