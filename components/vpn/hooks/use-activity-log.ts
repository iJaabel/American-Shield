"use client";

import { useState, useEffect } from "react";

export interface ActivityLogEntry {
  id: string;
  type: "connection" | "server_change" | "settings" | "feedback";
  action: string;
  details?: string;
  timestamp: number;
  serverId?: string;
}

export function useActivityLog() {
  const [activities, setActivities] = useState<ActivityLogEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("vpn-activity-log");
      if (stored) {
        setActivities(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading activity log:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("vpn-activity-log", JSON.stringify(activities));
      } catch (error) {
        console.error("Error saving activity log:", error);
      }
    }
  }, [activities, isLoaded]);

  const logActivity = (
    type: ActivityLogEntry["type"],
    action: string,
    details?: string,
    serverId?: string
  ) => {
    const newActivity: ActivityLogEntry = {
      id: crypto.randomUUID(),
      type,
      action,
      details,
      serverId,
      timestamp: Date.now(),
    };

    setActivities(prev => [newActivity, ...prev].slice(0, 100)); // Keep last 100 activities
  };

  const clearActivityLog = () => {
    setActivities([]);
  };

  return {
    activities,
    logActivity,
    clearActivityLog,
  };
}