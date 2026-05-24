'use client'

import { useState } from 'react'
import { useFinance } from '@/context/index'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Goal } from '@/types'

const GOAL_CATEGORIES = [
  'savings',
  'travel',
  'technology',
  'housing',
  'education',
  'investment',
  'health',
  'other',
]

const PRIORITIES = ['low', 'medium', 'high'] as const

export default function GoalsPage() {
  const { goals, addGoal, updateGoal, deleteGoal } = useFinance()

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    dueDate: '',
    category: 'savings',
    priority: 'medium' as const,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.targetAmount || !formData.dueDate) return

    if (editingId) {
      updateGoal(editingId, {
        name: formData.name,
        targetAmount: parseFloat(formData.targetAmount),
        currentAmount: parseFloat(formData.currentAmount) || 0,
        dueDate: formData.dueDate,
        category: formData.category,
        priority: formData.priority,
      })
      setEditingId(null)
    } else {
      addGoal({
        name: formData.name,
        targetAmount: parseFloat(formData.targetAmount),
        currentAmount: parseFloat(formData.currentAmount) || 0,
        dueDate: formData.dueDate,
        category: formData.category,
        priority: formData.priority,
        status: 'active',
      })
    }

    setFormData({
      name: '',
      targetAmount: '',
      currentAmount: '',
      dueDate: '',
      category: 'savings',
      priority: 'medium',
    })

    setShowForm(false)
  }

  const handleEdit = (goal: Goal) => {
    setFormData({
      name: goal.name,
      targetAmount: goal.targetAmount.toString(),
      currentAmount: goal.currentAmount.toString(),
      dueDate: goal.dueDate,
      category: goal.category,
      priority: goal.priority,
    })
    setEditingId(goal.id)
    setShowForm(true)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
  }

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)

  const activeGoals = goals.filter((g) => g.status === 'active')

  return (
    <div className="p-4 md:p-8 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Financial Goals</h1>
          <p className="text-muted-foreground mt-1">
            Create and track your financial goals
          </p>
        </div>

        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Close Form' : 'Add Goal'}
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingId ? 'Edit Goal' : 'Add New Goal'}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Name */}
                <FieldGroup>
                  <Field>
                    <FieldLabel>Goal Name</FieldLabel>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </Field>
                </FieldGroup>

                {/* Category */}
                <FieldGroup>
                  <Field>
                    <FieldLabel>Category</FieldLabel>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        {GOAL_CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </FieldGroup>

                {/* Target */}
                <FieldGroup>
                  <Field>
                    <FieldLabel>Target Amount</FieldLabel>
                    <Input
                      type="number"
                      value={formData.targetAmount}
                      onChange={(e) =>
                        setFormData({ ...formData, targetAmount: e.target.value })
                      }
                    />
                  </Field>
                </FieldGroup>

                {/* Current */}
                <FieldGroup>
                  <Field>
                    <FieldLabel>Current Amount</FieldLabel>
                    <Input
                      type="number"
                      value={formData.currentAmount}
                      onChange={(e) =>
                        setFormData({ ...formData, currentAmount: e.target.value })
                      }
                    />
                  </Field>
                </FieldGroup>

                {/* Date */}
                <FieldGroup>
                  <Field>
                    <FieldLabel>Deadline</FieldLabel>
                    <Input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) =>
                        setFormData({ ...formData, dueDate: e.target.value })
                      }
                    />
                  </Field>
                </FieldGroup>

                {/* Priority */}
                <FieldGroup>
                  <Field>
                    <FieldLabel>Priority</FieldLabel>
                    <Select
                      value={formData.priority}
                      onValueChange={(value: any) =>
                        setFormData({ ...formData, priority: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        {PRIORITIES.map((p) => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </FieldGroup>

              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  {editingId ? 'Update Goal' : 'Add Goal'}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>

            </form>
          </CardContent>
        </Card>
      )}

      {/* Active Goals */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Active Goals</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {activeGoals.map((goal) => {
            const progress =
              (goal.currentAmount / goal.targetAmount) * 100

            const daysLeft = Math.ceil(
              (new Date(goal.dueDate).getTime() - Date.now()) /
                (1000 * 60 * 60 * 24)
            )

            return (
              <Card key={goal.id}>
                <CardHeader>
                  <CardTitle>{goal.name}</CardTitle>
                  <CardDescription>{goal.category}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>{Math.round(progress)}%</span>
                    <span>{daysLeft} days left</span>
                  </div>

                  <div className="w-full bg-muted h-2 rounded-full">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>{formatCurrency(goal.currentAmount)}</span>
                    <span>{formatCurrency(goal.targetAmount)}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(goal)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => deleteGoal(goal.id)}>
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Empty state */}
      {goals.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            No goals yet. Start by adding your first financial goal.
          </CardContent>
        </Card>
      )}

    </div>
  )
}