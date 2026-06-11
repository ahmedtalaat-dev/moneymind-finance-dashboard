// User related interfaces
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  location?: string;
}

// Finance data interfaces
export interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  date: string;
  tags?: string[];
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  dueDate: string;
  category: string;
  priority: "low" | "medium" | "high";
  status: "active" | "completed" | "paused";
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  month: string;
  color?: string;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  metric: string;
  change: number;
  trend: "up" | "down" | "stable";
  actionable: boolean;
}

export interface DashboardStats {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  savings: number;
  goalsCompleted: number;
}

// Landing page interfaces
export interface Feature {
  title: string;
  text: string;
}

// Dashboard UI interfaces
export interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  className?: string;
}

export interface Stats {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  savings: number;
}

type Trend = "up" | "down" | "stable";

export interface StatItem {
  title: string;
  value: string;
  icon: string;
  trend: Trend;
  trendValue: string;
}

// Transaction form interfaces
export interface ExpenseFormData {
  type: "income" | "expense";
  amount: string;
  category: string;
  description: string;
  date: string;
}

export interface ExpenseFormProps {
  onClose: () => void;
}

export interface TransactionHistoryProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

// Common component props
export interface Props {
  showForm: boolean;
  setShowForm: (value: boolean) => void;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
}

// Goal form interfaces
const PRIORITIES = ["low", "medium", "high"] as const;

export interface GoalFormData {
  name: string;
  targetAmount: string;
  currentAmount: string;
  dueDate: string;
  category: string;
  priority: (typeof PRIORITIES)[number];
}

export interface GoalProps {
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  onClose: () => void;
}

// Insights page interfaces
export interface InsightsHeaderProps {
  transactionsCount: number;
  goalsCount: number;
  categoriesCount: number;
}

export interface InsightsChartsProps {
  categoryData: {
    name: string;
    value: number;
  }[];

  monthlyData: {
    month: string;
    income: number;
    expenses: number;
  }[];

  formatCurrency: (value: number) => string;
}

// Avatar interfaces
export interface AvatarProps {
  profileImage: string;
  userName?: string;
  onChangeAvatar: () => void;
}

// Authentication context interface
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export interface LoginFormData {
  email: string;
  password: string;
};

// Finance context interface
export interface FinanceContextType {
  transactions: Transaction[];
  goals: Goal[];
  budgets: Budget[];
  stats: DashboardStats;

  addTransaction: (transaction: Omit<Transaction, "id">) => void;

  deleteTransaction: (id: string) => void;

  addGoal: (goal: Omit<Goal, "id">) => void;

  updateGoal: (id: string, goal: Partial<Goal>) => void;

  deleteGoal: (id: string) => void;

  getBudgetByCategory: (category: string) => Budget | undefined;

  updateBudget: (id: string, budget: Partial<Budget>) => void;
}
