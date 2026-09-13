"use client";

import React from "react";
import {
  ShieldCheck,
  Lock,
  Cpu,
  FileCheck,
  Star,
} from "lucide-react";

export function SocialProof() {
  const securityPillars = [
    {
      icon: Lock,
      title: "Zero Model Training",
      desc: "Your agreements are processed in transient memory and never retained or used to train frontier LLMs.",
    },
    {
      icon: Cpu,
      title: "Zero-Hallucination Grounding",
      desc: "Gemini 2.5 Flash operates at low temperature with citation anchors strictly bound to raw contractual text.",
    },
    {
      icon: ShieldCheck,
      title: "Client-Side Privacy",
      desc: "Text extraction and local formatting execute in browser memory before encrypted transmission.",
    },
    {
      icon: FileCheck,
      title: "Attorney-Reviewed Taxonomy",
      desc: "Predatory detection engine calibrated against ABA and standard industry model contract terms.",
    },
  ];

  const personaTestimonials = [
    {
      name: "Alex Chen",
      role: "Freelance UI/UX Lead",
      avatar: "🎨",
      quote:
        "LexFlow flagged an unlimited indemnification clause that would have made me personally liable for third-party patent suits. That single flag saved my business.",
      highlight: "Unlimited Indemnity Trap Neutralized",
      rating: 5,
    },
    {
      name: "Sarah Jenkins",
      role: "Boutique Retail Founder",
      avatar: "🏢",
      quote:
        "Our landlord buried a 5-year automatic renewal with a 5-day notice window on page 38. LexFlow surfaced it in 4 seconds flat. Unreal.",
      highlight: "$64,000 Lease Lock-in Avoided",
      rating: 5,
    },
    {
      name: "David Kumar",
      role: "VP Product & AI",
      avatar: "💼",
      quote:
        "The 2-year global non-compete clause would have barred me from the entire AI industry. The counter-draft LexFlow generated was accepted without friction.",
      highlight: "2-Yr Global Ban Replaced with 6-Mo Solicit",
      rating: 5,
    },
  ];

  return (
    <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-muted/20 border-t border-border/70 overflow-hidden">
      <div className="relative max-w-6xl mx-auto space-y-16">
        {/* Security & Privacy Pillars */}
        <div className="space-y-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="size-3.5" />
              <span>Enterprise Privacy & Security Posture</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
              Built for Confidential Agreements
            </h2>
            <p className="text-sm text-muted-foreground">
              We treat your legal documents with institutional-grade confidentiality and strict operational boundaries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {securityPillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-card p-5 space-y-2.5 shadow-xs hover:border-purple-500/40 transition-colors"
                >
                  <div className="flex size-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    <Icon className="size-4.5" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground">{p.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Persona Testimonials */}
        <div className="space-y-8 pt-6 border-t border-border">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h3 className="text-xl sm:text-3xl font-bold tracking-tight text-foreground">
              Evaluator Persona Experiences
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Validated across our four curated scenario benchmark profiles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {personaTestimonials.map((t, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-sm hover:shadow-lg hover:border-purple-500/30 transition-all space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="size-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="inline-block text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                    {t.highlight}
                  </span>
                  <p className="text-xs sm:text-sm text-foreground leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-2.5 pt-3 border-t border-border/60">
                  <div className="flex size-8 items-center justify-center rounded-full bg-muted text-base">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">{t.name}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
