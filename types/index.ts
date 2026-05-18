export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  phone?: string
  location?: string
}

export interface Transaction {
  id: string
  type: 'income' | 'expense'
  amount: number
  category: string
  description: string
  date: string
  tags?: string[]
}

export interface Goal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  dueDate: string
  category: string
  priority: 'low' | 'medium' | 'high'
  status: 'active' | 'completed' | 'paused'
}

export interface Budget {
  id: string
  category: string
  limit: number
  spent: number
  month: string
  color?: string
}

export interface Insight {
  id: string
  title: string
  description: string
  metric: string
  change: number
  trend: 'up' | 'down' | 'stable'
  actionable: boolean
}

export interface DashboardStats {
  totalIncome: number
  totalExpenses: number
  balance: number
  savings: number
  goalsCompleted: number
}
