import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const BASE_URL = "https://himanshu-mehra.dev";

export const metadata: Metadata = {
  title: "Himanshu Mehra — Backend Engineer",
  description:
    "Senior Backend Engineer specializing in microservices, real-time AI systems, and cloud-native architecture. Java · .NET · Spring Boot · Google Cloud · Docker.",
  keywords: [
    "Backend Engineer",
    "Microservices",
    "Java",
    ".NET",
    "Spring Boot",
    "Cloud Architecture",
    "Real-time Systems",
    "AI Integration",
  ],
  authors: [{ name: "Himanshu Mehra" }],
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: "Himanshu Mehra — Backend Engineer",
    description:
      "Senior Backend Engineer building scalable microservices, real-time AI communication systems, and cloud-native platforms.",
    type: "website",
    url: BASE_URL,
    siteName: "Himanshu Mehra Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Himanshu Mehra — Backend Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Himanshu Mehra — Backend Engineer",
    description:
      "Senior Backend Engineer: microservices, real-time AI, cloud-native architecture. Java · .NET · Spring Boot.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
