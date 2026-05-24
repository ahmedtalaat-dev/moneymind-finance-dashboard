import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'

import './globals.css'

import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/navbar'
import { AuthProvider } from '@/context/auth-context'
import { FinanceProvider } from '@/context/finance-context'

const geist = Geist({ subsets: ['latin'] })
const geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MoneyMind - Smart Financial Dashboard',
  description:
    'Manage your finances with AI-powered insights, expense tracking, and goal setting',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          <AuthProvider>
            <FinanceProvider>
              <Navbar />
              {children}

              {process.env.NODE_ENV === 'production' && <Analytics />}
            </FinanceProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}