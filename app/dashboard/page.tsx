"use client";

import React, { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Sparkles,
  Search,
  UploadCloud,
  RefreshCw,
  ArrowLeft,
  FileText,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  Sliders,
  Layers,
} from "lucide-react";
import { useContract, StudioTab } from "@/lib/contract-context";
import { useAuth } from "@/lib/auth-context";
import { SAMPLE_CONTRACTS } from "@/lib/contracts-data";
import {
  StudioSidebar,
  StudioSidebarProvider,
  CustomSidebarTrigger,
} from "@/components/sidebar";
import { RiskScoreGauge } from "@/components/modules/risk-score-gauge";
import { RiskDistributionChart } from "@/components/modules/risk-distribution-chart";
import { PredatoryAlertCards } from "@/components/modules/predatory-alert-cards";
import { MarketFairnessCard } from "@/components/modules/market-fairness-card";
import { ClauseViewer } from "@/components/modules/clause-viewer";
import { ContractUploaderDialog } from "@/components/contract-uploader";
import { CommandMenu } from "@/components/command-menu";
import { AuthModal } from "@/components/auth-modal";
import { ThemeToggle } from "@/components/motion/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

function DashboardContent() {
  const searchParams = useSearchParams();
  const {
    activeContract,
    analysisResult,
    activeTab,
    setActiveTab,
    selectPresetContract,
    runAnalysis,
    isAnalyzing,
  } = useContract();
  const { user } = useAuth();

  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Sync URL search params
  useEffect(() => {
    const tabParam = searchParams.get("tab") as StudioTab | null;
    const contractParam = searchParams.get("contract");

    if (
      tabParam &&
      [
        "scanner",
        "compare",
        "chat",
        "negotiate",
        "handoff",
        "checklist",
      ].includes(tabParam)
    ) {
      setActiveTab(tabParam);
    }

    if (contractParam) {
      selectPresetContract(contractParam);
    }
  }, [searchParams, setActiveTab, selectPresetContract]);

  // Derived metrics from precomputed analysis or active contract
  const currentAnalysis = analysisResult || activeContract?.precomputedAnalysis;
  const score = currentAnalysis?.riskScore ?? 78;
  const rating = currentAnalysis?.riskRating ?? "Critical Risk";
  const clausesCount = currentAnalysis?.clauses?.length ?? 8;
  const predatoryCount =
    currentAnalysis?.predatoryCount ??
    currentAnalysis?.clauses?.filter((c) => c.predatoryFlag)?.length ??
    3;
  const wordCount = currentAnalysis?.wordCount ?? 1420;
  const fairnessText =
    currentAnalysis?.fairnessBenchmark ??
    "Severely Disadvantageous (32% parity)";

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Studio Collapsible Sidebar */}
      <StudioSidebar onUploadClick={() => setIsUploaderOpen(true)} />

      {/* Main Workspace Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Studio Top Control Header */}
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-border/70 bg-background/80 px-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <CustomSidebarTrigger />

            <div className="h-4 w-px bg-border/80 hidden sm:block" />

            {/* Contract Selector Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/40 px-2.5 py-1 text-xs font-medium hover:bg-muted transition-colors cursor-pointer">
                <FileText className="size-3.5 text-purple-600 dark:text-purple-400" />
                <span className="font-semibold text-foreground max-w-45 sm:max-w-70 truncate">
                  {activeContract?.title || "Custom Upload"}
                </span>
                <ChevronDown className="size-3 text-muted-foreground opacity-70" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-80">
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Switch Active Contract Preset
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {SAMPLE_CONTRACTS.map((contract) => (
                  <DropdownMenuItem
                    key={contract.id}
                    onClick={() => selectPresetContract(contract.id)}
                    className={cn(
                      "flex flex-col items-start gap-0.5 cursor-pointer py-2",
                      activeContract?.id === contract.id &&
                        "bg-muted/70 font-semibold",
                    )}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span className="text-xs truncate">{contract.title}</span>
                      <span
                        className={cn(
                          "text-[10px] font-mono px-1.5 py-0.2 rounded font-bold uppercase",
                          contract.precomputedAnalysis.riskScore >= 75
                            ? "bg-rose-500/15 text-rose-600 dark:text-rose-400"
                            : contract.precomputedAnalysis.riskScore >= 50
                              ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                              : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
                        )}
                      >
                        {contract.precomputedAnalysis.riskScore}/100
                      </span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      {contract.targetRole} ·{" "}
                      {(
                        contract.precomputedAnalysis.wordCount || 1000
                      ).toLocaleString()}{" "}
                      words
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Contract Type Pill */}
            <span className="hidden md:inline-flex items-center gap-1 rounded-full border border-purple-500/20 bg-purple-500/10 px-2 py-0.5 text-[10px] font-mono font-medium text-purple-600 dark:text-purple-400 uppercase">
              {activeContract?.type || "contract"}
            </span>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2">
            {/* ⌘K Command Palette Trigger */}
            <button
              type="button"
              onClick={() => setIsCommandOpen(true)}
              className="hidden lg:flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 px-2.5 py-1 text-xs text-muted-foreground hover:bg-muted/70 hover:text-foreground transition-colors cursor-pointer"
            >
              <Search className="size-3" />
              <span>Search contracts & tools</span>
              <kbd className="inline-flex items-center rounded border border-border/80 bg-background px-1 font-mono text-[9px]">
                ⌘K
              </kbd>
            </button>

            {/* Re-Analyze Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => runAnalysis()}
              disabled={isAnalyzing}
              className="h-8 gap-1.5 text-xs cursor-pointer border-border/70 hover:border-purple-500/40"
            >
              <RefreshCw
                className={cn(
                  "size-3.5 text-purple-600 dark:text-purple-400",
                  isAnalyzing && "animate-spin",
                )}
              />
              <span className="hidden sm:inline">
                {isAnalyzing ? "Auditing..." : "Re-Audit"}
              </span>
            </Button>

            {/* Upload Button */}
            <Button
              size="sm"
              onClick={() => setIsUploaderOpen(true)}
              className="h-8 gap-1.5 text-xs bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-xs cursor-pointer"
            >
              <UploadCloud className="size-3.5" />
              <span className="hidden sm:inline">Upload</span>
            </Button>

            <div className="h-4 w-px bg-border/80" />

            {/* Theme Toggle */}
            <ThemeToggle
              variant="rectangle"
              start="bottom-up"
              className="rounded-lg border border-border/60 bg-muted/40 p-1.5 hover:bg-muted transition-colors cursor-pointer"
              iconClassName="size-3.5"
            />

            {/* Persona Switcher Modal Trigger */}
            <AuthModal
              trigger={
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-muted/40 px-2 py-1 text-xs hover:bg-muted transition-colors cursor-pointer"
                  title="Switch Persona"
                >
                  <span className="text-sm">{user?.avatar || "⚖️"}</span>
                  <span className="hidden xl:inline text-xs font-medium text-foreground">
                    {user?.name.split(" ")[0] || "Evaluator"}
                  </span>
                </button>
              }
            />

            {/* Return to Home Landing */}
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                title="Return to Home Landing"
              >
                <ArrowLeft className="size-3.5 mr-1" />
                <span className="hidden md:inline">Home</span>
              </Button>
            </Link>
          </div>
        </header>

        {/* Tab Sub-Navigation Bar */}
        <div className="flex items-center gap-1 border-b border-border/60 bg-muted/15 px-4 py-1.5 overflow-x-auto text-xs">
          {[
            {
              id: "scanner",
              label: "Pillar 1: Risk Scanner",
              icon: ShieldAlert,
            },
            { id: "compare", label: "Pillar 2: Redline Diff", icon: Layers },
            { id: "chat", label: "Pillar 3: Grounded Chat", icon: Sparkles },
            {
              id: "negotiate",
              label: "Pillar 4: Negotiation Studio",
              icon: Sliders,
            },
            { id: "handoff", label: "Pillar 5: Lawyer Brief", icon: FileText },
            {
              id: "checklist",
              label: "Obligations Checklist",
              icon: CheckCircle2,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as StudioTab)}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-all cursor-pointer",
                  isActive
                    ? "bg-card text-foreground shadow-xs border border-border font-semibold dark:text-purple-400"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                )}
              >
                <Icon className="size-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Workspace Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {activeTab === "scanner" && (
            <div className="space-y-6 max-w-7xl mx-auto">
              {/* Document Overview Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-border/70 bg-card/50 backdrop-blur-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                      Live Legal Audit
                    </span>
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] text-muted-foreground font-mono">
                      Gemini 2.5 Flash Grounded
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-0.5">
                    {activeContract?.title || "Contract Legal Intelligence"}
                  </h1>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {activeContract?.description ||
                      "Autonomous analysis decomposing liability, restrictive covenants, IP ownership, and indemnification traps."}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-semibold text-foreground">
                      {clausesCount} Clauses Identified
                    </div>
                    <div className="text-[11px] text-muted-foreground font-mono">
                      {wordCount.toLocaleString()} words · Readability 11th Gr.
                    </div>
                  </div>
                </div>
              </div>

              {/* Task 20: 0–100 Quantitative Risk Score Radial Gauge & Executive Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Radial Gauge Card (Task 20 Spotlight) */}
                <div className="lg:col-span-5 flex flex-col">
                  <div className="h-full">
                    <RiskScoreGauge
                      score={score}
                      rating={rating}
                      predatoryCount={predatoryCount}
                      size="lg"
                      showSubMetrics={true}
                      className="h-full justify-between"
                    />
                  </div>
                </div>

                {/* Executive Summary & Key Highlights */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  {/* Summary Box */}
                  <div className="p-5 rounded-2xl border border-border/80 bg-card text-card-foreground shadow-xs">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="size-4 text-purple-500" />
                        <h2 className="text-sm font-semibold tracking-wide">
                          AI Auditor Executive Summary
                        </h2>
                      </div>
                      <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                        Confidence 98.4%
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {currentAnalysis?.executiveSummary ||
                        "This agreement exhibits significant structural asymmetries favoring the counterparty. Primary concerns involve indefinite post-termination restrictions, unilateral indemnity obligations without liability ceilings, and broad intellectual property capture reaching beyond deliverables."}
                    </p>

                    {/* Quick Metric Tiles */}
                    <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border/60">
                      <div className="p-2.5 rounded-xl bg-muted/40 border border-border/40">
                        <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                          Predatory Traps
                        </div>
                        <div className="text-lg font-bold font-mono text-rose-500 mt-0.5">
                          {predatoryCount}
                        </div>
                        <div className="text-[10px] text-rose-600/80 dark:text-rose-400/80 mt-0.5">
                          Requires redline
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-muted/40 border border-border/40">
                        <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                          Fairness Index
                        </div>
                        <div className="text-sm font-bold font-mono text-amber-500 mt-1 truncate">
                          {fairnessText}
                        </div>
                        <div className="text-[10px] text-amber-600/80 dark:text-amber-400/80 mt-0.5">
                          Market benchmark
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-muted/40 border border-border/40">
                        <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                          Total Clauses
                        </div>
                        <div className="text-lg font-bold font-mono text-foreground mt-0.5">
                          {clausesCount}
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">
                          100% Parsed
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations & Action Guidance */}
                  <div className="p-5 rounded-2xl border border-border/80 bg-card text-card-foreground shadow-xs flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                        <ShieldCheck className="size-3.5 text-emerald-500" />
                        <span>Key Contract Risks</span>
                      </h3>

                      <ul className="space-y-2 text-xs text-muted-foreground">
                        {currentAnalysis?.keyRisks
                          ?.slice(0, 3)
                          .map((risk: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono text-[10px] font-bold mt-0.5">
                                {idx + 1}
                              </span>
                              <span className="leading-snug">{risk}</span>
                            </li>
                          )) || (
                          <>
                            <li className="flex items-start gap-2">
                              <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 font-mono text-[10px] font-bold mt-0.5">
                                1
                              </span>
                              <span>
                                Strike out unlimited indemnification and replace
                                with a mutual 1x contract fee aggregate
                                liability cap.
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 font-mono text-[10px] font-bold mt-0.5">
                                2
                              </span>
                              <span>
                                Carve out personal pre-existing inventions and
                                tools from work-for-hire intellectual property
                                assignments.
                              </span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-4 mt-4 border-t border-border/60">
                      <Button
                        size="sm"
                        onClick={() => setActiveTab("negotiate")}
                        className="gap-1.5 text-xs bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white cursor-pointer"
                      >
                        <Sliders className="size-3.5" />
                        <span>Launch Negotiation Studio</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveTab("compare")}
                        className="gap-1.5 text-xs cursor-pointer border-border/70"
                      >
                        <Layers className="size-3.5" />
                        <span>Compare Counterparty Draft</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveTab("chat")}
                        className="gap-1.5 text-xs cursor-pointer border-border/70"
                      >
                        <Sparkles className="size-3.5" />
                        <span>Ask AI Copilot</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Task 22: Predatory Clause Radar & Landmine Alert Cards */}
              <PredatoryAlertCards
                clauses={currentAnalysis?.clauses}
                onNegotiateClause={() => setActiveTab("negotiate")}
              />

              {/* Task 21: Recharts Risk Category & Severity Distribution */}
              <RiskDistributionChart
                clauses={currentAnalysis?.clauses}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />

              {/* Task 23: Executive Summary & Market Fairness Benchmark Card */}
              <MarketFairnessCard
                score={Math.max(12, Math.round(100 - (currentAnalysis?.riskScore ?? 75) * 0.85))}
                fairnessBenchmark={currentAnalysis?.fairnessBenchmark}
                keyRisks={currentAnalysis?.keyRisks}
                keyObligations={currentAnalysis?.keyObligations}
                contractType={activeContract?.type}
              />

              {/* Task 24, 25, 26: Bilingual Clause-by-Clause Explorer with Audio & Filters */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      Bilingual Clause-by-Clause Explorer
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Compare original legalese side-by-side with 8th-grade plain English translations, listen via Web Speech narration, and filter by risk.
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20 self-start sm:self-auto font-semibold">
                    Phase 4 Fully Active & Integrated
                  </span>
                </div>

                <ClauseViewer
                  clauses={currentAnalysis?.clauses}
                  onNegotiateClause={() => setActiveTab("negotiate")}
                  selectedCategory={selectedCategory}
                />
              </div>
            </div>
          )}

          {activeTab !== "scanner" && (
            <div className="max-w-4xl mx-auto py-12 text-center space-y-4">
              <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400">
                <Sparkles className="size-7" />
              </div>
              <h2 className="text-xl font-bold text-foreground">
                {activeTab === "compare" &&
                  "Pillar 2: Bilateral Contract Redline & Diff Engine"}
                {activeTab === "chat" &&
                  "Pillar 3: Grounded Legal Copilot (RAG Chat)"}
                {activeTab === "negotiate" &&
                  "Pillar 4: Strategic Negotiation Studio"}
                {activeTab === "handoff" &&
                  "Pillar 5: 1-Page Attorney Consultation Brief"}
                {activeTab === "checklist" &&
                  "Interactive Obligations & Deadlines Checklist"}
              </h2>
              <p className="text-xs text-muted-foreground max-w-lg mx-auto">
                This pillar is queued in the master implementation roadmap. You
                can seamlessly switch to{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("scanner")}
                  className="text-purple-600 dark:text-purple-400 font-semibold underline underline-offset-2 cursor-pointer"
                >
                  Pillar 1: Risk Scanner
                </button>{" "}
                to interact with the live 0–100 Quantitative Risk Score Radial
                Gauge.
              </p>
              <div className="pt-2">
                <Button
                  size="sm"
                  onClick={() => setActiveTab("scanner")}
                  className="gap-2 text-xs bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white cursor-pointer"
                >
                  <ShieldAlert className="size-3.5" />
                  <span>Return to Risk Scanner</span>
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Interactive Modals & Command Palettes */}
      <ContractUploaderDialog
        open={isUploaderOpen}
        onOpenChange={setIsUploaderOpen}
      />
      <CommandMenu open={isCommandOpen} onOpenChange={setIsCommandOpen} />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <StudioSidebarProvider defaultOpen={true}>
      <Suspense
        fallback={
          <div className="flex h-screen w-full items-center justify-center bg-background text-muted-foreground">
            <div className="flex items-center gap-2">
              <RefreshCw className="size-4 animate-spin text-purple-600" />
              <span className="text-sm font-medium">
                Loading LexFlow Studio...
              </span>
            </div>
          </div>
        }
      >
        <DashboardContent />
      </Suspense>
    </StudioSidebarProvider>
  );
}
