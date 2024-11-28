"use client";

import { CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityExport } from "./activity-export";
import { ActivitySearch } from "./activity-search";
import { ActivityTypeFilter } from "./activity-type-filter";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { ActivityLogEntry } from "../hooks/use-activity-log";

interface ActivityHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchClear: () => void;
  filter: ActivityLogEntry["type"] | "all";
  onFilterChange: (value: ActivityLogEntry["type"] | "all") => void;
  onClearLog: () => void;
  activities: ActivityLogEntry[];
}

export function ActivityHeader({
  searchQuery,
  onSearchChange,
  onSearchClear,
  filter,
  onFilterChange,
  onClearLog,
  activities,
}: ActivityHeaderProps) {
  return (
    <CardHeader className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <CardTitle>Activity Log</CardTitle>
          <p className="text-sm text-muted-foreground">
            {activities.length} {activities.length === 1 ? 'entry' : 'entries'}
          </p>
        </div>
        <ActivityExport activities={activities} />
      </div>
      
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <ActivitySearch
              value={searchQuery}
              onChange={onSearchChange}
              onClear={onSearchClear}
            />
          </div>
          <div className="flex items-center space-x-2">
            <ActivityTypeFilter
              value={filter}
              onChange={onFilterChange}
            />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={activities.length === 0}
                  aria-label="Clear activity log"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear Activity Log</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete all activity log entries.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={onClearLog}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Clear Log
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </CardHeader>
  );
}