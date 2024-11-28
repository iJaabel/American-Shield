"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Card } from "@/components/ui/card";
import { StripePayment } from "./stripe-payment";
import { PayPalPayment } from "./paypal-payment";
import { CashAppPayment } from "./cashapp-payment";
import { DialogTitle } from "@/components/ui/dialog";

interface PaymentMethodsProps {
  amount: number;
  onSuccess: () => void;
}

export function PaymentMethods({ amount, onSuccess }: PaymentMethodsProps) {
  return (
    <Card className="p-6 space-y-6">
      <DialogTitle>Choose Payment Method</DialogTitle>
      
      <div className="space-y-4">
        <StripePayment 
          priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_ID!}
        />

        <PayPalScriptProvider options={{ 
          "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
          components: "buttons",
          intent: "subscription",
          vault: true,
        }}>
          <PayPalPayment onSuccess={onSuccess} />
        </PayPalScriptProvider>

        <CashAppPayment />
      </div>

      <div className="text-sm text-muted-foreground text-center">
        <p>All payments are secure and encrypted.</p>
        <p>You can cancel your subscription at any time.</p>
      </div>
    </Card>
  );
}