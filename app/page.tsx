import Hero24 from "@/components/hero-24/hero-24";
import { LiveSandbox } from "@/components/landing/live-sandbox";
import { Navbar } from "@/components/navbar";
import { LegalDisclaimerBanner } from "@/components/legal-disclaimer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-purple-500 selection:text-white">
      <LegalDisclaimerBanner />
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Hero24 />
        <LiveSandbox />
      </main>
    </div>
  );
}
