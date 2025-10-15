export interface Role {
  id: number;
  name: string;
}

export interface Authority {
  authority: string;
}

export interface Quiz {
  // Add quiz fields as needed when quiz structure is known
  id?: number;
  title?: string;
}

export interface PurchasedCourse {
  id: number;
  name: string;
  code: string;
  description: string;
  published: boolean;
  image: string;
  price: number;
  discount: number;
  durationInWeeks: number;
  language: string;
  level: string;
  quizzes: Quiz[];
  discountedPrice: number;
}

export interface UserProfile {
  id: number;
  username: string;
  password: string;
  fullName: string;
  email: string;
  participatedQuizzes: Quiz[];
  createdCourses: PurchasedCourse[];
  taughtCourses: PurchasedCourse[];
  purchasedCourses: PurchasedCourse[];
  attemptedCourses: PurchasedCourse[];
  roles: Role[];
  testSessions: any[]; // Type as needed when structure is known
  enabled: boolean;
  authorities: Authority[];
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
}

// Legacy interfaces - kept for backward compatibility with existing components
// These may need to be computed from UserProfile data or fetched separately
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
