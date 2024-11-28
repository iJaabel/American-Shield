"use client";

import { Shield, Globe, Zap, Lock, Users, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    icon: Globe,
    title: "Global Network",
    description: "Access content worldwide with servers in 90+ countries"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Experience blazing fast speeds with our optimized network"
  },
  {
    icon: Lock,
    title: "Military-Grade Encryption",
    description: "Your data is protected with AES-256 encryption"
  },
  {
    icon: Users,
    title: "Multi-Device Support",
    description: "Connect up to 6 devices simultaneously"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Our team is always here to help you"
  },
  {
    icon: Shield,
    title: "No-Logs Policy",
    description: "We never track or store your online activity"
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose American Shield?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience unparalleled privacy and security with our feature-rich VPN service
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <Icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}