import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://builderiy.app"),
  title: "BuilderiY",
  description: "Build your next DIY project with confidence.",
  applicationName: "BuilderiY",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "DIY",
    "home improvement",
    "home renovation",
    "DIY projects",
    "BuilderiY",
    "project planning",
    "home design",
  ],
  openGraph: {
    title: "BuilderiY",
    description: "Build your next DIY project with confidence.",
    siteName: "BuilderiY",
    url: "https://builderiy.app",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BuilderiY",
    description: "Build your next DIY project with confidence.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
