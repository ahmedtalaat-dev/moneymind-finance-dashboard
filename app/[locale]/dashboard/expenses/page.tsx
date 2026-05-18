'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useFinance } from '@/context/index'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import type { Transaction } from '@/types'

const CATEGORIES = [
  'food',
  'transport',
  'entertainment',
  'utilities',
  'shopping',
  'health',
  'salary',
  'other',
]

export default function ExpensesPage() {
  const { transactions, addTransaction, deleteTransaction } = useFinance()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    type: 'expense' as const,
    amount: '',
    category: 'food',
    description: '',
    date: new Date().toISOString().split('T')[0],
  })
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all')

  const t = useTranslations('expenses')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.amount || !formData.category || !formData.description) return

    addTransaction({
      type: formData.type,
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description,
      date: formData.date,
    })

    setFormData({
      type: 'expense',
      amount: '',
      category: 'food',
      description: '',
      date: new Date().toISOString().split('T')[0],
    })

    setShowForm(false)
  }

  const filteredTransactions = transactions.filter((t) => {
    if (filter === 'all') return true
    return t.type === filter
  })

  const totalExpenses = filteredTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalIncome = filteredTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)

  return (
    <div className="p-4 md:p-8 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('title')}</h1>
          <p className="text-muted-foreground mt-1">{t('subtitle')}</p>
        </div>

        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? t('cancel') : t('addExpense')}
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{t('addExpense')}</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Type */}
                <FieldGroup>
                  <Field>
                    <FieldLabel>{t('type')}</FieldLabel>
                    <Select
                      value={formData.type}
                      onValueChange={(value: any) =>
                        setFormData({ ...formData, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="expense">{t('expenses')}</SelectItem>
                        <SelectItem value="income">{t('income')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </FieldGroup>

                {/* Category */}
                <FieldGroup>
                  <Field>
                    <FieldLabel>{t('category')}</FieldLabel>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {t(`categories.${cat}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </FieldGroup>

                {/* Amount */}
                <FieldGroup>
                  <Field>
                    <FieldLabel>{t('amount')}</FieldLabel>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={(e) =>
                        setFormData({ ...formData, amount: e.target.value })
                      }
                      required
                    />
                  </Field>
                </FieldGroup>

                {/* Date */}
                <FieldGroup>
                  <Field>
                    <FieldLabel>{t('date')}</FieldLabel>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      required
                    />
                  </Field>
                </FieldGroup>
              </div>

              {/* Description */}
              <FieldGroup>
                <Field>
                  <FieldLabel>{t('description')}</FieldLabel>
                  <Input
                    type="text"
                    placeholder={t('description')}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                  />
                </Field>
              </FieldGroup>

              <Button type="submit" className="w-full">
                {t('addButton')}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              {t('totalExpenses')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {formatCurrency(totalExpenses)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              {t('totalIncome')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">
              {formatCurrency(totalIncome)}
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')}>
          {t('all')}
        </Button>
        <Button variant={filter === 'income' ? 'default' : 'outline'} onClick={() => setFilter('income')}>
          {t('income')}
        </Button>
        <Button variant={filter === 'expense' ? 'default' : 'outline'} onClick={() => setFilter('expense')}>
          {t('expenses')}
        </Button>
      </div>

      {/* Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>{t('transactionHistory')}</CardTitle>
          <CardDescription>{t('subtitle')}</CardDescription>
        </CardHeader>

        <CardContent>
          {filteredTransactions.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              {t('noTransactions')}
            </p>
          ) : (
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <span className="text-xs text-muted-foreground">
                      {t(`categories.${transaction.category}`)}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={
                        transaction.type === 'income'
                          ? 'text-secondary'
                          : 'text-destructive'
                      }
                    >
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </span>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTransaction(transaction.id)}
                    >
                      {t('delete')}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  )
}