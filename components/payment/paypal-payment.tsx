"use client";

import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "sonner";

interface PayPalPaymentProps {
  onSuccess: () => void;
  disabled?: boolean;
}

export function PayPalPayment({ onSuccess, disabled }: PayPalPaymentProps) {
  return (
    <PayPalButtons
      style={{ layout: "vertical" }}
      disabled={disabled}
      createSubscription={(data, actions) => {
        return actions.subscription.create({
          plan_id: process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID!,
        });
      }}
      onApprove={async (data, actions) => {
        toast.success("Payment successful!");
        onSuccess();
      }}
      onError={(err) => {
        console.error("PayPal error:", err);
        toast.error("Payment failed. Please try again.");
      }}
    />
  );
}