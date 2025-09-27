import ExerciseClient from "@/features/exercises/components/ExerciseClient";

// NOTE: Gọi startMocks() trong một client-side bootstrap (vd: app/providers/MockProvider.tsx) trước khi render ExerciseClient khi NEXT_PUBLIC_USE_MOCK=1.

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolved =
    typeof (params as any)?.then === "function"
      ? await (params as Promise<{ slug: string }>)
      : (params as { slug: string });
  console.debug(
    "[page exercises/[slug]] typeof params =",
    typeof params,
    "slug =",
    resolved.slug
  );
  return <ExerciseClient slug={resolved.slug} />;
}