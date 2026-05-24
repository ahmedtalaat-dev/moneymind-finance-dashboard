'use client'

import { useMemo } from 'react'
import { useFinance } from '@/context/index'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { StatCard } from '@/components/stat-card'
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'

const CHART_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
]

export default function InsightsPage() {
  const { transactions, goals, budgets } = useFinance()

  const insights = useMemo(() => {
    const result: any[] = []

    const expensesByCategory = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount
        return acc
      }, {} as Record<string, number>)

    const topCategory = Object.entries(expensesByCategory).sort(
      ([, a], [, b]) => b - a
    )[0]

    if (topCategory) {
      const categoryBudget = budgets.find((b) => b.category === topCategory[0])
      const percentage = categoryBudget
        ? (topCategory[1] / categoryBudget.limit) * 100
        : 0

      if (percentage > 80) {
        result.push({
          title: `⚠️ ${topCategory[0]}`,
          description: `You used ${percentage.toFixed(0)}% of your budget`,
          icon: '⚠️',
          type: 'warning',
          actionable: true,
        })
      }
    }

    const activeGoals = goals.filter((g) => g.status === 'active')

    if (activeGoals.length > 0) {
      result.push({
        title: '🎯 Goals Progress',
        description: `${activeGoals.length} active goals are tracking well`,
        icon: '🎯',
        type: 'success',
        actionable: false,
      })
    }

    return result
  }, [transactions, goals, budgets])

  const categoryData = useMemo(() => {
    return Array.from(
      transactions
        .filter((t) => t.type === 'expense')
        .reduce((acc, t) => {
          acc.set(t.category, (acc.get(t.category) || 0) + t.amount)
          return acc
        }, new Map<string, number>())
        .entries()
    ).map(([name, value]) => ({ name, value }))
  }, [transactions])

  const monthlyData = useMemo(() => {
    const months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date()
      date.setMonth(date.getMonth() - (5 - i))
      return date
    })

    return months.map((m) => ({
      month: m.toLocaleDateString('en-US', { month: 'short' }),
      income: 0,
      expenses: 0,
    }))
  }, [transactions])

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)

  return (
    <div className="p-4 md:p-8 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Insights</h1>
        <p className="text-muted-foreground mt-1">
          Analyze your spending habits and financial trends
        </p>
      </div>

      {/* Insights */}
      <div className="space-y-3">
        {insights.length ? (
          insights.map((insight, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle>{insight.title}</CardTitle>
                <CardDescription>{insight.description}</CardDescription>
              </CardHeader>

              {insight.actionable && (
                <CardContent>
                  <button className="text-primary text-sm">
                    Take Action
                  </button>
                </CardContent>
              )}
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="py-10 text-center">
              No insights available right now
            </CardContent>
          </Card>
        )}
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <StatCard
          title="Total Transactions"
          value={transactions.length}
          icon="📊"
        />
        <StatCard
          title="Active Goals"
          value={goals.length}
          icon="🎯"
        />
        <StatCard
          title="Spending Categories"
          value={new Set(transactions.map((t) => t.category)).size}
          icon="📂"
        />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">

        <Card>
          <CardHeader>
            <CardTitle>Top Spending Categories</CardTitle>
            <CardDescription>Expense breakdown</CardDescription>
          </CardHeader>

          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={categoryData} dataKey="value" outerRadius={90}>
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % 5]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => formatCurrency(v as number)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Trend</CardTitle>
            <CardDescription>Income vs expenses over time</CardDescription>
          </CardHeader>

          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="green" />
                <Bar dataKey="expenses" fill="red" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
          <CardDescription>
            Smart suggestions based on your spending behavior
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">

          <div className="p-3 bg-muted rounded">
            <h4 className="font-medium">Improve Budget Control</h4>
            <p className="text-sm text-muted-foreground">
              Set monthly limits for each category to avoid overspending.
            </p>
          </div>

          <div className="p-3 bg-muted rounded">
            <h4 className="font-medium">Increase Savings Rate</h4>
            <p className="text-sm text-muted-foreground">
              Try to save at least 20% of your monthly income.
            </p>
          </div>

          <div className="p-3 bg-muted rounded">
            <h4 className="font-medium">Review Subscriptions</h4>
            <p className="text-sm text-muted-foreground">
              Cancel unused subscriptions to reduce monthly expenses.
            </p>
          </div>

        </CardContent>
      </Card>

    </div>
  )
}