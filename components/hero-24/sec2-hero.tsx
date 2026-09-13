/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
"use client";

import type { ReactNode } from "react";
import { MediaGlobe } from "./media-globe";
import { ScaleFrame } from "./scale-frame";
import { Scale, Sparkles, ArrowRight, ShieldAlert } from "lucide-react";

const A = "/originkit/hero-24";

const HELVETICA = '"Helvetica Neue", Helvetica, Arial, sans-serif';

const PHONE_QUERY = "(max-width: 639px)";
const TABLET_QUERY = "(min-width: 640px) and (max-width: 1279px)";
const DESKTOP_QUERY = "(min-width: 1280px)";

const NAV_LINKS = [
  { name: "Features", href: "#features" },
  { name: "Risk Scanner", href: "/dashboard?tab=scanner" },
  { name: "Redline Diff", href: "/dashboard?tab=compare" },
  { name: "Attorney Brief", href: "/dashboard?tab=handoff" },
  { name: "ROI Calculator", href: "#roi" },
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

const GetStartedButton = ({
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
    className={`absolute flex flex-col items-start overflow-clip border-solid border-[rgba(255,255,255,0.15)] backdrop-blur-md ${className}`}
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
  <div className="relative h-[836px] w-[402px] overflow-clip">
    {/* Header */}
    <div
      style={delay(0)}
      className={`${REVEAL} absolute left-0 top-0 flex w-[402px] items-center justify-between border border-solid border-[rgba(255,255,255,0.1)] p-[16px] backdrop-blur-md bg-black/20`}
    >
      <a href="/" className="flex items-center gap-2 text-white no-underline">
        <div className="flex size-7 items-center justify-center rounded-lg bg-linear-to-br from-purple-600 to-indigo-600 text-white shadow-xs">
          <Scale className="size-3.5" />
        </div>
        <span className="text-[20px] font-bold tracking-tight text-white">
          LexFlow <span className="text-purple-400">AI</span>
        </span>
      </a>
      <a
        href="/dashboard"
        className="text-xs font-semibold px-3 py-1.5 rounded-full bg-purple-600 text-white shadow-xs"
      >
        Studio
      </a>
    </div>

    {/* Hero Text */}
    <div className="absolute left-1/2 top-20 flex w-92.5 -translate-x-1/2 flex-col items-center gap-5">
      <div className="relative flex w-full shrink-0 flex-col items-center gap-2 text-center text-white">
        <div
          style={delay(40)}
          className={`${REVEAL} inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[11px] font-medium`}
        >
          <Sparkles className="size-3 text-purple-400" />
          <span>Gemini 2.5 Flash Legal Engine</span>
        </div>
        <h1
          style={delay(80)}
          className={`${REVEAL} relative w-[340px] shrink-0 text-[30px] leading-8 font-bold tracking-[-1px]`}
        >
          Audit Contracts in Seconds. Spot Predatory Traps.
        </h1>
        <p
          style={delay(160)}
          className={`${REVEAL} relative w-full shrink-0 text-[13px] leading-relaxed text-[rgba(255,255,255,0.7)]`}
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
        <GetStartedButton
          className="w-full px-[24px] py-[14px]"
          text="Launch Studio Free"
        />
        <a
          href="#sandbox"
          className="relative flex w-full shrink-0 cursor-pointer items-center justify-center rounded-[999px] border border-solid border-[rgba(255,255,255,0.15)] bg-[#1e1c29]/80 px-[24px] py-[14px] transition-opacity duration-200 hover:opacity-80"
        >
          <p className="relative shrink-0 whitespace-nowrap text-[15px] leading-[1.15] tracking-[-0.32px] text-white">
            Explore Live Sandbox
          </p>
        </a>
      </div>
    </div>

    {/* Globe */}
    <div
      style={delay(320)}
      className={`${REVEAL} absolute left-[calc(50%+0.5px)] top-[418px] h-[324px] w-[323px] -translate-x-1/2 overflow-clip rounded-[999px]`}
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
      className="left-[20px] top-[445px] w-[145px] gap-[3px] rounded-[8px] border border-rose-500/30 bg-black/40 p-[12px]"
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
      className="left-[calc(50%+79px)] top-166.75 w-[218px] -translate-x-1/2 gap-[10px] rounded-[8px] border border-purple-500/30 bg-black/40 p-[12px]"
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
  <div className="relative h-[994px] w-[744px] overflow-clip">
    {/* Header */}
    <div
      style={delay(0)}
      className={`${REVEAL} absolute left-0 top-0 flex h-[64px] w-[744px] items-center justify-between border border-solid border-[rgba(255,255,255,0.1)] px-[32px] py-[16px] backdrop-blur-md bg-black/20`}
    >
      <a href="/" className="flex items-center gap-2 text-white no-underline">
        <div className="flex size-8 items-center justify-center rounded-lg bg-linear-to-br from-purple-600 to-indigo-600 text-white shadow-xs">
          <Scale className="size-4" />
        </div>
        <span className="text-[24px] font-bold tracking-tight text-white">
          LexFlow <span className="text-purple-400">AI</span>
        </span>
      </a>
      <GetStartedButton className="px-[20px] py-[10px]" text="Launch Studio" />
    </div>

    {/* Hero Text */}
    <div className="absolute left-[149px] top-[110px] flex w-[446px] flex-col items-center gap-[24px]">
      <div className="relative flex w-full shrink-0 flex-col items-center gap-[14px] text-center text-white">
        <div
          style={delay(40)}
          className={`${REVEAL} inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-medium`}
        >
          <Sparkles className="size-3.5 text-purple-400" />
          <span>Gemini 2.5 Flash Legal Engine</span>
        </div>
        <h1
          style={delay(80)}
          className={`${REVEAL} relative w-full shrink-0 text-[42px] leading-[48px] font-bold tracking-[-1.6px]`}
        >
          Audit Contracts in Seconds. Spot Predatory Traps.
        </h1>
        <p
          style={delay(160)}
          className={`${REVEAL} relative w-full shrink-0 text-[15px] leading-[1.5] text-[rgba(255,255,255,0.75)]`}
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
        <GetStartedButton
          className="px-[24px] py-[16px]"
          text="Launch Studio Free"
        />
        <a
          href="#sandbox"
          className="relative flex shrink-0 cursor-pointer items-center justify-center rounded-[999px] border border-solid border-[rgba(255,255,255,0.15)] bg-[#1e1c29]/80 px-[24px] py-[16px] transition-opacity duration-200 hover:opacity-80"
        >
          <p className="relative shrink-0 whitespace-nowrap text-[16px] leading-[1.15] tracking-[-0.32px] text-white">
            Live Sandbox
          </p>
        </a>
      </div>
    </div>

    {/* Globe */}
    <div
      style={delay(320)}
      className={`${REVEAL} absolute left-[163px] top-[430px] h-[420px] w-[418px] overflow-clip rounded-[999px]`}
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
      className="left-[40px] top-[460px] w-[170px] gap-1 rounded-[8px] border border-rose-500/30 bg-black/40 p-4"
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
      className="left-[520px] top-[640px] w-[240px] gap-3 rounded-[8px] border border-purple-500/30 bg-black/40 p-3.5"
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

const DesktopNav = () => (
  <div
    style={delay(0)}
    className={`${REVEAL} absolute left-0 top-0 z-10 hidden h-[68px] w-full items-center justify-center border-b border-solid border-[rgba(255,255,255,0.1)] px-[64px] py-[16px] desktop-sm:flex backdrop-blur-md bg-black/20`}
  >
    <div className="relative flex w-full max-w-300 items-center justify-between">
      <a
        href="/"
        className="relative flex items-center gap-2.5 shrink-0 whitespace-nowrap text-[26px] leading-[1.15] font-bold tracking-[-0.8px] text-white hover:opacity-90 transition-opacity"
      >
        <div className="flex size-8 items-center justify-center rounded-lg bg-linear-to-br from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/30">
          <Scale className="size-4.5" />
        </div>
        <span>
          LexFlow <span className="text-purple-400">AI</span>
        </span>
      </a>

      <div className="absolute left-1/2 top-[calc(50%-0.5px)] flex -translate-x-1/2 -translate-y-1/2 items-center gap-[28px] whitespace-nowrap text-[15px] font-medium leading-[1.15] text-white/80">
        {NAV_LINKS.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="relative shrink-0 cursor-pointer transition-colors duration-200 hover:text-purple-300"
          >
            {link.name}
          </a>
        ))}
      </div>

      <GetStartedButton className="px-[22px] py-[12px]" text="Launch Studio" />
    </div>
  </div>
);

const DesktopFrame = () => (
  <div className="relative h-[913px] w-[1280px] overflow-clip">
    {/* Hero Main Content */}
    <div className="absolute left-[417px] top-[125px] flex w-[480px] flex-col items-center gap-[24px]">
      <div className="relative flex w-full shrink-0 flex-col items-center gap-[14px] text-center text-white">
        <div
          style={delay(40)}
          className={`${REVEAL} inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-medium shadow-xs shadow-purple-500/20`}
        >
          <Sparkles className="size-3.5 text-purple-400" />
          <span>Autonomous Legal Intelligence Studio · Gemini 2.5 Flash</span>
        </div>
        <h1
          style={delay(80)}
          className={`${REVEAL} relative w-full shrink-0 text-[46px] leading-[52px] font-bold tracking-[-1.8px]`}
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
        <GetStartedButton
          className="px-[26px] py-[15px]"
          text="Launch Studio Free"
        />
        <a
          href="#sandbox"
          className="relative flex shrink-0 cursor-pointer items-center justify-center rounded-[999px] border border-solid border-[rgba(255,255,255,0.15)] bg-[#1e1c29]/80 backdrop-blur-md px-[24px] py-[15px] transition-all duration-200 hover:bg-[#252233] hover:border-purple-500/40 text-white"
        >
          <p className="relative shrink-0 whitespace-nowrap text-[15px] leading-[1.15] tracking-[-0.32px] text-white/90">
            Explore Live Sandbox
          </p>
        </a>
      </div>
    </div>

    {/* Globe Component */}
    <div
      style={delay(320)}
      className={`${REVEAL} absolute left-[431px] top-[430px] h-[430px] w-[428px] overflow-clip rounded-[999px]`}
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

    {/* Telemetry Card 1 (Left on Globe) */}
    <GlassCard
      className="left-80 top-120 w-46 gap-1 rounded-[8px] border border-rose-500/30 bg-black/40 p-4 backdrop-blur-md shadow-lg shadow-rose-950/20"
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

    {/* Telemetry Card 2 (Right on Globe) */}
    <GlassCard
      className="left-200.75 top-165 w-66 gap-3 rounded-[8px] border border-purple-500/30 bg-black/40 p-4 backdrop-blur-md shadow-lg shadow-purple-950/20"
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
      className="hidden min-[640px]:block desktop-sm:hidden"
    />
    <Backdrop src="bg-desktop.png" className="hidden desktop-sm:block" />

    <ScaleFrame
      frameWidth={402}
      className="relative w-full overflow-hidden min-[640px]:hidden"
    >
      <PhoneFrame />
    </ScaleFrame>
    <ScaleFrame
      frameWidth={744}
      className="relative hidden w-full overflow-hidden min-[640px]:block desktop-sm:hidden"
    >
      <TabletFrame />
    </ScaleFrame>
    <DesktopNav />
    <ScaleFrame
      frameWidth={1280}
      className="relative hidden w-full overflow-hidden desktop-sm:block"
    >
      <DesktopFrame />
    </ScaleFrame>
  </main>
);
