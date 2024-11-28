"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Globe, Star } from "lucide-react";
import { ServerStatus } from "./server-status";
import type { Server } from "../types";

interface ServerCardProps {
  server: Server;
  isSelected: boolean;
  isFavorite: boolean;
  onSelect: (server: Server) => void;
  onToggleFavorite: (serverId: string) => void;
  disabled?: boolean;
}

export function ServerCard({
  server,
  isSelected,
  isFavorite,
  onSelect,
  onToggleFavorite,
  disabled
}: ServerCardProps) {
  return (
    <Card 
      className={`cursor-pointer transition-all ${
        isSelected 
          ? "border-primary ring-2 ring-primary ring-offset-2" 
          : "hover:border-primary/50"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={() => !disabled && onSelect(server)}
      role="radio"
      aria-checked={isSelected}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (!disabled && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onSelect(server);
        }
      }}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{server.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(server.id);
              }}
              className={`p-1 rounded-full hover:bg-muted transition-colors ${
                isFavorite ? "text-yellow-500" : "text-muted-foreground"
              }`}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Star className="h-4 w-4" />
            </button>
            <ServerStatus latency={server.latency} load={server.load} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{server.location}</p>
        {server.protocol && (
          <p className="text-xs text-muted-foreground mt-1">
            Protocol: {server.protocol}
          </p>
        )}
      </CardContent>
    </Card>
  );
}