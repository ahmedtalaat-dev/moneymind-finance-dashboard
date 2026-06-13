// Imports
import type { Metadata } from "next";
import ClientInsights from "@/components/insights/ClientInsights";

export const metadata: Metadata = {
  title: "Insights | MoneyMind",
};

export default function InsightsPage() {
  return <ClientInsights />
}
