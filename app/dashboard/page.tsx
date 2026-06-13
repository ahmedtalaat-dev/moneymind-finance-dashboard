// Imports
import ClientDashboard from "@/components/dashboard/ClientDashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | MoneyMind",
};

export default function DashboardPage() {
  return <ClientDashboard />;
}
