"use client";

// Imports
import { useMemo, useState } from "react";
import { useFinance } from "@/context";
import TransactionHistory from "./TransactionHistory";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Filter type
type FilterType = "all" | "income" | "expense";

// Currency formatter
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Transactions() {
  // Finance context
  const { transactions, deleteTransaction } = useFinance();

  // Current filter
  const [filter, setFilter] = useState<FilterType>("all");

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      if (filter === "all") return true;
      return t.type === filter;
    });
  }, [transactions, filter]);

  // Calculate totals
  const { totalIncome, totalExpenses } = useMemo(() => {
    return filteredTransactions.reduce(
      (acc, transaction) => {
        if (transaction.type === "income") {
          acc.totalIncome += transaction.amount;
        } else {
          acc.totalExpenses += transaction.amount;
        }

        return acc;
      },
      {
        totalIncome: 0,
        totalExpenses: 0,
      },
    );
  }, [filteredTransactions]);

  // Format currency
  const formatCurrency = (value: number) => currencyFormatter.format(value);

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Expenses</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {formatCurrency(totalExpenses)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Income</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold text-secondary">
              {formatCurrency(totalIncome)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter buttons */}
      <div className="flex gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          All
        </Button>

        <Button
          variant={filter === "income" ? "default" : "outline"}
          onClick={() => setFilter("income")}
        >
          Income
        </Button>

        <Button
          variant={filter === "expense" ? "default" : "outline"}
          onClick={() => setFilter("expense")}
        >
          Expenses
        </Button>
      </div>

      {/* Transaction history */}
      <TransactionHistory
        transactions={filteredTransactions}
        onDelete={deleteTransaction}
      />
    </div>
  );
}
