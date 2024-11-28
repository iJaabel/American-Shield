"use client";

import { Button } from "@/components/ui/button";
import { Power } from "lucide-react";

interface ConnectionButtonProps {
  isConnected: boolean;
  isConnecting: boolean;
  onToggle: () => void;
}

export function ConnectionButton({ isConnected, isConnecting, onToggle }: ConnectionButtonProps) {
  return (
    <Button
      size="lg"
      className={`w-48 ${isConnected ? "bg-red-500 hover:bg-red-600" : ""}`}
      onClick={onToggle}
      disabled={isConnecting}
      aria-label={
        isConnecting 
          ? "Processing connection" 
          : isConnected 
          ? "Disconnect from VPN" 
          : "Connect to VPN"
      }
    >
      <Power className="mr-2 h-4 w-4" aria-hidden="true" />
      {isConnecting
        ? "Processing..."
        : isConnected
        ? "Disconnect"
        : "Connect"}
    </Button>
  );
}