"use client";

import { useState, useEffect, useRef } from "react";

interface InteractionScenario {
  id: string;
  tabLabel: string;
  userPrompt: string;
  inputType: "Voice input" | "Text query";
  intentBadge: string;
  intentDetail: string;
  resultBadge: string;
  resultTitle: string;
  resultSubtitle: string;
  resultStatus?: string;
  metricImpact: string;
}

const SCENARIOS: InteractionScenario[] = [
  {
    id: "sale",
    tabLabel: "Record a sale",
    userPrompt: "“I sold three shirts for 900 birr.”",
    inputType: "Voice input",
    intentBadge: "Action: Record Sale",
    intentDetail: "Entity extracted: item = 'shirts', qty = 3, price = 900 ETB",
    resultBadge: "Sale recorded",
    resultTitle: "3 shirts · ETB 900",
    resultSubtitle: "Recorded to today's sales ledger",
    metricImpact: "Today's sales: +ETB 900 · Inventory: -3 shirts",
  },
  {
    id: "inventory",
    tabLabel: "Check inventory",
    userPrompt: "“How many shirts do I have left?”",
    inputType: "Voice input",
    intentBadge: "Query: Inventory Level",
    intentDetail: "Lookup item: 'shirts' from inventory balance",
    resultBadge: "Inventory balance",
    resultTitle: "17 shirts remaining",
    resultSubtitle: "Current in-stock count",
    resultStatus: "In Stock",
    metricImpact: "Available for sale: 17 units",
  },
  {
    id: "debt",
    tabLabel: "Track customer debt",
    userPrompt: "“Who owes me money?”",
    inputType: "Voice input",
    intentBadge: "Query: Customer Debts",
    intentDetail: "Lookup outstanding customer receivables",
    resultBadge: "Outstanding balance",
    resultTitle: "Hana — ETB 1,200",
    resultSubtitle: "Unpaid customer balance",
    metricImpact: "Total outstanding: ETB 1,200",
  },
];

