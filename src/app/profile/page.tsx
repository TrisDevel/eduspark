"use client";
import { useProfile } from "@/features/profile/hooks/useProfile";
import ProfileInfo from "@/features/profile/components/ProfileInfo";
import LearningSection from "@/features/profile/components/LearningSection";
import ContestSection from "@/features/profile/components/ContestSection";
import Breadcrumb from "@/components/common/Breadcrumb";
import { ROUTES } from "@/config/routes";
import Protected from "@/components/layout/Protected";
import { PurchasedCourse, UserProfile } from "@/features/profile/types";

export default function ProfilePage() {
  // Always call hooks at the top level - never conditionally
  const { data: profile, loading, error } = useProfile();

  if (error) {
    return (
      <main className="p-6">
        <div className="text-red-600">Lỗi tải profile: {error.message}</div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="p-6">
        <div>Đang tải...</div>
      </main>
    );
  }

  return (
    <Protected>
      <main className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb
            items={[{ label: "Home", href: ROUTES.home }, { label: "Profile" }]}
          />

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Profile Info */}
            <div className="lg:col-span-1">
              <ProfileInfo profile={profile as UserProfile} />
            </div>

            {/* Right Content - Learning, Contest, Practice */}
            <div className="lg:col-span-3 space-y-6">
              {/* Learning Section */}
              <LearningSection
                courses={profile?.purchasedCourses as PurchasedCourse[]}
              />

              {/* Contest Section */}
              <ContestSection />
            </div>
          </div>
        </div>
      </main>
    </Protected>
  );
}
