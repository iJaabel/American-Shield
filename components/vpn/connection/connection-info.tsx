"use client";

import { Shield, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Server } from "../types";

interface ConnectionInfoProps {
  isConnected: boolean;
  selectedServer: Server;
}

export function ConnectionInfo({ isConnected, selectedServer }: ConnectionInfoProps) {
  return (
    <Card className="bg-muted">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield 
              className={`h-5 w-5 ${isConnected ? "text-green-500" : "text-muted-foreground"}`}
              aria-hidden="true"
            />
            <div>
              <p className="font-medium">
                {isConnected ? "Protected" : "Not Protected"}
              </p>
              <p className="text-sm text-muted-foreground">
                {isConnected ? "Your connection is secure" : "Connect to protect your privacy"}
              </p>
            </div>
          </div>
          {selectedServer && (
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{selectedServer.name}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}