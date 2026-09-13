/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  FileText,
  Upload,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  FileCode,
  Layers,
  ArrowRight,
  Clock,
  BookOpen,
  Hash,
  ShieldAlert,
  FileUp,
} from "lucide-react";
import { useContract } from "@/lib/contract-context";
import { ContractType } from "@/lib/types";
import { SAMPLE_CONTRACTS } from "@/lib/contracts-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Sample test clauses for quick evaluator testing
const TEST_CLAUSES = [
  {
    label: "2-Yr Non-Compete",
    clause:
      "\n\nSECTION 9. NON-COMPETE RESTRICTION: Employee shall not directly or indirectly engage in, manage, operate, consult for, or join any entity competing in the AI or legal technologies industry anywhere globally for a period of twenty-four (24) months following termination.",
  },
  {
    label: "Unlimited Indemnity",
    clause:
      "\n\nSECTION 14. INDEMNIFICATION: Consultant agrees to defend, indemnify, and hold harmless Client from any and all claims, liabilities, losses, damages, and legal fees arising out of the Deliverables, without cap or limitation of liability.",
  },
  {
    label: "Total IP Seizure",
    clause:
      "\n\nSECTION 6. INTELLECTUAL PROPERTY: All inventions, code, designs, algorithms, and concepts conceived or authored by Contractor during the term of this Agreement, whether during work hours or personal time, shall be the sole and exclusive property of Client in perpetuity.",
  },
  {
    label: "Auto 5-Yr Renewal",
    clause:
      "\n\nSECTION 11. TERM & AUTOMATIC RENEWAL: This Lease shall automatically renew for additional successive five (5) year terms unless Tenant provides written cancellation notice via certified courier precisely between 180 and 175 days prior to expiration.",
  },
];

interface ContractUploaderProps {
  onSuccess?: () => void;
  className?: string;
}

