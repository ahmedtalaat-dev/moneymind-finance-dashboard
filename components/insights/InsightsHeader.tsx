// Imports
import { StatCard } from "@/components/StatCard";
import { InsightsHeaderProps } from "@/types";

export function InsightsHeader({
  transactionsCount,
  goalsCount,
  categoriesCount,
}: InsightsHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Insights</h1>

        <p className="text-muted-foreground mt-1">
          Analyze your spending habits and financial trends
        </p>
      </div>

      {/* Goals Summary */}
      <div className="rounded-lg border p-4">
        <h3 className="font-semibold text-lg">🎯 Goals Progress</h3>

        <p className="text-muted-foreground">
          {goalsCount > 0
            ? `${goalsCount} active goals are tracking well`
            : "No active goals yet"}
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <StatCard
          title="Total Transactions"
          value={transactionsCount}
          icon="📊"
        />

        <StatCard title="Active Goals" value={goalsCount} icon="🎯" />

        <StatCard
          title="Spending Categories"
          value={categoriesCount}
          icon="📂"
        />
      </div>
    </div>
  );
}
