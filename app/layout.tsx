// Imports
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/context/auth-context";
import { FinanceProvider } from "@/context/finance-context";
import { Navbar } from "@/components/Navbar";

// Fonts setup
const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

// SEO + Open Graph metadata
export const metadata: Metadata = {
  title: "MoneyMind - Smart Financial Dashboard",
  description:
    "Manage your finances with AI-powered insights, expense tracking, and goal setting",

  keywords: [
    "finance dashboard",
    "money tracker",
    "expense tracker",
    "AI finance app",
    "budget management",
  ],

  authors: [{ name: "Ahmed Talaat" }],

  // Favicon / App Icons
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },

  // Open Graph
  openGraph: {
    title: "MoneyMind - Smart Financial Dashboard",
    description:
      "AI-powered financial dashboard for tracking expenses, goals, and insights",
    url: "https://moneymind-finance-dashboard.vercel.app/",
    siteName: "MoneyMind",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "MoneyMind Dashboard Preview",
      },
    ],
    type: "website",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "MoneyMind - Smart Financial Dashboard",
    description: "Track expenses, manage goals, and get AI financial insights",
    images: ["/og.png"],
  },

  // Robots (SEO crawling rules)
  robots: {
    index: true,
    follow: true,
  },
};

// Root layout wrapper
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geist.className}>
        {/* Theme (dark/light mode support) */}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {/* Auth state provider */}
          <AuthProvider>
            {/* Finance global state provider */}
            <FinanceProvider>
              {/* Top navigation bar */}
              <Navbar />

              {/* Page content */}
              {children}

              {process.env.NODE_ENV === "production" && <Analytics />}
            </FinanceProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
