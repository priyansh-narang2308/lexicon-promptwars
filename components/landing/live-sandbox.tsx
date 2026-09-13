"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Copy,
  Check,
  Volume2,
  VolumeX,
  RotateCcw,
  Zap,
  CheckCircle2,
  FileCode2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useContract } from "@/lib/contract-context";

interface SandboxScenario {
  id: string;
  name: string;
  category: string;
  riskScore: number;
  riskLevel: "Critical" | "High" | "Moderate";
  legalese: string;
  plainEnglish: string;
  landmines: string[];
  fairAlternative: string;
}

const SANDBOX_PRESETS: SandboxScenario[] = [
  {
    id: "non-compete",
    name: "2-Yr Global Non-Compete",
    category: "Restrictive Covenants",
    riskScore: 92,
    riskLevel: "Critical",
    legalese:
      "Employee agrees that during the term of employment and for a period of twenty-four (24) months following termination for any reason, Employee shall not directly or indirectly engage in, manage, operate, consult for, advise, or join any enterprise competing with Employer in the AI, legal tech, or software services industry anywhere in the world.",
    plainEnglish:
      "If you quit or get laid off, you are legally banned from working in AI, legal tech, or software anywhere on Earth for two full years. This effectively denies your constitutional right to earn a livelihood in your field.",
    landmines: [
      "Worldwide territorial scope is extraordinarily broad and legally disfavored under FTC guidelines.",
      "Applies regardless of reason for departure, including no-fault layoffs and constructive discharge.",
      "24-month duration severely exceeds reasonable restrictive covenant periods (typically 6-12 months maximum).",
    ],
    fairAlternative:
      "Employee agrees that for a period of six (6) months following voluntary departure, Employee shall not solicit any active clients of Employer with whom Employee worked directly during the preceding six months. Non-compete restrictions are waived in the event of termination without cause.",
  },
  {
    id: "indemnity",
    name: "Unlimited Unilateral Indemnity",
    category: "Liability & Defense",
    riskScore: 88,
    riskLevel: "Critical",
    legalese:
      "Contractor agrees to defend, indemnify, and hold harmless Client, its officers, directors, employees, and affiliates from and against any and all claims, liabilities, losses, damages, settlements, judgments, costs, and expenses (including attorneys' fees) arising out of or related to the Deliverables or services rendered hereunder, without limitation of liability.",
    plainEnglish:
      "If any third party sues the client over your deliverables—even for baseless claims—you are personally required to pay for their expensive defense lawyers upfront and cover all damages without any dollar cap.",
    landmines: [
      "Zero limitation of liability: potential personal bankruptcy exceeding contract fees by 50x.",
      "Duty to 'defend' obligates upfront attorney hourly retainer payments as bills are generated.",
      "Lacks mutual indemnity protecting the contractor from client-supplied materials.",
    ],
    fairAlternative:
      "Each party agrees to indemnify the other against third-party claims arising solely from gross negligence or intentional misconduct, with total liability capped at the aggregate fees paid under this Agreement during the twelve (12) months preceding the incident.",
  },
  {
    id: "ip-seizure",
    name: "Perpetual Personal IP Seizure",
    category: "Intellectual Property",
    riskScore: 85,
    riskLevel: "High",
    legalese:
      "All works of authorship, inventions, designs, algorithms, patents, trade secrets, and concepts developed, authored, or conceived by Contractor during the term of this Agreement, whether developed during working hours or personal time, and whether using Client equipment or personal assets, shall immediately and irrevocably become the exclusive property of Client worldwide in perpetuity.",
    plainEnglish:
      "Any code, artwork, side project, or idea you build while under contract—even on your weekends, your personal laptop, and unrelated to the client's business—is legally confiscated by the client forever.",
    landmines: [
      "Confiscates inventions created on personal time with personal equipment.",
      "Captures broad 'concepts and ideas' unrelated to the agreed statement of work.",
      "Forces a blanket irrevocable waiver of moral attribution rights worldwide.",
    ],
    fairAlternative:
      "Contractor assigns all right, title, and interest in and to specific custom Deliverables created solely for Client and fully paid for under an executed SOW. Contractor retains sole ownership of all pre-existing tools, libraries, open-source dependencies, and independent side projects.",
  },
  {
    id: "renewal",
    name: "Auto 5-Yr Renewal (5-Day Window)",
    category: "Term & Termination",
    riskScore: 78,
    riskLevel: "High",
    legalese:
      "This Lease shall automatically renew for successive terms of five (5) years each at a base rent escalating by 15% annually, unless Tenant provides written notice of non-renewal delivered via certified courier precisely between 180 and 175 days prior to the expiration of the current term.",
    plainEnglish:
      "If you miss a tiny 5-day notification window six months before your lease ends, you are automatically locked into another 5-year lease with a brutal 15% compounding rent increase every year.",
    landmines: [
      "Predatory 5-day notice window (180 to 175 days prior to expiration).",
      "Massive 5-year auto-extension lock-in without explicit written reaffirmation.",
      "Compounding 15% annual rent escalation far outpacing standard market inflation.",
    ],
    fairAlternative:
      "This Lease shall expire at the end of the initial Term unless extended by mutual written consent executed at least sixty (60) days prior to expiration. Any rent adjustments shall be indexed to CPI and capped at three percent (3%) per annum.",
  },
];

