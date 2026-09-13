"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Info, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function LegalDisclaimerBanner() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem("lexflow_disclaimer_dismissed");
    if (isDismissed === "true") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem("lexflow_disclaimer_dismissed", "true");
  };

  if (dismissed) {
    return null;
  }

  return (
    <aside
      aria-label="Legal Assistance Notice"
      className="bg-[#0b0d11] border-b border-white/5 px-4 py-1.5 text-xs text-white/75 transition-all"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex size-1.5 rounded-full bg-amber-400 shrink-0 animate-pulse" />
          <p className="leading-snug text-[11px] sm:text-xs text-white/70">
            <span className="font-semibold text-white/90">Legal Assistance Notice:</span>{" "}
            LexFlow AI provides informational contract intelligence, not formal attorney legal advice.
          </p>
          <LegalDetailsModal />
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          className="p-1 hover:bg-white/10 rounded-md transition-colors text-white/40 hover:text-white cursor-pointer"
          aria-label="Dismiss notice"
        >
          <X className="size-3" />
        </button>
      </div>
    </aside>
  );
}

export function LegalDetailsModal() {
  return (
    <Dialog>
      <DialogTrigger className="underline underline-offset-2 hover:text-amber-950 dark:hover:text-amber-100 font-medium inline-flex items-center gap-1 cursor-pointer transition-colors">
        <Info className="w-3 h-3" />
        <span>Full Disclaimer</span>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            Legal Notice & Ethical Guardrails
          </DialogTitle>
          <DialogDescription className="text-left text-sm space-y-3 pt-2">
            <p>
              LexFlow AI is an educational and document-review copilot
              engineered to improve legal literacy, uncover hidden contractual
              hazards, and streamline legal negotiations.
            </p>
            <p>
              <strong>Key Principles:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted-foreground">
              <li>
                <strong>No Attorney-Client Privilege:</strong> Interacting with
                LexFlow AI does not establish formal legal representation.
              </li>
              <li>
                <strong>Informational Guidance:</strong> Risk scores,
                plain-English translations, and redline suggestions are
                algorithmic assessments based on fair-market templates.
              </li>
              <li>
                <strong>Professional Counsel:</strong> For high-stakes
                contracts, major real-estate purchases, or active litigation, we
                encourage using our <em>Lawyer Handoff Kit</em> to consult a
                licensed legal professional in your jurisdiction.
              </li>
            </ul>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
