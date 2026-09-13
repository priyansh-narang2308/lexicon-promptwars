/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, type ReactNode } from "react";
import { MediaGlobe } from "./media-globe";
import { ScaleFrame } from "./scale-frame";
import { ArrowRight, ShieldAlert, Scale, Search } from "lucide-react";
import { ThemeToggle } from "@/components/motion/theme-toggle";
import { AuthModal } from "@/components/auth-modal";
import { useAuth } from "@/lib/auth-context";
import { CommandMenu } from "@/components/command-menu";
import { LegalDisclaimerBanner } from "@/components/legal-disclaimer";

const A = "/originkit/hero-24";

const HELVETICA = '"Helvetica Neue", Helvetica, Arial, sans-serif';

const PHONE_QUERY = "(max-width: 639px)";
const TABLET_QUERY = "(min-width: 640px) and (max-width: 1023px)";
const DESKTOP_QUERY = "(min-width: 1024px)";

const NAV_LINKS = [
  { name: "Features", href: "#features" },
  { name: "Live Sandbox", href: "#sandbox" },
  { name: "Risk Scanner", href: "/dashboard?tab=scanner" },
  { name: "Redline Diff", href: "/dashboard?tab=compare" },
  { name: "ROI Calculator", href: "#calculator" },
];

const REVEAL = "animate-hero-reveal";
const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

const Backdrop = ({ src, className }: { src: string; className: string }) => (
  <img
    alt=""
    aria-hidden
    className={`pointer-events-none absolute left-0 top-0 h-full min-h-screen w-full max-w-none object-cover ${className}`}
    src={`${A}/${src}`}
  />
);

const LaunchButton = ({
  className,
  href = "/dashboard",
  text = "Launch Studio Free",
}: {
  className: string;
  href?: string;
  text?: string;
}) => (
  <a
    href={href}
    className={`relative flex shrink-0 cursor-pointer items-center justify-center rounded-[999px] transition-all duration-200 hover:scale-102 hover:opacity-95 shadow-[0_0_30px_rgba(168,85,247,0.35)] ${className}`}
  >
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[999px]"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(90deg, rgb(147, 51, 234) 0%, rgb(79, 70, 229) 100%)",
      }}
    />
    <p className="relative shrink-0 whitespace-nowrap text-[15px] font-semibold leading-[1.15] tracking-[-0.32px] text-white flex items-center gap-1.5">
      <span>{text}</span>
      <ArrowRight className="size-4" />
    </p>
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_1px_0px_rgba(255,255,255,0.4),inset_0px_-1.5px_0px_0px_rgba(0,0,0,0.2)]" />
  </a>
);

const EDGE_FADE = {
  left: "linear-gradient(to right, transparent 0%, #000 18%, #000 100%)",
  right: "linear-gradient(to left, transparent 0%, #000 18%, #000 100%)",
} as const;

const HAND_SLIDE = {
  left: "animate-hand-slide-in-left",
  right: "animate-hand-slide-in-right",
} as const;

const HandCutout = ({
  box,
  mask,
  maskSize,
  image,
  from,
  step,
}: {
  box: string;
  mask: string;
  maskSize: string;
  image: string;
  from: "left" | "right";
  step: number;
}) => (
  <div
    className={`absolute ${HAND_SLIDE[from]} ${box}`}
    style={{
      ...delay(step),
      maskImage: `url("${A}/${mask}"), ${EDGE_FADE[from]}`,
      WebkitMaskImage: `url("${A}/${mask}"), ${EDGE_FADE[from]}`,
      maskMode: "alpha",
      maskComposite: "intersect",
      WebkitMaskComposite: "source-in",
      maskRepeat: "no-repeat",
      WebkitMaskRepeat: "no-repeat",
      maskSize: `${maskSize}, 100% 100%`,
      WebkitMaskSize: `${maskSize}, 100% 100%`,
    }}
  >
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <img
        alt=""
        className={`absolute max-w-none ${image}`}
        src={`${A}/hands.png`}
      />
    </div>
  </div>
);

