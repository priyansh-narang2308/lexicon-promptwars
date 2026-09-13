/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  ShieldAlert,
  PieChart as PieIcon,
  BarChart3,
  Filter,
  Scale,
  FileCode,
  DollarSign,
  Briefcase,
  Lock,
  Ban,
  HelpCircle,
} from "lucide-react";
import { ClauseAnalysis, RiskSeverity } from "@/lib/types";
import { cn } from "@/lib/utils";

interface RiskDistributionChartProps {
  clauses?: ClauseAnalysis[];
  className?: string;
  onSelectCategory?: (category: string | null) => void;
  selectedCategory?: string | null;
}

// Category design mapping
const CATEGORY_META: Record<
  string,
  {
    color: string;
    bg: string;
    border: string;
    icon: React.ComponentType<{
      className?: string;
      style?: React.CSSProperties;
    }>;
  }
> = {
  "Liability & Indemnity": {
    color: "#f43f5e", // rose-500
    bg: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    border: "border-rose-500/30",
    icon: ShieldAlert,
  },
  "Restrictive Covenants": {
    color: "#f97316", // orange-500
    bg: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    border: "border-orange-500/30",
    icon: Ban,
  },
  "Intellectual Property": {
    color: "#a855f7", // purple-500
    bg: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    border: "border-purple-500/30",
    icon: Lock,
  },
  "Payment & Fees": {
    color: "#eab308", // yellow-500
    bg: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    border: "border-yellow-500/30",
    icon: DollarSign,
  },
  "Termination & Notice": {
    color: "#3b82f6", // blue-500
    bg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    border: "border-blue-500/30",
    icon: Briefcase,
  },
  "Dispute Resolution": {
    color: "#06b6d4", // cyan-500
    bg: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
    border: "border-cyan-500/30",
    icon: Scale,
  },
  General: {
    color: "#64748b", // slate-500
    bg: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
    border: "border-slate-500/30",
    icon: HelpCircle,
  },
};

const SEVERITY_COLORS: Record<RiskSeverity, string> = {
  critical: "#f43f5e",
  high: "#f97316",
  medium: "#f59e0b",
  low: "#3b82f6",
  safe: "#10b981",
};

