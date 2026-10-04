import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { ProblemSection } from "@/components/landing/problem-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { CapabilitiesSection } from "@/components/landing/capabilities-section";
import { ProductVisualization } from "@/components/landing/product-visualization";
import { VoiceTextSection } from "@/components/landing/voice-text-section";
import { CtaSection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "Meri — Run your business by voice",
  description:
    "Voice-first assistant for small-business owners. Record sales, track expenses, manage inventory, and ask questions simply by talking to Meri.",
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-200 overflow-x-clip">
      <Navbar />

      <main className="flex-1">
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: The Problem */}
        <ProblemSection />

        {/* Section 3: How Meri Works */}
        <HowItWorksSection />

        {/* Section 4: What Meri Can Handle */}
        <CapabilitiesSection />

        {/* Section 5: Product Visualization */}
        <ProductVisualization />

        {/* Section 6: Voice + Text */}
        <VoiceTextSection />

        {/* Section 7: Final CTA */}
        <CtaSection />
      </main>

      {/* Section 8: Footer */}
      <Footer />
    </div>
  );
}
