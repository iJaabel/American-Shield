"use client"

import { Shield } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Shield className="h-6 w-6 text-primary" aria-hidden="true" />
      <span className="text-lg font-bold">American Shield VPN</span>
    </div>
  )
}
