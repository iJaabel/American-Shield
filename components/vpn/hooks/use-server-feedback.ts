"use client";

import { useState, useEffect } from "react";

interface ServerFeedback {
  serverId: string;
  rating: number;
  timestamp: number;
  isRecommended: boolean;
}

interface FeedbackStats {
  averageRating: number;
  totalFeedback: number;
  recommendationAccuracy: number;
}

export function useServerFeedback() {
  const [feedback, setFeedback] = useState<ServerFeedback[]>([]);
  const [stats, setStats] = useState<Record<string, FeedbackStats>>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem("vpn-server-feedback");
      if (stored) {
        setFeedback(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading feedback:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("vpn-server-feedback", JSON.stringify(feedback));
      calculateStats();
    } catch (error) {
      console.error("Error saving feedback:", error);
    }
  }, [feedback]);

  const calculateStats = () => {
    const newStats: Record<string, FeedbackStats> = {};
    
    feedback.forEach(item => {
      if (!newStats[item.serverId]) {
        newStats[item.serverId] = {
          averageRating: 0,
          totalFeedback: 0,
          recommendationAccuracy: 0,
        };
      }
      
      const serverStats = newStats[item.serverId];
      serverStats.totalFeedback++;
      serverStats.averageRating = (
        (serverStats.averageRating * (serverStats.totalFeedback - 1)) + 
        item.rating
      ) / serverStats.totalFeedback;
      
      if (item.isRecommended) {
        serverStats.recommendationAccuracy = (
          serverStats.recommendationAccuracy + 
          (item.rating >= 4 ? 1 : 0)
        ) / serverStats.totalFeedback;
      }
    });

    setStats(newStats);
  };

  const addFeedback = (
    serverId: string, 
    rating: number, 
    isRecommended: boolean
  ) => {
    setFeedback(prev => [
      ...prev,
      {
        serverId,
        rating,
        isRecommended,
        timestamp: Date.now(),
      }
    ]);
  };

  const getServerStats = (serverId: string): FeedbackStats | null => {
    return stats[serverId] || null;
  };

  return {
    addFeedback,
    getServerStats,
    stats,
  };
}