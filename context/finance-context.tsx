"use client";

// Imports
import React, { createContext, useContext, useState, useEffect } from "react";
import type {
  Transaction,
  Goal,
  Budget,
  DashboardStats,
  FinanceContextType,
} from "@/types";
import {
  MOCK_TRANSACTIONS,
  MOCK_GOALS,
  MOCK_BUDGETS,
} from "@/data/finance-mock";

// Create finance context
const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

// Calculate dashboard statistics
function calculateStats(transactions: Transaction[]): DashboardStats {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    totalIncome: income,
    totalExpenses: expenses,
    balance: income - expenses,
    savings: Math.max(0, (income - expenses) * 0.2),
    goalsCompleted: 0,
  };
}

// Finance provider
export function FinanceProvider({ children }: { children: React.ReactNode }) {
  // Store finance data
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [stats, setStats] = useState<DashboardStats>(calculateStats([]));

  // Load saved data
  useEffect(() => {
    const storedTransactions = localStorage.getItem("moneymind_transactions");
    const storedGoals = localStorage.getItem("moneymind_goals");
    const storedBudgets = localStorage.getItem("moneymind_budgets");

    setTransactions(
      storedTransactions ? JSON.parse(storedTransactions) : MOCK_TRANSACTIONS,
    );

    setGoals(storedGoals ? JSON.parse(storedGoals) : MOCK_GOALS);

    setBudgets(storedBudgets ? JSON.parse(storedBudgets) : MOCK_BUDGETS);
  }, []);

  // Update stats and save transactions
  useEffect(() => {
    setStats(calculateStats(transactions));

    localStorage.setItem(
      "moneymind_transactions",
      JSON.stringify(transactions),
    );
  }, [transactions]);

  // Save goals
  useEffect(() => {
    localStorage.setItem("moneymind_goals", JSON.stringify(goals));
  }, [goals]);

  // Save budgets
  useEffect(() => {
    localStorage.setItem("moneymind_budgets", JSON.stringify(budgets));
  }, [budgets]);

  // Add new transaction
  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...transaction,

      id: Math.random().toString(36).substring(7),
    };

    setTransactions([newTransaction, ...transactions]);
  };

  // Delete transaction
  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  // Add new goal
  const addGoal = (goal: Omit<Goal, "id">) => {
    const newGoal: Goal = {
      ...goal,

      id: Math.random().toString(36).substring(7),
    };

    setGoals([newGoal, ...goals]);
  };

  // Update goal
  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setGoals(goals.map((g) => (g.id === id ? { ...g, ...updates } : g)));
  };

  // Delete goal
  const deleteGoal = (id: string) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  // Get budget by category
  const getBudgetByCategory = (category: string) => {
    return budgets.find((b) => b.category === category);
  };

  // Update budget
  const updateBudget = (id: string, updates: Partial<Budget>) => {
    setBudgets(budgets.map((b) => (b.id === id ? { ...b, ...updates } : b)));
  };

  // Finance context provider
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
  );
}

// Custom hook for finance context
export function useFinance() {
  const context = useContext(FinanceContext);

  if (context === undefined) {
    throw new Error("useFinance must be used within FinanceProvider");
  }

  return context;
}
