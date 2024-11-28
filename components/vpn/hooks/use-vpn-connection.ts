"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { Server, ConnectionStats, ConnectionError } from "../types";

export function useVpnConnection(selectedServer: Server) {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [stats, setStats] = useState<ConnectionStats | null>(null);
  const [error, setError] = useState<ConnectionError | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected && stats) {
      interval = setInterval(() => {
        setStats(prev => {
          if (!prev) return null;
          return {
            ...prev,
            bytesReceived: prev.bytesReceived + Math.floor(Math.random() * 100000),
            bytesSent: prev.bytesSent + Math.floor(Math.random() * 50000),
            protocol: selectedServer.protocol,
          };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnected, stats, selectedServer.protocol]);

  const handleError = (err: Error, code: string = "CONNECTION_ERROR") => {
    const error = {
      code,
      message: err.message || "Failed to connect to VPN",
    };
    setError(error);
    toast.error(error.message, {
      description: "Click 'Try Again' to retry the connection",
    });
  };

  const connect = async () => {
    try {
      setIsConnecting(true);
      setError(null);
      
      // Simulate connection process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate random connection error
      if (Math.random() < 0.1) {
        throw new Error("Connection timed out");
      }

      setIsConnected(true);
      setStats({
        bytesReceived: 0,
        bytesSent: 0,
        connectedTime: Date.now(),
        latency: selectedServer.latency,
        protocol: selectedServer.protocol,
      });
      setRetryCount(0);
      
      toast.success(`Connected to ${selectedServer.name}`, {
        description: "Your connection is now secure",
      });
    } catch (err) {
      handleError(err instanceof Error ? err : new Error("Unknown error"));
      
      // Auto-retry logic
      if (retryCount < MAX_RETRIES) {
        setRetryCount(prev => prev + 1);
        toast.info("Attempting to reconnect...");
        setTimeout(connect, 2000);
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = async () => {
    try {
      setIsConnecting(true);
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsConnected(false);
      setStats(null);
      setRetryCount(0);
      toast.success("Disconnected from VPN");
    } catch (err) {
      handleError(
        err instanceof Error ? err : new Error("Failed to disconnect"),
        "DISCONNECT_ERROR"
      );
    } finally {
      setIsConnecting(false);
    }
  };

  const retry = () => {
    setRetryCount(0);
    connect();
  };

  return {
    isConnected,
    isConnecting,
    stats,
    error,
    connect,
    disconnect,
    retry,
  };
}