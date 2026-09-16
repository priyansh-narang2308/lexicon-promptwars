"use client";

import React, { useState, useMemo } from "react";
import {
  FileText,
  Volume2,
  VolumeX,
  Copy,
  CheckCircle2,
  Sliders,
  Flame,
  Scale,
  Sparkles,
  ChevronDown,
  ChevronUp,
  HelpCircle,
} from "lucide-react";
import { ClauseAnalysis, RiskSeverity } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ClauseFilterBar,
  ClauseFilterState,
} from "@/components/modules/clause-filter-bar";
import { useSpeech } from "@/lib/speech";

interface ClauseViewerProps {
  clauses?: ClauseAnalysis[];
  onNegotiateClause?: (clauseId: string) => void;
  selectedCategory?: string | null;
  className?: string;
}

const SEVERITY_CONFIG: Record<
  RiskSeverity,
  { label: string; badge: string; border: string; bg: string }
> = {
  critical: {
    label: "Critical Hazard",
    badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
    border: "border-rose-500/40",
    bg: "bg-rose-500/5",
  },
  high: {
    label: "High Hazard",
    badge: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30",
    border: "border-orange-500/40",
    bg: "bg-orange-500/5",
  },
  medium: {
    label: "Moderate Hazard",
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    border: "border-amber-500/40",
    bg: "bg-amber-500/5",
  },
  low: {
    label: "Low Risk",
    badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
    border: "border-blue-500/40",
    bg: "bg-blue-500/5",
  },
  safe: {
    label: "Safe / Mutual",
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    border: "border-emerald-500/40",
    bg: "bg-emerald-500/5",
  },
};

