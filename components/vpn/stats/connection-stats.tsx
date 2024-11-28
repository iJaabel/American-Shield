import { Activity, ArrowDown, ArrowUp } from "lucide-react";
import { StatItem } from "./stat-item";
import type { ConnectionStats as ConnectionStatsType } from "../types";
import { formatBytes, formatDuration } from "../utils/format";

interface ConnectionStatsProps {
  stats: ConnectionStatsType;
}

export function ConnectionStats({ stats }: ConnectionStatsProps) {
  const { bytesReceived, bytesSent, connectedTime, latency } = stats;

  return (
    <div 
      className="grid grid-cols-2 md:grid-cols-4 gap-4" 
      role="region" 
      aria-label="Connection Statistics"
    >
      <StatItem
        icon={ArrowDown}
        label="Downloaded"
        value={formatBytes(bytesReceived)}
      />
      <StatItem
        icon={ArrowUp}
        label="Uploaded"
        value={formatBytes(bytesSent)}
      />
      <StatItem
        icon={Activity}
        label="Latency"
        value={`${latency}ms`}
      />
      <StatItem
        label="Connected Time"
        value={formatDuration(connectedTime)}
      />
    </div>
  );
}