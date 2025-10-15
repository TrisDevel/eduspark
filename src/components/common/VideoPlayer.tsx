"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { extractVideoUrl } from "@/lib/videoUtils";

// Dynamically import ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
}) as any;

interface VideoPlayerProps {
  /**
   * Video URL or iframe string (e.g., YouTube embed iframe)
   */
  url: string;
  /**
   * Show video controls
   */
  controls?: boolean;
  /**
   * Player width (default: "100%")
   */
  width?: string | number;
  /**
   * Player height (default: "100%")
   */
  height?: string | number;
  /**
   * Additional CSS classes for the container
   */
  className?: string;
  /**
   * Show loading state
   */
  playing?: boolean;
  /**
   * Enable looping
   */
  loop?: boolean;
  /**
   * Volume (0-1)
   */
  volume?: number;
  /**
   * Muted state
   */
  muted?: boolean;
}

/**
 * VideoPlayer component that can handle both direct video URLs and iframe embed strings
 * Supports YouTube, Vimeo, and other video platforms through react-player
 *
 * @example
 * ```tsx
 * // With direct URL
 * <VideoPlayer url="https://www.youtube.com/watch?v=VIDEO_ID" />
 *
 * // With iframe string
 * <VideoPlayer url='<iframe src="https://www.youtube.com/embed/VIDEO_ID" />' />
 * ```
 */
export default function VideoPlayer({
  url,
  controls = true,
  width = "100%",
  height = "100%",
  className = "",
  playing = false,
  loop = false,
  volume = 0.8,
  muted = false,
}: VideoPlayerProps) {
  const videoUrl = extractVideoUrl(url);

  // Debug logging (can be removed in production)
  // console.log("VideoPlayer Debug:", {
  //   originalUrl: url,
  //   extractedUrl: videoUrl,
  //   urlLength: url?.length,
  //   isIframe: url?.trim().startsWith("<iframe"),
  // });

  if (!videoUrl) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 ${className}`}
      >
        <div className="text-center p-8">
          <svg
            className="w-16 h-16 mx-auto text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <p className="text-gray-600 text-sm">No video URL provided</p>
        </div>
      </div>
    );
  }

  // Try ReactPlayer first, fallback to iframe if it fails
  const [useIframe, setUseIframe] = useState(true); // Force iframe for now
  const [isPaused, setIsPaused] = useState(false);
  // Auto-fallback after 2 seconds if ReactPlayer doesn't load
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("ReactPlayer timeout, falling back to iframe");
      setUseIframe(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (useIframe) {
    // Clean URL to remove playlist and add parameters to hide suggestions
    const cleanUrl = videoUrl.includes("?")
      ? `${videoUrl}&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&autohide=1&controls=1&disablekb=0&fs=1&playsinline=1&start=0&end=0&loop=0&list=&listType=&playlist=`
      : `${videoUrl}?rel=0&showinfo=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&autohide=1&controls=1&disablekb=0&fs=1&playsinline=1&start=0&end=0&loop=0&list=&listType=&playlist=`;

    return (
      <div className={`w-full h-full ${className}`}>
        <iframe
          src={cleanUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          title="Video Player"
          className="w-full h-full"
        />
      </div>
    );
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <ReactPlayer
        url={videoUrl}
        controls={controls}
        width="100%"
        height="100%"
        playing={playing}
        loop={loop}
        volume={volume}
        muted={muted}
        onReady={() => console.log("ReactPlayer: Ready")}
        onStart={() => console.log("ReactPlayer: Started")}
        onError={(error: any) => {
          console.error("ReactPlayer Error:", error);
          console.log("Falling back to iframe");
          setUseIframe(true);
        }}
        onLoadStart={() => console.log("ReactPlayer: Load started")}
        onLoad={() => console.log("ReactPlayer: Loaded")}
        onPause={() => setIsPaused(true)}
        onPlay={() => setIsPaused(false)}
        config={
          {
            youtube: {
              playerVars: {
                // Hide related videos and suggestions
                rel: 0, // Don't show related videos at the end
                showinfo: 0, // Hide video info overlay
                modestbranding: 1, // Hide YouTube logo

                // Hide "More videos" and suggestions
                list: "", // Don't show playlist
                listType: "", // No playlist type
                playlist: "", // No playlist

                // Hide annotations and captions
                iv_load_policy: 3, // Hide annotations
                cc_load_policy: 0, // Hide closed captions by default

                // Player behavior
                autohide: 1, // Auto-hide controls
                controls: 1, // Show controls
                fs: 1, // Allow fullscreen
                disablekb: 0, // Enable keyboard controls
                playsinline: 1, // Play inline on mobile

                // Additional settings to hide suggestions
                start: 0, // Start from beginning
                end: 0, // No end time
                loop: 0, // Don't loop

                // Security and API
                enablejsapi: 1, // Enable JavaScript API
                origin:
                  typeof window !== "undefined" ? window.location.origin : "",
              },
            },
            vimeo: {
              playerOptions: {
                byline: false,
                portrait: false,
                title: false,
                transparent: true,
                autopause: true,
                autoplay: false,
              },
            },
          } as any
        }
      />
      {isPaused && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-white text-lg">
          Video paused — click to resume
        </div>
      )}
    </div>
  );
}
