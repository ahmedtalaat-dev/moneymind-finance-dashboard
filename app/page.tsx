'use client'

import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, isLoading, router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="text-center space-y-8 max-w-2xl">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-balance">
            Welcome
          </h1>

          <p className="text-xl text-muted-foreground text-balance">
            Manage your finances with smart insights and tracking tools
          </p>
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/auth/login">
            <Button size="lg">Login</Button>
          </Link>

          <Link href="/auth/signup">
            <Button size="lg" variant="outline">
              Sign Up
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 rounded-lg bg-card border border-border">
            <h3 className="font-semibold text-lg mb-2">
              📊 Expenses
            </h3>

            <p className="text-sm text-muted-foreground">
              Track your recent transactions easily
            </p>
          </div>

          <div className="p-6 rounded-lg bg-card border border-border">
            <h3 className="font-semibold text-lg mb-2">
              🎯 Goals
            </h3>

            <p className="text-sm text-muted-foreground">
              Set and manage your financial goals
            </p>
          </div>

          <div className="p-6 rounded-lg bg-card border border-border">
            <h3 className="font-semibold text-lg mb-2">
              💡 Insights
            </h3>

            <p className="text-sm text-muted-foreground">
              Get AI-powered financial recommendations
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}