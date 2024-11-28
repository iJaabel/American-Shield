"use client";

import { FeedbackAnalytics } from "@/components/vpn/analytics/feedback-analytics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserAccount } from "@/components/vpn/hooks/use-user-account";
import { redirect } from "next/navigation";

export default function AnalyticsPage() {
  const { user, loading } = useUserAccount();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    redirect("/auth");
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
          <CardDescription>
            View detailed analytics about server performance and user feedback
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FeedbackAnalytics />
        </CardContent>
      </Card>
    </div>
  );
}