export interface UserProfile {
  id: string;
  userId: string;
  username: string;
  email: string;
  fullName: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  phone?: string;
  skills?: string[];
  level?: number;
  maxLevel?: number;
  role: string;
  joinedDate: string;
  stats: ProfileStats;
  badges: Badge[];
  recentActivity: Activity[];
}

export interface ProfileStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSubmissions: number;
  acceptanceRate: number;
  ranking: number;
  streak: number;
  points: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export interface Activity {
  id: string;
  type: "solved" | "attempted" | "submitted" | "achievement";
  title: string;
  description: string;
  timestamp: string;
  exerciseId?: string;
  exerciseTitle?: string;
  difficulty?: "Easy" | "Medium" | "Hard";
}
export interface CourseProgress {
  id: string;
  title: string;
  language: string;
  rating: number;
  students: number;
  progress: number;
}
