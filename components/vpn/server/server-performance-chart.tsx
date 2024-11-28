"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import type { Server } from "../types";

interface PerformanceData {
  timestamp: number;
  latency: number;
  load: number;
}

interface ServerPerformanceChartProps {
  server: Server;
}

export function ServerPerformanceChart({ server }: ServerPerformanceChartProps) {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);

  useEffect(() => {
    // Simulate real-time performance data updates
    const interval = setInterval(() => {
      setPerformanceData(prev => {
        const now = Date.now();
        const newData = {
          timestamp: now,
          latency: server.latency + (Math.random() * 20 - 10),
          load: server.load ? server.load + (Math.random() * 10 - 5) : 50,
        };

        // Keep last 20 data points
        const updatedData = [...prev, newData].slice(-20);
        return updatedData;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [server]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Server Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <XAxis 
                dataKey="timestamp"
                tickFormatter={(value) => new Date(value).toLocaleTimeString()}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(value) => new Date(value).toLocaleTimeString()}
              />
              <Line 
                type="monotone"
                dataKey="latency"
                stroke="hsl(var(--primary))"
                name="Latency (ms)"
              />
              <Line
                type="monotone"
                dataKey="load"
                stroke="hsl(var(--secondary))"
                name="Load (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}