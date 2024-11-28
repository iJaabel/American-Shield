"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CashAppPaymentProps {
  disabled?: boolean;
}

export function CashAppPayment({ disabled }: CashAppPaymentProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Redirecting to Cash App...");
    } catch (error) {
      toast.error("Cash App payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={disabled || isProcessing}
      className="w-full bg-[#00D632] hover:bg-[#00B82C]"
    >
      Pay with Cash App
    </Button>
  );
}