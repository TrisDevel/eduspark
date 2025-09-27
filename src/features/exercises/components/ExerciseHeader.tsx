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
    <div className="flex items-center justify-between">
      <div>
        <div className="text-xs text-gray-400">{path.join(" › ")}</div>
        <h1 className="mt-1 text-2xl font-bold">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
          {difficulty}
        </span>x``
        <span className="text-sm text-gray-600">⭐ {points} Points</span>
        <span className="text-sm text-gray-600">Character Limit: {charLimit}</span>
      </div>
    </div>
  );
}