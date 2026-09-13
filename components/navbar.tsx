"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scale, ArrowRight, Search } from "lucide-react";
import { ThemeToggle } from "@/components/motion/theme-toggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { AuthModal } from "@/components/auth-modal";

interface NavbarProps {
  onOpenCommand?: () => void;
}

export function Navbar({ onOpenCommand }: NavbarProps) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#101216]/90 backdrop-blur-xl text-white transition-all">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center size-9 rounded-xl bg-linear-to-br from-purple-600 via-indigo-600 to-blue-600 p-0.5 shadow-md shadow-purple-500/30 group-hover:scale-105 transition-transform">
              <div className="size-full bg-[#101216] rounded-[10px] flex items-center justify-center">
                <Scale className="size-5 text-purple-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight flex items-center gap-1.5 font-sans text-white">
                LexFlow
                <span className="text-[10px] font-semibold tracking-wider px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  AI
                </span>
              </span>
            </div>
          </Link>
        </div>

        {!isDashboard && (
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-white/70">
            <Link
              href="/dashboard?tab=scanner"
              className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors"
            >
              Risk Scanner
            </Link>
            <Link
              href="/dashboard?tab=compare"
              className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors"
            >
              Contract Diff
            </Link>
            <Link
              href="/dashboard?tab=chat"
              className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors"
            >
              Grounded Chat
            </Link>
            <Link
              href="/dashboard?tab=negotiate"
              className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors"
            >
              Negotiator
            </Link>
            <Link
              href="/dashboard?tab=handoff"
              className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors"
            >
              Attorney Brief
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenCommand}
            className="hidden sm:flex items-center gap-2 text-xs text-white/70 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            aria-label="Open command palette"
          >
            <Search className="size-3.5" />
            <span>Search or jump to...</span>
            <kbd className="pointer-events-none inline-flex h-4.5 select-none items-center gap-1 rounded border border-white/20 bg-white/10 px-1.5 font-mono text-[10px] font-medium text-white/80">
              ⌘K
            </kbd>
          </button>

          <ThemeToggle
            variant="rectangle"
            start="bottom-up"
            className="rounded-lg border border-white/10 bg-white/5 p-2 hover:bg-white/10 transition-colors cursor-pointer text-white"
            iconClassName="size-4"
          />

          {/* User Persona & Auth Trigger */}
          <AuthModal
            trigger={
              user ? (
                <button
                  type="button"
                  className="flex items-center gap-2 px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-xs font-medium cursor-pointer text-white"
                  title="Switch Evaluator Persona"
                >
                  <span className="text-base leading-none">{user.avatar}</span>
                  <span className="hidden lg:inline text-white/90">
                    {user.name.split(" ")[0]}
                  </span>
                </button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer border-white/20 text-white hover:bg-white/10"
                >
                  Sign In
                </Button>
              )
            }
          />

          {!isDashboard ? (
            <Link href="/dashboard">
              <Button
                size="sm"
                className="gap-2 font-medium bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-500/25 cursor-pointer"
              >
                <span>Launch Studio</span>
                <ArrowRight className="size-3.5" />
              </Button>
            </Link>
          ) : (
            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer border-white/20 text-white hover:bg-white/10"
              >
                Home
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
