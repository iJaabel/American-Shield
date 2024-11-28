"use client";

import { useState, useEffect } from "react";
import type { Server } from "../types";

interface ServerScore {
  server: Server;
  score: number;
}

export function useServerRecommendations(servers: Server[]) {
  const [recommendations, setRecommendations] = useState<Server[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);

  useEffect(() => {
    // Get user's location if available
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        () => {
          // Fallback to approximate location based on timezone
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          // Simple mapping for common US timezones
          if (timezone.includes("America")) {
            setUserLocation({ lat: 40.7128, lon: -74.0060 }); // New York
          } else if (timezone.includes("Europe")) {
            setUserLocation({ lat: 51.5074, lon: -0.1278 }); // London
          } else {
            setUserLocation({ lat: 35.6762, lon: 139.6503 }); // Tokyo
          }
        }
      );
    }
  }, []);

  useEffect(() => {
    const calculateServerScore = (server: Server): ServerScore => {
      let score = 0;

      // Latency score (0-40 points) - lower is better
      const latencyScore = Math.max(0, 40 - (server.latency / 5));
      score += latencyScore;

      // Load score (0-30 points) - lower is better
      const loadScore = server.load ? Math.max(0, 30 - (server.load / 3)) : 15;
      score += loadScore;

      // Protocol score (0-15 points)
      if (server.protocol === "wireguard") {
        score += 15; // WireGuard is preferred for better performance
      } else if (server.protocol === "openvpn") {
        score += 10;
      }

      // Location score (0-15 points)
      if (userLocation) {
        // Simple distance calculation (not accurate for global distances)
        const distance = Math.sqrt(
          Math.pow(userLocation.lat - getServerLatLon(server.location).lat, 2) +
          Math.pow(userLocation.lon - getServerLatLon(server.location).lon, 2)
        );
        const locationScore = Math.max(0, 15 - (distance / 10));
        score += locationScore;
      }

      return { server, score };
    };

    const getRecommendations = () => {
      const scoredServers = servers
        .map(calculateServerScore)
        .sort((a, b) => b.score - a.score)
        .map(({ server }) => server)
        .slice(0, 3);

      setRecommendations(scoredServers);
    };

    getRecommendations();

    // Update recommendations every 30 seconds
    const interval = setInterval(getRecommendations, 30000);
    return () => clearInterval(interval);
  }, [servers, userLocation]);

  return recommendations;
}

// Helper function to approximate server coordinates
function getServerLatLon(location: string): { lat: number; lon: number } {
  const locations: Record<string, { lat: number; lon: number }> = {
    "New York": { lat: 40.7128, lon: -74.0060 },
    "Los Angeles": { lat: 34.0522, lon: -118.2437 },
    "London": { lat: 51.5074, lon: -0.1278 },
    "Tokyo": { lat: 35.6762, lon: 139.6503 },
  };

  // Find the closest matching location
  const match = Object.keys(locations).find(loc => 
    location.toLowerCase().includes(loc.toLowerCase())
  );

  return match ? locations[match] : { lat: 0, lon: 0 };
}