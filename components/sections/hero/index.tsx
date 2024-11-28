import { HeroBackground } from "./hero-background";
import { HeroContent } from "./hero-content";

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      <HeroBackground />
      <div className="container mx-auto px-4 relative z-10">
        <HeroContent />
      </div>
    </section>
  );
}