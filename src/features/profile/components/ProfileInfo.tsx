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
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.fullName}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-4xl text-gray-400">
              {profile.fullName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <p className="text-gray-600 text-sm">{profile.email}</p>
        <p className="text-gray-800 font-medium mt-1">
          LP {profile.level || 0}/{profile.maxLevel || 51}
        </p>
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
          {profile.phone && (
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {profile.phone}
            </div>
          )}
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {new Date(profile.joinedDate).toLocaleDateString("vi-VN")}
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Kỹ năng</h3>
          <button className="text-orange-500 text-sm hover:text-orange-600">
            Chỉnh sửa
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {profile.skills?.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* About Me */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Giới thiệu</h3>
          <button className="text-orange-500 text-sm hover:text-orange-600">
            Chỉnh sửa
          </button>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">
          {profile.bio || "Chưa có thông tin giới thiệu"}
        </p>
      </div>
    </div>
  );
}
