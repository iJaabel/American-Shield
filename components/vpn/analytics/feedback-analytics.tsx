"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useServerFeedback } from "../hooks/use-server-feedback";
import { servers } from "../data/servers";

export function FeedbackAnalytics() {
  const { stats } = useServerFeedback();

  const chartData = servers.map(server => ({
    name: server.name,
    rating: stats[server.id]?.averageRating || 0,
    accuracy: (stats[server.id]?.recommendationAccuracy || 0) * 100
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Server Performance Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="rating" 
                stroke="hsl(var(--primary))" 
                name="Average Rating"
              />
              <Line 
                type="monotone" 
                dataKey="accuracy" 
                stroke="hsl(var(--secondary))" 
                name="Recommendation Accuracy (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {servers.map(server => {
            const serverStats = stats[server.id];
            return (
              <Card key={server.id}>
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2">{server.name}</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      Average Rating: {serverStats?.averageRating.toFixed(1) || "N/A"}
                    </p>
                    <p>
                      Total Feedback: {serverStats?.totalFeedback || 0}
                    </p>
                    <p>
                      Recommendation Accuracy:{" "}
                      {((serverStats?.recommendationAccuracy || 0) * 100).toFixed(1)}%
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}