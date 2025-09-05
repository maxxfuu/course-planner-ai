import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen antialiased',
          geistSans.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className={`relative flex min-h-screen flex-col`}>
          <Header />
          <div className="flex flex-1">{children}</div>
          <Footer />
        </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