export function ContractUploader({
  onSuccess,
  className,
}: ContractUploaderProps) {
  const {
    customContractText,
    contractTitle,
    contractType,
    setCustomText,
    runAnalysis,
    selectPresetContract,
    isAnalyzing,
    activeContract,
    setActiveTab,
  } = useContract();

  const [activeMode, setActiveMode] = useState<"type" | "upload" | "preset">(
    "type",
  );
  const [localTitle, setLocalTitle] = useState(contractTitle);
  const [localType, setLocalType] = useState<ContractType>(contractType);
  const [localText, setLocalText] = useState(customContractText);
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync with context if active contract changes
  useEffect(() => {
    setLocalTitle(contractTitle);
    setLocalType(contractType);
    setLocalText(customContractText);
  }, [contractTitle, contractType, customContractText]);

  // Document metrics
  const charCount = localText.length;
  const wordCount = localText.trim() ? localText.trim().split(/\s+/).length : 0;
  const readingTimeMin = Math.max(1, Math.ceil(wordCount / 225));
  const estimatedTokens = Math.round(wordCount * 1.33);

  // Text change handler
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setLocalText(text);
    setCustomText(text, localTitle, localType);
  };

  // Title change handler
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setLocalTitle(title);
    setCustomText(localText, title, localType);
  };

  // Type change handler
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value as ContractType;
    setLocalType(type);
    setCustomText(localText, localTitle, type);
  };

  // Clear editor for live typing
  const handleClear = () => {
    setLocalText("");
    setLocalTitle("Custom Agreement");
    setFileName(null);
    setCustomText("", "Custom Agreement", localType);
    textareaRef.current?.focus();
  };

  // Insert a test clause on the fly
  const handleInsertClause = (clause: string) => {
    const updated = (localText ? localText.trimEnd() : "") + clause;
    setLocalText(updated);
    setCustomText(updated, localTitle, localType);
  };

  // Execute Gemini Analysis
  const handleAnalyze = async () => {
    if (!localText.trim()) return;
    setCustomText(localText, localTitle, localType);
    await runAnalysis(localText, localType);
    setActiveTab("scanner");
    if (onSuccess) onSuccess();
  };

  // Keyboard shortcut: Cmd/Ctrl + Enter to trigger analysis
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleAnalyze();
    }
  };

  // File upload processing
  const handleFileDrop = (file: File) => {
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = (event.target?.result as string) || "";
      const derivedTitle = file.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]/g, " ");
      setLocalText(content);
      setLocalTitle(derivedTitle);
      setCustomText(content, derivedTitle, localType);
      setActiveMode("type");
    };
    reader.readAsText(file);
  };

  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border border-border bg-card shadow-lg overflow-hidden transition-all",
        className,
      )}
    >
      {/* Top Bar: Tabs & Quick Metrics */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 bg-muted/40 px-4 py-3 sm:px-6">
        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-1 rounded-xl bg-background/80 p-1 border border-border/60">
          <button
            type="button"
            onClick={() => setActiveMode("type")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer",
              activeMode === "type"
                ? "bg-purple-600 text-white shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
            )}
          >
            <FileText className="size-3.5" />
            <span>Type or Paste</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode("upload")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer",
              activeMode === "upload"
                ? "bg-purple-600 text-white shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
            )}
          >
            <Upload className="size-3.5" />
            <span>Upload File</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode("preset")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer",
              activeMode === "preset"
                ? "bg-purple-600 text-white shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
            )}
          >
            <Layers className="size-3.5" />
            <span>Presets ({SAMPLE_CONTRACTS.length})</span>
          </button>
        </div>

        {/* Real-time Document Statistics */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
          <div className="flex items-center gap-1" title="Word count">
            <BookOpen className="size-3 text-purple-500" />
            <span>{wordCount.toLocaleString()} words</span>
          </div>
          <div
            className="hidden sm:flex items-center gap-1"
            title="Character count"
          >
            <Hash className="size-3 text-indigo-500" />
            <span>{charCount.toLocaleString()} chars</span>
          </div>
          <div
            className="hidden sm:flex items-center gap-1"
            title="Estimated reading time"
          >
            <Clock className="size-3 text-emerald-500" />
            <span>~{readingTimeMin} min read</span>
          </div>
          <div className="flex items-center gap-1" title="Estimated LLM tokens">
            <Sparkles className="size-3 text-amber-500" />
            <span>~{estimatedTokens.toLocaleString()} tokens</span>
          </div>
        </div>
      </div>

      {/* Main Body per Mode */}
      <div className="p-4 sm:p-6 space-y-4">
        {/* Mode 1: Live Type / Paste Editor */}
        {activeMode === "type" && (
          <div className="space-y-4">
            {/* Metadata Inputs: Title & Contract Category */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Contract Title / Description
                </label>
                <input
                  type="text"
                  value={localTitle}
                  onChange={handleTitleChange}
                  placeholder="e.g. Freelance Design Master Services Agreement"
                  className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Document Category
                </label>
                <select
                  value={localType}
                  onChange={handleTypeChange}
                  className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all cursor-pointer"
                >
                  <option value="freelance">Freelance / Contractor MSA</option>
                  <option value="lease">Commercial Lease Agreement</option>
                  <option value="employment">Employment & Non-Compete</option>
                  <option value="saas">Enterprise SaaS / B2B</option>
                  <option value="nda">Mutual Non-Disclosure (NDA)</option>
                  <option value="general">General Commercial / Custom</option>
                </select>
              </div>
            </div>

            {/* Quick Sample Landmine Inserters (Zero-prefill testing) */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1">
                <ShieldAlert className="size-3 text-rose-500" />
                <span>Inject Predatory Trap:</span>
              </span>
              {TEST_CLAUSES.map((tc) => (
                <button
                  key={tc.label}
                  type="button"
                  onClick={() => handleInsertClause(tc.clause)}
                  className="px-2 py-1 rounded-md text-[11px] font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 transition-all cursor-pointer active:scale-95"
                >
                  + {tc.label}
                </button>
              ))}
              <button
                type="button"
                onClick={handleClear}
                className="ml-auto text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 cursor-pointer transition-colors"
                title="Clear editor to test live typing"
              >
                <RotateCcw className="size-3" />
                <span>Clear</span>
              </button>
            </div>

            <div className="relative rounded-xl border border-border bg-muted/15 focus-within:ring-2 focus-within:ring-purple-500/40 focus-within:border-purple-500 transition-all overflow-hidden">
              <textarea
                ref={textareaRef}
                value={localText}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown}
                rows={12}
                placeholder="Paste or type contract clauses here... You can also click the quick-inject pills above to test predatory terms directly. Press ⌘+Enter to scan."
                className="w-full p-4 bg-transparent text-foreground text-xs sm:text-sm font-mono leading-relaxed resize-y focus:outline-hidden placeholder:text-muted-foreground/60"
              />
              <div className="flex items-center justify-between px-3 py-1.5 bg-muted/40 border-t border-border/50 text-[11px] text-muted-foreground">
                <span>Markdown & plain-text legalese supported</span>
                <span className="font-mono">Press ⌘+Enter to Run Audit</span>
              </div>
            </div>
          </div>
        )}

        {/* Mode 2: File Upload (Drag and Drop) */}
        {activeMode === "upload" && (
          <div className="space-y-4">
            <input
              type="file"
              ref={fileInputRef}
              accept=".txt,.md,.json,.pdf"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileDrop(file);
              }}
            />

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const file = e.dataTransfer.files?.[0];
                if (file) handleFileDrop(file);
              }}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "flex flex-col items-center justify-center gap-3 p-10 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center",
                dragOver
                  ? "border-purple-500 bg-purple-500/10 scale-[0.99]"
                  : "border-border hover:border-purple-500/60 hover:bg-muted/30",
              )}
            >
              <div className="size-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <FileUp className="size-7" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">
                  Click to browse or drag and drop contract file
                </p>
                <p className="text-xs text-muted-foreground">
                  Supported formats: Plain Text (.txt), Markdown (.md), JSON
                  (.json), or PDF
                </p>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">
                Client-side encrypted · 0 data saved without consent
              </span>
            </div>

            {fileName && (
              <div className="flex items-center justify-between p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-500" />
                  <span className="text-xs font-semibold text-foreground">
                    {fileName}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    ({wordCount} words loaded)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveMode("type")}
                  className="text-xs text-purple-600 hover:text-purple-500 font-medium underline"
                >
                  View in Editor
                </button>
              </div>
            )}
          </div>
        )}

        {activeMode === "preset" && (
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Select one of our four production-grade scenarios calibrated to
              evaluate high-risk clauses against real-world standard terms:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SAMPLE_CONTRACTS.map((c) => {
                const isCurrent = activeContract?.id === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      selectPresetContract(c.id);
                      setActiveMode("type");
                    }}
                    className={cn(
                      "flex flex-col items-start text-left p-3.5 rounded-xl border transition-all cursor-pointer group",
                      isCurrent
                        ? "border-purple-500 bg-purple-500/5 shadow-xs"
                        : "border-border hover:border-border/80 hover:bg-muted/40",
                    )}
                  >
                    <div className="flex items-center justify-between w-full mb-1.5">
                      <span className="text-xs font-semibold text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {c.title}
                      </span>
                      <span
                        className={cn(
                          "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                          c.precomputedAnalysis.riskScore >= 80
                            ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                            : "bg-amber-500/10 text-amber-600 dark:text-amber-400",
                        )}
                      >
                        Risk {c.precomputedAnalysis.riskScore}/100
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2 leading-relaxed">
                      {c.description}
                    </p>
                    <div className="flex items-center gap-2 mt-auto text-[10px] text-muted-foreground font-mono">
                      <span className="px-1.5 py-0.5 rounded bg-muted uppercase">
                        {c.type}
                      </span>
                      <span>Target: {c.targetRole}</span>
                      <span className="ml-auto text-purple-600 dark:text-purple-400 font-semibold group-hover:underline flex items-center gap-0.5">
                        Load <ArrowRight className="size-2.5" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/80">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[11px]">
              Gemini 2.5 Flash Engine Online
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleClear}
              disabled={!localText}
              className="text-xs cursor-pointer"
            >
              Reset Text
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleAnalyze}
              disabled={!localText.trim() || isAnalyzing}
              className="bg-linear-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 text-xs font-semibold px-4 cursor-pointer shadow-md shadow-purple-500/20"
            >
              {isAnalyzing ? (
                <>
                  <div className="size-3.5 border-2 border-white border-t-transparent rounded-full animate-spin mr-1.5" />
                  Auditing Clauses...
                </>
              ) : (
                <>
                  <Sparkles className="size-3.5 mr-1.5" />
                  Run Gemini 2.5 Risk Audit
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Modal Wrapper for Contract Uploader (triggered by sidebar or navbar buttons)
 */
export function ContractUploaderDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background border-border">
        <DialogHeader className="p-4 sm:p-6 pb-2">
          <DialogTitle className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
            <FileCode className="size-5 text-purple-600 dark:text-purple-400" />
            <span>Analyze New Contract</span>
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
            Type or paste custom contract text, drag-and-drop a file, or choose
            from our 4 preset scenarios.
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 sm:p-6 pt-0">
          <ContractUploader onSuccess={() => onOpenChange(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
