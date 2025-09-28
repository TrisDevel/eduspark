import "./globals.css";
import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { AuthProvider } from "@/contexts/authProvider";
import MockInit from "@/mocks/init";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "EduSpark",
  description: "Learning Platform",
};

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam-pro",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={beVietnamPro.className}>
        <MockInit />
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
        <Toaster position="top-right" richColors closeButton />{" "}
        {/* Sonner Toast */}
      </body>
    </html>
  );
}
