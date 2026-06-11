"use client";

// Imports
import { useForm } from "react-hook-form";
import { useFinance } from "@/context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExpenseFormData, ExpenseFormProps } from "@/types";

// Categories list
const CATEGORIES = [
  "food",
  "transport",
  "entertainment",
  "utilities",
  "shopping",
  "health",
  "salary",
  "other",
] as const;

// Default form values
const defaultValues: ExpenseFormData = {
  type: "expense",
  amount: "",
  category: "food",
  description: "",
  date: new Date().toISOString().split("T")[0],
};

export default function ExpenseForm({ onClose }: ExpenseFormProps) {
  // Finance context
  const { addTransaction } = useFinance();

  // React Hook Form
  const { register, handleSubmit, watch, setValue, reset } =
    useForm<ExpenseFormData>({
      defaultValues,
    });

  // Watch select values
  const selectedType = watch("type");
  const selectedCategory = watch("category");

  // Handle form submit
  const onSubmit = (data: ExpenseFormData) => {
    addTransaction({
      type: data.type,
      amount: Number(data.amount),
      category: data.category,
      description: data.description,
      date: data.date,
    });

    // Reset form
    reset(defaultValues);

    // Hide form
    onClose();
  };

  return (
    <Card>
      {/* Form header */}
      <CardHeader className="pb-4 text-center">
        <CardTitle className="text-xl font-semibold">Add Transaction</CardTitle>

        <p className="text-sm text-muted-foreground">
          Fill in the details below to create a new transaction.
        </p>
      </CardHeader>

      {/* Form content */}
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Transaction type */}
            <FieldGroup>
              <Field>
                <FieldLabel>Type</FieldLabel>

                <Select
                  value={selectedType}
                  onValueChange={(value) =>
                    setValue("type", value as "income" | "expense")
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="expense">Expense</SelectItem>

                    <SelectItem value="income">Income</SelectItem>
                  </SelectContent>
                </Select>
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
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>

            {/* Amount */}
            <FieldGroup>
              <Field>
                <FieldLabel>Amount</FieldLabel>

                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("amount", {
                    required: true,
                  })}
                />
              </Field>
            </FieldGroup>

            {/* Date */}
            <FieldGroup>
              <Field>
                <FieldLabel>Date</FieldLabel>

                <Input
                  type="date"
                  {...register("date", {
                    required: true,
                  })}
                />
              </Field>
            </FieldGroup>
          </div>

          {/* Description */}
          <FieldGroup>
            <Field>
              <FieldLabel>Description</FieldLabel>

              <Input
                placeholder="Enter description"
                {...register("description", {
                  required: true,
                })}
              />
            </Field>
          </FieldGroup>

          {/* Action buttons */}
          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              Add Transaction
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 hover:text-white"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
