// Imports
import type { Transaction, Goal, Budget } from "@/types";

// Mock transactions data
export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    type: "income",
    amount: 5000,
    category: "Salary",
    description: "Monthly salary",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    tags: ["recurring"],
  },
  {
    id: "2",
    type: "expense",
    amount: 1200,
    category: "Housing",
    description: "Rent payment",
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    tags: ["recurring"],
  },
  {
    id: "3",
    type: "expense",
    amount: 150,
    category: "Food",
    description: "Grocery shopping",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
  },
  {
    id: "4",
    type: "expense",
    amount: 85,
    category: "Utilities",
    description: "Electricity bill",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    tags: ["recurring"],
  },
  {
    id: "5",
    type: "expense",
    amount: 250,
    category: "Entertainment",
    description: "Movie tickets and subscription",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
  },
];

// Mock goals data
export const MOCK_GOALS: Goal[] = [
  {
    id: "1",
    name: "Emergency Fund",
    targetAmount: 15000,
    currentAmount: 8500,
    dueDate: "2025-12-31",
    category: "Savings",
    priority: "high",
    status: "active",
  },
  {
    id: "2",
    name: "Visit Paris",
    targetAmount: 5000,
    currentAmount: 2300,
    dueDate: "2025-08-31",
    category: "Travel",
    priority: "medium",
    status: "active",
  },
  {
    id: "3",
    name: "New Laptop",
    targetAmount: 2000,
    currentAmount: 1800,
    dueDate: "2026-03-31",
    category: "Technology",
    priority: "low",
    status: "active",
  },
];

// Mock budgets data
export const MOCK_BUDGETS: Budget[] = [
  {
    id: "1",
    category: "Food",
    limit: 600,
    spent: 450,
    month: "2026-04",
    color: "chart-1",
  },
  {
    id: "2",
    category: "Entertainment",
    limit: 400,
    spent: 250,
    month: "2026-04",
    color: "chart-2",
  },
  {
    id: "3",
    category: "Utilities",
    limit: 300,
    spent: 85,
    month: "2026-04",
    color: "chart-3",
  },
  {
    id: "4",
    category: "Transportation",
    limit: 400,
    spent: 200,
    month: "2026-04",
    color: "chart-4",
  },
];
