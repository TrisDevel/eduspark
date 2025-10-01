import { api } from "@/lib/fetcher";
import type { UserProfile } from "./types";

export async function getProfile(userId: string) {
  return api<UserProfile>(`/profile/${userId}`);
}

export async function getProfileByUsername(username: string) {
  return api<UserProfile>(`/profile/${username}`);
}

export async function updateProfile(updates: Partial<UserProfile>) {
  return api<UserProfile>("/profile", {
    method: "PUT",
    body: JSON.stringify(updates),
  } as any);
}


