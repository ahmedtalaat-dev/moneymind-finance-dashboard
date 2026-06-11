// Imports
import ExpenseSection from '@/components/expenses/ExpenseSection'
import Transactions from '@/components/expenses/Transactions'

export default function ExpensesPage() {
  return (
    <div className="p-4 md:p-8 space-y-6">

      {/* Header + Form */}
      <ExpenseSection />

      {/* Summary + Filters + History */}
      <Transactions />

    </div>
  )
}