"use client";

import { ActivityLog } from "@/components/vpn/activity/activity-log";
import { useActivityLog } from "@/components/vpn/hooks/use-activity-log";
import { useUserAccount } from "@/components/vpn/hooks/use-user-account";
import { redirect } from "next/navigation";

export default function ActivityPage() {
  const { user, loading } = useUserAccount();
  const { activities, clearActivityLog } = useActivityLog();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    redirect("/auth");
  }

  return (
    <div className="container mx-auto p-6">
      <ActivityLog 
        activities={activities} 
        onClearLog={clearActivityLog} 
      />
    </div>
  );
}