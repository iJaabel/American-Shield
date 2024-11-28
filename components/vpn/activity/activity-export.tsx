"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import type { ActivityLogEntry } from "../hooks/use-activity-log";

interface ActivityExportProps {
  activities: ActivityLogEntry[];
}

export function ActivityExport({ activities }: ActivityExportProps) {
  const exportToCSV = () => {
    const headers = ["Type", "Action", "Details", "Date", "Server ID"];
    const csvContent = [
      headers.join(","),
      ...activities.map(activity => [
        activity.type,
        `"${activity.action.replace(/"/g, '""')}"`,
        `"${(activity.details || "").replace(/"/g, '""')}"`,
        new Date(activity.timestamp).toISOString(),
        activity.serverId || ""
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `activity-log-${new Date().toISOString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(activities, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `activity-log-${new Date().toISOString()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={exportToCSV}
        className="flex items-center"
      >
        <Download className="mr-2 h-4 w-4" />
        Export CSV
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={exportToJSON}
        className="flex items-center"
      >
        <Download className="mr-2 h-4 w-4" />
        Export JSON
      </Button>
    </div>
  );
}