const GlassCard = ({
  className,
  plate,
  step,
  children,
}: {
  className: string;
  plate: string;
  step: number;
  children: ReactNode;
}) => (
  <div
    style={delay(step)}
    className={`absolute ${REVEAL} flex flex-col items-start overflow-clip border-solid border-[rgba(255,255,255,0.15)] backdrop-blur-md ${className}`}
  >
    <div
      className={`absolute h-[166px] w-[301px] -translate-x-1/2 -translate-y-1/2 blur-[20px] ${plate}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[rgba(255,255,255,0.1)] backdrop-blur-[2px]"
      />
    </div>
    {children}
  </div>
);

const PhoneFrame = () => (
  <div className="relative h-[800px] w-[402px] overflow-clip">
    {/* Hero Text - positioned with plenty of breathing room */}
    <div className="absolute left-1/2 top-6 flex w-92.5 -translate-x-1/2 flex-col items-center gap-4">
      <div className="relative flex w-full shrink-0 flex-col items-center gap-2 text-center text-white">
        <h1
          style={delay(80)}
          className={`${REVEAL} relative w-[340px] shrink-0 text-[28px] leading-8 font-bold tracking-[-1px]`}
        >
          Audit Contracts in Seconds. Spot Predatory Traps.
        </h1>
        <p
          style={delay(160)}
          className={`${REVEAL} relative w-full shrink-0 text-[12px] leading-relaxed text-[rgba(255,255,255,0.7)]`}
        >
          Autonomous legal intelligence for freelancers & founders. Detect
          hidden landmines, redline bilateral terms, and export 1-page attorney
          briefs.
        </p>
      </div>
      <div
        style={delay(240)}
        className={`${REVEAL} relative flex w-full shrink-0 flex-col items-start justify-center gap-[8px]`}
      >
        <LaunchButton
          className="w-full px-[24px] py-[13px]"
          text="Launch Studio Free"
        />
        <a
          href="#sandbox"
          className="relative flex w-full shrink-0 cursor-pointer items-center justify-center rounded-[999px] border border-solid border-[rgba(255,255,255,0.15)] bg-[#1e1c29]/80 px-[24px] py-[13px] transition-opacity duration-200 hover:opacity-80"
        >
          <p className="relative shrink-0 whitespace-nowrap text-[14px] leading-[1.15] tracking-[-0.32px] text-white">
            Explore Live Sandbox
          </p>
        </a>
      </div>
    </div>

    {/* Globe */}
    <div
      className="absolute left-[calc(50%+0.5px)] top-[430px] h-[324px] w-[323px] -translate-x-1/2 overflow-clip rounded-[999px]"
    >
      <MediaGlobe query={PHONE_QUERY} />
    </div>

    <HandCutout
      box="left-[172px] top-[344.46px] h-[177.31px] w-[230px]"
      mask="hand-mask-top.svg"
      maskSize="230px 177.309px"
      image="left-[-97.68%] top-[-17.2%] h-[170.95%] w-[197.68%]"
      from="right"
      step={360}
    />

    <HandCutout
      box="left-[-27px] top-[571.65px] h-[212.8px] w-[224px]"
      mask="hand-mask-bottom.svg"
      maskSize="224px 212.801px"
      image="left-[-15.3%] top-[-63.32%] h-[163.32%] w-[232.73%]"
      from="left"
      step={440}
    />

    {/* Telemetry Card 1 */}
    <GlassCard
      className="left-[15px] top-[460px] w-[145px] gap-[3px] rounded-[8px] border border-rose-500/30 bg-black/50 p-[12px]"
      plate="left-[calc(50%-0.5px)] top-[calc(50%+0.5px)]"
      step={400}
    >
      <div className="flex items-center gap-1 text-rose-400">
        <ShieldAlert className="size-3.5" />
        <span className="text-[15px] font-bold font-mono">Risk 88/100</span>
      </div>
      <p className="relative w-full shrink-0 text-[11px] leading-[1.3] text-white font-medium">
        Predatory Trap Flagged
      </p>
      <p className="relative w-full shrink-0 text-[9px] text-rose-300/80 font-mono">
        2-Yr Non-Compete
      </p>
    </GlassCard>

    {/* Telemetry Card 2: User Testimonial */}
    <GlassCard
      className="left-[calc(50%+79px)] top-166.75 w-[218px] -translate-x-1/2 gap-[10px] rounded-[8px] border border-purple-500/30 bg-black/50 p-[12px]"
      plate="left-[calc(50%+25.5px)] top-[calc(50%+4.21px)]"
      step={480}
    >
      <p className="relative w-full shrink-0 text-[11px] leading-[1.4] text-white italic">
        &ldquo;LexFlow caught an unlimited indemnity clause that would have
        bankrupted us.&rdquo;
      </p>
      <div className="relative flex w-full shrink-0 items-center gap-[6px]">
        <div className="flex size-[26px] shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-xs">
          🎨
        </div>
        <div className="relative flex min-w-px flex-[1_0_0] flex-col items-start text-[10px] leading-[1.3] text-white">
          <p className="relative w-full shrink-0 font-bold">Alex Chen</p>
          <p className="relative w-full shrink-0 opacity-70">
            Principal Designer
          </p>
        </div>
      </div>
    </GlassCard>
  </div>
);

const TabletFrame = () => (
  <div className="relative h-[950px] w-[744px] overflow-clip">
    {/* Hero Text - positioned with ample space */}
    <div className="absolute left-[149px] top-[40px] flex w-[446px] flex-col items-center gap-[20px]">
      <div className="relative flex w-full shrink-0 flex-col items-center gap-[12px] text-center text-white">
        <h1
          style={delay(80)}
          className={`${REVEAL} relative w-full shrink-0 text-[38px] leading-[44px] font-bold tracking-[-1.5px]`}
        >
          Audit Contracts in Seconds. Spot Predatory Traps.
        </h1>
        <p
          style={delay(160)}
          className={`${REVEAL} relative w-full shrink-0 text-[14px] leading-[1.5] text-[rgba(255,255,255,0.75)]`}
        >
          The autonomous legal copilot for freelancers, executives, and
          founders. Detect predatory clauses, redline counterparty terms, and
          generate 1-page attorney briefs.
        </p>
      </div>
      <div
        style={delay(240)}
        className={`${REVEAL} relative flex shrink-0 items-center gap-[12px]`}
      >
        <LaunchButton
          className="px-[24px] py-[14px]"
          text="Launch Studio Free"
        />
        <a
          href="#sandbox"
          className="relative flex shrink-0 cursor-pointer items-center justify-center rounded-[999px] border border-solid border-[rgba(255,255,255,0.15)] bg-[#1e1c29]/80 px-[22px] py-[14px] transition-opacity duration-200 hover:opacity-80"
        >
          <p className="relative shrink-0 whitespace-nowrap text-[15px] leading-[1.15] tracking-[-0.32px] text-white">
            Live Sandbox
          </p>
        </a>
      </div>
    </div>

    {/* Globe */}
    <div
      className="absolute left-[163px] top-[440px] h-[420px] w-[418px] overflow-clip rounded-[999px]"
    >
      <MediaGlobe query={TABLET_QUERY} />
    </div>

    <HandCutout
      box="left-[526px] top-[280px] h-[374.664px] w-[486px]"
      mask="tab-mask-top.svg"
      maskSize="486px 374.664px"
      image="left-[-97.68%] top-[-17.2%] h-[170.95%] w-[197.68%]"
      from="right"
      step={360}
    />

    <HandCutout
      box="left-[-268px] top-[600px] h-[420.85px] w-[443px]"
      mask="tab-mask-bottom.svg"
      maskSize="443px 420.85px"
      image="left-[-15.3%] top-[-63.32%] h-[163.32%] w-[232.73%]"
      from="left"
      step={440}
    />

    {/* Telemetry Card 1 */}
    <GlassCard
      className="left-[35px] top-[460px] w-[170px] gap-1 rounded-[8px] border border-rose-500/30 bg-black/50 p-4"
      plate="left-1/2 top-1/2"
      step={400}
    >
      <div className="flex items-center gap-1.5 text-rose-400">
        <ShieldAlert className="size-4" />
        <span className="text-[18px] font-bold font-mono">Risk 88/100</span>
      </div>
      <p className="relative w-full shrink-0 text-[12px] font-medium leading-[1.3] text-white">
        Predatory Trap Flagged
      </p>
      <p className="relative w-full shrink-0 text-[10px] text-rose-300/80 font-mono">
        2-Yr Non-Compete Trap
      </p>
    </GlassCard>

    {/* Telemetry Card 2 */}
    <GlassCard
      className="left-[520px] top-[640px] w-[240px] gap-3 rounded-[8px] border border-purple-500/30 bg-black/50 p-3.5"
      plate="left-[calc(50%-0.5px)] top-1/2"
      step={480}
    >
      <p className="relative w-full shrink-0 text-[12px] leading-[1.4] text-white italic">
        &ldquo;LexFlow caught an unlimited indemnity clause that would have
        bankrupted our studio.&rdquo;
      </p>
      <div className="relative flex w-full shrink-0 items-center gap-2">
        <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-xs">
          🎨
        </div>
        <div className="relative flex min-w-0 flex-[1_0_0] flex-col items-start text-[11px] leading-[1.3] text-white">
          <p className="relative w-full shrink-0 font-bold">Alex Chen</p>
          <p className="relative w-full shrink-0 opacity-70">
            Principal Designer
          </p>
        </div>
      </div>
    </GlassCard>
  </div>
);

const DesktopFrame = () => (
  <div className="relative h-[890px] w-[1280px] overflow-clip">
    {/* Hero Main Content - Positioned at top-[44px] with 130px clearance before the globe */}
    <div className="absolute left-[400px] top-[44px] flex w-[480px] flex-col items-center gap-[18px]">
      <div className="relative flex w-full shrink-0 flex-col items-center gap-[12px] text-center text-white">
        <h1
          style={delay(80)}
          className={`${REVEAL} relative w-full shrink-0 text-[42px] leading-[48px] font-bold tracking-[-1.8px]`}
        >
          Audit Contracts in Seconds. Spot Predatory Traps.
        </h1>
        <p
          style={delay(160)}
          className={`${REVEAL} relative w-full shrink-0 text-[15px] leading-[1.5] text-[rgba(255,255,255,0.75)]`}
        >
          The AI legal copilot for freelancers, executives, and founders. Detect
          predatory clauses, redline counterparty terms with bilateral diffs,
          and generate 1-page attorney briefs.
        </p>
      </div>
      <div
        style={delay(240)}
        className={`${REVEAL} relative flex shrink-0 items-center gap-[14px]`}
      >
        <LaunchButton
          className="px-[26px] py-[13px]"
          text="Launch Studio Free"
        />
        <a
          href="#sandbox"
          className="relative flex shrink-0 cursor-pointer items-center justify-center rounded-[999px] border border-solid border-[rgba(255,255,255,0.15)] bg-[#1e1c29]/80 backdrop-blur-md px-[24px] py-[13px] transition-all duration-200 hover:bg-[#252233] hover:border-purple-500/40 text-white"
        >
          <p className="relative shrink-0 whitespace-nowrap text-[15px] leading-[1.15] tracking-[-0.32px] text-white/90">
            Explore Live Sandbox
          </p>
        </a>
      </div>
    </div>

    {/* Globe Component - Placed at top-[410px] with clear 130px separation from buttons */}
    <div
      className="absolute left-[426px] top-[410px] h-[430px] w-[428px] overflow-clip rounded-[999px]"
    >
      <MediaGlobe query={DESKTOP_QUERY} />
    </div>

    {/* Animated Hands */}
    <HandCutout
      box="left-[794px] top-[269.169px] h-[374.664px] w-[486px]"
      mask="desk-mask-top.svg"
      maskSize="486px 374.664px"
      image="left-[-97.68%] top-[-17.2%] h-[170.95%] w-[197.68%]"
      from="right"
      step={360}
    />

    <HandCutout
      box="left-0 top-[592.398px] h-[420.85px] w-[443px]"
      mask="desk-mask-bottom.svg"
      maskSize="443px 420.85px"
      image="left-[-15.3%] top-[-63.32%] h-[163.32%] w-[232.73%]"
      from="left"
      step={440}
    />

    {/* Telemetry Card 1 (Left of Globe) */}
    <GlassCard
      className="left-[240px] top-[460px] w-[185px] gap-1 rounded-[10px] border border-rose-500/30 bg-[#0d0f14]/85 p-4 backdrop-blur-md shadow-xl shadow-rose-950/30 z-20"
      plate="left-1/2 top-1/2"
      step={400}
    >
      <div className="flex items-center gap-1.5 text-rose-400">
        <ShieldAlert className="size-4 shrink-0" />
        <span className="text-[19px] font-bold font-mono">Risk 88/100</span>
      </div>
      <p className="relative w-full shrink-0 text-[12px] font-medium leading-[1.3] text-white">
        Predatory Trap Flagged
      </p>
      <p className="relative w-full shrink-0 text-[10px] text-rose-300/80 font-mono">
        2-Yr Non-Compete Trap
      </p>
    </GlassCard>

    {/* Telemetry Card 2 (Right of Globe) */}
    <GlassCard
      className="left-[835px] top-[480px] w-[270px] gap-3 rounded-[10px] border border-purple-500/30 bg-[#0d0f14]/85 p-4 backdrop-blur-md shadow-xl shadow-purple-950/30 z-20"
      plate="left-[calc(50%-0.5px)] top-1/2"
      step={480}
    >
      <p className="relative w-full shrink-0 text-[12px] leading-[1.4] text-white/95 italic">
        &ldquo;LexFlow flagged an unlimited indemnity clause that would have
        bankrupted our creative agency.&rdquo;
      </p>
      <div className="relative flex w-full shrink-0 items-center gap-2">
        <div className="flex size-7.5 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-xs">
          🎨
        </div>
        <div className="relative flex min-w-0 flex-[1_0_0] flex-col items-start text-[11px] leading-[1.3] text-white">
          <p className="relative w-full shrink-0 font-bold">Alex Chen</p>
          <p className="relative w-full shrink-0 text-white/70">
            Principal UI/UX Designer
          </p>
        </div>
      </div>
    </GlassCard>
  </div>
);

export const Sec2Hero = () => (
  <main
    className="relative w-full overflow-hidden bg-[#101216]"
    style={{ fontFamily: HELVETICA }}
  >
    <Backdrop src="bg.png" className="min-[640px]:hidden" />
    <Backdrop
      src="bg-ipad.png"
      className="hidden min-[640px]:block min-[1024px]:hidden"
    />
    <Backdrop src="bg-desktop.png" className="hidden min-[1024px]:block" />

    <ScaleFrame
      frameWidth={402}
      className="relative w-full overflow-hidden min-[640px]:hidden"
    >
      <PhoneFrame />
    </ScaleFrame>
    <ScaleFrame
      frameWidth={744}
      className="relative hidden w-full overflow-hidden min-[640px]:block min-[1024px]:hidden"
    >
      <TabletFrame />
    </ScaleFrame>
    <ScaleFrame
      frameWidth={1280}
      className="relative hidden w-full overflow-hidden min-[1024px]:block"
    >
      <DesktopFrame />
    </ScaleFrame>
  </main>
);
