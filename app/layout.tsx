import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

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
  openGraph: {
    title: "Himanshu Mehra — Backend Engineer",
    description:
      "Senior Backend Engineer building scalable microservices, real-time AI communication systems, and cloud-native platforms.",
    type: "website",
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
