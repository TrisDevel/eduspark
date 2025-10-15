import { api } from "@/lib/fetcher";
import type { UserProfile } from "./types";

export async function getProfile() {
 const res = await api<UserProfile>(`/auth/profile`,{
  method: "GET"
 });
 return res.data;
}

export async function getProfileByUsername(username: string) {
  const res = await api<UserProfile>(`/profile/${username}`,{
    method: "GET"
  });
  return res.data;
}

export async function updateProfile(updates: Partial<UserProfile>) {
  const res = await api<UserProfile>("/profile", {
    method: "PUT",
    body: JSON.stringify(updates),
  } as any);
  return res.data;
}


