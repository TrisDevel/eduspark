"use client";
// app/not-found.tsx
// Dynacap-inspired 404 with glitchy, large-type, minimal layout
// TailwindCSS + styled-jsx (for glitch effect). Colors read from CSS variables
// --brand-bg, --brand-primary, --brand-muted. Fallbacks are provided.

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[var(--brand-bg,_#0b0e14)] px-6 py-16 text-[var(--brand-muted,_#94a3b8)]">
      {/* subtle grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.04),transparent_60%)] [mask-image:linear-gradient(#000,transparent_70%)]"
      />

      {/* Card */}
      <section className="relative z-10 mx-auto w-full max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
        {/* Header: code icon */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-[var(--brand-primary,_#60a5fa)]">
            <span className="font-semibold tracking-tight">&lt;/&gt;</span>
          </div>
          <div className="text-sm uppercase tracking-wider text-white/60">Not Found</div>
        </div>

        {/* Big glitchy 404 */}
        <div className="relative">
          <h1 className="glitch text-7xl font-black leading-none text-white sm:text-8xl" data-text="404">
            404
          </h1>
          <p className="mt-5 max-w-prose text-base text-white/70 sm:text-lg">
            Trang bạn đang tìm không tồn tại hoặc đã được di chuyển.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-[var(--brand-primary,_#60a5fa)] px-4 py-2 text-sm font-medium text-white shadow transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            Về trang chủ
          </a>
          <a
            href="/sitemap"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur hover:bg-white/10"
          >
            Xem sitemap
          </a>
        </div>
      </section>

      {/* Scanlines + vignette for subtle depth */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.02)_2px,rgba(255,255,255,0.02)_3px)] opacity-40" />
      <div aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.6)]" />

      {/* styled-jsx for glitch effect */}
      <style jsx>{`
        .glitch {
          position: relative;
          display: inline-block;
          letter-spacing: -0.02em;
          text-shadow: 0 0 0 rgba(255, 255, 255, 0.8);
        }
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          overflow: hidden;
          clip-path: inset(0 0 0 0);
        }
        .glitch::before {
          transform: translate3d(-2px, 0, 0);
          color: var(--brand-primary, #60a5fa);
          mix-blend-mode: screen;
          animation: glitchShift 2s infinite linear alternate-reverse;
          filter: drop-shadow(0 0 12px color-mix(in oklab, var(--brand-primary, #60a5fa) 60%, white 10%));
        }
        .glitch::after {
          transform: translate3d(2px, 0, 0);
          color: #f43f5e; /* secondary accent (can tweak in Tailwind config) */
          mix-blend-mode: screen;
          animation: glitchSlice 2.2s infinite linear alternate;
          filter: drop-shadow(0 0 8px rgba(244, 63, 94, 0.6));
        }
        @keyframes glitchShift {
          0% { clip-path: inset(0 0 0 0); }
          10% { clip-path: inset(10% 0 60% 0); }
          20% { clip-path: inset(40% 0 30% 0); }
          30% { clip-path: inset(80% 0 2% 0); }
          40% { clip-path: inset(20% 0 60% 0); }
          50% { clip-path: inset(0 0 0 0); }
          60% { clip-path: inset(30% 0 40% 0); }
          70% { clip-path: inset(70% 0 10% 0); }
          80% { clip-path: inset(10% 0 70% 0); }
          90% { clip-path: inset(50% 0 20% 0); }
          100% { clip-path: inset(0 0 0 0); }
        }
        @keyframes glitchSlice {
          0% { clip-path: inset(60% 0 0 0); }
          20% { clip-path: inset(40% 0 20% 0); }
          40% { clip-path: inset(70% 0 5% 0); }
          60% { clip-path: inset(10% 0 60% 0); }
          80% { clip-path: inset(0 0 0 0); }
          100% { clip-path: inset(50% 0 20% 0); }
        }
      `}</style>
    </main>
  );
}
