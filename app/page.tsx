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
      {/* Landing Page Content Stack */}
      <main className="flex-1 flex flex-col">
        {/* Task 13: 3D Rotating Globe Hero */}
        <Hero24 />

        {/* Task 14: Interactive Live Contract Sandbox */}
        <LiveSandbox />

        {/* Task 15: 5-Pillar Bento Grid Feature Showcase */}
        <BentoGrid />

        {/* Task 16: Before vs After LexFlow Comparison Slider */}
        <ComparisonSlider />

        {/* Task 17: Legal Cost & Hours Saved ROI Calculator */}
        <RoiCalculator />

        {/* Task 18: Security Guarantees & Persona Testimonials */}
        <SocialProof />
      </main>

      {/* Task 19: Landing Page Footer & Legal Ethics Statement */}
      <LandingFooter />
    </div>
  );
}
