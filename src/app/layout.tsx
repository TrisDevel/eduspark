import "./globals.css";
import type { Metadata } from "next";
import { Be_Vietnam_Pro } from 'next/font/google';

export const metadata: Metadata = {
  title: "EduSpark",
  description: "Learning Platform",
};

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-be-vietnam-pro',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={beVietnamPro.className}>{children}</body>
    </html>
  );
}