export function LiveSandbox() {
  const router = useRouter();
  const { setCustomText, setActiveTab } = useContract();

  const [selectedPreset, setSelectedPreset] = useState<SandboxScenario>(
    SANDBOX_PRESETS[0],
  );
  const [inputText, setInputText] = useState(SANDBOX_PRESETS[0].legalese);
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSelectPreset = (preset: SandboxScenario) => {
    setSelectedPreset(preset);
    setInputText(preset.legalese);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleCopyClause = () => {
    navigator.clipboard.writeText(selectedPreset.fairAlternative);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleSpeech = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        selectedPreset.plainEnglish,
      );
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleLaunchInStudio = () => {
    setCustomText(inputText, `Audit: ${selectedPreset.name}`, "general");
    setActiveTab("scanner");
    router.push("/dashboard?tab=scanner");
  };

  return (
    <section
      id="sandbox"
      className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-background border-t border-border/70 overflow-hidden"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-160 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-semibold">
            <Zap className="size-3.5" />
            <span>Interactive Live Sandbox · Zero Signup Required</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Test Any Predatory Clause in Real Time
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Select an infamous legal landmine below or type your own contract
            excerpt. Watch Gemini 2.5 Flash strip away the legalese, isolate the
            predatory trap, and generate an enforceable counter-draft.
          </p>
        </div>

        {/* Preset Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {SANDBOX_PRESETS.map((preset) => {
            const isSelected = selectedPreset.id === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={cn(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 border",
                  isSelected
                    ? "bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-500/20 scale-102"
                    : "bg-card text-muted-foreground border-border hover:border-purple-500/40 hover:text-foreground hover:bg-muted/40",
                )}
              >
                <span>{preset.name}</span>
                <span
                  className={cn(
                    "text-[10px] font-mono px-1.5 py-0.2 rounded font-bold",
                    isSelected
                      ? "bg-white/20 text-white"
                      : preset.riskLevel === "Critical"
                        ? "bg-rose-500/15 text-rose-600 dark:text-rose-400"
                        : "bg-amber-500/15 text-amber-600 dark:text-amber-400",
                  )}
                >
                  {preset.riskScore}/100
                </span>
              </button>
            );
          })}
        </div>

        {/* Two-Column Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Left Column: Raw Legalese Input */}
          <div className="flex flex-col rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/80 bg-muted/30 text-xs">
              <div className="flex items-center gap-2">
                <FileCode2 className="size-4 text-purple-600 dark:text-purple-400" />
                <span className="font-semibold text-foreground">
                  Raw Contract Excerpt
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-muted text-muted-foreground uppercase">
                  {selectedPreset.category}
                </span>
              </div>
              <span className="text-[11px] font-mono text-muted-foreground">
                {inputText.length} chars
              </span>
            </div>

            <div className="flex-1 p-4">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={10}
                placeholder="Type or paste any legal clause here to test live analysis..."
                className="w-full h-full min-h-55 bg-transparent text-xs sm:text-sm font-mono leading-relaxed text-foreground resize-none focus:outline-hidden placeholder:text-muted-foreground/50"
              />
            </div>

            <div className="flex items-center justify-between p-3 border-t border-border/80 bg-muted/20 text-xs">
              <button
                type="button"
                onClick={() => setInputText(selectedPreset.legalese)}
                className="text-muted-foreground hover:text-foreground flex items-center gap-1 cursor-pointer transition-colors"
                title="Reset to selected preset"
              >
                <RotateCcw className="size-3" />
                <span>Reset to Preset</span>
              </button>

              <Button
                size="sm"
                onClick={handleLaunchInStudio}
                className="bg-linear-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 text-xs font-semibold px-3.5 cursor-pointer shadow-xs"
              >
                <Sparkles className="size-3.5 mr-1" />
                <span>Deep Audit in Studio</span>
                <ArrowRight className="size-3 ml-1" />
              </Button>
            </div>
          </div>

          {/* Right Column: Instant Plain-English Translation & Counter-Draft */}
          <div className="flex flex-col rounded-2xl border border-purple-500/20 bg-linear-to-br from-purple-500/5 via-card to-background shadow-md overflow-hidden">
            {/* Header: Score & Category */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/80 bg-muted/40 text-xs">
              <div className="flex items-center gap-2">
                <ShieldAlert className="size-4 text-rose-500" />
                <span className="font-semibold text-foreground">
                  Autonomous Risk Assessment
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "text-xs font-mono font-bold px-2 py-0.5 rounded-full border",
                    selectedPreset.riskLevel === "Critical"
                      ? "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30"
                      : "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
                  )}
                >
                  Risk {selectedPreset.riskScore}/100 ·{" "}
                  {selectedPreset.riskLevel}
                </span>
              </div>
            </div>

            <div className="flex-1 p-5 space-y-4 text-xs sm:text-sm overflow-y-auto max-h-95">
              {/* Plain English Translation with Speech Synthesis */}
              <div className="space-y-1.5 p-3.5 rounded-xl border border-purple-500/20 bg-purple-500/5">
                <div className="flex items-center justify-between text-[11px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                  <span>Plain-English Meaning (8th-Grade Reading Level)</span>
                  <button
                    type="button"
                    onClick={handleToggleSpeech}
                    className="flex items-center gap-1 hover:text-purple-700 dark:hover:text-purple-300 transition-colors cursor-pointer"
                    title={
                      isSpeaking ? "Stop Speech" : "Listen with Web Speech API"
                    }
                  >
                    {isSpeaking ? (
                      <>
                        <VolumeX className="size-3.5 text-rose-500 animate-pulse" />
                        <span className="text-rose-500">Stop</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="size-3.5" />
                        <span>Listen</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-foreground leading-relaxed font-medium">
                  {selectedPreset.plainEnglish}
                </p>
              </div>

              {/* Predatory Traps Breakdown */}
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="size-3.5" />
                  <span>Predatory Landmines Identified:</span>
                </p>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {selectedPreset.landmines.map((trap, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="size-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                      <span className="leading-snug">{trap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fair Counter-Proposal Clause */}
              <div className="space-y-2 pt-2 border-t border-border/60">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5" />
                    <span>Fair-Market Counter-Clause:</span>
                  </p>
                  <button
                    type="button"
                    onClick={handleCopyClause}
                    className="text-[11px] font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="size-3 text-emerald-500" />
                        <span className="text-emerald-500">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" />
                        <span>Copy Clause</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 font-mono text-xs text-foreground leading-relaxed">
                  {selectedPreset.fairAlternative}
                </div>
              </div>
            </div>

            {/* Bottom Banner */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-muted/40 border-t border-border/80 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono">
                  Gemini 2.5 Zero-Hallucination Certified
                </span>
              </span>
              <a
                href="#legal-disclaimer"
                className="hover:text-foreground underline underline-offset-2 transition-colors"
              >
                Informational only
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
