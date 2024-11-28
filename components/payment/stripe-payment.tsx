"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getStripe } from "@/lib/stripe";

interface StripePaymentProps {
  priceId: string;
  disabled?: boolean;
}

export function StripePayment({ priceId, disabled }: StripePaymentProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price: priceId }),
      });

      const { sessionId } = await response.json();
      const stripe = await getStripe();
      await stripe!.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={disabled || isProcessing}
      className="w-full"
    >
      Pay with Credit Card
    </Button>
  );
}