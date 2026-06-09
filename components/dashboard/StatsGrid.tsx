// Imports
import { motion } from "framer-motion";
import { StatCard } from "@/components/StatCard";
import { StatItem, Stats } from "@/types";

export function StatsGrid({ stats }: { stats: Stats }) {
  // Calculate savings rate percentage
  const savingsRate =
    stats.totalIncome > 0
      ? Math.round((stats.savings / stats.totalIncome) * 100)
      : 0;

  // Format numbers as USD currency
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  // Stats configuration (used for mapping UI)
  const statsData: StatItem[] = [
    {
      title: "Income",
      value: formatCurrency(stats.totalIncome),
      icon: "📈",
      trend: "up",
      trendValue: "This month",
    },
    {
      title: "Expenses",
      value: formatCurrency(stats.totalExpenses),
      icon: "💳",
      trend: "down",
      trendValue: "From last month",
    },
    {
      title: "Balance",
      value: formatCurrency(stats.balance),
      icon: "💰",
      trend: stats.balance > 0 ? "up" : "down",
      trendValue: stats.balance > 0 ? "Positive this month" : "Negative",
    },
    {
      title: "Savings Rate",
      value: `${savingsRate}%`,
      icon: "🎯",
      trend: "stable",
      trendValue: "Target 20%",
    },
  ];

  return (
    // Grid container
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Animated cards list */}
      {statsData.map((stat, index) => (
        <motion.div
          key={stat.title}
          // Initial state (before animation)
          initial={{ opacity: 0, y: 20 }}
          // Final state (after animation)
          animate={{ opacity: 1, y: 0 }}
          // Stagger effect
          transition={{
            duration: 0.4,
            delay: index * 0.1,
            ease: "easeOut",
          }}
        >
          <StatCard
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            trendValue={stat.trendValue}
          />
        </motion.div>
      ))}
    </div>
  );
}
