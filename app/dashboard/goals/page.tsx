// Imports
import type { Metadata } from "next";
import GoalsClient from "@/components/goals/GoalsClient";

export const metadata: Metadata = {
  title: "Goals | MoneyMind",
};

export default function GoalsPage() {
  return (
    <div className="p-4 md:p-8">
      <GoalsClient />
    </div>
  );
}
