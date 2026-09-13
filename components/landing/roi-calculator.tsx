"use client";

import React, { useState } from "react";
import {
  Calculator,
  DollarSign,
  Clock,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function RoiCalculator() {
  const [contractsPerMonth, setContractsPerMonth] = useState(5);
  const [pagesPerContract, setPagesPerContract] = useState(20);
  const [hourlyRate, setHourlyRate] = useState(350);

  // Math:
  // Average lawyer time per contract: 1 hour base + 0.1 hour per page
  const hoursPerContract = 0.8 + pagesPerContract * 0.08;
  const monthlyLawyerHours = Math.round(contractsPerMonth * hoursPerContract * 10) / 10;
  const annualLawyerHours = Math.round(monthlyLawyerHours * 12);
  const annualLegalSpend = Math.round(annualLawyerHours * hourlyRate);

  // LexFlow savings:
  // LexFlow eliminates preliminary discovery & initial drafting (~70% savings)
  const annualSavings = Math.round(annualLegalSpend * 0.72);
  const hoursReclaimedAnnual = Math.round(annualLawyerHours * 0.75);

  return (
    <section
      id="roi"
      className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-background border-t border-border/70 overflow-hidden"
    >
      <div className="relative max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-semibold">
            <Calculator className="size-3.5" />
            <span>Quantitative ROI Engine</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            Calculate Your Annual Legal Savings
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Outside counsel charges $350–$650/hr simply to read terms and outline initial redlines. See how much budget and founder time LexFlow reclaims immediately.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-8">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <TrendingUp className="size-5 text-purple-600 dark:text-purple-400" />
              <span>Your Contract Volume & Rates</span>
            </h3>

            {/* Slider 1: Contracts Per Month */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <label className="font-semibold text-foreground">
                  Agreements Reviewed Monthly
                </label>
                <span className="font-mono text-sm font-bold text-purple-600 dark:text-purple-400">
                  {contractsPerMonth} agreements
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={contractsPerMonth}
                onChange={(e) => setContractsPerMonth(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
                <span>1 (Freelancer)</span>
                <span>10 (Growth Startup)</span>
                <span>30+ (Enterprise)</span>
              </div>
            </div>

            {/* Slider 2: Average Pages per Contract */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <label className="font-semibold text-foreground">
                  Average Document Length
                </label>
                <span className="font-mono text-sm font-bold text-purple-600 dark:text-purple-400">
                  {pagesPerContract} pages
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="80"
                value={pagesPerContract}
                onChange={(e) => setPagesPerContract(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
                <span>3 pp (NDA)</span>
                <span>20 pp (MSA / Lease)</span>
                <span>80 pp (Enterprise)</span>
              </div>
            </div>

            {/* Slider 3: Outside Counsel Hourly Rate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <label className="font-semibold text-foreground">
                  Attorney Hourly Rate
                </label>
                <span className="font-mono text-sm font-bold text-purple-600 dark:text-purple-400">
                  ${hourlyRate}/hr
                </span>
              </div>
              <input
                type="range"
                min="175"
                max="750"
                step="25"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
                <span>$175/hr (Boutique)</span>
                <span>$350/hr (Mid-Market)</span>
                <span>$750/hr (Top Tier)</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-purple-500/20 bg-purple-500/5 text-xs text-muted-foreground leading-relaxed flex items-center gap-2">
              <ShieldCheck className="size-4 text-purple-600 dark:text-purple-400 shrink-0" />
              <span>
                Based on American Bar Association (ABA) average billing benchmarks for contract review and preliminary discovery.
              </span>
            </div>
          </div>

          {/* Result Column (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-600/10 via-card to-background p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-600 dark:text-purple-400 font-bold">
                  Annual Impact
                </span>
                <div className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight font-mono text-purple-600 dark:text-purple-400">
                  ${annualSavings.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Estimated direct legal fees saved each year
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
                <div className="p-3.5 rounded-xl border border-border/80 bg-muted/40 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold">
                    <Clock className="size-3.5 text-purple-500" />
                    <span>Time Saved</span>
                  </div>
                  <div className="text-xl font-bold font-mono text-foreground">
                    {hoursReclaimedAnnual} hrs/yr
                  </div>
                  <span className="text-[10px] text-muted-foreground">Reclaimed founder focus</span>
                </div>

                <div className="p-3.5 rounded-xl border border-border/80 bg-muted/40 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold">
                    <DollarSign className="size-3.5 text-emerald-500" />
                    <span>Raw Legal Bill</span>
                  </div>
                  <div className="text-xl font-bold font-mono text-foreground">
                    ${annualLegalSpend.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-muted-foreground">Without LexFlow triage</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-muted-foreground leading-relaxed">
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  <span>Cuts outside lawyer prep hours by up to 72%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  <span>1-Page attorney brief eliminates discovery billing</span>
                </div>
              </div>
            </div>

            <Link href="/dashboard?tab=scanner" className="w-full">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 font-semibold py-5 text-sm cursor-pointer shadow-lg shadow-purple-500/20">
                <Sparkles className="size-4 mr-2" />
                <span>Start Saving in the Studio</span>
                <ArrowRight className="size-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
