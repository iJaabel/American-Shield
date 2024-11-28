"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ServerStatus } from "./server/server-status";
import type { Server } from "./types";
import { servers } from "./data/servers";

interface ServerListProps {
  selectedServer: Server;
  onServerChange: (server: Server) => void;
  disabled?: boolean;
}

export function ServerList({ selectedServer, onServerChange, disabled }: ServerListProps) {
  return (
    <Select
      value={selectedServer.id}
      onValueChange={(value) => {
        const server = servers.find((s) => s.id === value);
        if (server) onServerChange(server);
      }}
      disabled={disabled}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a server" />
      </SelectTrigger>
      <SelectContent>
        {servers.map((server) => (
          <SelectItem key={server.id} value={server.id}>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                <span>{server.name}</span>
                <span className="text-sm text-muted-foreground">
                  ({server.location})
                </span>
              </div>
              <ServerStatus latency={server.latency} load={server.load} />
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}