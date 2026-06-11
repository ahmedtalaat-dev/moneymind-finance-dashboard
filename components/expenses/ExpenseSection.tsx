"use client";

// Imports
import { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import { Button } from "@/components/ui/button";

export default function ExpenseSection() {
  // Form visibility state
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Expenses</h1>

          <p className="text-muted-foreground mt-1">
            Track your income and expenses easily
          </p>
        </div>

        {/* Toggle form button */}
        <Button onClick={() => setShowForm((prev) => !prev)}>
          {showForm ? "Cancel" : "Add Transaction"}
        </Button>
      </div>

      {/* Transaction form */}
      {showForm && <ExpenseForm onClose={() => setShowForm(false)} />}
    </div>
  );
}
