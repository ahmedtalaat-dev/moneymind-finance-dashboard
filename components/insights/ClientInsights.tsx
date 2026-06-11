"use client";

// Imports
import { useMemo } from "react";
import { useFinance } from "@/context/index";
import { InsightsHeader } from "./InsightsHeader";
import { InsightsCharts } from "./InsightsCharts";
import { InsightsRecommendations } from "./InsightsRecommendations";

export default function ClientInsights() {
  const { transactions, goals } = useFinance();

  // Expense categories data
  const categoryData = useMemo(() => {
    return Array.from(
      transactions
        .filter((t) => t.type === "expense")
        .reduce((acc, t) => {
          acc.set(t.category, (acc.get(t.category) || 0) + t.amount);

          return acc;
        }, new Map<string, number>())
        .entries(),
    ).map(([name, value]) => ({
      name,
      value,
    }));
  }, [transactions]);

  // Last 6 months data
  const monthlyData = useMemo(() => {
    const months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();

      date.setMonth(date.getMonth() - (5 - i));

      return date;
    });

    return months.map((month) => ({
      month: month.toLocaleDateString("en-US", {
        month: "short",
      }),
      income: 0,
      expenses: 0,
    }));
  }, []);

  // Currency formatter
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Insights overview */}
      <InsightsHeader
        transactionsCount={transactions.length}
        goalsCount={goals.length}
        categoriesCount={new Set(transactions.map((t) => t.category)).size}
      />

      {/* Analytics charts */}
      <InsightsCharts
        categoryData={categoryData}
        monthlyData={monthlyData}
        formatCurrency={formatCurrency}
      />

      {/* Smart recommendations */}
      <InsightsRecommendations />
    </div>
  );
}
