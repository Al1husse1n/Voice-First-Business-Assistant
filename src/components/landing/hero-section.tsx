"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot() {
  return false;
}

export function HeroSection() {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot
  );

  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [runId, setRunId] = useState(1);

  // Allow users to replay the 3-step demonstration anytime
  function replayDemo() {
    if (prefersReducedMotion) return;
    setStep(0);
    setIsAnimating(true);
    setRunId((prev) => prev + 1);
  }

  useEffect(() => {
    if (prefersReducedMotion) return;

    const t1 = setTimeout(() => {
      setStep(1);
    }, 800);

    const t2 = setTimeout(() => {
      setStep(2);
    }, 1800);

    const t3 = setTimeout(() => {
      setStep(3);
      setIsAnimating(false);
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [runId, prefersReducedMotion]);

  const activeStep = prefersReducedMotion ? 3 : step;
  const activeAnimating = prefersReducedMotion ? false : isAnimating;

  return (
    <section
      id="hero"
      className="relative overflow-hidden py-20 lg:py-[120px]"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
        {/* Centered Hero Stack: max-w-[720px] */}
        <div className="mx-auto max-w-[720px] text-center">
          {/* Eyebrow: 12px, Space Grotesk, 600, uppercase, 0.12em letter spacing, #6B6B6B */}
          <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-[#6B6B6B] dark:text-[#A3A3A3]">
            Voice-First Business Assistant
          </p>

          {/* Hero Headline: Space Grotesk, 64px desktop / 42px mobile, 700, lh 1.05, ls -0.04em */}
          <h1 className="font-display mt-4 text-[42px] leading-[1.08] font-bold tracking-[-0.035em] text-foreground sm:text-[54px] sm:leading-[1.06] lg:text-[64px] lg:leading-[1.05] lg:tracking-[-0.04em]">
            Run your business by voice.
          </h1>

          {/* Supporting Line: Inter, 18px body-lg, lh 1.6 */}
          <p className="font-sans mx-auto mt-6 max-w-xl text-base leading-[1.6] text-[#6B6B6B] dark:text-[#A3A3A3] sm:text-[18px]">
            Record sales, track expenses, manage inventory, and ask questions
            about your business, simply by talking to Meri.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:mt-10">
            {/* Primary CTA: strongest element */}
            <Link
              href="/assistant"
              className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Try Meri
            </Link>

            {/* Secondary CTA: outline and quieter */}
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-full border border-[var(--outline-accent)] bg-transparent px-6 py-3 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-[rgba(254,105,4,0.06)] hover:border-[var(--outline-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--outline-accent)]"
            >
              See how it works
            </a>
          </div>

          {/* Calmer reassurance metadata */}
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-[#6B6B6B] dark:text-[#A3A3A3]">
            <span className="flex items-center gap-1.5">
              <svg
                className="size-3.5 text-[#FE6904]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Instant voice or text
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="size-3.5 text-[#FE6904]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              No forms required
            </span>
          </div>
        </div>

        {/* Hero Visual Theme-Aware Panel, centered below stack */}
        <div className="mx-auto mt-12 sm:mt-16 max-w-[620px]">
            <div
              className="relative w-full overflow-hidden rounded-[16px] border border-border bg-surface p-6 text-foreground transition-colors duration-200 sm:p-7"
              role="region"
              aria-label="Demonstration of voice interaction"
            >
              {/* Header Bar of Demo Container */}
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <span
                    className="size-2 rounded-full bg-[#FE6904]"
                    aria-hidden="true"
                  />
                  <span className="font-display text-xs font-semibold uppercase tracking-wider text-muted">
                    Interactive Demo
                  </span>
                </div>
                <button
                  type="button"
                  onClick={replayDemo}
                  className="relative z-10 inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium text-muted transition-colors duration-200 hover:border-border-strong hover:text-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                  aria-label="Replay interaction demonstration"
                >
                  <svg
                    className={`size-3 ${activeAnimating ? "animate-spin" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  {activeAnimating ? (runId > 1 ? "Restarting…" : "Playing…") : "Replay demo"}
                </button>
              </div>

              {/* Voice Assistant Orb Anchor (§12, §13, §14, §15) */}
              <div className="flex flex-col items-center justify-center pt-7 pb-5">
                <div className="relative flex items-center justify-center">
                  {/* Subtle breathing glow - active during listening and in dark mode */}
                  <div
                    className={`pointer-events-none absolute -inset-4 rounded-full blur-xl transition-all duration-500 ${
                      activeStep === 0
                        ? "opacity-90 bg-[#FE6904]/30 scale-105"
                        : activeStep === 1 || activeStep === 2
                        ? "opacity-60 bg-[#FE6904]/20 scale-100"
                        : "opacity-0 dark:opacity-100 bg-[#FE6904]/15 scale-100"
                    }`}
                    aria-hidden="true"
                  />

                  {/* Breathing orb container: 3-5s cycle, tiny scale change */}
                  <div
                    className={`orb-breathe-animation relative flex size-28 items-center justify-center rounded-full border shadow-sm dark:shadow-none transition-all duration-300 sm:size-32 ${
                      activeStep === 0
                        ? "border-[#FE6904] dark:border-[#FE6904] ring-2 ring-[#FE6904]/40"
                        : activeStep === 1 || activeStep === 2
                        ? "border-[#FE6904]/70 dark:border-[#FE6904]/60 ring-1 ring-[#FE6904]/20"
                        : "border-border dark:border-[#FE6904]/40"
                    }`}
                    style={{ background: "var(--orb-bg-gradient)" }}
                    aria-hidden="true"
                  >
                    {/* Inner core circle with subtle accent details */}
                    <div
                      className="flex size-14 items-center justify-center rounded-full border border-border dark:border-[#FE6904]/30 shadow-sm dark:shadow-[inset_0_0_12px_rgba(254,105,4,0.12)] transition-colors duration-200 sm:size-16"
                      style={{ backgroundColor: "var(--orb-inner-bg)" }}
                    >
                      {activeStep === 0 ? (
                        /* Waveform listening indicator */
                        <div className="flex h-5 items-center gap-1" aria-label="Listening">
                          <span className="wave-bar h-3.5 w-1 rounded-full bg-foreground dark:bg-[#FE6904]" />
                          <span
                            className="wave-bar h-5 w-1 rounded-full bg-foreground dark:bg-[#FE6904]"
                            style={{ animationDelay: "0.15s" }}
                          />
                          <span
                            className="wave-bar h-4 w-1 rounded-full bg-foreground dark:bg-[#FE6904]"
                            style={{ animationDelay: "0.08s" }}
                          />
                          <span
                            className="wave-bar h-2.5 w-1 rounded-full bg-foreground dark:bg-[#FE6904]"
                            style={{ animationDelay: "0.22s" }}
                          />
                        </div>
                      ) : activeStep === 1 || activeStep === 2 ? (
                        /* Processing / thinking pulse */
                        <div className="flex items-center gap-1.5" aria-label="Processing speech">
                          <span className="size-2 rounded-full bg-foreground dark:bg-[#FE6904] motion-safe:animate-pulse" />
                          <span
                            className="size-2 rounded-full bg-foreground dark:bg-[#FE6904] motion-safe:animate-pulse"
                            style={{ animationDelay: "150ms" }}
                          />
                          <span
                            className="size-2 rounded-full bg-foreground dark:bg-[#FE6904] motion-safe:animate-pulse"
                            style={{ animationDelay: "300ms" }}
                          />
                        </div>
                      ) : (
                        /* Calm idle / ready microphone glyph */
                        <svg
                          className="size-6 text-muted"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.8}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-label="Ready"
                        >
                          <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                          <path d="M19 10v2a7 7 0 01-14 0v-2" />
                          <line x1="12" y1="19" x2="12" y2="23" />
                          <line x1="8" y1="23" x2="16" y2="23" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>

                {/* State Caption */}
                <p className="font-sans mt-3 text-xs tracking-wide text-muted transition-colors duration-200">
                  {activeStep === 0
                    ? "Listening…"
                    : activeStep === 1
                    ? "Voice input received"
                    : activeStep === 2
                    ? "Understanding intent…"
                    : "Business data updated"}
                </p>
              </div>

              {/* The Exchange Story: You talk → Meri understands → Data changes */}
              <div key={runId} className="min-h-[270px] space-y-3 pt-2">
                <style>{`
                  @keyframes heroDemoCardIn {
                    0% {
                      opacity: 0;
                      transform: translateY(10px);
                    }
                    100% {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                  .hero-demo-card-enter {
                    animation: heroDemoCardIn 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
                  }
                `}</style>

                {/* 1. You Talk (User Speech Bubble) */}
                {activeStep >= 1 && (
                  <div
                    key={`${runId}-card-1`}
                    className={`rounded-xl border border-border bg-surface-strong p-3.5 transition-colors duration-200 ${
                      prefersReducedMotion ? "" : "hero-demo-card-enter"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] text-muted">
                      <span className="font-semibold uppercase tracking-wider">
                        1. You talk
                      </span>
                      <span>Speech input</span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-foreground">
                      “Sold three shirts for 900 birr.”
                    </p>
                  </div>
                )}

                {/* 2. Meri Understands & Result Card */}
                {activeStep >= 2 && (
                  <div
                    key={`${runId}-card-2`}
                    className={`rounded-xl border border-border bg-background p-3.5 transition-colors duration-200 ${
                      prefersReducedMotion ? "" : "hero-demo-card-enter"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] text-muted">
                      <span className="font-semibold uppercase tracking-wider">
                        2. Meri understands
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-strong px-2 py-0.5 text-[10px] text-foreground">
                        <span className="size-1.5 rounded-full bg-[#FE6904]" />
                        Sale recorded
                      </span>
                    </div>
                    <div className="font-display mt-2 text-lg font-bold tracking-tight text-foreground">
                      3 shirts · ETB 900
                    </div>
                    <p className="text-xs text-muted">Recorded to today&apos;s sales balance</p>
                  </div>
                )}

                {/* 3. Business Data Changes */}
                {activeStep >= 3 && (
                  <div
                    key={`${runId}-card-3`}
                    className={`rounded-xl border border-border bg-surface-strong p-3 transition-colors duration-200 ${
                      prefersReducedMotion ? "" : "hero-demo-card-enter"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] text-muted">
                      <span className="font-semibold uppercase tracking-wider">
                        3. Business data changes
                      </span>
                      <span className="text-[10px] text-muted">Live state</span>
                    </div>
                    <p className="mt-1 text-xs font-medium text-foreground">
                      Sales today: +ETB 900 · Stock: -3 shirts
                    </p>
                  </div>
                )}
              </div>

              {/* Clarifying Disclaimer */}
              <p className="mt-4 text-center text-[11px] text-muted">
                Simulated voice flow demonstration. No microphone access required.
              </p>
            </div>
          </div>
        </div>
      </section>
  );
}
