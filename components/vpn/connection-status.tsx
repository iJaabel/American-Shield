"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StatusHeader } from "./connection/status-header";
import { ConnectionButton } from "./connection/connection-button";
import { ServerGrid } from "./server/server-grid";
import { ConnectionStats } from "./stats/connection-stats";
import { useVpnConnection } from "./hooks/use-vpn-connection";
import { servers } from "./data/servers";
import type { Server } from "./types";

export function ConnectionStatus() {
  const [selectedServer, setSelectedServer] = useState<Server>(servers[0]);
  const { isConnected, isConnecting, stats, connect, disconnect } = useVpnConnection(selectedServer);

  const handleConnection = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <Card>
      <CardHeader>
        <StatusHeader isConnected={isConnected} />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <label className="text-sm font-medium block">
            Server Location
          </label>
          <ServerGrid
            servers={servers}
            selectedServer={selectedServer}
            onServerChange={setSelectedServer}
            disabled={isConnected || isConnecting}
          />
        </div>

        <div className="flex justify-center">
          <ConnectionButton
            isConnected={isConnected}
            isConnecting={isConnecting}
            onToggle={handleConnection}
          />
        </div>

        {isConnected && stats && (
          <ConnectionStats
            stats={{
              ...stats,
              latency: selectedServer.latency,
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}