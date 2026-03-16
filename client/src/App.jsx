import React, { useEffect, useState } from "react";
import { DollarSign, Plus, ShoppingCart, TrendingUp, Wallet } from 'lucide-react'
import StatCard from "./components/StatCard";
import SpendingChart from "./components/SpendingChart";
import CategoryChart from "./components/CategoryChart";
import TransactionList from "./components/TransactionList";
import Model from "./components/Model";

import {
  fetchExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "./api";


function App() {
  const [expenses, setExpense] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("ALL");


  // Stats Calculation
  const calculationStats = (expenseList) => {
    const list = expenseList || [];

    const total = list.reduce((sum, e) => sum + Number(e.amount || 0), 0);

    const categoryTotals = list.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + Number(e.amount || 0);
      return acc;
    }, {});

    return {
      total,
      count: list.length,
      avg: list.length > 0 ? total / list.length : 0,
      highest:
        list.length > 0
          ? Math.max(...list.map((e) => Number(e.amount) || 0))
          : 0,
      categoryTotals,
    };
  };

  const stats = calculationStats(expenses);


  //Load initial data
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // Fetch expenses
        const expData = await Promise.all([fetchExpenses()]);

        // Normalize dates
        const normalized = (expData || []).map((e) => ({
          ...e,
          date: e?.date
            ? String(e.date).split("T")[0]
            : new Date().toISOString().split("T")[0],
        }));
        setExpense(normalized);
      } catch (error) {
        console.error("load error:", error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);


  //Edit and Delete Function
  // const handleAddExpense = async (payload) => {
  //   try {
  //     const created = await createExpense(payload); // fixed typo

  //     if (!created) throw new Error("No created expense returned");

  //     setExpense((prev) => [
  //       { ...created, date: created.date.split("T")[0] },
  //       ...prev,
  //     ]);

  //     setIsModelOpen(false);
  //   } catch (error) {
  //     console.error("Create error:", error);
  //   }
  // };


  const handleAddExpense = async (payload) => {
  try {
    // Make sure payload has all fields
    if (!payload.title || !payload.amount || !payload.category) {
      console.error("Missing required fields");
      return;
    }

    const created = await createExpense(payload);

    setExpense((prev) => [
      { ...created, date: created.date.split("T")[0] },
      ...prev,
    ]);

    setIsModelOpen(false);
  } catch (error) {
    console.error("Create error:", error);
  }
};

  const onEdit = (expense) => {
    setEditingExpense(expense);
    setIsModelOpen(true);
  };


  const handleSaveEdit = async (payload) => {
    if (!editingExpense) return;

    try {
      const updated = await updateExpense(editingExpense._id, payload);

      setExpense((prev) =>
        prev.map((e) =>
          e._id === updated._id
            ? { ...updated, date: updated.date.split("T")[0] }
            : e
        )
      );

      setEditingExpense(null);
      setIsModelOpen(false);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this Expense?")) return; // fixed logic

    try {
      await deleteExpense(id);

      // Remove deleted expense from state
      setExpense((prev) => prev.filter((e) => e._id !== id));
    } catch (error) {
      console.error("Delete error:", error); // fixed error message
    }
  };

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
            <button className="px-4 py-2 bg-gray-600 text-white rounded-xl font-semibold hover:shadow-2xl transition-all flex items-center gap-2" onClick={() => {
              setEditingExpense(null);
              setIsModelOpen(true);
            }}
            >
              <Plus className="w-4 h-4 " /> Add Expenses
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            value={`$${stats.total.toFixed(2)}`}
            title="Total Spent"
            icon={Wallet}
            subtitle="This Month"
            bgColor="bg-gradient-to-br from-indigo-500 to-indigo-600"
            iconColor="bg-indigo-700"
          />

          <StatCard
            value={stats.count}
            title="Expenses"
            icon={ShoppingCart}
            subtitle={`${stats.count} transactions`}
            bgColor="bg-gradient-to-br from-purple-500 to-purple-600"
            iconColor="bg-purple-700"
          />

          <StatCard
            value={`$${stats.total.toFixed(2)}`}
            title="Average"
            icon={TrendingUp}
            subtitle="Per expense"
            bgColor="bg-gradient-to-br from-pink-500 to-pink-600"
            iconColor="bg-pink-700"
          />

          <StatCard
            icon={DollarSign}
            title="Highest"
            value={`$${stats.highest.toFixed(2)}`}
            subtitle="Single expenses"
            bgColor="bg-gradient-to-br from-orange-500 to-orange-600"
            iconColor="bg-orange-700"
          />
        </div>


        {/*Chart*/}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          <div className="lg:col-span-3">
            <SpendingChart expenses={expenses} />
          </div>

          <div className="lg:col-span-2">
            <CategoryChart categoryTotals={stats.categoryTotals} />
          </div>
        </div>

        {/*Transaction List*/}
        <TransactionList
          expenses={expenses}
          onDelete={handleDelete}
          onEdit={onEdit}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          isLoading={isLoading}
        />
      </div>

      {/*Model */}

      <Model
        isOpen={isModelOpen}
        onClose={() => {
          setIsModelOpen(false);
          setEditingExpense(null);
        }}
        // setIsModelOpen={setIsModelOpen}
        onSubmit={editingExpense ? handleSaveEdit : handleAddExpense}
        initialData={editingExpense}
      />
    </div>
  );
}

export default App;








