"use client";
import { useEffect } from "react";

export default function MockInit() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "1") {
      import("./browser").then(({ worker }) => {
        worker.start({ onUnhandledRequest: "warn" });
        console.log("✅ MSW worker started"); // "bypass" | "warn" | "error"
      });
    }
  }, []);
  return null;
}
