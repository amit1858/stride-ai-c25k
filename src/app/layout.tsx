import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "StrideAI", description: "AI-native Couch-to-5K" };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body><div className="mx-auto max-w-5xl p-6">{children}</div></body></html>; }
