"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { scrollToSection } from "@/lib/utils";
import { navItems } from "@/components/navigation/nav-items";
import { Logo } from "@/components/ui/logo";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  const handleNavigation = (href: string) => {
    scrollToSection(href);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-6" role="navigation">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavigation(item.href)}
              className="flex items-center text-lg font-medium hover:text-primary transition-colors py-2"
            >
              {item.label}
            </button>
          ))}
          <hr className="my-4" role="separator" />
          <Button className="w-full" size="lg">
            Register Now
          </Button>
          <Button variant="outline" className="w-full" size="lg">
            Sign In
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}