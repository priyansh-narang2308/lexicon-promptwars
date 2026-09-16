"use client";

import React from "react";
import {
  Search,
  X,
  Flame,
  Columns,
  SplitSquareVertical,
} from "lucide-react";
import { RiskSeverity } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface ClauseFilterState {
  searchQuery: string;
  selectedSeverity: RiskSeverity | "all";
  selectedCategory: string | "all";
  predatoryOnly: boolean;
  viewMode: "split" | "toggle";
}

interface ClauseFilterBarProps {
  state: ClauseFilterState;
  onChange: (newState: ClauseFilterState) => void;
  clauseCounts: {
    total: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
    safe: number;
    predatory: number;
  };
  categories: string[];
  className?: string;
}

export function ClauseFilterBar({
  state,
  onChange,
  clauseCounts,
  categories,
  className,
}: ClauseFilterBarProps) {
  const isFiltered =
    state.searchQuery.trim() !== "" ||
    state.selectedSeverity !== "all" ||
    state.selectedCategory !== "all" ||
    state.predatoryOnly;

  const handleReset = () => {
    onChange({
      ...state,
      searchQuery: "",
      selectedSeverity: "all",
      selectedCategory: "all",
      predatoryOnly: false,
    });
  };

  const severityOptions: Array<{
    id: RiskSeverity | "all";
    label: string;
    count: number;
    colorClass: string;
  }> = [
    {
      id: "all",
      label: "All Clauses",
      count: clauseCounts.total,
      colorClass: "bg-muted text-foreground border-border/80",
    },
    {
      id: "critical",
      label: "Critical",
      count: clauseCounts.critical,
      colorClass:
        "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
    },
    {
      id: "high",
      label: "High",
      count: clauseCounts.high,
      colorClass:
        "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30",
    },
    {
      id: "medium",
      label: "Medium",
      count: clauseCounts.medium,
      colorClass:
        "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    },
    {
      id: "low",
      label: "Low",
      count: clauseCounts.low,
      colorClass:
        "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
    },
  ];

  return (
    <div
      className={cn(
        "p-4 rounded-2xl border border-border/80 bg-card/80 text-card-foreground shadow-xs backdrop-blur-md space-y-3",
        className,
      )}
    >
      {/* Top Controls: Search Input + View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Real-time Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input
            type="text"
            value={state.searchQuery}
            onChange={(e) =>
              onChange({ ...state, searchQuery: e.target.value })
            }
            placeholder="Search clauses by keyword (e.g. indemnity, non-compete, payment)..."
            className="w-full h-9 pl-9 pr-8 rounded-xl border border-border/80 bg-background/80 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all"
          />
          {state.searchQuery && (
            <button
              type="button"
              onClick={() => onChange({ ...state, searchQuery: "" })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        {/* View Mode Toggle: Split vs Toggle */}
        <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
          <span className="text-[11px] font-medium text-muted-foreground hidden md:inline">
            Layout:
          </span>
          <div className="flex items-center rounded-lg border border-border/60 bg-muted/40 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => onChange({ ...state, viewMode: "split" })}
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-md transition-all cursor-pointer",
                state.viewMode === "split"
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground",
              )}
              title="Side-by-Side Split View"
            >
              <Columns className="size-3" />
              <span>Side-by-Side</span>
            </button>
            <button
              type="button"
              onClick={() => onChange({ ...state, viewMode: "toggle" })}
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-md transition-all cursor-pointer",
                state.viewMode === "toggle"
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground",
              )}
              title="Tabbed Toggle View"
            >
              <SplitSquareVertical className="size-3" />
              <span>Toggle Tabs</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Row: Severity Pills + Predatory Toggle + Category Dropdown */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-border/40">
        <div className="flex flex-wrap items-center gap-1.5">
          {severityOptions.map((opt) => {
            const isSelected = state.selectedSeverity === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() =>
                  onChange({ ...state, selectedSeverity: opt.id })
                }
                className={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs transition-all cursor-pointer font-medium",
                  isSelected
                    ? cn(opt.colorClass, "shadow-xs font-bold ring-1 ring-purple-500/40")
                    : "border-border/50 bg-background/50 text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                )}
              >
                <span>{opt.label}</span>
                <span className="font-mono text-[10px] opacity-70">
                  ({opt.count})
                </span>
              </button>
            );
          })}

          {/* Predatory Only Filter */}
          {clauseCounts.predatory > 0 && (
            <button
              type="button"
              onClick={() =>
                onChange({ ...state, predatoryOnly: !state.predatoryOnly })
              }
              className={cn(
                "inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs transition-all cursor-pointer font-medium",
                state.predatoryOnly
                  ? "bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/40 font-bold shadow-xs ring-1 ring-rose-500/30"
                  : "border-border/50 bg-background/50 text-muted-foreground hover:bg-rose-500/10 hover:text-rose-600",
              )}
            >
              <Flame className="size-3 text-rose-500" />
              <span>Predatory Traps Only</span>
              <span className="font-mono text-[10px] opacity-80">
                ({clauseCounts.predatory})
              </span>
            </button>
          )}
        </div>

        {/* Category Filter Dropdown & Clear Link */}
        <div className="flex items-center gap-2">
          {categories.length > 0 && (
            <select
              value={state.selectedCategory}
              onChange={(e) =>
                onChange({ ...state, selectedCategory: e.target.value })
              }
              aria-label="Filter clauses by category"
              className="h-7 px-2 rounded-lg border border-border/70 bg-background text-[11px] font-medium text-muted-foreground hover:text-foreground cursor-pointer focus:outline-none focus:ring-1 focus:ring-purple-500"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          )}

          {isFiltered && (
            <button
              type="button"
              onClick={handleReset}
              className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer ml-1"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