export function ProductVisualization() {
  const [activeTab, setActiveTab] = useState(0);
  const [animationStep, setAnimationStep] = useState(3); // 1 = input, 2 = interpreting, 3 = result
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [runId, setRunId] = useState(0);
  const hasTriggeredInView = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // In-view observer so sequence can run smoothly once when scrolled into view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggeredInView.current) {
          hasTriggeredInView.current = true;
          setAnimationStep(1);
          setIsTransitioning(true);
          setRunId((prev) => prev + 1);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function handleReplay() {
    setAnimationStep(1);
    setIsTransitioning(true);
    setRunId((prev) => prev + 1);
  }

  function selectScenario(index: number) {
    setActiveTab(index);
    setAnimationStep(1);
    setIsTransitioning(true);
    setRunId((prev) => prev + 1);
  }

  useEffect(() => {
    if (runId === 0) return;

    const t1 = setTimeout(() => {
      setAnimationStep(2);
    }, 700);

    const t2 = setTimeout(() => {
      setAnimationStep(3);
      setIsTransitioning(false);
    }, 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [runId]);

  const scenario = SCENARIOS[activeTab];

  return (
    <section
      id="preview"
      className="scroll-mt-20 bg-background py-20 lg:py-[120px]"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-[560px]">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-[#6B6B6B] dark:text-[#A3A3A3]">
              Product Visualization
            </p>
            <h2 className="font-display mt-3 text-[32px] leading-[1.15] font-semibold tracking-[-0.025em] text-foreground sm:text-[38px] lg:text-[44px] lg:leading-[1.1] lg:tracking-[-0.03em]">
              Real interactions, zero complexity.
            </h2>
            <p className="font-sans mt-4 text-base leading-[1.6] text-[#6B6B6B] dark:text-[#A3A3A3] sm:text-[18px]">
              See how natural user input is translated into structured business
              records and clean answers.
            </p>
          </div>

          {/* Demonstration Notice Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs text-muted">
            <span className="size-2 rounded-full bg-[#FE6904]" aria-hidden="true" />
            <span>Demonstration data</span>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="mt-10 flex flex-wrap gap-2.5">
          {SCENARIOS.map((item, idx) => {
            const isSelected = activeTab === idx;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => selectScenario(idx)}
                className={`cursor-pointer rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border bg-surface text-muted hover:border-border-strong hover:text-foreground"
                }`}
                aria-pressed={isSelected}
              >
                {item.tabLabel}
              </button>
            );
          })}
        </div>

        {/* Visualization Stage Container (Theme-Aware Panel) */}
        <div ref={containerRef} className="mt-8 overflow-hidden rounded-[16px] border border-border bg-surface p-5 text-foreground sm:p-7 lg:p-9 transition-colors duration-200">
          {/* Top Stage Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
            <div className="flex items-center gap-3">
              <span className="size-2.5 rounded-full bg-[#FE6904]" aria-hidden="true" />
              <span className="font-display text-xs font-semibold uppercase tracking-wider text-muted">
                Simulated Assistant Interaction
              </span>
            </div>
            <button
              type="button"
              onClick={handleReplay}
              className="relative z-10 inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted transition-colors duration-200 hover:border-border-strong hover:text-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Replay interaction sequence"
            >
              <svg
                className={`size-3.5 ${isTransitioning ? "animate-spin" : ""}`}
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
              <span>{isTransitioning ? "Restarting…" : "Replay sequence"}</span>
            </button>
          </div>

          {/* Sequential 3-Step Walkthrough Flow */}
          <div key={runId} className="grid gap-6 pt-7 lg:grid-cols-3">
            {/* Step 1: User Message */}
            <div className="flex flex-col justify-between rounded-[14px] border border-border bg-surface-strong p-5 sm:p-6 transition-all duration-200">
              <div>
                <div className="flex items-center justify-between text-xs text-muted">
                  <span className="font-display font-semibold uppercase tracking-wider">
                    Step 1 · Input
                  </span>
                  <span className="rounded-full border border-border bg-background px-2 py-0.5 text-[11px] text-foreground">
                    {scenario.inputType}
                  </span>
                </div>
                <div className="mt-5 rounded-lg border border-border bg-background p-4">
                  <p className="font-sans text-base font-medium leading-relaxed text-foreground">
                    {scenario.userPrompt}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-xs text-muted">
                Captured via voice transcription or quick text entry.
              </p>
            </div>

            {/* Step 2: Meri Interpretation */}
            <div
              className={`flex flex-col justify-between rounded-[14px] border border-border bg-surface-strong p-5 sm:p-6 transition-all duration-200 ${
                animationStep >= 2 ? "opacity-100" : "opacity-40"
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs text-muted">
                  <span className="font-display font-semibold uppercase tracking-wider">
                    Step 2 · Interpretation
                  </span>
                  {animationStep >= 2 ? (
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#FE6904]">
                      <span className="size-1.5 rounded-full bg-[#FE6904] animate-pulse" />
                      Parsed
                    </span>
                  ) : (
                    <span className="text-[11px] text-muted">Waiting…</span>
                  )}
                </div>

                <div className="mt-5 space-y-2.5">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-foreground">
                    <span className="size-1.5 rounded-full bg-[#FE6904]" />
                    {scenario.intentBadge}
                  </div>
                  <div className="rounded-lg border border-border bg-background p-3 text-xs text-muted">
                    {scenario.intentDetail}
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs text-muted">
                Natural language mapped directly to business operations.
              </p>
            </div>

            {/* Step 3: Result Card (§20 Human-readable UI) */}
            <div
              className={`flex flex-col justify-between rounded-[14px] border border-border bg-surface-strong p-5 sm:p-6 transition-all duration-200 ${
                animationStep >= 3
                  ? "opacity-100 ring-1 ring-[#FE6904]/30"
                  : "opacity-40"
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs text-muted">
                  <span className="font-display font-semibold uppercase tracking-wider">
                    Step 3 · Result
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-medium text-foreground">
                    <span className="size-1.5 rounded-full bg-[#FE6904]" />
                    {scenario.resultBadge}
                  </span>
                </div>

                <div className="mt-5 rounded-lg border border-border bg-background p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                      {scenario.resultTitle}
                    </div>
                    {scenario.resultStatus && (
                      <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-[11px] font-semibold text-foreground">
                        {scenario.resultStatus}
                      </span>
                    )}
                  </div>
                  <p className="font-sans mt-2 text-xs text-muted">
                    {scenario.resultSubtitle}
                  </p>
                </div>
              </div>

              <div className="mt-4 border-t border-border pt-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                  State impact
                </span>
                <p className="mt-0.5 text-xs font-medium text-foreground">
                  {scenario.metricImpact}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Footnote: Never raw JSON */}
          <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-border pt-5 text-center text-xs text-muted sm:flex-row sm:text-left">
            <span>
              Pure human-readable outputs. No raw backend JSON or complex tables.
            </span>
            <span>Illustrative simulation of production voice flow</span>
          </div>
        </div>
      </div>
    </section>
  );
}
