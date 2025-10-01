"use client";
export default function ExerciseHeader(props: {
  title: string;
  path: string[];
  difficulty: string;
  points: number;
  charLimit: number;
}) {
  const { title, path, difficulty, points, charLimit } = props;
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <div className="mt-2 flex flex-col gap-2">
          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 w-fit">
            {difficulty}
          </span>
          <span className="text-sm text-gray-600">⭐ {points} Points</span>
          <span className="text-sm text-gray-600">
            Character Limit: {charLimit}
          </span>
        </div>
      </div>
    </div>
  );
}
