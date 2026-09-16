"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  AlertTriangle,
  Flame,
  CheckCircle2,
  Copy,
  Sliders,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Scale,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { ClauseAnalysis } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PredatoryAlertCardsProps {
  clauses?: ClauseAnalysis[];
  onNegotiateClause?: (clauseId: string) => void;
  className?: string;
}

export function PredatoryAlertCards({
  clauses = [],
  onNegotiateClause,
  className,
}: PredatoryAlertCardsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter predatory or critical hazard clauses
  const predatoryClauses = clauses.filter(
    (c) => c.predatoryFlag || c.riskLevel === "critical",
  );

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  if (predatoryClauses.length === 0) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center p-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 text-center text-foreground backdrop-blur-md",
          className,
        )}
      >
        <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-500 mb-3">
          <ShieldCheck className="size-6" />
        </div>
        <h3 className="text-base font-bold text-foreground">
          Zero Predatory Landmines Detected
        </h3>
        <p className="text-xs text-muted-foreground max-w-md mt-1 leading-relaxed">
          This document does not contain aggressive unilateral traps, unlimited
          indemnity covenants, or disproportionate non-compete clauses.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Radar Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border border-rose-500/30 bg-linear-to-r from-rose-500/10 via-orange-500/5 to-transparent backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="relative flex size-10 items-center justify-center rounded-xl bg-rose-500/20 text-rose-500 shrink-0">
            <Flame className="size-5 text-rose-500 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex size-3">
              <span className="animate-ping absolute inline-flex size-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full size-3 bg-rose-500" />
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                Predatory Trap Radar
              </span>
              <span className="px-2 py-0.2 rounded-full text-[10px] font-mono font-bold bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30">
                {predatoryClauses.length} Flagged
              </span>
            </div>
            <h3 className="text-base font-bold text-foreground mt-0.5">
              High-Risk Contractual Landmines
            </h3>
          </div>
        </div>

        <p className="text-xs text-muted-foreground sm:text-right max-w-sm leading-relaxed">
          These clauses create asymmetric liabilities or severe personal
          exposure. We recommend redlining them before signature.
        </p>
      </div>

      {/* Predatory Alert Cards Grid */}
      <div className="grid grid-cols-1 gap-3.5">
        {predatoryClauses.map((clause, index) => {
          const isExpanded = expandedId === clause.id;
          const isCopied = copiedId === clause.id;

          return (
            <div
              key={clause.id || `pred-${index}`}
              className={cn(
                "group relative rounded-2xl border transition-all duration-200 overflow-hidden bg-card text-card-foreground shadow-xs",
                clause.riskLevel === "critical"
                  ? "border-rose-500/30 hover:border-rose-500/60"
                  : "border-orange-500/30 hover:border-orange-500/60",
              )}
            >
              {/* Card Header Row */}
              <div
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none"
                onClick={() => toggleExpand(clause.id)}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-lg mt-0.5",
                      clause.riskLevel === "critical"
                        ? "bg-rose-500/15 text-rose-500"
                        : "bg-orange-500/15 text-orange-500",
                    )}
                  >
                    <ShieldAlert className="size-4" />
                  </div>

                  <div className="flex flex-col min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-muted-foreground uppercase">
                        Trap #{index + 1}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border/60">
                        {clause.category}
                      </span>
                      <span
                        className={cn(
                          "text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border",
                          clause.riskLevel === "critical"
                            ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30"
                            : "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30",
                        )}
                      >
                        {clause.riskLevel === "critical"
                          ? "Critical Hazard"
                          : "High Hazard"}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-foreground mt-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {clause.title}
                    </h4>

                    <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                      {clause.plainEnglish}
                    </p>
                  </div>
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <span className="text-xs font-medium text-purple-600 dark:text-purple-400 flex items-center gap-1">
                    <span>{isExpanded ? "Less Details" : "View Breakdown"}</span>
                    {isExpanded ? (
                      <ChevronUp className="size-3.5" />
                    ) : (
                      <ChevronDown className="size-3.5" />
                    )}
                  </span>
                </div>
              </div>

              {/* Collapsible Deep Dive Analysis */}
              {isExpanded && (
                <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-border/60 bg-muted/20 space-y-4 text-xs animate-in fade-in-50 duration-200">
                  {/* The Raw Trap Excerpt */}
                  <div className="space-y-1.5">
                    <span className="font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-mono">
                      <AlertTriangle className="size-3.5" />
                      <span>Original Text Excerpt (Dense Legalese)</span>
                    </span>
                    <div className="p-3 rounded-xl border border-rose-500/20 bg-rose-500/5 font-mono text-[11px] text-foreground/90 leading-relaxed max-h-36 overflow-y-auto">
                      {clause.originalText}
                    </div>
                  </div>

                  {/* Plain-English Impact & Harm */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl border border-border/60 bg-card/60 space-y-1">
                      <span className="font-semibold text-foreground flex items-center gap-1.5 text-[11px]">
                        <Sparkles className="size-3 text-purple-500" />
                        <span>Why This Harms You</span>
                      </span>
                      <p className="text-muted-foreground leading-relaxed">
                        {clause.explanation}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-1">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 text-[11px]">
                        <Scale className="size-3" />
                        <span>Market-Standard Redline</span>
                      </span>
                      <p className="text-muted-foreground leading-relaxed">
                        {clause.recommendation}
                      </p>
                    </div>
                  </div>

                  {/* Strategic Action Toolbar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/40">
                    <span className="text-[10px] font-mono text-muted-foreground">
                      Clause ID: {clause.id} · Impact Weight: High
                    </span>

                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(clause.id, clause.recommendation);
                        }}
                        className="h-8 gap-1.5 text-xs cursor-pointer border-border/70 hover:bg-muted"
                      >
                        {isCopied ? (
                          <>
                            <CheckCircle2 className="size-3 text-emerald-500" />
                            <span className="text-emerald-600 dark:text-emerald-400">
                              Copied Redline!
                            </span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3" />
                            <span>Copy Recommended Clause</span>
                          </>
                        )}
                      </Button>

                      {onNegotiateClause && (
                        <Button
                          type="button"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onNegotiateClause(clause.id);
                          }}
                          className="h-8 gap-1.5 text-xs bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-xs cursor-pointer"
                        >
                          <Sliders className="size-3" />
                          <span>Draft Counter-Proposal</span>
                          <ArrowRight className="size-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
