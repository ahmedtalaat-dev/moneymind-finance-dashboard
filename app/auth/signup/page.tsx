// Imports
import type { Metadata } from "next";
import ClintSignup from "@/components/auth/ClientSignup";

// Metadata
export const metadata: Metadata = {
  title: "Sign Up | MoneyMind",
  robots: {
    index: false,
    follow: false,
  },
};


// Main Page
export default function SignupPage() {
  return (
    <ClintSignup />
  )
}
