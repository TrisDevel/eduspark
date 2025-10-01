import "../globals.css";
import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { AuthProvider } from "@/contexts/authProvider";
import MockInit from "@/mocks/init";

export const metadata: Metadata = {
  title: "EduSpark - Exercise",
  description: "Learning Platform - Exercise",
};

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam-pro",
});

export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={beVietnamPro.className}>
        <MockInit />
        <AuthProvider>{children}</AuthProvider>
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
