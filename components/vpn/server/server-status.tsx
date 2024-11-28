"use client";

import { Activity, Signal } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ServerStatusProps {
  latency: number;
  load?: number;
}

export function ServerStatus({ latency, load }: ServerStatusProps) {
  const getLatencyColor = (latency: number) => {
    if (latency < 50) return "text-green-500";
    if (latency < 100) return "text-yellow-500";
    return "text-red-500";
  };

  const getLatencyLabel = (latency: number) => {
    if (latency < 50) return "Excellent";
    if (latency < 100) return "Good";
    return "Poor";
  };

  return (
    <div className="flex items-center space-x-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center space-x-1">
              <Activity className={`h-4 w-4 ${getLatencyColor(latency)}`} />
              <span className="text-sm text-muted-foreground">{latency}ms</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Latency: {getLatencyLabel(latency)}</p>
          </TooltipContent>
        </Tooltip>

        {load !== undefined && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center space-x-1">
                <Signal className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{load}%</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Server Load: {load}%</p>
            </TooltipContent>
          </Tooltip>
        )}
      </TooltipProvider>
    </div>
  );
}