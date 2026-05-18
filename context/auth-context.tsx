'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import type { User } from '@/types'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  signup: (name: string, email: string, password: string) => Promise<void>
  updateUser: (userData: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('moneymind_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Failed to parse stored user:', error)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Mock login - in production this would call an API
    const mockUser: User = {
      id: '1',
      name: 'Ahmed Talaat',
      email: email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    }
    setUser(mockUser)
    localStorage.setItem('moneymind_user', JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('moneymind_user')
  }

  const signup = async (name: string, email: string, password: string) => {
    // Mock signup - in production this would call an API
    const mockUser: User = {
      id: Math.random().toString(36).substring(7),
      name: name,
      email: email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    }
    setUser(mockUser)
    localStorage.setItem('moneymind_user', JSON.stringify(mockUser))
  }

  const updateUser = async (userData: Partial<User>) => {
    if (!user) return
    const updatedUser: User = { ...user, ...userData }
    setUser(updatedUser)
    localStorage.setItem('moneymind_user', JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, signup, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
