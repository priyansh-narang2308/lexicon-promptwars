"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Button } from "@/components/ui/button";
import { useContract, StudioTab } from "@/lib/contract-context";
import { useAuth } from "@/lib/auth-context";
import { SAMPLE_CONTRACTS, USER_PERSONAS } from "@/lib/contracts-data";
import { cn } from "@/lib/utils";
import {
  Scale,
  Sparkles,
  Search,
  RotateCcw,
  FileCode2,
  ShieldAlert,
  GitCompare,
  MessageSquareText,
  PenTool,
  FileText,
  CheckSquare,
  XIcon,
  CheckIcon,
  CommandIcon,
  ShieldCheckIcon,
  LogOutIcon,
} from "lucide-react";

export interface StudioSidebarProps {
  className?: string;
  onUploadClick?: () => void;
}

/**
 * AI Legal Safety Trust Card
 */
function GeminiSafetyWidget() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={cn(
        "rounded-xl group/safety size-full min-h-24 justify-center border border-purple-500/20 bg-linear-to-br from-purple-500/5 via-indigo-500/5 to-transparent",
        "relative flex size-full flex-col gap-1 overflow-hidden p-3 *:text-nowrap",
        "transition-opacity group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:opacity-0",
      )}
    >
      <div className="flex items-center gap-1.5">
        <Sparkles className="size-3 text-purple-500" />
        <span className="font-mono text-[10px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
          Gemini 2.5 Flash
        </span>
      </div>
      <p className="font-semibold text-xs text-foreground">
        Zero-Hallucination
      </p>
      <span className="text-[10px] text-muted-foreground whitespace-normal leading-tight">
        Grounded citations strictly anchored in raw contract text.
      </span>
      <div className="pt-1">
        <a
          href="#legal-disclaimer"
          className="text-[10px] font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 underline underline-offset-2 transition-colors"
        >
          Informational only · Not legal advice
        </a>
      </div>
      <Button
        className="absolute top-2 right-2 z-10 size-5 rounded-full opacity-0 transition-opacity group-hover/safety:opacity-100"
        onClick={() => setIsOpen(false)}
        size="icon-sm"
        variant="ghost"
        aria-label="Dismiss trust badge"
      >
        <XIcon className="size-3 text-muted-foreground" />
      </Button>
    </div>
  );
}

/**
 * Evaluator Persona Switcher Menu
 */
