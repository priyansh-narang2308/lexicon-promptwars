"use client";

import React, { useState } from "react";
import {
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Clock,
  DollarSign,
  ShieldAlert,
  ArrowRight,
  Split,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function ComparisonSlider() {
  const [sliderPos, setSliderPos] = useState(50); // 0 to 100 percentage
  const [isDragging, setIsDragging] = useState(false);

  return (
    <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-muted/20 border-t border-border/70 overflow-hidden">
      <div className="relative max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-semibold">
            <Split className="size-3.5" />
            <span>The LexFlow Contrast</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            Before vs. After LexFlow
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Drag the comparison slider to experience the difference between deciphering dense, predatory legalese and viewing instant, actionable AI intelligence.
          </p>
        </div>

        {/* Comparison Container */}
        <div className="relative rounded-3xl border border-border bg-card shadow-xl overflow-hidden select-none">
          {/* Top Comparison Metrics Bar */}
          <div className="grid grid-cols-2 border-b border-border text-xs divide-x divide-border">
            <div className="p-4 bg-rose-500/5 text-rose-700 dark:text-rose-300 font-semibold flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <AlertTriangle className="size-4 text-rose-500" />
                <span>The Traditional Struggle</span>
              </span>
              <span className="font-mono text-[11px] text-rose-600/80 dark:text-rose-400/80">
                4.5 Hours · $1,400 Legal Bill
              </span>
            </div>
            <div className="p-4 bg-purple-500/5 text-purple-700 dark:text-purple-300 font-semibold flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Sparkles className="size-4 text-purple-500" />
                <span>With LexFlow AI</span>
              </span>
              <span className="font-mono text-[11px] text-purple-600/80 dark:text-purple-400/80">
                3.8 Seconds · $0 Discovery Bill
              </span>
            </div>
          </div>

          {/* Interactive Split View */}
          <div className="relative min-h-[380px] sm:min-h-[320px] overflow-hidden">
            {/* Left Content: Before LexFlow (Traditional Legalese) */}
            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between bg-background">
              <div className="space-y-3 max-w-lg">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold uppercase">
                    Raw 42-Page Legalese
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    Clause 14.2(b)
                  </span>
                </div>
                <p className="font-serif text-xs sm:text-sm text-foreground/80 leading-relaxed blur-[0.3px]">
                  &ldquo;...notwithstanding anything to the contrary herein, Consultant agrees to defend, indemnify, protect, and hold harmless Indemnitees from and against any and all liabilities, whether known or unknown, contingent, liquidated, or unliquidated, arising directly or tangentially out of or in connection with the Subject Matter, without any monetary cap or temporal limitation whatsoever...&rdquo;
                </p>
                <div className="p-2.5 rounded-lg border border-dashed border-rose-500/30 bg-rose-500/5 text-[11px] text-rose-600 dark:text-rose-400">
                  ⚠️ <strong>Buried Trap:</strong> Unlimited personal indemnification requiring upfront retainer defense for third-party lawsuits without negligence requirement.
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4 text-xs text-muted-foreground border-t border-border/60">
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5 text-rose-500" />
                  <span>Avg. Review Time: 4.5 Hours</span>
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="size-3.5 text-rose-500" />
                  <span>Outside Counsel Discovery: $1,400+</span>
                </span>
              </div>
            </div>

            {/* Right Content: After LexFlow (Clean Intelligence) */}
            <div
              className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-purple-500/10 via-card to-background border-l border-purple-500/40"
              style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
            >
              <div className="space-y-3 max-w-lg ml-auto">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 font-bold uppercase">
                    LexFlow Autonomous Analysis
                  </span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-500/15 text-rose-600 dark:text-rose-400">
                    Risk 88/100 · Critical
                  </span>
                </div>

                <div className="p-3 rounded-xl border border-purple-500/20 bg-purple-500/5 space-y-1">
                  <span className="text-[10px] font-semibold uppercase text-purple-600 dark:text-purple-400 tracking-wider">
                    Plain-English Translation (8th-Grade Level)
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-foreground leading-relaxed">
                    If someone sues the client over your project—even with zero fault on your part—you must pay for their entire legal defense upfront with no financial ceiling.
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-1 font-mono text-xs">
                  <span className="text-[10px] font-semibold uppercase text-emerald-600 dark:text-emerald-400 tracking-wider font-sans">
                    Recommended Fair Counter-Clause
                  </span>
                  <p className="text-foreground leading-relaxed">
                    Liability capped at 100% of fees paid; indemnity restricted to proven gross negligence.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-4 pt-4 text-xs text-muted-foreground border-t border-border/60">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="size-3.5" />
                  <span>Audit Time: 3.8 Seconds</span>
                </span>
                <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400 font-semibold">
                  <DollarSign className="size-3.5" />
                  <span>Legal Discovery Savings: $1,400</span>
                </span>
              </div>
            </div>

            {/* Slider Handle Divider */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-purple-500 cursor-ew-resize flex items-center justify-center z-30 shadow-[0_0_15px_rgba(168,85,247,0.8)]"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="size-8 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg border-2 border-background cursor-ew-resize active:scale-110 transition-transform">
                <Split className="size-4" />
              </div>
            </div>
          </div>

          {/* Interactive Range Input Bar */}
          <div className="p-4 bg-muted/40 border-t border-border flex items-center justify-between gap-4 text-xs">
            <span className="text-muted-foreground font-mono text-[11px] hidden sm:inline">
              ← Drag to reveal legalese
            </span>
            <input
              type="range"
              min="10"
              max="90"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-ew-resize accent-purple-600"
              aria-label="Comparison slider"
            />
            <span className="text-muted-foreground font-mono text-[11px] hidden sm:inline">
              Drag to reveal LexFlow AI →
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
