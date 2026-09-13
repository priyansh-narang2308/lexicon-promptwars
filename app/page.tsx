import Hero24 from "@/components/hero-24/hero-24";
import { LiveSandbox } from "@/components/landing/live-sandbox";
import { BentoGrid } from "@/components/landing/bento-grid";
import { ComparisonSlider } from "@/components/landing/comparison-slider";
import { RoiCalculator } from "@/components/landing/roi-calculator";
import { SocialProof } from "@/components/landing/social-proof";
import { LandingFooter } from "@/components/landing/footer";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-purple-500 selection:text-white">
      <main className="flex-1 flex flex-col">
        <Hero24 />
        <LiveSandbox />
        <BentoGrid />
        <ComparisonSlider />
        <RoiCalculator />
        <SocialProof />
      </main>
      <LandingFooter />
    </div>
  );
}
