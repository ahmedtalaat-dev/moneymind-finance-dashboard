"use client";

// Imports
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InsightsChartsProps } from "@/types";

// Chart theme colors
const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

// Charts section
export function InsightsCharts({
  categoryData,
  monthlyData,
  formatCurrency,
}: InsightsChartsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Spending categories chart */}
      <Card>
        <CardHeader>
          <CardTitle>Top Spending Categories</CardTitle>

          <CardDescription>Expense breakdown</CardDescription>
        </CardHeader>

        <CardContent>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                {/* Pie chart */}
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                >
                  {categoryData.map((item, index) => (
                    <Cell
                      key={item.name}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>

                {/* Currency tooltip */}
                <Tooltip
                  formatter={(value) => formatCurrency(value as number)}
                />

                {/* Category legend */}
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            // Empty state
            <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
              No expense data available
            </div>
          )}
        </CardContent>
      </Card>

      {/* Monthly trend chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Trend</CardTitle>

          <CardDescription>Income vs expenses over time</CardDescription>
        </CardHeader>

        <CardContent>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                {/* Grid */}
                <CartesianGrid strokeDasharray="3 3" />

                {/* X axis */}
                <XAxis dataKey="month" />

                {/* Y axis */}
                <YAxis />

                {/* Currency tooltip */}
                <Tooltip
                  formatter={(value) => formatCurrency(value as number)}
                />

                {/* Legend */}
                <Legend />

                {/* Income bar */}
                <Bar
                  dataKey="income"
                  fill="var(--chart-2)"
                  radius={[4, 4, 0, 0]}
                />

                {/* Expenses bar */}
                <Bar
                  dataKey="expenses"
                  fill="var(--chart-1)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            // Empty state
            <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
              No monthly data available
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
