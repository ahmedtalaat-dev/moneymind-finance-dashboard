'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import type { Transaction, Goal, Budget, DashboardStats } from '@/types'

interface FinanceContextType {
  transactions: Transaction[]
  goals: Goal[]
  budgets: Budget[]
  stats: DashboardStats
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void
  deleteTransaction: (id: string) => void
  addGoal: (goal: Omit<Goal, 'id'>) => void
  updateGoal: (id: string, goal: Partial<Goal>) => void
  deleteGoal: (id: string) => void
  getBudgetByCategory: (category: string) => Budget | undefined
  updateBudget: (id: string, budget: Partial<Budget>) => void
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined)

// Mock initial data
const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    type: 'income',
    amount: 5000,
    category: 'Salary',
    description: 'Monthly salary',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    tags: ['recurring'],
  },
  {
    id: '2',
    type: 'expense',
    amount: 1200,
    category: 'Housing',
    description: 'Rent payment',
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    tags: ['recurring'],
  },
  {
    id: '3',
    type: 'expense',
    amount: 150,
    category: 'Food',
    description: 'Grocery shopping',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
  {
    id: '4',
    type: 'expense',
    amount: 85,
    category: 'Utilities',
    description: 'Electricity bill',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    tags: ['recurring'],
  },
  {
    id: '5',
    type: 'expense',
    amount: 250,
    category: 'Entertainment',
    description: 'Movie tickets and subscription',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
]

const MOCK_GOALS: Goal[] = [
  {
    id: '1',
    name: 'Emergency Fund',
    targetAmount: 15000,
    currentAmount: 8500,
    dueDate: '2025-12-31',
    category: 'Savings',
    priority: 'high',
    status: 'active',
  },
  {
    id: '2',
    name: 'Vacation to Europe',
    targetAmount: 5000,
    currentAmount: 2300,
    dueDate: '2025-08-31',
    category: 'Travel',
    priority: 'medium',
    status: 'active',
  },
  {
    id: '3',
    name: 'New Laptop',
    targetAmount: 2000,
    currentAmount: 1800,
    dueDate: '2026-03-31',
    category: 'Technology',
    priority: 'low',
    status: 'active',
  },
]

const MOCK_BUDGETS: Budget[] = [
  { id: '1', category: 'Food', limit: 600, spent: 450, month: '2026-04', color: 'chart-1' },
  { id: '2', category: 'Entertainment', limit: 400, spent: 250, month: '2026-04', color: 'chart-2' },
  { id: '3', category: 'Utilities', limit: 300, spent: 85, month: '2026-04', color: 'chart-3' },
  { id: '4', category: 'Transportation', limit: 400, spent: 200, month: '2026-04', color: 'chart-4' },
]

function calculateStats(transactions: Transaction[]): DashboardStats {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  return {
    totalIncome: income,
    totalExpenses: expenses,
    balance: income - expenses,
    savings: Math.max(0, (income - expenses) * 0.2), // Assume 20% savings rate
    goalsCompleted: 0,
  }
}

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [goals, setGoals] = useState<Goal[]>([])
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [stats, setStats] = useState<DashboardStats>(calculateStats([]))

  useEffect(() => {
    // Load from localStorage or use mock data
    const storedTransactions = localStorage.getItem('moneymind_transactions')
    const storedGoals = localStorage.getItem('moneymind_goals')
    const storedBudgets = localStorage.getItem('moneymind_budgets')

    setTransactions(storedTransactions ? JSON.parse(storedTransactions) : MOCK_TRANSACTIONS)
    setGoals(storedGoals ? JSON.parse(storedGoals) : MOCK_GOALS)
    setBudgets(storedBudgets ? JSON.parse(storedBudgets) : MOCK_BUDGETS)
  }, [])

  useEffect(() => {
    // Update stats when transactions change
    setStats(calculateStats(transactions))
    // Persist to localStorage
    localStorage.setItem('moneymind_transactions', JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem('moneymind_goals', JSON.stringify(goals))
  }, [goals])

  useEffect(() => {
    localStorage.setItem('moneymind_budgets', JSON.stringify(budgets))
  }, [budgets])

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Math.random().toString(36).substring(7),
    }
    setTransactions([newTransaction, ...transactions])
  }

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id))
  }

  const addGoal = (goal: Omit<Goal, 'id'>) => {
    const newGoal: Goal = {
      ...goal,
      id: Math.random().toString(36).substring(7),
    }
    setGoals([newGoal, ...goals])
  }

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setGoals(goals.map(g => (g.id === id ? { ...g, ...updates } : g)))
  }

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id))
  }

  const getBudgetByCategory = (category: string) => {
    return budgets.find(b => b.category === category)
  }

  const updateBudget = (id: string, updates: Partial<Budget>) => {
    setBudgets(budgets.map(b => (b.id === id ? { ...b, ...updates } : b)))
  }

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        goals,
        budgets,
        stats,
        addTransaction,
        deleteTransaction,
        addGoal,
        updateGoal,
        deleteGoal,
        getBudgetByCategory,
        updateBudget,
      }}
    >
      {children}
    </FinanceContext.Provider>
  )
}

export function useFinance() {
  const context = useContext(FinanceContext)
  if (context === undefined) {
    throw new Error('useFinance must be used within FinanceProvider')
  }
  return context
}
