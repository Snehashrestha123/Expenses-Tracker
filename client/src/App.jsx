import React from "react";
import { Plus } from 'lucide-react'
import StatCard from "./components/StatCard";
import SpendingChart from "./components/SpendingChart";
import CategoryChart from "./components/CategoryChart";
import TransactionList from "./components/TransactionList";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6 lg:py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-700 lg:text-4xl mb-1">
              Expense Tracker
            </h1>
            <p className="text-gray-700">Manage your finances with ease</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-gray-600 text-white rounded-xl font-semibold hover:shadow-2xl tranisition-all flex items-center gap-2">
              <Plus className="w-4 h-4 " /> Add Expenses
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols lg:grid-cols-4 gap-6 mb-8">
          <StatCard />
        </div>

        {/*Chart*/}
        <div className="grid grid-colz-1 lg:grid-cols-5 gap-6 mb-8">
          <div className="lg:col-span-3">
            <SpendingChart />
          </div>

          <div className="lg:col-span-2">
            <CategoryChart />
          </div>
        </div>

        {/*Transaction List*/}
        <TransactionList />
      </div>
    </div>
  );
}

export default App;