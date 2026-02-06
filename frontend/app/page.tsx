import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { HeroSection } from "@/components/hero-section";
import { FeatureGrid } from "@/components/feature-grid";
import { Footer } from "@/components/footer";

/**
 * Landing Page - Modern 3D landing page with glassmorphism
 * T009: Assembled from HeroSection, FeatureGrid, and Footer components
 * Maintains auth redirect logic - logged-in users go to dashboard
 */
export default async function LandingPage() {
  // Smart redirect - if user is already logged in, redirect to dashboard
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section with 3D background and navbar */}
      <HeroSection />

      {/* Feature Grid - 2x2 responsive layout */}
      <FeatureGrid />

      {/* Footer with branding, links, social */}
      <Footer />
    </main>
  );
}