function EvaluatorPersonaMenu() {
  const { user, loginWithPersona, logout } = useAuth();
  const { selectPresetContract } = useContract();

  const handleSwitchPersona = (personaId: string) => {
    loginWithPersona(personaId);
    const persona = USER_PERSONAS.find((p) => p.id === personaId);
    if (persona?.suggestedContractId) {
      selectPresetContract(persona.suggestedContractId);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex w-full items-center gap-2 rounded-lg p-1.5 text-left text-sm transition-colors hover:bg-muted outline-hidden cursor-pointer"
        aria-label="User account menu"
      >
        <Avatar className="size-8 rounded-lg border border-border">
          <AvatarFallback className="rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold text-xs">
            {user?.avatar || user?.name?.charAt(0) || "👤"}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-xs leading-tight group-data-[collapsible=icon]:hidden">
          <span className="truncate font-semibold text-foreground">
            {user?.name || "Evaluator"}
          </span>
          <span className="truncate text-[10px] text-muted-foreground">
            {user?.role || "Tester"}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="flex items-center gap-2.5 p-2">
          <Avatar className="size-9 rounded-lg border border-border">
            <AvatarFallback className="rounded-lg bg-purple-500/15 text-purple-600 dark:text-purple-400 font-bold text-sm">
              {user?.avatar || "👤"}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-xs leading-tight min-w-0">
            <span className="truncate font-semibold text-foreground">
              {user?.name || "Evaluator"}
            </span>
            <span className="truncate text-[10px] text-muted-foreground font-mono">
              {user?.email || "evaluator@hack2skill.com"}
            </span>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          Switch Evaluator Persona
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          {USER_PERSONAS.map((p) => {
            const isCurrent = user?.id === p.id || user?.personaId === p.id;
            return (
              <DropdownMenuItem
                key={p.id}
                onClick={() => handleSwitchPersona(p.id)}
                className="flex items-center justify-between text-xs cursor-pointer py-1.5"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="text-sm">{p.avatar}</span>
                  <div className="truncate text-left">
                    <p className="font-medium truncate">{p.name}</p>
                    <p className="text-[10px] text-muted-foreground truncate">
                      {p.role}
                    </p>
                  </div>
                </div>
                {isCurrent && (
                  <CheckIcon className="size-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              const event = new KeyboardEvent("keydown", {
                key: "k",
                metaKey: true,
              });
              document.dispatchEvent(event);
            }}
            className="text-xs cursor-pointer"
          >
            <CommandIcon className="size-3.5 text-muted-foreground" />
            <span>Command Palette</span>
            <span className="ml-auto text-[10px] font-mono text-muted-foreground">
              ⌘K
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              const el = document.getElementById("legal-disclaimer");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-xs cursor-pointer"
          >
            <ShieldCheckIcon className="size-3.5 text-emerald-500" />
            <span>Legal Disclaimer & Ethics</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={logout}
          variant="destructive"
          className="text-xs cursor-pointer"
        >
          <LogOutIcon className="size-3.5" />
          <span>Reset Session</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * StudioSidebar — High-performance collapsible legal studio sidebar powered by shadcn / base-ui.
 */
export function StudioSidebar({
  className,
  onUploadClick,
}: StudioSidebarProps) {
  const {
    activeTab,
    setActiveTab,
    activeContract,
    contractTitle,
    analysisResult,
    selectPresetContract,
    resetWorkspace,
  } = useContract();
  const router = useRouter();
  const pathname = usePathname();

  const handleTabClick = (tabId: StudioTab) => {
    setActiveTab(tabId);
    if (pathname !== "/dashboard") {
      router.push(`/dashboard?tab=${tabId}`);
    }
  };

  const handleContractSelect = (contractId: string) => {
    selectPresetContract(contractId);
    if (pathname !== "/dashboard") {
      router.push(`/dashboard?contract=${contractId}&tab=scanner`);
    }
  };

  const triggerCommandMenu = () => {
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);
  };

  const intelligenceModules = [
    {
      id: "scanner" as StudioTab,
      title: "Risk Scanner",
      icon: ShieldAlert,
      badge: analysisResult?.predatoryCount
        ? `${analysisResult.predatoryCount} Traps`
        : undefined,
      badgeClass:
        "bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/20",
    },
    {
      id: "compare" as StudioTab,
      title: "Bilateral Redline",
      icon: GitCompare,
      badge: "Redline",
      badgeClass:
        "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20",
    },
    {
      id: "chat" as StudioTab,
      title: "Grounded Chat",
      icon: MessageSquareText,
      badge: "RAG",
      badgeClass:
        "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
    },
    {
      id: "negotiate" as StudioTab,
      title: "Negotiation Studio",
      icon: PenTool,
    },
    {
      id: "handoff" as StudioTab,
      title: "Attorney Brief",
      icon: FileText,
      badge: "1-Page",
      badgeClass:
        "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/20",
    },
    {
      id: "checklist" as StudioTab,
      title: "Obligations Tracker",
      icon: CheckSquare,
      badge: analysisResult?.actionChecklist
        ? `${analysisResult.actionChecklist.filter((c) => c.completed).length}/${analysisResult.actionChecklist.length}`
        : undefined,
      badgeClass:
        "bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/20",
    },
  ];

  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
      className={cn("border-r border-border", className)}
    >
      {/* Brand Header */}
      <SidebarHeader className="h-14 justify-center border-b border-border/50 px-3">
        <SidebarMenuButton
          tooltip="LexFlow AI — Home"
          onClick={() => router.push("/")}
          className="h-10 hover:bg-muted/80 transition-colors"
        >
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-purple-600 via-indigo-600 to-blue-600 text-white shadow-xs shadow-purple-500/20">
            <Scale className="size-4" />
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-bold text-sm tracking-tight text-foreground">
                LexFlow{" "}
                <span className="text-purple-600 dark:text-purple-400">AI</span>
              </span>
              <span className="rounded bg-purple-500/10 px-1 py-0.5 text-[9px] font-mono font-semibold text-purple-600 dark:text-purple-400">
                v2.5
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground font-mono">
              Legal Intelligence
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent>
        {/* Quick Action Bar */}
        <SidebarGroup className="pb-1">
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              onClick={() => {
                if (onUploadClick) {
                  onUploadClick();
                } else {
                  handleTabClick("scanner");
                }
              }}
              className="min-w-8 bg-linear-to-r from-purple-600 to-indigo-600 text-white font-medium duration-200 ease-linear hover:from-purple-700 hover:to-indigo-700 hover:text-white shadow-xs shadow-purple-500/20 active:scale-98"
              tooltip="Analyze Contract"
            >
              <Sparkles className="size-4 shrink-0" />
              <span className="truncate">Analyze Contract</span>
            </SidebarMenuButton>

            <Button
              aria-label="Quick search (Cmd+K)"
              className="size-8 group-data-[collapsible=icon]:opacity-0 transition-opacity hover:bg-muted cursor-pointer shrink-0"
              size="icon"
              variant="outline"
              onClick={triggerCommandMenu}
              title="Search commands (⌘K)"
            >
              <Search className="size-3.5 text-muted-foreground" />
              <span className="sr-only">Quick search</span>
            </Button>
          </SidebarMenuItem>
        </SidebarGroup>

        {/* Active Contract Widget */}
        <SidebarGroup className="py-1">
          <div className="group-data-[collapsible=icon]:hidden rounded-xl border border-border/80 bg-muted/30 p-2.5 space-y-2">
            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
              <span className="font-semibold uppercase tracking-wider">
                Active Contract
              </span>
              <button
                type="button"
                onClick={resetWorkspace}
                className="hover:text-foreground flex items-center gap-1 cursor-pointer transition-colors"
                title="Reset to default preset"
              >
                <RotateCcw className="size-2.5" />
                <span>Reset</span>
              </button>
            </div>

            <div className="flex items-start gap-2">
              <FileCode2 className="size-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p
                  className="text-xs font-semibold text-foreground truncate"
                  title={contractTitle}
                >
                  {contractTitle}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-muted text-muted-foreground uppercase">
                    {activeContract?.type || "custom"}
                  </span>
                  {analysisResult && (
                    <span
                      className={cn(
                        "text-[10px] font-semibold flex items-center gap-1",
                        analysisResult.riskScore >= 75
                          ? "text-rose-500"
                          : analysisResult.riskScore >= 50
                            ? "text-amber-500"
                            : "text-emerald-500",
                      )}
                    >
                      <span className="size-1.5 rounded-full bg-current" />
                      Risk: {analysisResult.riskScore}/100
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </SidebarGroup>

        {/* Intelligence Modules */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
            Intelligence Modules
          </SidebarGroupLabel>
          <SidebarMenu>
            {intelligenceModules.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={isActive}
                    onClick={() => handleTabClick(item.id)}
                    tooltip={item.title}
                    className={cn(
                      "cursor-pointer text-xs transition-colors",
                      isActive &&
                        "bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold border border-purple-500/20",
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-4 shrink-0 transition-transform group-hover:scale-110",
                        isActive
                          ? "text-purple-600 dark:text-purple-400"
                          : "text-muted-foreground",
                      )}
                    />
                    <span className="truncate">{item.title}</span>
                  </SidebarMenuButton>
                  {item.badge && (
                    <SidebarMenuBadge
                      className={cn(
                        "text-[10px] font-mono leading-none",
                        item.badgeClass,
                      )}
                    >
                      {item.badge}
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        {/* Preset Sample Contracts */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
            Sample Scenarios
          </SidebarGroupLabel>
          <SidebarMenu>
            {SAMPLE_CONTRACTS.map((contract) => {
              const isSelected = activeContract?.id === contract.id;
              return (
                <SidebarMenuItem key={contract.id}>
                  <SidebarMenuButton
                    isActive={isSelected}
                    onClick={() => handleContractSelect(contract.id)}
                    tooltip={`${contract.title} (${contract.targetRole})`}
                    className={cn(
                      "cursor-pointer text-xs flex flex-col items-start h-auto py-1.5",
                      isSelected &&
                        "bg-muted font-medium text-foreground border border-border/80",
                    )}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <FileCode2
                        className={cn(
                          "size-3.5 shrink-0",
                          isSelected
                            ? "text-purple-600 dark:text-purple-400"
                            : "text-muted-foreground",
                        )}
                      />
                      <span className="truncate text-xs font-normal">
                        {contract.title}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground pl-5.5 truncate">
                      {contract.targetRole}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50 p-2 space-y-2">
        <GeminiSafetyWidget />
        <EvaluatorPersonaMenu />
      </SidebarFooter>
    </Sidebar>
  );
}

/**
 * Custom trigger with keyboard shortcut tooltip (⌘B)
 */
export function CustomSidebarTrigger() {
  return (
    <Tooltip>
      <TooltipTrigger delay={1000} render={<SidebarTrigger />} />
      <TooltipContent className="px-2 py-1" side="right">
        Toggle Sidebar{" "}
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>b</Kbd>
        </KbdGroup>
      </TooltipContent>
    </Tooltip>
  );
}

/**
 * StudioSidebarProvider — Wraps sidebar with provider
 */
export function StudioSidebarProvider({
  children,
  className,
  defaultOpen = true,
}: {
  children: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
}) {
  return (
    <SidebarProvider defaultOpen={defaultOpen} className={className}>
      {children}
    </SidebarProvider>
  );
}

// Re-export for backward compatibility
export { StudioSidebar as AppSidebar };
