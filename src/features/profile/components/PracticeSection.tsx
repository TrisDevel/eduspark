"use client";
import type { ProfileStats } from "../types";

interface PracticeSectionProps {
  stats: ProfileStats;
}

export default function PracticeSection({ stats }: PracticeSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">LUYỆN TẬP</h2>

      {/* Practice Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Score */}
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Tổng điểm</h3>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {stats.points}
          </div>
          <div className="text-xs text-gray-500">điểm</div>
        </div>

        {/* Easy */}
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Easy</h3>
          <div className="text-xs text-gray-500 mb-1">
            Điểm {stats.easySolved * 10}
          </div>
          <div className="text-xs text-gray-500">
            Hoàn thành {stats.easySolved}
          </div>
        </div>

        {/* Medium */}
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Medium</h3>
          <div className="text-xs text-gray-500 mb-1">
            Điểm {stats.mediumSolved * 20}
          </div>
          <div className="text-xs text-gray-500">
            Hoàn thành {stats.mediumSolved}
          </div>
        </div>

        {/* Hard */}
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Hard</h3>
          <div className="text-xs text-gray-500 mb-1">
            Điểm {stats.hardSolved * 30}
          </div>
          <div className="text-xs text-gray-500">
            Hoàn thành {stats.hardSolved}
          </div>
        </div>
      </div>
    </div>
  );
}
