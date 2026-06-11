"use client";

// Imports
import { useState } from "react";
import GoalsHeader from "./GoalsHeader";
import GoalForm from "./GoalForm";
import ActiveGoals from "./ActiveGoals";

// Client wrapper controlling shared state
export default function GoalsClient() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <GoalsHeader
        showForm={showForm}
        setShowForm={setShowForm}
        editingId={editingId}
        setEditingId={setEditingId}
      />

      {/* Form */}
      {showForm && (
        <GoalForm
          editingId={editingId}
          setEditingId={setEditingId}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Active Goals */}
      <ActiveGoals setEditingId={setEditingId} setShowForm={setShowForm} />
    </div>
  );
}
