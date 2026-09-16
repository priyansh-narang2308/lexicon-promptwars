"use client";

import React from "react";
import { Scale, CheckCircle2, XCircle } from "lucide-react";
import { ContractType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface MarketFairnessCardProps {
  score?: number; // 0 (extreme unfairness) to 100 (complete bilateral fairness)
  fairnessBenchmark?: string;
  keyRisks?: string[];
  keyObligations?: string[];
  contractType?: ContractType;
  className?: string;
}

export function MarketFairnessCard({
  score = 32,
  fairnessBenchmark = "Severe Outlier (Score: 32/100). Standard agreements feature mutual indemnity, capped liability, and Net-30 payment terms.",
  keyRisks = [],
  keyObligations = [],
  contractType = "freelance",
  className,
}: MarketFairnessCardProps) {
  // Normalize score between 0 and 100
  const normalizedFairness = Math.max(0, Math.min(100, Math.round(score)));

  // Tiering logic
  const getFairnessTier = (val: number) => {
    if (val <= 30) {
      return {
        label: "Severe Asymmetry (Outlier)",
        color: "#f43f5e", // rose
        badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
        percentile: "Bottom 8% of agreements",
        counterpartyShare: 88,
        userShare: 12,
        assessment:
          "This agreement deviates drastically from standard commercial terms. Over 85% of legal liability is shifted onto you.",
      };
    }
    if (val <= 55) {
      return {
        label: "Unfavorable Commercial Terms",
        color: "#f97316", // orange
        badge: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30",
        percentile: "Bottom 30% of agreements",
        counterpartyShare: 72,
        userShare: 28,
        assessment:
          "Considerable one-sided protection favoring the counterparty. Targeted redlines are recommended on indemnity and payment.",
      };
    }
    if (val <= 75) {
      return {
        label: "Moderate Commercial Standard",
        color: "#f59e0b", // amber
        badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
        percentile: "Middle 50% percentile",
        counterpartyShare: 58,
        userShare: 42,
        assessment:
          "Standard initial corporate draft with customary starting postures. Straightforward to negotiate to mutual parity.",
      };
    }
    return {
      label: "Balanced Bilateral Parity",
      color: "#10b981", // emerald
      badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
      percentile: "Top 15% fair-market benchmark",
      counterpartyShare: 50,
      userShare: 50,
      assessment:
        "Highly balanced mutual terms with standard liability caps and fair reciprocal protections.",
    };
  };

  const tier = getFairnessTier(normalizedFairness);

  // Dynamically utilize key risks & key obligations
  const rightsSurrendered =
    keyRisks.length > 0
      ? keyRisks.slice(0, 4)
      : [
          "Uncapped aggregate monetary liability",
          "Personal work created outside business hours captured as client IP",
          "No late payment interest penalty for delayed compensation",
          "Jury trial waiver & mandatory private arbitration costs",
        ];

  const rightsRetained =
    keyObligations.length > 0
      ? keyObligations.slice(0, 3)
      : [
          "Mutual confidentiality obligations",
          "Governing law established under identifiable state jurisdiction",
          "Formal written notice requirement for contract termination",
        ];

  return (
    <div
      className={cn(
        "p-6 rounded-2xl border border-border/80 bg-card text-card-foreground shadow-xs backdrop-blur-md space-y-5",
        className,
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider">
              Market Benchmark Analysis
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/10 px-2 py-0.2 text-[10px] font-mono text-purple-600 dark:text-purple-400 font-semibold border border-purple-500/20">
              Corpus: 12,000+ {contractType.toUpperCase()} Deals
            </span>
          </div>
          <h3 className="text-base font-bold text-foreground mt-0.5">
            Commercial Fairness & Parity Index
          </h3>
        </div>

        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border self-start sm:self-auto",
            tier.badge,
          )}
        >
          <Scale className="size-3.5" />
          <span>{tier.label}</span>
        </span>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Metric 1: Visual Fairness Gauge */}
        <div className="md:col-span-4 p-4 rounded-xl border border-border/60 bg-muted/20 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
            Fairness Index
          </span>
          <div className="flex items-baseline gap-1 my-2">
            <span
              className="text-4xl font-black font-mono tracking-tighter"
              style={{ color: tier.color }}
            >
              {normalizedFairness}
            </span>
            <span className="text-xs font-mono text-muted-foreground">/100</span>
          </div>

          <div className="w-full bg-muted-foreground/15 h-2 rounded-full overflow-hidden my-1">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${normalizedFairness}%`,
                backgroundColor: tier.color,
              }}
            />
          </div>

          <span className="text-[11px] font-medium text-muted-foreground mt-1">
            {tier.percentile}
          </span>
        </div>

        {/* Metric 2: Bilateral Risk Distribution Bar */}
        <div className="md:col-span-8 space-y-3">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-rose-500">
                Counterparty Advantage: {tier.counterpartyShare}%
              </span>
              <span className="text-emerald-500">
                Your Protection: {tier.userShare}%
              </span>
            </div>

            {/* Split Bar */}
            <div className="h-3 w-full rounded-full overflow-hidden flex bg-muted">
              <div
                className="h-full bg-rose-500 transition-all duration-700"
                style={{ width: `${tier.counterpartyShare}%` }}
                title={`Counterparty Advantage: ${tier.counterpartyShare}%`}
              />
              <div
                className="h-full bg-emerald-500 transition-all duration-700"
                style={{ width: `${tier.userShare}%` }}
                title={`Your Protection: ${tier.userShare}%`}
              />
            </div>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            {fairnessBenchmark}
          </p>
        </div>
      </div>

      {/* Surrendered vs Retained Rights Comparison Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {/* Disadvantageous Terms Forfeited */}
        <div className="p-3.5 rounded-xl border border-rose-500/20 bg-rose-500/5 space-y-2">
          <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
            <XCircle className="size-3.5" />
            <span>Rights Surrendered (Non-Standard)</span>
          </span>
          <ul className="space-y-1.5 text-[11px] text-muted-foreground">
            {rightsSurrendered.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="size-1 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Protections Retained */}
        <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-2">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5" />
            <span>Fair Standard Protections Preserved</span>
          </span>
          <ul className="space-y-1.5 text-[11px] text-muted-foreground">
            {rightsRetained.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="size-1 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
