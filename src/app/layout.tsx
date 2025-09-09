import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer";
import { PropsWithChildren } from "react";
import { Header } from "@/components/header";
import { Sonner } from "@/components/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Course Planner AI",
  description: "Course Planner AI",
  icons: [{
    url: "/calendar.png",
    type: "image/png",
    sizes: "256x256",
  }],
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background antialiased',
          geistSans.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <div className="flex flex-1">{children}</div>
          <Footer />
        </div>
        <Sonner/>
        </ThemeProvider>
      </body>
    </html>
  );
}
