"use client";
import { useEffect } from "react";

declare global { interface Window { __MSW_READY?: boolean } }

export default function MockInit() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "1") {
      import("./browser").then(async ({ worker }) => {
        await worker.start({
          onUnhandledRequest: "bypass", // cảnh báo nếu thiếu handler
          // serviceWorker: { url: "/mockServiceWorker.js" }, // dùng nếu bạn có basePath
        });
        window.__MSW_READY = true;
        window.dispatchEvent(new Event("msw:ready"));
      });
    }
  }, []);
  return null;
}