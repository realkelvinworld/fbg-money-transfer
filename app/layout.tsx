import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Transaction History | FBN Ghana",
  description: "Your FBN Ghana account statement at a glance.",
  icons: {
    icon: "/images/logo-blue.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark')}catch(_){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <div className="fixed bottom-8 right-8 z-50">
          <AnimatedThemeToggler className="flex items-center justify-center size-11 rounded-full bg-background border border-border shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 text-foreground cursor-pointer" />
        </div>
      </body>
    </html>
  );
}
