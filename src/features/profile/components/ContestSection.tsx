"use client";

interface ContestSectionProps {
  contests?: any[];
}

export default function ContestSection({ contests = [] }: ContestSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">CUỘC THI</h2>

      {/* Empty State */}
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Chưa có cuộc thi nào
        </h3>
        <p className="text-gray-600 mb-6 max-w-sm mx-auto">
          Tham gia các cuộc thi để thử thách bản thân và nhận giải thưởng hấp
          dẫn
        </p>

        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
          Tham gia ngay
        </button>
      </div>
    </div>
  );
}
