"use client";
import { useState, useEffect } from "react";
import { getProfile, updateProfile as updateProfileApi } from "../api";
import type { UserProfile } from "../types";
import { useAuth } from "@/contexts/authProvider";

export function useProfile() {
  const [data, setData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const profile = await getProfile(user?.id || "");
        setData(profile);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      const updated = await updateProfileApi(updates);
      setData(updated);
      return updated;
    } catch (err) {
      throw err;
    }
  };

  return { data, loading, error, updateProfile };
}
