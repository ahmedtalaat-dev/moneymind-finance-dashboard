import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { IntlProvider } from '@/components/intl-provider'
import { Navbar } from '@/components/navbar'
import { AuthProvider } from '@/context/auth-context'
import { FinanceProvider } from '@/context/finance-context'

export const dynamic = 'force-dynamic'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }]
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params
  const isRTL = locale === 'ar'

  let messages
  try {
    messages = (await import(`@/messages/${locale}.json`)).default
  } catch (error) {
    messages = {}
  }

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} className="bg-background" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <IntlProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <AuthProvider>
              <FinanceProvider>
                <Navbar />
                {children}
                {process.env.NODE_ENV === 'production' && <Analytics />}
              </FinanceProvider>
            </AuthProvider>
          </ThemeProvider>
        </IntlProvider>
      </body>
    </html>
  )
}
