"use client";

// Imports
import { useMemo, useState } from "react";
import { useFinance } from "@/context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Component props
type Props = {
  setEditingId: (id: string | null) => void;
  setShowForm: (value: boolean) => void;
};

// Number of goals shown per page
const ITEMS_PER_PAGE = 6;

// Active goals list with pagination
export default function ActiveGoals({ setEditingId, setShowForm }: Props) {
  // Get goals and actions from context
  const { goals, deleteGoal } = useFinance();

  // Keep only active goals
  const activeGoals = goals.filter((goal) => goal.status === "active");

  // Current page state
  const [page, setPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(activeGoals.length / ITEMS_PER_PAGE);

  // Memoized paginated goals
  const paginatedGoals = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;

    return activeGoals.slice(start, start + ITEMS_PER_PAGE);
  }, [activeGoals, page]);

  return (
    <div className="space-y-4">
      {/* Section title */}
      <h2 className="text-xl font-semibold">Active Goals</h2>

      {/* Goals grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {paginatedGoals.map((goal) => {
          // Progress percentage
          const progress = (goal.currentAmount / goal.targetAmount) * 100;

          // Remaining days until deadline
          const daysLeft = Math.ceil(
            (new Date(goal.dueDate).getTime() - Date.now()) /
              (1000 * 60 * 60 * 24),
          );

          return (
            <Card key={goal.id}>
              {/* Goal header */}
              <CardHeader>
                <CardTitle>{goal.name}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* Progress info */}
                <div className="flex justify-between text-sm">
                  <span>{Math.round(progress)}%</span>
                  <span>{daysLeft} days left</span>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{
                      width: `${Math.min(progress, 100)}%`,
                    }}
                  />
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingId(goal.id);
                      setShowForm(true);
                    }}
                    className="hover:text-white"
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteGoal(goal.id)}
                    className="hover:text-white"
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {/* Previous page indicator */}
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="hover:text-white"
          >
            Prev
          </Button>

          {/* Current page indicator */}
          <span className="flex items-center text-sm">
            Page {page} / {totalPages}
          </span>

          {/* Next page indicator */}
          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="hover:text-white"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
