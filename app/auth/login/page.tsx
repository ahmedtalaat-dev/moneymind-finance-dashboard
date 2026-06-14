// Imports
import type { Metadata } from "next";
import ClientLogin from "@/components/auth/ClientLogin";

// Metadata
export const metadata: Metadata = {
  title: "Login | MoneyMind",
  robots: {
    index: false,
    follow: false,
  },
};

// Main Page
export default function LoginPage() {
  return <ClientLogin />;
}
