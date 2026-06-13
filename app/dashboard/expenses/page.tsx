// Imports
import type { Metadata } from "next";
import ExpenseSection from "@/components/expenses/ExpenseSection";
import Transactions from "@/components/expenses/Transactions";

export const metadata: Metadata = {
  title: "Expenses | MoneyMind",
};

export default function ExpensesPage() {
  return (
    <div className="p-4 md:p-8 space-y-6">

      {/* Header + Form */}
      <ExpenseSection />

      {/* Summary + Filters + History */}
      <Transactions />

    </div>
  )
}
