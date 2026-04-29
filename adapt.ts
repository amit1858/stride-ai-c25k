import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StrideAI Couch-to-5K",
  description: "AI-native adaptive Couch-to-5K running coach.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
