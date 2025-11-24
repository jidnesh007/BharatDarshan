import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  Edit3,
  Trash2,
  TrendingUp,
  PieChart,
  AlertCircle,
  DollarSign,
  Calendar,
  Filter,
} from "lucide-react";
import {
  PieChart as RechartsPieChart,
  Cell,
  ResponsiveContainer,
  BarChart,
  Pie,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const MoneyTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [budgetSettings, setBudgetSettings] = useState({
    dailyBudget: 2000,
    tripBudget: 50000,
    preferredCurrency: "INR",
  });
  const [exchangeRates, setExchangeRates] = useState({});
  const [newExpense, setNewExpense] = useState({
    amount: "",
    currency: "INR",
    category: "food",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState("expenses");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterPeriod, setFilterPeriod] = useState("all");

  const categories = [
    { id: "food", name: "Food & Dining", color: "#FF6B6B", icon: "🍽️" },
    { id: "travel", name: "Travel & Transport", color: "#4ECDC4", icon: "🚗" },
    { id: "shopping", name: "Shopping", color: "#45B7D1", icon: "🛍️" },
    {
      id: "accommodation",
      name: "Accommodation",
      color: "#96CEB4",
      icon: "🏨",
    },
    {
      id: "entertainment",
      name: "Entertainment",
      color: "#FFEAA7",
      icon: "🎬",
    },
    { id: "health", name: "Health & Medical", color: "#DDA0DD", icon: "🏥" },
    { id: "other", name: "Other", color: "#95A5A6", icon: "📝" },
  ];

  const currencies = [
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
    { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  ];

  // Fetch exchange rates
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/56d0742524d3e285c02089a8/latest/${budgetSettings.preferredCurrency}`
        );
        const data = await response.json();
        if (data.result === "success") {
          setExchangeRates(data.conversion_rates);
        }
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
        // Fallback rates for demo
        setExchangeRates({
          INR: 1,
          USD: 0.012,
          EUR: 0.011,
          GBP: 0.0095,
          JPY: 1.8,
          CAD: 0.016,
          AUD: 0.018,
        });
      }
    };

    fetchExchangeRates();
  }, [budgetSettings.preferredCurrency]);

  // Convert currency to preferred currency
  const convertCurrency = (amount, fromCurrency) => {
    if (fromCurrency === budgetSettings.preferredCurrency) return amount;

    const rate = exchangeRates[fromCurrency];
    if (!rate) return amount;

    // Convert to base currency (preferred) via USD rates
    const inPreferredCurrency = amount / rate;
    return inPreferredCurrency;
  };

  // Get currency symbol
  const getCurrencySymbol = (currencyCode) => {
    const currency = currencies.find((c) => c.code === currencyCode);
    return currency ? currency.symbol : currencyCode;
  };

  // Add or update expense
  const handleSubmitExpense = () => {
    if (!newExpense.amount || !newExpense.description) return;

    const expense = {
      id: editingId || Date.now(),
      ...newExpense,
      amount: parseFloat(newExpense.amount),
      convertedAmount: convertCurrency(
        parseFloat(newExpense.amount),
        newExpense.currency
      ),
      timestamp: new Date().toISOString(),
    };

    if (editingId) {
      setExpenses(
        expenses.map((exp) => (exp.id === editingId ? expense : exp))
      );
      setEditingId(null);
    } else {
      setExpenses([...expenses, expense]);
    }

    setNewExpense({
      amount: "",
      currency: "INR",
      category: "food",
      description: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  // Delete expense
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  // Edit expense
  const editExpense = (expense) => {
    setNewExpense(expense);
    setEditingId(expense.id);
  };

  // Filter expenses
  const getFilteredExpenses = () => {
    let filtered = expenses;

    if (filterCategory !== "all") {
      filtered = filtered.filter((exp) => exp.category === filterCategory);
    }

    if (filterPeriod !== "all") {
      const now = new Date();
      const filterDate = new Date();

      switch (filterPeriod) {
        case "today":
          filterDate.setDate(now.getDate());
          break;
        case "week":
          filterDate.setDate(now.getDate() - 7);
          break;
        case "month":
          filterDate.setMonth(now.getMonth() - 1);
          break;
      }

      filtered = filtered.filter((exp) => new Date(exp.date) >= filterDate);
    }

    return filtered;
  };

  // Calculate totals
  const calculateTotals = () => {
    const filteredExpenses = getFilteredExpenses();
    const totalSpent = filteredExpenses.reduce(
      (sum, exp) => sum + exp.convertedAmount,
      0
    );

    const today = new Date().toISOString().split("T")[0];
    const todayExpenses = expenses.filter((exp) => exp.date === today);
    const dailySpent = todayExpenses.reduce(
      (sum, exp) => sum + exp.convertedAmount,
      0
    );

    return { totalSpent, dailySpent };
  };

  // Get category data for pie chart
  const getCategoryData = () => {
    const categoryTotals = {};

    getFilteredExpenses().forEach((expense) => {
      if (!categoryTotals[expense.category]) {
        categoryTotals[expense.category] = 0;
      }
      categoryTotals[expense.category] += expense.convertedAmount;
    });

    return categories
      .map((category) => ({
        name: category.name,
        value: categoryTotals[category.id] || 0,
        color: category.color,
        icon: category.icon,
      }))
      .filter((item) => item.value > 0);
  };

  // Get daily spending data for bar chart
  const getDailySpendingData = () => {
    const dailyTotals = {};

    expenses.forEach((expense) => {
      if (!dailyTotals[expense.date]) {
        dailyTotals[expense.date] = 0;
      }
      dailyTotals[expense.date] += expense.convertedAmount;
    });

    return Object.entries(dailyTotals)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .slice(-7)
      .map(([date, amount]) => ({
        date: new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        amount,
      }));
  };

  const { totalSpent, dailySpent } = calculateTotals();
  const categoryData = getCategoryData();
  const dailySpendingData = getDailySpendingData();

  // Budget alerts
  const dailyBudgetExceeded = dailySpent > budgetSettings.dailyBudget;
  const tripBudgetExceeded = totalSpent > budgetSettings.tripBudget;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <DollarSign className="text-green-600" />
            Money Tracker
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Base Currency:{" "}
              {getCurrencySymbol(budgetSettings.preferredCurrency)}
            </span>
          </div>
        </div>

        {/* Budget Alerts */}
        {(dailyBudgetExceeded || tripBudgetExceeded) && (
          <div className="mb-6">
            {dailyBudgetExceeded && (
              <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-2 rounded-r-lg">
                <div className="flex items-center">
                  <AlertCircle className="text-red-500 mr-2" size={20} />
                  <span className="text-red-800">
                    Daily budget exceeded! Spent{" "}
                    {getCurrencySymbol(budgetSettings.preferredCurrency)}
                    {dailySpent.toFixed(2)} of{" "}
                    {getCurrencySymbol(budgetSettings.preferredCurrency)}
                    {budgetSettings.dailyBudget}
                  </span>
                </div>
              </div>
            )}
            {tripBudgetExceeded && (
              <div className="bg-orange-100 border-l-4 border-orange-500 p-4 rounded-r-lg">
                <div className="flex items-center">
                  <AlertCircle className="text-orange-500 mr-2" size={20} />
                  <span className="text-orange-800">
                    Trip budget exceeded! Spent{" "}
                    {getCurrencySymbol(budgetSettings.preferredCurrency)}
                    {totalSpent.toFixed(2)} of{" "}
                    {getCurrencySymbol(budgetSettings.preferredCurrency)}
                    {budgetSettings.tripBudget}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Today's Spending</p>
                <p className="text-2xl font-bold">
                  {getCurrencySymbol(budgetSettings.preferredCurrency)}
                  {dailySpent.toFixed(2)}
                </p>
              </div>
              <Calendar className="text-green-200" size={32} />
            </div>
            <div className="mt-2">
              <div className="bg-green-400 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-white h-full transition-all duration-300"
                  style={{
                    width: `${Math.min(
                      (dailySpent / budgetSettings.dailyBudget) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
              <p className="text-xs text-green-100 mt-1">
                {((dailySpent / budgetSettings.dailyBudget) * 100).toFixed(1)}%
                of daily budget
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Spent</p>
                <p className="text-2xl font-bold">
                  {getCurrencySymbol(budgetSettings.preferredCurrency)}
                  {totalSpent.toFixed(2)}
                </p>
              </div>
              <TrendingUp className="text-blue-200" size={32} />
            </div>
            <div className="mt-2">
              <div className="bg-blue-400 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-white h-full transition-all duration-300"
                  style={{
                    width: `${Math.min(
                      (totalSpent / budgetSettings.tripBudget) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
              <p className="text-xs text-blue-100 mt-1">
                {((totalSpent / budgetSettings.tripBudget) * 100).toFixed(1)}%
                of trip budget
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Total Expenses</p>
                <p className="text-2xl font-bold">{expenses.length}</p>
              </div>
              <PieChart className="text-purple-200" size={32} />
            </div>
            <p className="text-xs text-purple-100 mt-4">
              Across {categories.length} categories
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          {[
            { id: "expenses", label: "Expenses", icon: PlusCircle },
            { id: "analytics", label: "Analytics", icon: PieChart },
            { id: "budget", label: "Budget Settings", icon: DollarSign },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Expenses Tab */}
        {activeTab === "expenses" && (
          <div className="space-y-6">
            {/* Add Expense Form */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">
                {editingId ? "Edit Expense" : "Add New Expense"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={newExpense.amount}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, amount: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select
                    value={newExpense.currency}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, currency: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {currencies.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.symbol} {currency.code}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={newExpense.category}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newExpense.date}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, date: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    value={newExpense.description}
                    onChange={(e) =>
                      setNewExpense({
                        ...newExpense,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="What did you buy?"
                  />
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={handleSubmitExpense}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <PlusCircle size={18} />
                  {editingId ? "Update Expense" : "Add Expense"}
                </button>
                {editingId && (
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setNewExpense({
                        amount: "",
                        currency: "INR",
                        category: "food",
                        description: "",
                        date: new Date().toISOString().split("T")[0],
                      });
                    }}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Filter by:
                </span>
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
              <select
                value={filterPeriod}
                onChange={(e) => setFilterPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>

            {/* Expenses List */}
            <div className="space-y-3">
              {getFilteredExpenses().length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <DollarSign
                    size={48}
                    className="mx-auto mb-4 text-gray-300"
                  />
                  <p>No expenses found. Add your first expense above!</p>
                </div>
              ) : (
                getFilteredExpenses().map((expense) => {
                  const category = categories.find(
                    (cat) => cat.id === expense.category
                  );
                  return (
                    <div
                      key={expense.id}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                            style={{ backgroundColor: category?.color }}
                          >
                            {category?.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              {expense.description}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {category?.name} • {expense.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-bold text-lg">
                              {getCurrencySymbol(expense.currency)}
                              {expense.amount.toFixed(2)}
                            </p>
                            {expense.currency !==
                              budgetSettings.preferredCurrency && (
                              <p className="text-sm text-gray-500">
                                ≈{" "}
                                {getCurrencySymbol(
                                  budgetSettings.preferredCurrency
                                )}
                                {expense.convertedAmount.toFixed(2)}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => editExpense(expense)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Edit3 size={18} />
                            </button>
                            <button
                              onClick={() => deleteExpense(expense.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Category Pie Chart */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Spending by Category
                </h3>
                {categoryData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [
                          `${getCurrencySymbol(
                            budgetSettings.preferredCurrency
                          )}${value.toFixed(2)}`,
                          "Amount",
                        ]}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    No data available
                  </div>
                )}
              </div>

              {/* Daily Spending Bar Chart */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Daily Spending (Last 7 Days)
                </h3>
                {dailySpendingData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dailySpendingData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [
                          `${getCurrencySymbol(
                            budgetSettings.preferredCurrency
                          )}${value.toFixed(2)}`,
                          "Amount",
                        ]}
                      />
                      <Bar dataKey="amount" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    No data available
                  </div>
                )}
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Exchange Rates</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {currencies.map((currency) => (
                  <div
                    key={currency.code}
                    className="bg-gray-50 p-3 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        {currency.symbol} {currency.code}
                      </span>
                      <span className="text-sm text-gray-600">
                        {exchangeRates[currency.code]
                          ? `${exchangeRates[currency.code].toFixed(4)}`
                          : "Loading..."}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Rates relative to {budgetSettings.preferredCurrency}. Updated
                automatically.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Budget Progress</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Daily Budget</span>
                    <span className="text-sm text-gray-600">
                      {getCurrencySymbol(budgetSettings.preferredCurrency)}
                      {dailySpent.toFixed(2)} /{" "}
                      {getCurrencySymbol(budgetSettings.preferredCurrency)}
                      {budgetSettings.dailyBudget}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-300 ${
                        dailySpent > budgetSettings.dailyBudget
                          ? "bg-red-500"
                          : "bg-green-500"
                      }`}
                      style={{
                        width: `${Math.min(
                          (dailySpent / budgetSettings.dailyBudget) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {((dailySpent / budgetSettings.dailyBudget) * 100).toFixed(
                      1
                    )}
                    % used
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Trip Budget</span>
                    <span className="text-sm text-gray-600">
                      {getCurrencySymbol(budgetSettings.preferredCurrency)}
                      {totalSpent.toFixed(2)} /{" "}
                      {getCurrencySymbol(budgetSettings.preferredCurrency)}
                      {budgetSettings.tripBudget}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-300 ${
                        totalSpent > budgetSettings.tripBudget
                          ? "bg-red-500"
                          : "bg-blue-500"
                      }`}
                      style={{
                        width: `${Math.min(
                          (totalSpent / budgetSettings.tripBudget) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {((totalSpent / budgetSettings.tripBudget) * 100).toFixed(
                      1
                    )}
                    % used
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">
                      Remaining Budget
                    </h4>
                    <p className="text-2xl font-bold text-green-600">
                      {getCurrencySymbol(budgetSettings.preferredCurrency)}
                      {Math.max(
                        budgetSettings.tripBudget - totalSpent,
                        0
                      ).toFixed(2)}
                    </p>
                    <p className="text-sm text-green-600">
                      Trip budget remaining
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">
                      Average Daily Spend
                    </h4>
                    <p className="text-2xl font-bold text-blue-600">
                      {getCurrencySymbol(budgetSettings.preferredCurrency)}
                      {expenses.length > 0
                        ? (
                            totalSpent /
                            Math.max(
                              new Set(expenses.map((e) => e.date)).size,
                              1
                            )
                          ).toFixed(2)
                        : "0.00"}
                    </p>
                    <p className="text-sm text-blue-600">
                      Across {new Set(expenses.map((e) => e.date)).size} days
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoneyTracker;
