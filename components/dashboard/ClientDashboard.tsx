"use client";

// Imports
import { useFinance, useAuth } from "@/context/index";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { ChartsSection } from "@/components/dashboard/ChartsSection";
import { GoalsSection } from "@/components/dashboard/GoalsSection";

export const dynamic = "force-dynamic";

export default function ClientDashboard() {
  // Get finance & user data
  const { stats, transactions, goals } = useFinance();
  const { user } = useAuth();

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold">
          Welcome {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Here is your financial overview
        </p>
      </div>

      {/* Stats section */}
      <StatsGrid stats={stats} />

      {/* Charts section */}
      <ChartsSection transactions={transactions} />

      {/* Goals section */}
      <GoalsSection goals={goals} />
    </div>
  );
}
