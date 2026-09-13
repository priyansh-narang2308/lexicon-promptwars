"use client";

import React, { useEffect, useState } from "react";
import {
  ShieldAlert,
  AlertTriangle,
  AlertCircle,
  ShieldCheck,
  TrendingUp,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RiskScoreGaugeProps {
  score: number;
  rating?:
    | "Low Risk"
    | "Moderate Risk"
    | "High Risk"
    | "Critical Risk"
    | "Critical"
    | "High"
    | "Moderate"
    | "Low"
    | string;
  predatoryCount?: number;
  size?: "sm" | "md" | "lg";
  showSubMetrics?: boolean;
  className?: string;
}

export function RiskScoreGauge({
  score,
  rating: explicitRating,
  predatoryCount,
  size = "md",
  showSubMetrics = true,
  className,
}: RiskScoreGaugeProps) {
  const [displayScore, setDisplayScore] = useState(0);

  // Normalize score between 0 and 100
  const normalizedScore = Math.max(0, Math.min(100, Math.round(score)));

  // Determine severity tier and palette
  const getTier = (val: number) => {
    if (val >= 75) {
      return {
        level: "Critical Risk" as const,
        color: "#f43f5e", // rose-500
        gradientId: "gauge-critical",
        gradientStart: "#fb7185",
        gradientEnd: "#e11d48",
        bgBadge: "bg-rose-500/10 text-rose-500 border-rose-500/30",
        shadow: "rgba(244, 63, 94, 0.4)",
        icon: ShieldAlert,
        summary: "Severe asymmetric liabilities and predatory traps detected.",
      };
    }
    if (val >= 60) {
      return {
        level: "High Risk" as const,
        color: "#f97316", // orange-500
        gradientId: "gauge-high",
        gradientStart: "#fb923c",
        gradientEnd: "#ea580c",
        bgBadge: "bg-orange-500/10 text-orange-500 border-orange-500/30",
        shadow: "rgba(249, 115, 22, 0.35)",
        icon: AlertTriangle,
        summary:
          "Material contractual hazards that require bilateral redlines.",
      };
    }
    if (val >= 36) {
      return {
        level: "Moderate Risk" as const,
        color: "#f59e0b", // amber-500
        gradientId: "gauge-moderate",
        gradientStart: "#fcd34d",
        gradientEnd: "#d97706",
        bgBadge: "bg-amber-500/10 text-amber-500 border-amber-500/30",
        shadow: "rgba(245, 158, 11, 0.3)",
        icon: AlertCircle,
        summary:
          "Standard commercial draft with room for protective revisions.",
      };
    }
    return {
      level: "Low Risk" as const,
      color: "#10b981", // emerald-500
      gradientId: "gauge-low",
      gradientStart: "#34d399",
      gradientEnd: "#059669",
      bgBadge: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
      shadow: "rgba(16, 185, 129, 0.3)",
      icon: ShieldCheck,
      summary: "Balanced bilateral terms with fair-market mutual standards.",
    };
  };

  const tier = getTier(normalizedScore);
  const ratingText = explicitRating || tier.level;
  const TierIcon = tier.icon;

  // Animated numerical counter effect
  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1200; // ms
    const initial = 0;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(initial + easeProgress * normalizedScore));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [normalizedScore]);

  // Dimension mapping
  const dim = {
    sm: {
      radius: 56,
      stroke: 9,
      size: 140,
      fontSize: "text-3xl",
      subSize: "text-xs",
    },
    md: {
      radius: 82,
      stroke: 12,
      size: 210,
      fontSize: "text-5xl",
      subSize: "text-sm",
    },
    lg: {
      radius: 104,
      stroke: 15,
      size: 270,
      fontSize: "text-6xl",
      subSize: "text-base",
    },
  }[size];

  // 240-degree radial gauge math (leaving 120-degree opening at bottom)
  const angle = 240;
  const circumference = 2 * Math.PI * dim.radius * (angle / 360);
  const progressOffset =
    circumference - (normalizedScore / 100) * circumference;

  // Simulated vector sub-metrics based on overall score
  const subMetrics = [
    {
      name: "Liability Exposure",
      score: Math.min(100, Math.round(normalizedScore * 1.05)),
      weight: "35%",
    },
    {
      name: "Restrictive Covenants",
      score: Math.min(100, Math.round(normalizedScore * 0.95)),
      weight: "30%",
    },
    {
      name: "IP Sovereignty",
      score: Math.min(100, Math.round(normalizedScore * 0.9)),
      weight: "20%",
    },
    {
      name: "Payment Defense",
      score: Math.min(100, Math.round(normalizedScore * 0.85)),
      weight: "15%",
    },
  ];

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center p-6 rounded-2xl border border-border/80 bg-card text-card-foreground shadow-sm backdrop-blur-md overflow-hidden transition-all",
        className,
      )}
    >
      {/* Subtle Background Glow corresponding to Risk Severity */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 size-48 rounded-full pointer-events-none blur-3xl opacity-20 transition-all duration-700"
        style={{ backgroundColor: tier.color }}
      />

      {/* SVG Radial Gauge Meter */}
      <div className="relative flex items-center justify-center">
        <svg
          width={dim.size}
          height={dim.size}
          viewBox={`0 0 ${dim.size} ${dim.size}`}
          className="rotate-150 transform transition-transform"
        >
          <defs>
            <linearGradient
              id={tier.gradientId}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={tier.gradientStart} />
              <stop offset="100%" stopColor={tier.gradientEnd} />
            </linearGradient>

            {/* Glowing filter */}
            <filter
              id="gauge-glow"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="3"
                floodColor={tier.color}
                floodOpacity="0.4"
              />
            </filter>
          </defs>

          {/* Background Track (Muted Grey / Dark) */}
          <circle
            cx={dim.size / 2}
            cy={dim.size / 2}
            r={dim.radius}
            fill="transparent"
            stroke="currentColor"
            className="text-muted/25"
            strokeWidth={dim.stroke}
            strokeDasharray={`${circumference} ${2 * Math.PI * dim.radius}`}
            strokeLinecap="round"
          />

          {/* Foreground Progress Arc with Dynamic Color Gradient */}
          <circle
            cx={dim.size / 2}
            cy={dim.size / 2}
            r={dim.radius}
            fill="transparent"
            stroke={`url(#${tier.gradientId})`}
            strokeWidth={dim.stroke}
            strokeDasharray={`${circumference} ${2 * Math.PI * dim.radius}`}
            strokeDashoffset={progressOffset}
            strokeLinecap="round"
            filter="url(#gauge-glow)"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Content: Numerical Score Counter */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pt-2">
          <div className="flex items-baseline justify-center">
            <span
              className={cn(
                dim.fontSize,
                "font-black font-mono tracking-tighter transition-colors duration-500",
              )}
              style={{ color: tier.color }}
            >
              {displayScore}
            </span>
            <span className="text-xs font-mono text-muted-foreground ml-0.5 opacity-70">
              /100
            </span>
          </div>

          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Risk Index
          </span>
        </div>
      </div>

      {/* Dynamic Severity Badge */}
      <div className="mt-4 flex flex-col items-center gap-2 text-center">
        <div
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold shadow-xs transition-colors",
            tier.bgBadge,
          )}
        >
          <TierIcon className="size-3.5 shrink-0" />
          <span>{ratingText}</span>
        </div>

        {predatoryCount !== undefined && predatoryCount > 0 && (
          <div className="flex items-center gap-1 text-[11px] font-mono font-medium text-rose-500 bg-rose-500/10 px-2.5 py-0.5 rounded-md border border-rose-500/20">
            <ShieldAlert className="size-3" />
            <span>
              {predatoryCount} Predatory Trap{predatoryCount > 1 ? "s" : ""}{" "}
              Flagged
            </span>
          </div>
        )}

        <p className="max-w-xs text-xs text-muted-foreground leading-relaxed mt-1">
          {tier.summary}
        </p>
      </div>

      {/* Optional Sub-Metric Factor Vectors (Liability, Covenants, IP, Payment) */}
      {showSubMetrics && size !== "sm" && (
        <div className="w-full mt-6 pt-4 border-t border-border/60 space-y-2.5">
          <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
            <span className="flex items-center gap-1">
              <TrendingUp className="size-3 text-purple-500" />
              <span>Vector Decomposition</span>
            </span>
            <span className="text-[10px] font-mono opacity-70 flex items-center gap-1">
              <Info className="size-2.5" />
              Weighted
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {subMetrics.map((sm) => (
              <div
                key={sm.name}
                className="p-2 rounded-lg bg-muted/40 border border-border/40 flex flex-col gap-1"
              >
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span className="truncate pr-1">{sm.name}</span>
                  <span className="font-mono text-[9px] opacity-60">
                    {sm.weight}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-full bg-muted-foreground/15 h-1.5 rounded-full overflow-hidden mr-2">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${sm.score}%`,
                        backgroundColor:
                          sm.score >= 70
                            ? "#f43f5e"
                            : sm.score >= 45
                              ? "#f59e0b"
                              : "#10b981",
                      }}
                    />
                  </div>
                  <span className="font-mono text-[11px] font-bold shrink-0">
                    {sm.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
