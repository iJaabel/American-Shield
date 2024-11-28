"use client";

import { useState, useEffect } from "react";

interface RecommendationPreferences {
  weights: {
    latency: number;
    load: number;
    location: number;
    protocol: number;
  };
  prioritizeProtocol?: "wireguard" | "openvpn";
  maxLatency?: number;
  maxLoad?: number;
}

const defaultPreferences: RecommendationPreferences = {
  weights: {
    latency: 40,
    load: 30,
    location: 15,
    protocol: 15,
  },
};

export function useRecommendationPreferences() {
  const [preferences, setPreferences] = useState<RecommendationPreferences>(defaultPreferences);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("vpn-recommendation-preferences");
      if (stored) {
        setPreferences(prev => ({
          ...prev,
          ...JSON.parse(stored),
        }));
      }
    } catch (error) {
      console.error("Error loading recommendation preferences:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        "vpn-recommendation-preferences", 
        JSON.stringify(preferences)
      );
    } catch (error) {
      console.error("Error saving recommendation preferences:", error);
    }
  }, [preferences]);

  const updateWeights = (weights: Partial<RecommendationPreferences["weights"]>) => {
    setPreferences(prev => ({
      ...prev,
      weights: { ...prev.weights, ...weights },
    }));
  };

  const updatePreferences = (newPrefs: Partial<RecommendationPreferences>) => {
    setPreferences(prev => ({ ...prev, ...newPrefs }));
  };

  return {
    preferences,
    updateWeights,
    updatePreferences,
  };
}