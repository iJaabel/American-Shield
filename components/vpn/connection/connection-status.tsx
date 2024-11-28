"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StatusHeader } from "./status-header";
import { ConnectionButton } from "./connection-button";
import { ConnectionInfo } from "./connection-info";
import { ConnectionError } from "./connection-error";
import { ConnectionStats } from "../stats/connection-stats";
import { ViewSelector } from "./view-selector";
import { ServerSelector } from "../server/server-selector";
import { ServerRecommendations } from "../server/server-recommendations";
import { useVpnConnection } from "../hooks/use-vpn-connection";
import { useUserPreferences } from "../hooks/use-user-preferences";
import { servers } from "../data/servers";
import type { Server } from "../types";

export function ConnectionStatus() {
  const { preferences, updatePreferences, toggleFavoriteServer } = useUserPreferences();
  const [selectedServer, setSelectedServer] = useState<Server>(servers[0]);
  const [viewType, setViewType] = useState<"grid" | "list">(preferences.preferredView);
  
  const { 
    isConnected, 
    isConnecting, 
    stats, 
    error,
    connect, 
    disconnect 
  } = useVpnConnection(selectedServer);

  useEffect(() => {
    // Restore last connected server if available
    if (preferences.lastConnectedServer) {
      const lastServer = servers.find(s => s.id === preferences.lastConnectedServer);
      if (lastServer) {
        setSelectedServer(lastServer);
      }
    }
  }, [preferences.lastConnectedServer]);

  const handleServerChange = (server: Server) => {
    setSelectedServer(server);
    if (isConnected) {
      updatePreferences({ lastConnectedServer: server.id });
    }
  };

  const handleViewChange = (view: "grid" | "list") => {
    setViewType(view);
    updatePreferences({ preferredView: view });
  };

  const handleConnection = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
      updatePreferences({ lastConnectedServer: selectedServer.id });
    }
  };

  return (
    <Card>
      <CardHeader>
        <StatusHeader isConnected={isConnected} />
      </CardHeader>
      <CardContent className="space-y-6">
        <ConnectionInfo 
          isConnected={isConnected} 
          selectedServer={selectedServer} 
        />

        {error && <ConnectionError error={error} />}

        <ServerRecommendations
          servers={servers}
          onSelectServer={handleServerChange}
          disabled={isConnected || isConnecting}
        />

        <div className="space-y-4">
          <ViewSelector 
            view={viewType} 
            onChange={handleViewChange}
          />

          <ServerSelector
            view={viewType}
            servers={servers}
            selectedServer={selectedServer}
            favoriteServers={preferences.favoriteServers}
            onServerChange={handleServerChange}
            onToggleFavorite={toggleFavoriteServer}
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