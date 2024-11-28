"use client";

import { ServerCard } from "./server-card";
import type { Server } from "../types";

interface ServerGridProps {
  servers: Server[];
  selectedServer: Server;
  favoriteServers: string[];
  onServerChange: (server: Server) => void;
  onToggleFavorite: (serverId: string) => void;
  disabled?: boolean;
}

export function ServerGrid({
  servers,
  selectedServer,
  favoriteServers,
  onServerChange,
  onToggleFavorite,
  disabled
}: ServerGridProps) {
  // Sort servers to show favorites first
  const sortedServers = [...servers].sort((a, b) => {
    const aFavorite = favoriteServers.includes(a.id);
    const bFavorite = favoriteServers.includes(b.id);
    if (aFavorite && !bFavorite) return -1;
    if (!aFavorite && bFavorite) return 1;
    return 0;
  });

  const handleKeyNavigation = (event: React.KeyboardEvent, currentIndex: number) => {
    const gridCols = window.innerWidth >= 768 ? 2 : 1;
    let newIndex = currentIndex;

    switch (event.key) {
      case "ArrowRight":
        newIndex = Math.min(currentIndex + 1, sortedServers.length - 1);
        break;
      case "ArrowLeft":
        newIndex = Math.max(currentIndex - 1, 0);
        break;
      case "ArrowDown":
        newIndex = Math.min(currentIndex + gridCols, sortedServers.length - 1);
        break;
      case "ArrowUp":
        newIndex = Math.max(currentIndex - gridCols, 0);
        break;
      default:
        return;
    }

    if (newIndex !== currentIndex) {
      event.preventDefault();
      onServerChange(sortedServers[newIndex]);
    }
  };

  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      role="radiogroup"
      aria-label="VPN Server Selection"
    >
      {sortedServers.map((server, index) => (
        <ServerCard
          key={server.id}
          server={server}
          isSelected={server.id === selectedServer.id}
          isFavorite={favoriteServers.includes(server.id)}
          onSelect={onServerChange}
          onToggleFavorite={onToggleFavorite}
          disabled={disabled}
          onKeyDown={(e) => handleKeyNavigation(e, index)}
          tabIndex={disabled ? -1 : 0}
        />
      ))}
    </div>
  );
}