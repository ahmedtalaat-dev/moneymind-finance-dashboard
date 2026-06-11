"use client";

// Imports
import { Button } from "@/components/ui/button";
import { Props } from "@/types";

// Header only UI + toggle
export default function GoalsHeader({
  showForm,
  setShowForm,
  editingId,
  setEditingId,
}: Props) {
  const handleToggleForm = () => {
    if (showForm) {
      setEditingId(null);
      setShowForm(false);
      return;
    }

    setShowForm(true);
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Financial Goals</h1>

        <p className="text-muted-foreground mt-1">
          Create and track your financial goals
        </p>
      </div>

      <Button onClick={handleToggleForm}>
        {showForm ? "Close Form" : "Add Goal"}
      </Button>
    </div>
  );
}
