"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { USER_PERSONAS } from "@/lib/contracts-data";
import { useAuth } from "@/lib/auth-context";
import {
  Sparkles,
  ArrowRight,
  UserCheck,
  ShieldCheck,
  Mail,
} from "lucide-react";

interface AuthModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  defaultTab?: "personas" | "email";
}

export function AuthModal({
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  trigger,
  defaultTab = "personas",
}: AuthModalProps) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"personas" | "email">(defaultTab);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { loginWithPersona, loginWithCustomEmail, loginAsGuest } = useAuth();
  const router = useRouter();

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : open;

  const handleOpenChange = (nextOpen: boolean) => {
    if (isControlled && setControlledOpen) {
      setControlledOpen(nextOpen);
    } else {
      setOpen(nextOpen);
    }
  };

  const handlePersonaSelect = (personaId: string, contractId: string) => {
    loginWithPersona(personaId);
    handleOpenChange(false);
    router.push(`/dashboard?contract=${contractId}&tab=scanner`);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    loginWithCustomEmail(name || email.split("@")[0], email);
    handleOpenChange(false);
    router.push("/dashboard");
  };

  const handleGuestSubmit = () => {
    loginAsGuest();
    handleOpenChange(false);
    router.push("/dashboard");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {trigger && (
        <DialogTrigger render={React.isValidElement(trigger) ? trigger : undefined} className="cursor-pointer">
          {React.isValidElement(trigger) ? undefined : trigger}
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-130 p-6">
        <DialogHeader className="text-left space-y-2">
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              PromptWars Evaluator & Member Access
            </span>
          </div>
          <DialogTitle className="text-2xl font-bold tracking-tight">
            Welcome to LexFlow AI Studio
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Test pre-loaded legal scenarios instantly with 1-click personas, or
            sign in with your custom credentials.
          </DialogDescription>
        </DialogHeader>

        {/* Tab Switcher */}
        <div className="flex rounded-lg bg-muted p-1 gap-1 my-3">
          <button
            type="button"
            onClick={() => setActiveTab("personas")}
            className={`flex-1 text-xs py-2 rounded-md font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "personas"
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            <span>1-Click Evaluator Personas</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("email")}
            className={`flex-1 text-xs py-2 rounded-md font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "email"
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Custom Sign In</span>
          </button>
        </div>

        {/* Tab 1: 1-Click Personas (Hackathon Optimization) */}
        {activeTab === "personas" && (
          <div className="space-y-3 py-1">
            <p className="text-xs text-muted-foreground">
              Select a persona to immediately jump into pre-configured contract
              analysis:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {USER_PERSONAS.map((persona) => (
                <button
                  key={persona.id}
                  type="button"
                  onClick={() =>
                    handlePersonaSelect(persona.id, persona.suggestedContractId)
                  }
                  className="p-3 text-left rounded-xl border border-border/70 hover:border-purple-500/50 hover:bg-purple-500/5 bg-card transition-all group flex flex-col justify-between cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-2xl">{persona.avatar}</span>
                    <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-muted text-muted-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      1-Click
                    </span>
                  </div>
                  <div className="mt-2">
                    <h4 className="text-sm font-semibold text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {persona.name}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {persona.role}
                    </p>
                    <p className="text-[11px] text-muted-foreground/80 mt-1 line-clamp-2">
                      {persona.scenario}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
              <span>Evaluating live with automated bot?</span>
              <button
                type="button"
                onClick={handleGuestSubmit}
                className="font-medium text-purple-600 dark:text-purple-400 hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>Continue as Guest</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Custom Sign In */}
        {activeTab === "email" && (
          <form onSubmit={handleEmailSubmit} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="auth-name" className="text-xs">
                Full Name
              </Label>
              <Input
                id="auth-name"
                type="text"
                placeholder="e.g. Maya Lin"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="auth-email" className="text-xs">
                Email Address
              </Label>
              <Input
                id="auth-email"
                type="email"
                placeholder="you@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-sm"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white cursor-pointer"
            >
              <UserCheck className="w-4 h-4 mr-2" />
              <span>Enter LexFlow Studio</span>
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
