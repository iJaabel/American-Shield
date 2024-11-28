"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "John Anderson",
    role: "Security Consultant",
    content: "American Shield VPN has become an essential tool in my daily work. The speed and reliability are unmatched.",
    avatar: "JA"
  },
  {
    name: "Sarah Mitchell",
    role: "Digital Nomad",
    content: "Finally, a VPN service that delivers on its promises. The global server network lets me work from anywhere.",
    avatar: "SM"
  },
  {
    name: "Michael Chen",
    role: "Privacy Advocate",
    content: "The commitment to privacy and security is evident. No logs, strong encryption, and excellent performance.",
    avatar: "MC"
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Trusted by Thousands</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See what our users say about American Shield VPN
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-2">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}