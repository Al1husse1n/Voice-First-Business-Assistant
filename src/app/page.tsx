import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { CapabilitiesSection } from "@/components/landing/capabilities-section";
import { ProductVisualization } from "@/components/landing/product-visualization";
import { CtaSection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "Meri — Run your business by voice",
  description:
    "Voice-first assistant for small-business owners. Record sales, track expenses, manage inventory, and ask questions simply by talking to Meri.",
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-background text-foreground transition-colors duration-200">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ProductVisualization />
        <CapabilitiesSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
