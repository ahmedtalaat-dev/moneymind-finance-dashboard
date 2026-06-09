"use client";

// Imports
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Feature } from "@/types";

// features data
const FEATURES: Feature[] = [
  {
    title: "📊 Expenses",
    text: "Track your recent transactions easily",
  },
  {
    title: "🎯 Goals",
    text: "Set and manage your financial goals",
  },
  {
    title: "💡 Insights",
    text: "Get AI-powered financial recommendations",
  },
];

// Features container animation
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// card animation
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

// Home page component
export default function Home() {
  // Get authentication state
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Redirect authenticated users
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  // loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  // Preventflash before redirect
  if (isAuthenticated) {
    return null;
  }

  // page UI
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="text-center space-y-8 max-w-3xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="text-5xl font-bold text-balance">Welcome</h1>

          <p className="text-xl text-muted-foreground text-balance">
            Manage your finances with smart insights and tracking tools
          </p>
        </motion.div>

        {/* Authentication Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <Link href="/auth/login">
            <Button size="lg">Login</Button>
          </Link>

          <Link href="/auth/signup">
            <Button size="lg" variant="outline" className="hover:text-white">
              Sign Up
            </Button>
          </Link>
        </motion.div>

        {/* Features Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.03,
                borderColor: "hsl(var(--primary))",
              }}
              whileTap={{
                scale: 0.98,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
              }}
              className="p-6 rounded-lg bg-card border border-border cursor-pointer"
            >
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>

              <p className="text-sm text-muted-foreground">{feature.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
