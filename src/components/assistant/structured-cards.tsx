"use client";

import React from "react";

export interface SaleExpenseCardProps {
  type?: "sale" | "expense";
  headline: string; // e.g. "3 shirts · ETB 900" or "Transport · ETB 400"
  timestamp?: string;
  subtitle?: string;
}

export function SaleExpenseCard({
  type = "sale",
  headline,
  timestamp = "Today at 12:42 PM",
  subtitle,
}: SaleExpenseCardProps) {
  const isSale = type === "sale";
  return (
    <div className="assistant-card w-full">
      <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 mb-2">
        <span
          className={`assistant-card-badge shrink-0 ${
            isSale ? "badge-sale" : "badge-expense"
          }`}
        >
          {isSale && (
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#FE6904] animate-pulse"
              aria-hidden="true"
            />
          )}
          {isSale ? "Sale Recorded" : "Expense Recorded"}
        </span>
        <span className="card-timestamp shrink-0">{timestamp}</span>
      </div>
      <div className="card-amount break-words">{headline}</div>
      {subtitle ? (
        <p className="text-xs text-muted mt-1.5 font-inter break-words">{subtitle}</p>
      ) : (
        <p className="text-xs text-muted mt-1.5 font-inter break-words">
          {isSale ? "Recorded to today's sales balance" : "Recorded to expense logs"}
        </p>
      )}
    </div>
  );
}

export interface InventoryCardProps {
  countText: string; // e.g. "17 shirts remaining"
  statusBadgeText?: string; // e.g. "In Stock"
  timestamp?: string;
  subtitle?: string;
}

export function InventoryCard({
  countText,
  statusBadgeText = "In Stock",
  timestamp = "Live count",
  subtitle = "Current inventory level",
}: InventoryCardProps) {
  return (
    <div className="assistant-card w-full">
      <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 mb-2">
        <span className="assistant-card-badge badge-inventory shrink-0">Inventory</span>
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <span className="badge-status-stock inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800/40 px-2.5 py-0.5 text-[0.6875rem] font-semibold tracking-wide">
            <span
              className="badge-status-stock-dot w-1.5 h-1.5 rounded-full bg-[#16A34A] dark:bg-emerald-400"
              aria-hidden="true"
            />
            {statusBadgeText}
          </span>
          <span className="card-timestamp shrink-0">{timestamp}</span>
        </div>
      </div>
      <div className="card-amount break-words">{countText}</div>
      <p className="text-xs text-muted mt-1.5 font-inter break-words">{subtitle}</p>
    </div>
  );
}

export interface ClarificationCardProps {
  question: string;
  options: string[];
  onSelectOption?: (option: string) => void;
  timestamp?: string;
}

export function ClarificationCard({
  question,
  options,
  onSelectOption,
  timestamp = "Needs input",
}: ClarificationCardProps) {
  return (
    <div className="assistant-card w-full">
      <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 mb-2">
        <span className="assistant-card-badge badge-clarification shrink-0">
          Needs Clarification
        </span>
        <span className="card-timestamp shrink-0">{timestamp}</span>
      </div>
      <p className="text-sm sm:text-base text-foreground font-inter mb-3 leading-relaxed break-words">
        {question}
      </p>
      <div className="flex flex-wrap gap-2 pt-1">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelectOption?.(option)}
            className="card-option-btn min-h-[44px] px-4 py-2.5 active:scale-95 touch-manipulation break-words text-left"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
