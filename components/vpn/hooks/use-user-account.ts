"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export interface UserProfile {
  id: string;
  email: string;
  preferences: {
    favoriteServers: string[];
    lastConnectedServer?: string;
    preferredView: "grid" | "list";
    autoConnect: boolean;
    preferredProtocol?: "wireguard" | "openvpn";
  };
  subscription: {
    status: "active" | "trialing" | "canceled" | "expired";
    expiresAt?: string;
  };
}

export function useUserAccount() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          await loadUserProfile(session.user.id);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;

      setUser(data);
    } catch (error) {
      console.error("Error loading user profile:", error);
      toast.error("Failed to load user profile");
    }
  };

  const updateUserPreferences = async (preferences: Partial<UserProfile["preferences"]>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          preferences: { ...user.preferences, ...preferences }
        })
        .eq("id", user.id);

      if (error) throw error;

      setUser(prev => prev ? {
        ...prev,
        preferences: { ...prev.preferences, ...preferences }
      } : null);

      toast.success("Preferences updated successfully");
    } catch (error) {
      console.error("Error updating preferences:", error);
      toast.error("Failed to update preferences");
    }
  };

  return {
    user,
    loading,
    updateUserPreferences
  };
}