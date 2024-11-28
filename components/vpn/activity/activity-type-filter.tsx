"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ActivityLogEntry } from "../hooks/use-activity-log";

interface ActivityTypeFilterProps {
  value: ActivityLogEntry["type"] | "all";
  onChange: (value: ActivityLogEntry["type"] | "all") => void;
}

export function ActivityTypeFilter({ value, onChange }: ActivityTypeFilterProps) {
  return (
    <Select
      value={value}
      onValueChange={(value: ActivityLogEntry["type"] | "all") => onChange(value)}
    >
      <SelectTrigger 
        className="w-[180px]"
        aria-label="Filter activities by type"
      >
        <SelectValue placeholder="Filter activities" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Activities</SelectItem>
        <SelectItem value="connection">Connections</SelectItem>
        <SelectItem value="server_change">Server Changes</SelectItem>
        <SelectItem value="settings">Settings</SelectItem>
        <SelectItem value="feedback">Feedback</SelectItem>
      </SelectContent>
    </Select>
  );
}