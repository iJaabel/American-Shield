"use client";

import { TabsContent } from "@/components/ui/tabs";
import { ServerGrid } from "./server-grid";
import { ServerList } from "../server-list";
import type { Server } from "../types";

interface ServerSelectorProps {
  view: "grid" | "list";
  servers: Server[];
  selectedServer: Server;
  onServerChange: (server: Server) => void;
  disabled?: boolean;
}

export function ServerSelector({ 
  view, 
  servers, 
  selectedServer, 
  onServerChange, 
  disabled 
}: ServerSelectorProps) {
  return (
    <>
      <TabsContent value="grid" className="mt-0">
        <ServerGrid
          servers={servers}
          selectedServer={selectedServer}
          onServerChange={onServerChange}
          disabled={disabled}
        />
      </TabsContent>

      <TabsContent value="list" className="mt-0">
        <ServerList
          selectedServer={selectedServer}
          onServerChange={onServerChange}
          disabled={disabled}
        />
      </TabsContent>
    </>
  );
}