"use client";

import { Shield, Settings, RefreshCw, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import type { ActivityLogEntry } from "../hooks/use-activity-log";

interface ActivityListProps {
  activities: ActivityLogEntry[];
}

export function ActivityList({ activities }: ActivityListProps) {
  const getIcon = (type: ActivityLogEntry["type"]) => {
    switch (type) {
      case "connection":
        return Shield;
      case "server_change":
        return RefreshCw;
      case "settings":
        return Settings;
      case "feedback":
        return MessageSquare;
      default:
        return Shield;
    }
  };

  if (activities.length === 0) {
    return (
      <div 
        className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground"
        role="status"
      >
        <MessageSquare className="h-12 w-12 mb-4 opacity-50" />
        <p className="text-lg font-medium">No activities to display</p>
        <p className="text-sm">Activities will appear here as you use the application</p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="popLayout">
      <ul className="space-y-4">
        {activities.map(activity => {
          const Icon = getIcon(activity.type);
          const formattedDate = formatDistanceToNow(activity.timestamp, { 
            addSuffix: true 
          });

          return (
            <motion.li
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-start space-x-3 text-sm p-3 rounded-lg bg-muted/50"
              role="article"
            >
              <Icon 
                className="h-4 w-4 mt-1 text-muted-foreground shrink-0" 
                aria-hidden="true"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium">{activity.action}</p>
                {activity.details && (
                  <p className="text-muted-foreground mt-1 break-words">
                    {activity.details}
                  </p>
                )}
                <time 
                  dateTime={new Date(activity.timestamp).toISOString()}
                  className="text-xs text-muted-foreground block mt-1"
                >
                  {formattedDate}
                </time>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </AnimatePresence>
  );
}