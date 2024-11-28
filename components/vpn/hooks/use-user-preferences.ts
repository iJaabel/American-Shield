"use client";

import { useState, useEffect } from "react";

interface UserPreferences {
  favoriteServers: string[];
  lastConnectedServer?: string;
  preferredView: "grid" | "list";
  autoConnect: boolean;
  preferredProtocol?: "wireguard" | "openvpn";
  notifications: {
    connectionStatus: boolean;
    serverUpdates: boolean;
    performanceAlerts: boolean;
  };
}

const defaultPreferences: UserPreferences = {
  favoriteServers: [],
  preferredView: "grid",
  autoConnect: false,
  notifications: {
    connectionStatus: true,
    serverUpdates: true,
    performanceAlerts: true,
  },
};

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("vpn-preferences");
      if (stored) {
        setPreferences(prev => ({
          ...defaultPreferences,
          ...JSON.parse(stored),
        }));
      }
    } catch (error) {
      console.error("Error loading preferences:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("vpn-preferences", JSON.stringify(preferences));
      } catch (error) {
        console.error("Error saving preferences:", error);
      }
    }
  }, [preferences, isLoaded]);

  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }));
  };

  const toggleFavoriteServer = (serverId: string) => {
    setPreferences(prev => ({
      ...prev,
      favoriteServers: prev.favoriteServers.includes(serverId)
        ? prev.favoriteServers.filter(id => id !== serverId)
        : [...prev.favoriteServers, serverId],
    }));
  };

  const toggleNotification = (type: keyof UserPreferences["notifications"]) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type],
      },
    }));
  };

  return {
    preferences,
    isLoaded,
    updatePreferences,
    toggleFavoriteServer,
    toggleNotification,
  };
}