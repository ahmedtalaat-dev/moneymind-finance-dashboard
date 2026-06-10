"use client";

// Imports
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TransactionHistoryProps } from "@/types";

// Items per page
const ITEMS_PER_PAGE = 5;

// Currency formatter
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function TransactionHistory({
  transactions,
  onDelete,
}: TransactionHistoryProps) {
  // Current page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);

  // Paginated transactions
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return transactions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [transactions, currentPage]);

  // Reset page when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [transactions]);

  // Format currency
  const formatCurrency = (value: number) => currencyFormatter.format(value);

  return (
    <Card>
      {/* History header */}
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>

        <CardDescription>View all your financial activity</CardDescription>
      </CardHeader>

      <CardContent>
        {transactions.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No transactions found
          </p>
        ) : (
          <>
            {/* Transactions list */}
            <div className="space-y-4">
              {paginatedTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex justify-between p-3 border rounded-lg"
                >
                  {/* Transaction details */}
                  <div>
                    <p className="font-medium">{transaction.description}</p>

                    <span className="text-xs text-muted-foreground">
                      {transaction.category}
                    </span>
                  </div>

                  {/* Amount and delete */}
                  <div className="flex items-center gap-4">
                    <span
                      className={
                        transaction.type === "income"
                          ? "text-secondary"
                          : "text-destructive"
                      }
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </span>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(transaction.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  Previous
                </Button>

                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>

                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
