import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider"

import { TRPCReactProvider } from "@/trpc/client";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  title: "LifeBuddy AI – Your Life, Remembered & Reimagined",
  description:
    "LifeBuddy AI transforms your real-life moments — messages, photos, calls, and emotions — into manga-style comics, reels, and storybooks. Your AI Biographer.",
  keywords: [
    "LifeBuddy AI",
    "AI Biographer",
    "Memory AI",
    "Manga Generator",
    "Life Story AI",
    "Storybook AI",
  ],
  authors: [{ name: "Appaji Nagaraja Dheeraj" }],
  icons: {
    icon: "/lifebuddy-logo.svg",
  },
  openGraph: {
    title: "LifeBuddy AI — Your Life as Manga, Films & Timeless Memories",
    description:
      "Your AI Biographer. LifeBuddy transforms scattered digital moments into comics, reels, and emotional story chapters.",
    url: "https://lifebuddy-ai.vercel.app",
    siteName: "LifeBuddy AI",
    images: [
      {
        url: "/lifebuddy-og.png",
        width: 1200,
        height: 630,
        alt: "LifeBuddy AI - Your AI Biographer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TRPCReactProvider>
    <html lang="en">
      <body
        className={`${inter.className} antialiased`} suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Toaster richColors />
          {children}
        </ThemeProvider>
      </body>
    </html>
    </TRPCReactProvider>
  );
}
