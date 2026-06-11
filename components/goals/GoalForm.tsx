"use client";

// Imports
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useFinance } from "@/context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Goal, GoalFormData } from "@/types";

// Goal categories
const GOAL_CATEGORIES = [
  "savings",
  "travel",
  "technology",
  "housing",
  "education",
  "investment",
  "health",
  "other",
];

// Priority options
const PRIORITIES = ["low", "medium", "high"] as const;

// Props
type Props = {
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  onClose: () => void;
};

export default function GoalForm({ editingId, setEditingId, onClose }: Props) {
  const { addGoal, updateGoal, goals } = useFinance();

  // React Hook Form setup
  const { register, handleSubmit, setValue, watch, reset } =
    useForm<GoalFormData>({
      defaultValues: {
        name: "",
        targetAmount: "",
        currentAmount: "",
        dueDate: "",
        category: "savings",
        priority: "medium",
      },
    });

  // Watch select values
  const selectedCategory = watch("category");
  const selectedPriority = watch("priority");

  // Load goal data when editing
  useEffect(() => {
    if (!editingId) {
      reset({
        name: "",
        targetAmount: "",
        currentAmount: "",
        dueDate: "",
        category: "savings",
        priority: "medium",
      });

      return;
    }

    const goalToEdit = goals.find((g: Goal) => g.id === editingId);

    if (goalToEdit) {
      reset({
        name: goalToEdit.name,
        targetAmount: String(goalToEdit.targetAmount),
        currentAmount: String(goalToEdit.currentAmount),
        dueDate: goalToEdit.dueDate,
        category: goalToEdit.category,
        priority: goalToEdit.priority,
      });
    }
  }, [editingId, goals, reset]);

  // Submit handler
  const onSubmit = (data: GoalFormData) => {
    const targetAmount = Number(data.targetAmount);
    const currentAmount = Number(data.currentAmount || 0);

    // EDIT MODE
    if (editingId) {
      updateGoal(editingId, {
        name: data.name,
        targetAmount,
        currentAmount,
        dueDate: data.dueDate,
        category: data.category,
        priority: data.priority,
      });

      setEditingId(null);
    }

    // CREATE MODE
    else {
      addGoal({
        name: data.name,
        targetAmount,
        currentAmount,
        dueDate: data.dueDate,
        category: data.category,
        priority: data.priority,
        status: "active",
      });
    }

    // Reset form + close
    reset();
    onClose();
  };

  return (
    <Card>
      {/* Header */}
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-semibold">
          {editingId ? "Edit Goal" : "Add New Goal"}
        </CardTitle>

        <p className="text-sm text-muted-foreground">
          {editingId
            ? "Update your financial goal details below"
            : "Create a new financial goal and track your progress"}
        </p>
      </CardHeader>

      {/* Form content */}
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Grid inputs */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Name */}
            <FieldGroup>
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input
                  placeholder="Goal name"
                  {...register("name", { required: true })}
                />
              </Field>
            </FieldGroup>

            {/* Category */}
            <FieldGroup>
              <Field>
                <FieldLabel>Category</FieldLabel>

                <Select
                  value={selectedCategory}
                  onValueChange={(value) => setValue("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    {GOAL_CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
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
                  {...register("targetAmount", { required: true })}
                />
              </Field>
            </FieldGroup>

            {/* Current */}
            <FieldGroup>
              <Field>
                <FieldLabel>Current Amount</FieldLabel>
                <Input type="number" {...register("currentAmount")} />
              </Field>
            </FieldGroup>

            {/* Date */}
            <FieldGroup>
              <Field>
                <FieldLabel>Deadline</FieldLabel>
                <Input
                  type="date"
                  {...register("dueDate", { required: true })}
                />
              </Field>
            </FieldGroup>

            {/* Priority */}
            <FieldGroup>
              <Field>
                <FieldLabel>Priority</FieldLabel>

                <Select
                  value={selectedPriority}
                  onValueChange={(value) =>
                    setValue("priority", value as GoalFormData["priority"])
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

          {/* Buttons */}
          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              {editingId ? "Update Goal" : "Add Goal"}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="flex-1 hover:text-white"
              onClick={() => {
                setEditingId(null);
                reset();
                onClose();
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