export function ClauseViewer({
  clauses = [],
  onNegotiateClause,
  selectedCategory,
  className,
}: ClauseViewerProps) {
  const [filterState, setFilterState] = useState<ClauseFilterState>({
    searchQuery: "",
    selectedSeverity: "all",
    selectedCategory: selectedCategory || "all",
    predatoryOnly: false,
    viewMode: "split",
  });

  const [activeTabPerClause, setActiveTabPerClause] = useState<
    Record<string, "plain" | "original">
  >({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedClauses, setExpandedClauses] = useState<Record<string, boolean>>(
    {},
  );

  // Audio Speech Hook (Task 26)
  const { play, stop, isSpeaking, speakingId, isSupported } = useSpeech();

  // Extract available unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    clauses.forEach((c) => {
      if (c.category) set.add(c.category);
    });
    return Array.from(set);
  }, [clauses]);

  // Aggregate clause statistics for filter badges
  const clauseCounts = useMemo(() => {
    const counts = {
      total: clauses.length,
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      safe: 0,
      predatory: 0,
    };

    clauses.forEach((c) => {
      if (counts[c.riskLevel] !== undefined) {
        counts[c.riskLevel] += 1;
      }
      if (c.predatoryFlag) {
        counts.predatory += 1;
      }
    });

    return counts;
  }, [clauses]);

  // Filter clauses based on active filter state
  const filteredClauses = useMemo(() => {
    return clauses.filter((c) => {
      // Search query
      if (filterState.searchQuery.trim()) {
        const query = filterState.searchQuery.toLowerCase();
        const matchesTitle = c.title.toLowerCase().includes(query);
        const matchesText = c.originalText.toLowerCase().includes(query);
        const matchesPlain = c.plainEnglish.toLowerCase().includes(query);
        const matchesExplanation = c.explanation.toLowerCase().includes(query);
        if (!matchesTitle && !matchesText && !matchesPlain && !matchesExplanation) {
          return false;
        }
      }

      // Severity filter
      if (
        filterState.selectedSeverity !== "all" &&
        c.riskLevel !== filterState.selectedSeverity
      ) {
        return false;
      }

      // Category filter
      if (
        filterState.selectedCategory !== "all" &&
        c.category !== filterState.selectedCategory
      ) {
        return false;
      }

      // Predatory only
      if (filterState.predatoryOnly && !c.predatoryFlag) {
        return false;
      }

      return true;
    });
  }, [clauses, filterState]);

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleClauseExpand = (id: string) => {
    setExpandedClauses((prev) => ({
      ...prev,
      [id]: prev[id] === undefined ? false : !prev[id],
    }));
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Task 25: Filter & Search Bar */}
      <ClauseFilterBar
        state={filterState}
        onChange={setFilterState}
        clauseCounts={clauseCounts}
        categories={categories}
      />

      {/* Results Header Bar */}
      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <span>
          Showing{" "}
          <strong className="text-foreground">{filteredClauses.length}</strong> of{" "}
          <strong className="text-foreground">{clauses.length}</strong> audited
          clauses
        </span>
        {isSpeaking && (
          <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-medium">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex size-full rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex rounded-full size-2 bg-purple-600" />
            </span>
            <span>Narrating plain English...</span>
            <button
              type="button"
              onClick={stop}
              className="text-[10px] underline ml-1 cursor-pointer hover:text-foreground"
            >
              Stop
            </button>
          </div>
        )}
      </div>

      {/* Clauses List */}
      {filteredClauses.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-dashed border-border/80 bg-muted/20 text-center">
          <HelpCircle className="size-8 text-muted-foreground mb-2 opacity-60" />
          <h4 className="text-sm font-bold text-foreground">
            No matching clauses found
          </h4>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm">
            Try adjusting your search query, clearing severity filters, or
            resetting the category filter.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setFilterState({
                searchQuery: "",
                selectedSeverity: "all",
                selectedCategory: "all",
                predatoryOnly: false,
                viewMode: filterState.viewMode,
              })
            }
            className="mt-4 text-xs cursor-pointer"
          >
            Clear All Filters
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredClauses.map((clause, index) => {
            const isClauseOpen =
              expandedClauses[clause.id] === undefined
                ? true
                : expandedClauses[clause.id];
            const severity = SEVERITY_CONFIG[clause.riskLevel] || SEVERITY_CONFIG.medium;
            const activeTab = activeTabPerClause[clause.id] || "plain";
            const isThisSpeaking = isSpeaking && speakingId === clause.id;
            const isCopied = copiedId === clause.id;

            return (
              <div
                key={clause.id || `clause-${index}`}
                id={`clause-${clause.id}`}
                className={cn(
                  "rounded-2xl border bg-card text-card-foreground shadow-xs transition-all duration-200 overflow-hidden",
                  clause.predatoryFlag
                    ? "border-rose-500/40 hover:border-rose-500/70 shadow-rose-500/5"
                    : "border-border/80 hover:border-border",
                )}
              >
                {/* Clause Header Bar */}
                <div
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-muted/25 cursor-pointer select-none border-b border-border/50"
                  onClick={() => toggleClauseExpand(clause.id)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono text-xs font-bold">
                      {index + 1}
                    </div>

                    <div className="flex flex-col min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-foreground">
                          {clause.title}
                        </span>

                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border/60">
                          {clause.category}
                        </span>

                        <span
                          className={cn(
                            "text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border",
                            severity.badge,
                          )}
                        >
                          {severity.label}
                        </span>

                        {clause.predatoryFlag && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
                            <Flame className="size-2.5" />
                            <span>Predatory Trap</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Header Actions */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    {/* Audio speech button */}
                    {isSupported && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          play(clause.id, clause.plainEnglish);
                        }}
                        className={cn(
                          "h-8 gap-1 text-xs cursor-pointer",
                          isThisSpeaking &&
                            "text-purple-600 dark:text-purple-400 bg-purple-500/10 font-semibold",
                        )}
                        title="Listen to Plain English translation"
                      >
                        {isThisSpeaking ? (
                          <>
                            <VolumeX className="size-3.5 text-rose-500" />
                            <span>Stop</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="size-3.5" />
                            <span className="hidden sm:inline">Listen</span>
                          </>
                        )}
                      </Button>
                    )}

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleClauseExpand(clause.id);
                      }}
                      className="size-8 p-0 cursor-pointer"
                    >
                      {isClauseOpen ? (
                        <ChevronUp className="size-4" />
                      ) : (
                        <ChevronDown className="size-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Clause Body */}
                {isClauseOpen && (
                  <div className="p-4 sm:p-6 space-y-4">
                    {filterState.viewMode === "split" ? (
                      /* Side-by-Side Split View */
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Left: Original Legalese */}
                        <div className="p-4 rounded-xl border border-border/70 bg-muted/20 flex flex-col justify-between space-y-2.5">
                          <div>
                            <div className="flex items-center justify-between pb-2 border-b border-border/50 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                              <span className="flex items-center gap-1.5">
                                <FileText className="size-3.5" />
                                <span>Original Contract Text</span>
                              </span>
                              <span className="font-mono text-[10px]">
                                Dense Legalese
                              </span>
                            </div>
                            <p className="font-mono text-xs text-foreground/90 leading-relaxed pt-2 whitespace-pre-wrap">
                              {clause.originalText}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-border/40 flex justify-end">
                            <button
                              type="button"
                              onClick={() =>
                                handleCopyText(
                                  `orig-${clause.id}`,
                                  clause.originalText,
                                )
                              }
                              className="text-[11px] text-muted-foreground hover:text-foreground flex items-center gap-1 cursor-pointer"
                            >
                              <Copy className="size-3" />
                              <span>Copy Excerpt</span>
                            </button>
                          </div>
                        </div>

                        {/* Right: Plain English Translation */}
                        <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-500/5 flex flex-col justify-between space-y-3">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between pb-2 border-b border-purple-500/20 text-[11px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                              <span className="flex items-center gap-1.5">
                                <Sparkles className="size-3.5" />
                                <span>Plain-English Translation</span>
                              </span>
                              <span className="font-mono text-[10px]">
                                8th Grade Level
                              </span>
                            </div>

                            <p className="text-xs text-foreground font-medium leading-relaxed pt-1">
                              {clause.plainEnglish}
                            </p>

                            {/* Why it matters & Recommendation */}
                            <div className="space-y-2 pt-2">
                              <div className="p-2.5 rounded-lg bg-background/80 border border-border/60 text-xs">
                                <span className="font-bold text-[11px] text-muted-foreground uppercase tracking-wider block mb-0.5">
                                  Why This Matters
                                </span>
                                <span className="text-muted-foreground leading-relaxed">
                                  {clause.explanation}
                                </span>
                              </div>

                              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs">
                                <span className="font-bold text-[11px] text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1 mb-0.5">
                                  <Scale className="size-3" />
                                  <span>Market-Standard Redline</span>
                                </span>
                                <span className="text-muted-foreground leading-relaxed">
                                  {clause.recommendation}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-purple-500/20 flex items-center justify-between">
                            <button
                              type="button"
                              onClick={() =>
                                handleCopyText(clause.id, clause.plainEnglish)
                              }
                              className="text-[11px] text-muted-foreground hover:text-foreground flex items-center gap-1 cursor-pointer"
                            >
                              {isCopied ? (
                                <>
                                  <CheckCircle2 className="size-3 text-emerald-500" />
                                  <span className="text-emerald-600 dark:text-emerald-400">
                                    Copied!
                                  </span>
                                </>
                              ) : (
                                <>
                                  <Copy className="size-3" />
                                  <span>Copy Plain English</span>
                                </>
                              )}
                            </button>

                            {onNegotiateClause && (
                              <Button
                                size="sm"
                                onClick={() => onNegotiateClause(clause.id)}
                                className="h-7 px-2.5 text-xs bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white cursor-pointer shadow-xs"
                              >
                                <Sliders className="size-3 mr-1" />
                                <span>Negotiate</span>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Tabbed Toggle View */
                      <div className="space-y-3">
                        <div className="flex items-center gap-1 border-b border-border/60 pb-1">
                          <button
                            type="button"
                            onClick={() =>
                              setActiveTabPerClause((prev) => ({
                                ...prev,
                                [clause.id]: "plain",
                              }))
                            }
                            className={cn(
                              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                              activeTab === "plain"
                                ? "bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30"
                                : "text-muted-foreground hover:text-foreground",
                            )}
                          >
                            Plain English (Decoded)
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setActiveTabPerClause((prev) => ({
                                ...prev,
                                [clause.id]: "original",
                              }))
                            }
                            className={cn(
                              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                              activeTab === "original"
                                ? "bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30"
                                : "text-muted-foreground hover:text-foreground",
                            )}
                          >
                            Original Legalese (Raw)
                          </button>
                        </div>

                        {activeTab === "plain" ? (
                          <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-500/5 space-y-3 text-xs">
                            <p className="font-semibold text-foreground leading-relaxed text-sm">
                              {clause.plainEnglish}
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                              {clause.explanation}
                            </p>
                            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                              <span className="font-bold text-[11px] text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                                Market Standard Redline
                              </span>
                              <span className="text-muted-foreground">
                                {clause.recommendation}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="p-4 rounded-xl border border-border/70 bg-muted/20 font-mono text-xs text-foreground/90 whitespace-pre-wrap leading-relaxed">
                            {clause.originalText}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
