"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scale, ArrowRight, Search } from "lucide-react";
import { ThemeToggle } from "@/components/motion/theme-toggle";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onOpenCommand?: () => void;
}

export function Navbar({ onOpenCommand }: NavbarProps) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center">
                <Scale className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight flex items-center gap-1.5 font-sans">
                LexFlow
                <span className="text-[10px] font-semibold tracking-wider px-1.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                  AI
                </span>
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground px-2.5 py-1 rounded-full bg-muted/50 border border-border/60">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-medium text-[11px]">Gemini 2.5 Flash</span>
            <span className="text-muted-foreground/40">•</span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              Live
            </span>
          </div>
        </div>

        {!isDashboard && (
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-muted-foreground">
            <Link
              href="/dashboard?tab=scanner"
              className="px-3 py-1.5 rounded-lg hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              Risk Scanner
            </Link>
            <Link
              href="/dashboard?tab=compare"
              className="px-3 py-1.5 rounded-lg hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              Contract Diff
            </Link>
            <Link
              href="/dashboard?tab=chat"
              className="px-3 py-1.5 rounded-lg hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              Grounded Chat
            </Link>
            <Link
              href="/dashboard?tab=negotiate"
              className="px-3 py-1.5 rounded-lg hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              Negotiator
            </Link>
            <Link
              href="/dashboard?tab=handoff"
              className="px-3 py-1.5 rounded-lg hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              Attorney Brief
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenCommand}
            className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground px-3 py-1.5 rounded-lg border border-border bg-muted/40 hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
            aria-label="Open command palette"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search or jump to...</span>
            <kbd className="pointer-events-none inline-flex h-4.5 select-none items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </button>

          <ThemeToggle
            variant="rectangle"
            start="bottom-up"
            className="rounded-lg border border-border bg-background p-2 hover:bg-muted transition-colors cursor-pointer"
            iconClassName="h-4 w-4"
          />

          {!isDashboard ? (
            <Link href="/dashboard">
              <Button
                size="sm"
                className="gap-2 font-medium bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-500/20 cursor-pointer"
              >
                <span>Launch Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          ) : (
            <Link href="/">
              <Button variant="outline" size="sm" className="cursor-pointer">
                Home
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
