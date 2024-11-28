import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/utils";

export function HeroContent() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
        Reclaim your Independence
      </h1>
      <p className="text-xl md:text-2xl text-white/90 mb-8">
        All-in-one platform for all your privacy and freedom needs
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          size="lg" 
          className="text-lg"
          onClick={() => scrollToSection("pricing")}
        >
          Become Free
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          className="text-lg"
          onClick={() => scrollToSection("features")}
        >
          Reclaim your Freedom
        </Button>
      </div>
    </div>
  );
}