"use client";
import { useProfile } from "@/features/profile/hooks/useProfile";
import ProfileInfo from "@/features/profile/components/ProfileInfo";
import LearningSection from "@/features/profile/components/LearningSection";
import ContestSection from "@/features/profile/components/ContestSection";
import PracticeSection from "@/features/profile/components/PracticeSection";
import Breadcrumb from "@/components/common/Breadcrumb";
import { ROUTES } from "@/config/routes";
import Protected from "@/components/layout/Protected";

export default function ProfilePage() {
  const { data: profile, loading, error } = useProfile();

  if (loading) {
    return (
      <main className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Đang tải profile...</div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-6">
        <div className="text-red-600">Lỗi tải profile: {error.message}</div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="p-6">
        <div className="text-gray-600">Không tìm thấy profile</div>
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
              <ProfileInfo profile={profile} />
            </div>

            {/* Right Content - Learning, Contest, Practice */}
            <div className="lg:col-span-3 space-y-6">
              {/* Learning Section */}
              <LearningSection />

              {/* Contest Section */}
              <ContestSection />

              {/* Practice Section */}
              <PracticeSection stats={profile.stats} />
            </div>
          </div>
        </div>
      </main>
    </Protected>
  );
}
