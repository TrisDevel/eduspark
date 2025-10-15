"use client";
import type { UserProfile } from "../types";

interface ProfileInfoProps {
  profile: UserProfile;
}

export default function ProfileInfo({ profile }: ProfileInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Profile Avatar and Basic Info */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="relative h-24 w-24 rounded-full overflow-hidden bg-gray-200 mb-4">
          <div className="flex items-center justify-center h-full text-4xl text-gray-400">
            {profile.fullName.charAt(0).toUpperCase()}
          </div>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {profile.fullName}
        </h2>
        <p className="text-gray-600 text-sm">@{profile.username}</p>
        <p className="text-gray-600 text-sm mt-1">{profile.email}</p>
      </div>

      {/* Personal Information */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Thông tin cá nhân
        </h3>
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <svg
              className="h-4 w-4 mr-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {profile.email}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <svg
              className="h-4 w-4 mr-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            {profile.roles.map((role) => role.name).join(", ")}
          </div>
        </div>
      </div>

      {/* Account Status */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Trạng thái tài khoản
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Hoạt động:</span>
            <span
              className={`font-medium ${profile.enabled ? "text-green-600" : "text-red-600"}`}
            >
              {profile.enabled ? "Bật" : "Tắt"}
            </span>
          </div>
          
        </div>
      </div>
    </div>
  );
}
