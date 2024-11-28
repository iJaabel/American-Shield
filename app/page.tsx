import { HeroSection } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ClientWrapper } from "@/components/client-wrapper";

export default function Home() {
  return (
    <main className="min-h-screen">
      <ClientWrapper />
      <Header />
      <HeroSection />
      <Features />
      <Pricing />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}