import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "HH Plumbing and Gas | Professional Plumbing Services",
  description:
    "HH Plumbing and Gas provides professional plumbing, heating and gas services including boiler installations, heat pump installations, bathroom installations and emergency repairs.",
  generator: "v0.dev",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/images/logo-HH.png",
    apple: "/images/logo-HH.png",
  },
  openGraph: {
    title: "HH Plumbing and Gas | Professional Plumbing Services",
    description:
      "HH Plumbing and Gas provides professional plumbing, heating and gas services including boiler installations, heat pump installations, bathroom installations and emergency repairs.",
    url: "https://hh-plumbing-gas.vercel.app",
    siteName: "HH Plumbing and Gas",
    images: [
      {
        url: "https://hh-plumbing-gas.vercel.app/images/HH-plumbing.png",
        width: 680,
        height: 680,
        alt: "HH Plumbing and Gas Services Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HH Plumbing and Gas | Professional Plumbing Services",
    description:
      "HH Plumbing and Gas provides professional plumbing, heating and gas services including boiler installations, heat pump installations, bathroom installations and emergency repairs.",
    images: ["https://hh-plumbing-gas.vercel.app/images/HH-plumbing.png"],
    creator: "@hhplumbinggas",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
