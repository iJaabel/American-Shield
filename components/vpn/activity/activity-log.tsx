"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { ActivityLogEntry } from "../hooks/use-activity-log";
import { ActivityHeader } from "./activity-header";
import { ActivityFilters } from "./activity-filters";
import { ActivityList } from "./activity-list";
import { useDebounce } from "../hooks/use-debounce";

interface ActivityLogProps {
  activities: ActivityLogEntry[];
  onClearLog: () => void;
}

export function ActivityLog({ activities, onClearLog }: ActivityLogProps) {
  const [filter, setFilter] = useState<ActivityLogEntry["type"] | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  // Debounce search query to improve performance
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Memoize filtered activities for performance
  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      const matchesFilter = filter === "all" || activity.type === filter;
      const matchesSearch = debouncedSearch === "" || 
        activity.action.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        (activity.details?.toLowerCase().includes(debouncedSearch.toLowerCase()));
      const matchesDate = !dateRange.from || !dateRange.to || (
        activity.timestamp >= dateRange.from.getTime() &&
        activity.timestamp <= dateRange.to.getTime()
      );
      return matchesFilter && matchesSearch && matchesDate;
    });
  }, [activities, filter, debouncedSearch, dateRange]);

  return (
    <Card>
      <ActivityHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchClear={() => setSearchQuery("")}
        filter={filter}
        onFilterChange={setFilter}
        onClearLog={onClearLog}
        activities={filteredActivities}
      />
      
      <CardContent className="space-y-6">
        <ActivityFilters 
          onDateChange={setDateRange}
          dateRange={dateRange}
        />
        
        <div 
          role="log"
          aria-label="Activity log entries"
          aria-live="polite"
          aria-relevant="additions"
        >
          <ActivityList activities={filteredActivities} />
        </div>
      </CardContent>
    </Card>
  );
}