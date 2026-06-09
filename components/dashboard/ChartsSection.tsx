// Imports
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@/types";

// Main Component
export function ChartsSection({
  transactions,
}: {
  transactions: Transaction[];
}) {
  // Format numbers as USD currency
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  // Build last 7 days data for line chart
  const dailyData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000);

    // Filter transactions for this specific day
    const dayTransactions = transactions.filter(
      (t) => t.date === date.toISOString().split("T")[0],
    );

    return {
      // Format date
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),

      // Total income for the day
      income: dayTransactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0),

      // Total expenses for the day
      expenses: dayTransactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0),
    };
  });

  // Group expenses by category for bar chart
  const categoryData = Array.from(
    transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => {
        // Sum amounts per category
        const existing = acc.get(t.category) || 0;
        acc.set(t.category, existing + t.amount);
        return acc;
      }, new Map<string, number>())
      .entries(),
  ).map(([name, value]) => ({
    name,
    value,
  }));

  // Component UI
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Line Chart: Income vs Expenses over time */}
      <Card>
        <CardHeader>
          <CardTitle>Income vs Expenses</CardTitle>
        </CardHeader>

        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyData}>
              {/* Grid background lines */}
              <CartesianGrid strokeDasharray="3 3" />

              {/* X axis (dates) */}
              <XAxis
                dataKey="date"
                stroke="var(--muted-foreground)"
                style={{ fontSize: "12px" }}
              />

              {/* Y axis (values) */}
              <YAxis
                stroke="var(--muted-foreground)"
                style={{ fontSize: "12px" }}
              />

              {/* Tooltip with formatted currency */}
              <Tooltip formatter={(v) => formatCurrency(v as number)} />

              {/* Legend for chart lines */}
              <Legend />

              {/* Income line */}
              <Line
                type="monotone"
                dataKey="income"
                stroke="var(--chart-2)"
                strokeWidth={2}
                dot={false}
              />

              {/* Expenses line */}
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="var(--chart-1)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bar Chart: Spending by category */}
      <Card>
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
        </CardHeader>

        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              {/* Grid background lines */}
              <CartesianGrid strokeDasharray="3 3" />

              {/* X axis (categories) */}
              <XAxis dataKey="name" />

              {/* Y axis (amounts) */}
              <YAxis />

              {/* Tooltip with formatted currency */}
              <Tooltip formatter={(v) => formatCurrency(v as number)} />

              {/* Bars showing category spending */}
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
