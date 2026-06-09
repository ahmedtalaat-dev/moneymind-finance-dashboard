// Imports
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Goal } from "@/types";

// Main Component
export function GoalsSection({ goals }: { goals: Goal[] }) {
  // Format numbers as USD currency
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  // Component UI
  return (
    <Card>
      {/* Header section (title + navigation button) */}
      <CardHeader className="flex flex-row items-center justify-between">
        {/* Section title */}
        <div>
          <CardTitle>Financial Goals</CardTitle>
        </div>

        {/* Link to full goals page */}
        <Link href="/dashboard/goals">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </CardHeader>

      {/* Goals list */}
      <CardContent className="space-y-4">
        {/* Show only first 3 goals */}
        {goals.slice(0, 3).map((goal) => {
          // Calculate progress percentage safely
          const progress =
            goal.targetAmount > 0
              ? (goal.currentAmount / goal.targetAmount) * 100
              : 0;

          return (
            // Single goal item
            <div key={goal.id} className="space-y-2">
              {/* Goal name + progress percent */}
              <div className="flex justify-between">
                <span className="font-medium">{goal.name}</span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(progress)}%
                </span>
              </div>

              {/* Progress bar background */}
              <div className="w-full bg-muted h-2 rounded-full">
                {/* Progress bar fill */}
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Current vs target amount */}
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatCurrency(goal.currentAmount)}</span>
                <span>{formatCurrency(goal.targetAmount)}</span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
