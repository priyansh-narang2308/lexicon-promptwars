"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldAlert,
  GitCompare,
  MessageSquareText,
  PenTool,
  FileText,
  CheckSquare,
  FileCode,
  User,
  SunMoon,
  Home,
  ShieldCheck,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { SAMPLE_CONTRACTS, USER_PERSONAS } from "@/lib/contracts-data";
import { useTheme } from "next-themes";

interface CommandMenuProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSelectContract?: (contractId: string) => void;
  onSelectPersona?: (personaId: string) => void;
}

export function CommandMenu({
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  onSelectContract,
  onSelectPersona,
}: CommandMenuProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setTheme, theme } = useTheme();

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : open;

  const handleOpenChange = (nextOpen: boolean) => {
    if (isControlled && setControlledOpen) {
      setControlledOpen(nextOpen);
    } else {
      setOpen(nextOpen);
    }
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleOpenChange(!isOpen);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const runCommand = (command: () => void) => {
    handleOpenChange(false);
    command();
  };

  return (
    <CommandDialog open={isOpen} onOpenChange={handleOpenChange}>
      <CommandInput placeholder="Type a command, module, contract, or persona..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {/* Studio Modules */}
        <CommandGroup heading="Studio Modules">
          <CommandItem
            onSelect={() =>
              runCommand(() => router.push("/dashboard?tab=scanner"))
            }
          >
            <ShieldAlert className="mr-2 h-4 w-4 text-rose-500" />
            <span>Risk Scanner & Plain-English</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => router.push("/dashboard?tab=compare"))
            }
          >
            <GitCompare className="mr-2 h-4 w-4 text-indigo-500" />
            <span>Bilateral Contract Redline (Diff)</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => router.push("/dashboard?tab=chat"))
            }
          >
            <MessageSquareText className="mr-2 h-4 w-4 text-emerald-500" />
            <span>Grounded Legal Copilot (RAG Chat)</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => router.push("/dashboard?tab=negotiate"))
            }
          >
            <PenTool className="mr-2 h-4 w-4 text-amber-500" />
            <span>Negotiation & Counter-Offers</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => router.push("/dashboard?tab=handoff"))
            }
          >
            <FileText className="mr-2 h-4 w-4 text-blue-500" />
            <span>Attorney Consultation Brief</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => router.push("/dashboard?tab=checklist"))
            }
          >
            <CheckSquare className="mr-2 h-4 w-4 text-purple-500" />
            <span>Obligations & Deadlines Tracker</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Preset Contracts */}
        <CommandGroup heading="Preset Sample Contracts">
          {SAMPLE_CONTRACTS.map((contract) => (
            <CommandItem
              key={contract.id}
              onSelect={() =>
                runCommand(() => {
                  if (onSelectContract) {
                    onSelectContract(contract.id);
                  }
                  router.push(`/dashboard?contract=${contract.id}&tab=scanner`);
                })
              }
            >
              <FileCode className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{contract.title}</span>
              <span className="ml-auto text-xs text-muted-foreground font-mono">
                {contract.type}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        {/* Personas */}
        <CommandGroup heading="Evaluator Personas">
          {USER_PERSONAS.map((p) => (
            <CommandItem
              key={p.id}
              onSelect={() =>
                runCommand(() => {
                  if (onSelectPersona) {
                    onSelectPersona(p.id);
                  }
                  router.push(
                    `/dashboard?contract=${p.suggestedContractId}&tab=scanner`,
                  );
                })
              }
            >
              <User className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>
                {p.avatar} {p.name} — {p.role}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        {/* Quick Actions */}
        <CommandGroup heading="System & Actions">
          <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
            <Home className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Go to Landing Page</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => setTheme(theme === "dark" ? "light" : "dark"))
            }
          >
            <SunMoon className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Toggle Dark / Light Theme</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                const el = document.getElementById("legal-disclaimer");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              })
            }
          >
            <ShieldCheck className="mr-2 h-4 w-4 text-emerald-500" />
            <span>Legal Disclaimer & Ethics Statement</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
