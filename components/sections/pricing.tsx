"use client"

import { Check } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CheckoutButton } from "@/components/checkout-button"

const PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID

export function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Start protecting your online privacy today with our risk-free trial
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <Card className="w-full max-w-lg border-2 border-muted">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold">
                Subscribe Monthly
              </CardTitle>
              <CardDescription>for $10 per month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {[
                  "7-day free trial",
                  "Access to all server locations",
                  "Unlimited bandwidth",
                  "No logs kept",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-muted-foreground mr-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="text-center">
              <CheckoutButton priceId={PRICE_ID!} />
            </CardFooter>
          </Card>
        </div>

        <div className="flex justify-center">
          <Card className="w-full max-w-lg border-2 hover:border-primary transition-colors">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold">
                Subscribe Annually
              </CardTitle>
              <CardDescription>for $8.50 per month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {[
                  "7-day free trial",
                  "30-day money-back guarantee",
                  "Connect up to 6 devices",
                  "Access to all server locations",
                  "No bandwidth limits",
                  "24/7 customer support",
                  "Military-grade encryption",
                  "Privacy Centered",
                  "One button start up",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <CheckoutButton priceId={PRICE_ID!} />
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
