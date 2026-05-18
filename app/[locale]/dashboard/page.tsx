'use client'

import { useTranslations } from 'next-intl'
import { useFinance, useAuth } from '@/context/index'
import { StatCard } from '@/components/stat-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  const { stats, transactions, goals } = useFinance()
  const { user } = useAuth()
  const t = useTranslations('dashboard')

  // Prepare chart data
  const dailyData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000)
    const dayTransactions = transactions.filter(
      (t) =>
        t.date === date.toISOString().split('T')[0]
    )

    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      income: dayTransactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0),
      expenses: dayTransactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0),
    }
  })

  const categoryData = Array.from(
    transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => {
        const existing = acc.get(t.category) || 0
        acc.set(t.category, existing + t.amount)
        return acc
      }, new Map<string, number>())
      .entries()
  ).map(([category, amount]) => ({
    name: category,
    value: amount,
  }))

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)
  }

  const savingsRate =
    stats.totalIncome > 0
      ? Math.round((stats.savings / stats.totalIncome) * 100)
      : 0

  return (
    <div className="p-4 md:p-8 space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          {t('welcome')} {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-muted-foreground mt-1">{t('subtitle')}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard
          title={t('income')}
          value={formatCurrency(stats.totalIncome)}
          icon="📈"
          trend="up"
          trendValue={t('thisMonth')}
        />

        <StatCard
          title={t('expenses')}
          value={formatCurrency(stats.totalExpenses)}
          icon="💳"
          trend="down"
          trendValue={t('fromLastMonth')}
        />

        <StatCard
          title={t('balance')}
          value={formatCurrency(stats.balance)}
          icon="💰"
          trend={stats.balance > 0 ? 'up' : 'down'}
          trendValue={stats.balance > 0 ? t('thisMonth') : t('negative')}
        />

        <StatCard
          title={t('savingsRate')}
          value={`${savingsRate}%`}
          icon="🎯"
          trend="stable"
          trendValue={`${t('target')} 20%`}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Income vs Expenses */}
        <Card>
          <CardHeader>
            <CardTitle>{t('incomeVsExpenses')}</CardTitle>
            <CardDescription>{t('last7Days')}</CardDescription>
          </CardHeader>

          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="date"
                  stroke="var(--muted-foreground)"
                  style={{ fontSize: '12px' }}
                />
                <YAxis stroke="var(--muted-foreground)" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                  }}
                  formatter={(value) => formatCurrency(value as number)}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="var(--chart-2)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Spending by Category */}
        <Card>
          <CardHeader>
            <CardTitle>{t('spendingByCategory')}</CardTitle>
            <CardDescription>{t('monthlyBreakdown')}</CardDescription>
          </CardHeader>

          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="name"
                  stroke="var(--muted-foreground)"
                  style={{ fontSize: '12px' }}
                />
                <YAxis stroke="var(--muted-foreground)" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                  }}
                  formatter={(value) => formatCurrency(value as number)}
                />
                <Bar dataKey="value" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Goals */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{t('financialGoals')}</CardTitle>
            <CardDescription>{t('trackGoals')}</CardDescription>
          </div>

          <Link href="/dashboard/goals">
            <Button variant="outline" size="sm">
              {t('viewAll')}
            </Button>
          </Link>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {goals.slice(0, 3).map((goal) => {
              const progress = (goal.currentAmount / goal.targetAmount) * 100

              return (
                <div key={goal.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{goal.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(progress)}%
                    </span>
                  </div>

                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{formatCurrency(goal.currentAmount)}</span>
                    <span>{formatCurrency(goal.targetAmount)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}