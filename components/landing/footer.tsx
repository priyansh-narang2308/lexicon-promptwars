"use client";

import React from "react";
import Link from "next/link";
import { Scale, Sparkles, ShieldCheck, Heart } from "lucide-react";

export function LandingFooter() {
  return (
    <footer
      id="legal-disclaimer"
      className="relative w-full border-t border-border bg-card/60 backdrop-blur-md text-foreground py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Top Section: Brand & Navigation Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-linear-to-br from-purple-600 to-indigo-600 text-white shadow-xs">
                <Scale className="size-4.5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                LexFlow <span className="text-purple-600 dark:text-purple-400">AI</span>
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Autonomous Legal Intelligence & Contract Risk Studio powered by Google Gemini 2.5 Flash.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[11px] font-mono font-semibold">
              <Sparkles className="size-3" />
              <span>Hack2Skill PromptWars</span>
            </div>
          </div>

          {/* Col 2: Studio Modules */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-foreground">
              Studio Modules
            </p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/dashboard?tab=scanner" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Risk Scanner & Plain-English
                </Link>
              </li>
              <li>
                <Link href="/dashboard?tab=compare" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Bilateral Contract Redline Diff
                </Link>
              </li>
              <li>
                <Link href="/dashboard?tab=chat" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Grounded Legal Copilot (RAG)
                </Link>
              </li>
              <li>
                <Link href="/dashboard?tab=negotiate" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Strategic Negotiation Studio
                </Link>
              </li>
              <li>
                <Link href="/dashboard?tab=handoff" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  1-Page Attorney Brief Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Evaluator Scenarios */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-foreground">
              Preset Scenarios
            </p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/dashboard?contract=freelance-design-msa&tab=scanner" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Freelance MSA (Alex Chen)
                </Link>
              </li>
              <li>
                <Link href="/dashboard?contract=commercial-triple-net-lease&tab=scanner" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Commercial Lease (Sarah Jenkins)
                </Link>
              </li>
              <li>
                <Link href="/dashboard?contract=executive-employment-agreement&tab=scanner" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Exec Non-Compete (David Kumar)
                </Link>
              </li>
              <li>
                <Link href="/dashboard?contract=enterprise-saas-msa&tab=scanner" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Enterprise SaaS MSA (Marcus Vance)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Engine & System */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-foreground">
              Architecture & Engine
            </p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono">Google Gemini 2.5 Flash</span>
              </li>
              <li>
                <span className="font-mono">Next.js 16.3 + Turbopack</span>
              </li>
              <li>
                <span className="font-mono">Tailwind CSS v4 + Base UI</span>
              </li>
              <li>
                <span className="font-mono">Zero Hallucination Grounding</span>
              </li>
              <li>
                <span className="font-mono">Repo Footprint: &lt; 10 MB</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Ethical Legal Notice Statement */}
        <div className="p-4 sm:p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 space-y-2">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold">
            <ShieldCheck className="size-4 shrink-0" />
            <span>Ethical Legal AI Statement & Regulatory Boundaries</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            LexFlow AI is an autonomous informational analysis tool designed to deconstruct legal jargon, benchmark terms against standard industry provisions, and prepare structured documentation for attorney consultation. LexFlow AI is <strong>not a law firm</strong> and does not provide legal advice or create an attorney-client relationship. Users should review high-stakes agreements with certified legal counsel before signing.
          </p>
        </div>

        {/* Bottom Bar: Copyright & Hackathon Submission Metadata */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border/60 text-xs text-muted-foreground font-mono">
          <p>
            © {new Date().getFullYear()} LexFlow AI — PromptWars Virtual (Exclusive Edition).
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Built for <Heart className="size-3 text-rose-500 fill-rose-500" /> PromptWars Virtual
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
