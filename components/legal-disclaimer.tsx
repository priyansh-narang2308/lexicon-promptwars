"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, ShieldCheck, Info, X } from "lucide-react";
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
    return (
      <div className="bg-primary/5 border-b border-primary/10 py-1 px-4 text-xs flex items-center justify-between transition-colors">
        <div className="flex items-center gap-2 text-muted-foreground mx-auto">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>
            <strong>Legal Assistance Notice:</strong> Informational assistance
            only. Not formal attorney legal advice.
          </span>
          <LegalDetailsModal />
        </div>
      </div>
    );
  }

  return (
    <aside
      aria-label="Legal Assistance Notice"
      className="bg-amber-500/10 dark:bg-amber-950/30 border-b border-amber-500/20 px-4 py-2 text-xs text-amber-900 dark:text-amber-200 transition-all"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <p className="leading-snug">
            <strong className="font-semibold">Important Legal Notice:</strong>{" "}
            LexFlow AI provides intelligent document analysis and negotiation
            guidance for informational purposes. It does not establish an
            attorney-client relationship.
          </p>
          <LegalDetailsModal />
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          className="p-1 hover:bg-amber-500/20 rounded-md transition-colors text-amber-700 dark:text-amber-300"
          aria-label="Dismiss legal notice"
        >
          <X className="w-3.5 h-3.5" />
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
