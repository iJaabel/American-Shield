import Image from "next/image";

export function HeroBackground() {
  return (
    <>
      <Image
        src="https://images.unsplash.com/photo-1682687982501-1e58ab814714"
        alt="Scenic mountain view representing freedom and independence"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
    </>
  );
}