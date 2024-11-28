"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { scrollToSection } from "@/lib/utils"

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      <Image
        src="https://images.unsplash.com/photo-1682687982501-1e58ab814714"
        alt="Hero background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Reclaim your Independence
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            A Virtual Private Network for all your privacy and freedom needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="text-lg"
              onClick={() => scrollToSection("pricing")}
            >
              Reclaim your Freedom
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
