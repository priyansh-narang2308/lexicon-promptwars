"use client";

import React from "react";
import {
  ShieldAlert,
  GitCompare,
  MessageSquareText,
  PenTool,
  FileText,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export function BentoGrid() {
  return (
    <section
      id="features"
      className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-background border-t border-border/70 overflow-hidden"
    >
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(168,85,247,0.08),rgba(255,255,255,0))] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-semibold">
            <Sparkles className="size-3.5" />
            <span>Autonomous Intelligence Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            Five Pillars of Legal Intelligence
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            From uncovering predatory landmines to redlining counterparty terms and arming your attorney with a 1-page executive brief, LexFlow manages every dimension of contract risk.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Multi-Vector Risk Scanner (Span 2 cols on md) */}
          <div className="md:col-span-2 group relative flex flex-col justify-between rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-purple-500/40 transition-all duration-300 overflow-hidden">
            <div className="absolute -right-20 -top-20 size-72 rounded-full bg-rose-500/5 blur-[80px] pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500 border border-rose-500/20">
                  <ShieldAlert className="size-5.5" />
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                  Pillar 01
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  Multi-Vector Risk Scanner & Plain-English Engine
                </h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  Scans agreements against hundreds of unfair terms, flags predatory traps with quantitative 0–100 risk scoring, and translates legalese into 8th-grade conversational English.
                </p>
              </div>

              {/* Interactive Mock Visual */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="rounded-xl border border-border/80 bg-muted/40 p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-muted-foreground uppercase text-[10px] tracking-wider">
                      Original Legalese
                    </span>
                    <span className="text-[10px] font-mono text-rose-500 font-bold">
                      Trap Detected
                    </span>
                  </div>
                  <p className="font-mono text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                    &ldquo;Contractor unconditionally waives all rights of attribution and assigns all future inventions created on personal time...&rdquo;
                  </p>
                </div>

                <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-purple-600 dark:text-purple-400 uppercase text-[10px] tracking-wider">
                      Plain-English Breakdown
                    </span>
                    <span className="text-[10px] font-mono text-emerald-500 font-bold">
                      8th-Grade Level
                    </span>
                  </div>
                  <p className="text-xs text-foreground font-medium line-clamp-3 leading-relaxed">
                    What this actually means: The client legally owns everything you create on your weekends, your personal laptop, forever.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <Link
                href="/dashboard?tab=scanner"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform"
              >
                <span>Launch Risk Scanner</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Bilateral Contract Redline (1 col) */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-indigo-500/40 transition-all duration-300 overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                  <GitCompare className="size-5.5" />
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  Pillar 02
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-foreground">
                  Bilateral Contract Redline & Diff
                </h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  Compare your template against counterparty revisions with visual delta highlighting and risk shift analytics.
                </p>
              </div>

              {/* Redline Snippet Visual */}
              <div className="rounded-xl border border-border/80 bg-muted/30 p-3 space-y-1.5 font-mono text-xs">
                <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  <span>+</span>
                  <span className="truncate">Mutual 30-day notice added</span>
                </div>
                <div className="flex items-center gap-1 text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                  <span>-</span>
                  <span className="truncate line-through">Unlimited IP indemnification</span>
                </div>
                <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                  <span>~</span>
                  <span className="truncate">Liability cap shifted to 1x fees</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/dashboard?tab=compare"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform"
              >
                <span>Explore Bilateral Diff</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Grounded Legal Copilot (1 col) */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <MessageSquareText className="size-5.5" />
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Pillar 03
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-foreground">
                  Grounded Legal Copilot (RAG)
                </h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  Ask plain questions and get exact, clause-cited answers. Zero speculation or generic answers—strictly anchored in your agreement.
                </p>
              </div>

              {/* Chat Snippet Visual */}
              <div className="rounded-xl border border-border/80 bg-muted/30 p-3 space-y-2 text-xs">
                <div className="rounded-lg bg-background p-2 text-foreground font-medium text-[11px] border border-border/50">
                  &ldquo;Can I consult for competitors on weekends?&rdquo;
                </div>
                <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-2 text-emerald-800 dark:text-emerald-300 text-[11px] leading-relaxed">
                  <strong>No.</strong> Section 9 strictly prohibits any tech advisory globally. <span className="font-mono underline">[§9.1 Non-Compete]</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/dashboard?tab=chat"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform"
              >
                <span>Ask Copilot</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 4: Strategic Negotiation Studio (1 col) */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-amber-500/40 transition-all duration-300 overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  <PenTool className="size-5.5" />
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  Pillar 04
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-foreground">
                  Strategic Negotiation Studio
                </h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  Generates fair, enforceable counter-proposals with balanced market language and complete negotiation email scripts.
                </p>
              </div>

              {/* Counter-Clause Tiers Visual */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-muted/40 border border-border">
                  <span className="font-semibold text-foreground">Aggressive Pushback</span>
                  <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400">Total Strike</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <span className="font-semibold text-purple-700 dark:text-purple-300">Balanced Compromise</span>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">Recommended</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/dashboard?tab=negotiate"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform"
              >
                <span>Draft Counter-Terms</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 5: Attorney Brief & Obligations Tracker (Span 2 cols on md) */}
          <div className="md:col-span-2 group relative flex flex-col justify-between rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-all duration-300 overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
                  <FileText className="size-5.5" />
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  Pillar 05
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  1-Page Attorney Brief & Obligations Tracker
                </h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  Exports a structured 1-page executive brief with prioritized questions for legal counsel, reducing lawyer discovery billing by up to 70%. Tracks key renewal windows and obligations.
                </p>
              </div>

              {/* Brief Visual */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="rounded-xl border border-border/80 bg-muted/30 p-3.5 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase text-blue-600 dark:text-blue-400">
                    Attorney Brief Highlights
                  </span>
                  <p className="text-xs text-foreground font-semibold">
                    Top 5 Questions for Legal Counsel
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Prioritizes jurisdiction loopholes, indemnification caps, and IP assignment exemptions so your $350/hr lawyer starts at minute 50, not minute 0.
                  </p>
                </div>

                <div className="rounded-xl border border-border/80 bg-muted/30 p-3.5 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase text-purple-600 dark:text-purple-400">
                    Obligations Checklist
                  </span>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 text-foreground">
                      <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                      <span>Notice of Non-Renewal (180-Day Window)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-foreground">
                      <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                      <span>Quarterly IP Disclosure Documentation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/dashboard?tab=handoff"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform"
              >
                <span>View Attorney Brief</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
