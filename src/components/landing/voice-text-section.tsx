export function VoiceTextSection() {
  return (
    <section className="bg-surface-subtle py-20 lg:py-[120px]">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
        <div className="max-w-[560px]">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-[#6B6B6B] dark:text-[#A3A3A3]">
            Flexible Input
          </p>
          <h2 className="font-display mt-3 text-[32px] leading-[1.15] font-semibold tracking-[-0.025em] text-foreground sm:text-[38px] lg:text-[44px] lg:leading-[1.1] lg:tracking-[-0.03em]">
            Speak when your hands are full. Type when you prefer quiet.
          </h2>
          <p className="font-sans mt-4 text-base leading-[1.6] text-[#6B6B6B] dark:text-[#A3A3A3] sm:text-[18px]">
            Retail days are unpredictable. Meri gives you two seamless ways to
            manage your business records without ever forcing you into a
            rigid menu.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Voice Mode Card */}
          <div className="flex flex-col justify-between rounded-[16px] border border-border bg-surface p-6 sm:p-7 transition-colors duration-200 hover:border-[var(--outline-accent)] focus-within:border-[var(--outline-accent)]">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground">
                  <span className="size-1.5 rounded-full bg-[#FE6904]" />
                  Voice-first via Voxide
                </span>
                <span className="text-xs text-muted">Hands-free</span>
              </div>

              <h3 className="font-display mt-6 text-2xl font-semibold tracking-tight text-foreground">
                Natural speech at the counter
              </h3>
              <p className="font-sans mt-3 text-sm leading-[1.6] text-muted">
                Keep both hands on your merchandise. Just say what happened out
                loud—Meri listens, extracts the transaction details, and logs
                the event instantly.
              </p>
            </div>

            {/* Micro visual snippet */}
            <div className="mt-8 rounded-xl border border-border bg-background p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#111111] text-white dark:bg-white dark:text-[#111111]">
                  <svg
                    className="size-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                    <path d="M19 10v2a7 7 0 01-14 0v-2" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted">You say</p>
                  <p className="truncate text-sm font-medium text-foreground">
                    “Record 450 birr expense for electricity”
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Text Mode Card */}
          <div className="flex flex-col justify-between rounded-[16px] border border-border bg-surface p-6 sm:p-7 transition-colors duration-200 hover:border-[var(--outline-accent)] focus-within:border-[var(--outline-accent)]">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground">
                  <span className="size-1.5 rounded-full bg-foreground" />
                  Direct text input
                </span>
                <span className="text-xs text-muted">Quiet & discreet</span>
              </div>

              <h3 className="font-display mt-6 text-2xl font-semibold tracking-tight text-foreground">
                Simple text when it is noisy
              </h3>
              <p className="font-sans mt-3 text-sm leading-[1.6] text-muted">
                In a loud market or late at night, type your commands into the
                assistant. No dropdown forms or mandatory fields—just type the
                exact same sentence you would speak.
              </p>
            </div>

            {/* Micro visual snippet */}
            <div className="mt-8 rounded-xl border border-border bg-background p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-foreground">
                  <svg
                    className="size-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted">You type</p>
                  <p className="truncate text-sm font-medium text-foreground">
                    “How much did I sell today?”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
