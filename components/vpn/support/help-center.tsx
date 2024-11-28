"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const faqItems = [
  {
    question: "How do I connect to the VPN?",
    answer: "Click the 'Connect' button in your dashboard. Select your preferred server location and click 'Connect'. The connection will be established automatically.",
  },
  {
    question: "What should I do if the connection is slow?",
    answer: "Try connecting to a different server closer to your location. You can also check our server recommendations for optimal performance.",
  },
  {
    question: "How secure is my connection?",
    answer: "We use AES-256 encryption and maintain a strict no-logs policy. Your data is protected with military-grade encryption.",
  },
  {
    question: "Can I use the VPN on multiple devices?",
    answer: "Yes, you can connect up to 6 devices simultaneously with your subscription.",
  },
];

export function HelpCenter() {
  const [supportEmail, setSupportEmail] = useState("");
  const [supportMessage, setSupportMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Support ticket submitted successfully!");
      setSupportEmail("");
      setSupportMessage("");
    } catch (error) {
      toast.error("Failed to submit support ticket. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSupportSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                How can we help?
              </label>
              <textarea
                id="message"
                value={supportMessage}
                onChange={(e) => setSupportMessage(e.target.value)}
                className="w-full p-2 border rounded-md"
                rows={4}
                required
              />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              <MessageCircle className="mr-2 h-4 w-4" />
              {isSubmitting ? "Submitting..." : "Submit Support Request"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}