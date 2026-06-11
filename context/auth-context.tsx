"use client";

// Imports
import React, { createContext, useContext, useState, useEffect } from "react";
import type { AuthContextType, User } from "@/types";

// Create authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider wrapper
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Store user data and loading state
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved user on app start
  useEffect(() => {
    // Get user from local storage
    const storedUser = localStorage.getItem("moneymind_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
      }
    }
    // Finish loading
    setIsLoading(false);
  }, []);

  // Handle user login
  const login = async (email: string, password: string) => {
    // Create mock user
    const mockUser: User = {
      id: "1",
      name: "Ahmed Talaat",
      email: email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };

    // Save user data
    setUser(mockUser);
    localStorage.setItem("moneymind_user", JSON.stringify(mockUser));
  };

  // Handle user logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("moneymind_user");
  };

  // Handle new user registration
  const signup = async (name: string, email: string, password: string) => {
    // Create mock user
    const mockUser: User = {
      id: Math.random().toString(36).substring(7),
      name: name,
      email: email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };
    setUser(mockUser);
    localStorage.setItem("moneymind_user", JSON.stringify(mockUser));
  };

  // Update user profile data
  const updateUser = async (userData: Partial<User>) => {
    if (!user) return;
    const updatedUser: User = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem("moneymind_user", JSON.stringify(updatedUser));
  };

  // Provide auth data to all components
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        signup,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