interface TooltipPayloadItem {
  name?: string;
  value?: number;
  payload?: {
    name: string;
    count: number;
    percentage: number;
    predatoryCount: number;
    highestRisk: string;
    color: string;
  };
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}) {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0].payload;
  if (!data) return null;

  return (
    <div className="rounded-xl border border-border/80 bg-background/95 p-3 shadow-lg backdrop-blur-md text-xs min-w-44 select-none">
      <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-1.5 mb-1.5">
        <span className="font-semibold text-foreground flex items-center gap-1.5">
          <span
            className="size-2.5 rounded-full shrink-0"
            style={{ backgroundColor: data.color }}
          />
          {data.name}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">
          {data.percentage}%
        </span>
      </div>
      <div className="space-y-1 text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>Clauses:</span>
          <span className="font-mono font-bold text-foreground">
            {data.count}
          </span>
        </div>
        {data.predatoryCount > 0 && (
          <div className="flex items-center justify-between text-rose-500 font-medium">
            <span>Predatory Traps:</span>
            <span className="font-mono font-bold">{data.predatoryCount}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span>Max Risk Tier:</span>
          <span className="capitalize font-semibold text-foreground">
            {data.highestRisk}
          </span>
        </div>
      </div>
    </div>
  );
}

export function RiskDistributionChart({
  clauses = [],
  className,
  onSelectCategory,
  selectedCategory,
}: RiskDistributionChartProps) {
  const [viewMode, setViewMode] = useState<"category" | "severity">("category");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Compute category breakdown from clauses
  const categoryData = useMemo(() => {
    if (!clauses.length) {
      // Smart baseline fallback for visual completeness
      return [
        {
          name: "Liability & Indemnity",
          count: 2,
          predatoryCount: 1,
          highestRisk: "critical",
          color: "#f43f5e",
          percentage: 33,
        },
        {
          name: "Restrictive Covenants",
          count: 1,
          predatoryCount: 1,
          highestRisk: "critical",
          color: "#f97316",
          percentage: 17,
        },
        {
          name: "Intellectual Property",
          count: 1,
          predatoryCount: 1,
          highestRisk: "critical",
          color: "#a855f7",
          percentage: 17,
        },
        {
          name: "Payment & Fees",
          count: 1,
          predatoryCount: 1,
          highestRisk: "high",
          color: "#eab308",
          percentage: 16,
        },
        {
          name: "Termination & Notice",
          count: 1,
          predatoryCount: 0,
          highestRisk: "medium",
          color: "#3b82f6",
          percentage: 17,
        },
      ];
    }

    const map: Record<
      string,
      { count: number; predatoryCount: number; severities: RiskSeverity[] }
    > = {};

    clauses.forEach((c) => {
      const cat = c.category || "General";
      if (!map[cat]) {
        map[cat] = { count: 0, predatoryCount: 0, severities: [] };
      }
      map[cat].count += 1;
      if (c.predatoryFlag) map[cat].predatoryCount += 1;
      map[cat].severities.push(c.riskLevel);
    });

    const total = clauses.length;
    return Object.entries(map)
      .map(([name, stat]) => {
        const highestRisk = stat.severities.includes("critical")
          ? "critical"
          : stat.severities.includes("high")
            ? "high"
            : stat.severities.includes("medium")
              ? "medium"
              : stat.severities.includes("low")
                ? "low"
                : "safe";

        const color = CATEGORY_META[name]?.color || "#8b5cf6";
        const percentage = Math.round((stat.count / total) * 100);

        return {
          name,
          count: stat.count,
          predatoryCount: stat.predatoryCount,
          highestRisk,
          color,
          percentage,
        };
      })
      .sort((a, b) => b.count - a.count);
  }, [clauses]);

  // Compute severity breakdown for bar chart
  const severityData = useMemo(() => {
    const counts: Record<RiskSeverity, number> = {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      safe: 0,
    };

    if (clauses.length > 0) {
      clauses.forEach((c) => {
        if (counts[c.riskLevel] !== undefined) {
          counts[c.riskLevel] += 1;
        }
      });
    } else {
      counts.critical = 3;
      counts.high = 1;
      counts.medium = 1;
      counts.low = 1;
      counts.safe = 0;
    }

    return [
      {
        name: "Critical",
        key: "critical",
        count: counts.critical,
        color: SEVERITY_COLORS.critical,
      },
      {
        name: "High",
        key: "high",
        count: counts.high,
        color: SEVERITY_COLORS.high,
      },
      {
        name: "Medium",
        key: "medium",
        count: counts.medium,
        color: SEVERITY_COLORS.medium,
      },
      {
        name: "Low",
        key: "low",
        count: counts.low,
        color: SEVERITY_COLORS.low,
      },
      {
        name: "Safe",
        key: "safe",
        count: counts.safe,
        color: SEVERITY_COLORS.safe,
      },
    ];
  }, [clauses]);

  const totalClauses =
    clauses.length || categoryData.reduce((acc, c) => acc + c.count, 0);

  const handleSliceClick = (data?: { name?: string }) => {
    if (!onSelectCategory || !data?.name) return;
    if (selectedCategory === data.name) {
      onSelectCategory(null);
    } else {
      onSelectCategory(data.name);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col p-6 rounded-2xl border border-border/80 bg-card text-card-foreground shadow-xs backdrop-blur-md overflow-hidden",
        className,
      )}
    >
      {/* Header with Title & Perspective Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider">
              Pillar 1 · Recharts Visualizer
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/10 px-2 py-0.2 text-[10px] font-mono text-purple-600 dark:text-purple-400 font-semibold border border-purple-500/20">
              Interactive
            </span>
          </div>
          <h2 className="text-base font-bold text-foreground mt-0.5">
            Risk Category & Severity Distribution
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Decomposition of clauses across legal categories and threat levels.
          </p>
        </div>

        {/* View Toggle (Donut vs Bar) */}
        <div className="flex items-center rounded-lg bg-muted/60 p-1 border border-border/50 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode("category")}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer",
              viewMode === "category"
                ? "bg-background text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <PieIcon className="size-3.5" />
            <span>Categories</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("severity")}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer",
              viewMode === "severity"
                ? "bg-background text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <BarChart3 className="size-3.5" />
            <span>Severity</span>
          </button>
        </div>
      </div>

      {/* Main Visualizer Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5 items-center">
        {/* Chart Canvas Area */}
        <div className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-65 w-full">
          {!isMounted ? (
            <div className="flex h-56 w-full items-center justify-center text-xs text-muted-foreground">
              Loading distribution charts...
            </div>
          ) : viewMode === "category" ? (
            <div className="relative size-full min-h-65 flex items-center justify-center">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Tooltip content={<CustomTooltip />} />
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={68}
                    outerRadius={96}
                    paddingAngle={3}
                    dataKey="count"
                    cursor="pointer"
                    onClick={handleSliceClick}
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    {categoryData.map((entry, index) => {
                      const isSelected = selectedCategory === entry.name;
                      const isHovered = activeIndex === index;
                      return (
                        <Cell
                          key={`cell-${entry.name}`}
                          fill={entry.color}
                          opacity={
                            selectedCategory && !isSelected
                              ? 0.35
                              : isHovered
                                ? 1
                                : 0.88
                          }
                          stroke={isSelected ? "#ffffff" : "transparent"}
                          strokeWidth={isSelected ? 2 : 0}
                          className="transition-all duration-300 outline-none"
                        />
                      );
                    })}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Center Donut Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none select-none">
                <span className="text-3xl font-black font-mono tracking-tight text-foreground">
                  {totalClauses}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Clauses
                </span>
                {selectedCategory && (
                  <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-bold max-w-27.5 truncate mt-0.5">
                    {selectedCategory}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="size-full min-h-65 flex items-center justify-center">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart
                  data={severityData}
                  margin={{ top: 15, right: 10, left: -20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    opacity={0.15}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: "currentColor", opacity: 0.7 }}
                    axisLine={{ opacity: 0.2 }}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 11, fill: "currentColor", opacity: 0.7 }}
                    axisLine={{ opacity: 0.2 }}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: "currentColor", opacity: 0.05 }}
                    content={({ active, payload }) => {
                      if (!active || !payload || !payload.length) return null;
                      const d = payload[0].payload;
                      return (
                        <div className="rounded-xl border border-border/80 bg-background/95 p-2.5 shadow-lg backdrop-blur-md text-xs">
                          <span className="font-semibold text-foreground flex items-center gap-1.5">
                            <span
                              className="size-2 rounded-full"
                              style={{ backgroundColor: d.color }}
                            />
                            {d.name} Severity
                          </span>
                          <div className="font-mono text-xs mt-1 text-muted-foreground">
                            {d.count} Clause{d.count === 1 ? "" : "s"}
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Bar
                    dataKey="count"
                    radius={[6, 6, 0, 0]}
                    animationDuration={800}
                  >
                    {severityData.map((entry) => (
                      <Cell key={`bar-${entry.name}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Category Breakdown & Selection List */}
        <div className="lg:col-span-6 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground mb-1">
            <span className="flex items-center gap-1.5">
              <Filter className="size-3.5 text-purple-500" />
              <span>Category Exposure Matrix</span>
            </span>
            {selectedCategory && (
              <button
                type="button"
                onClick={() => onSelectCategory?.(null)}
                className="text-[11px] font-medium text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
              >
                Clear Filter
              </button>
            )}
          </div>

          <div className="space-y-1.5 max-h-65 overflow-y-auto pr-1">
            {categoryData.map((cat) => {
              const meta = CATEGORY_META[cat.name] || {
                color: cat.color,
                bg: "bg-purple-500/10 text-purple-600",
                border: "border-purple-500/30",
                icon: FileCode,
              };
              const Icon = meta.icon;
              const isSelected = selectedCategory === cat.name;

              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => handleSliceClick({ name: cat.name })}
                  className={cn(
                    "w-full flex items-center justify-between p-2 rounded-xl border text-left transition-all cursor-pointer",
                    isSelected
                      ? "bg-purple-500/10 border-purple-500/40 shadow-xs"
                      : "bg-muted/30 border-border/40 hover:bg-muted/60 hover:border-border/70",
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      className="size-3.5 shrink-0"
                      style={{ color: cat.color }}
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold text-foreground truncate">
                        {cat.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <span>
                          {cat.count} clause{cat.count > 1 ? "s" : ""}
                        </span>
                        <span>·</span>
                        <span>{cat.percentage}% of agreement</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 pl-2">
                    {cat.predatoryCount > 0 && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                        <ShieldAlert className="size-2.5" />
                        <span>{cat.predatoryCount}</span>
                      </span>
                    )}
                    <span
                      className={cn(
                        "text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold",
                        cat.highestRisk === "critical"
                          ? "bg-rose-500/15 text-rose-600 dark:text-rose-400"
                          : cat.highestRisk === "high"
                            ? "bg-orange-500/15 text-orange-600 dark:text-orange-400"
                            : cat.highestRisk === "medium"
                              ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                              : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
                      )}
                    >
                      {cat.highestRisk}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
