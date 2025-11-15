import React, { useState, useEffect } from "react";
import BudgetList from "./components/BudgetList";
import BudgetForm from "./components/BudgetForm";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import BudgetPieChart from "./components/BudgetPieChart";
import Login from "./components/Login";
import { getBudgets } from "./api/budgetApi";
import { getExpenses } from "./api/expenseApi";

function App() {
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [reload, setReload] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) setIsLoggedIn(true);
  }, []);

  // 모든 예산/지출 조회
  useEffect(() => {
    async function fetchData() {
      const budgetsRes = await getBudgets();
      const expensesRes = await getExpenses();

      setBudgets(budgetsRes.data);
      setExpenses(expensesRes.data);
    }
    fetchData();
  }, [reload]);

  const handleSave = () => setReload(prev => !prev);
  const handleLoginSuccess = () => setIsLoggedIn(true);
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) return <Login onLoginSuccess={handleLoginSuccess} />;

  // PieChart용 데이터
  const chartData = budgets.map(b => {
    const totalExpense = expenses
      .filter(e => e.budgetId === b.id)
      .reduce((sum, e) => sum + e.amount, 0);
    return {
      category: b.category,
      budget: b.amount,
      expense: totalExpense,
    };
  });

  return (
    <div>
      <h1>SmartBudget</h1>
      <button onClick={handleLogout}>로그아웃</button>

      <BudgetForm selectedBudget={selectedBudget} onSave={handleSave} />
      <BudgetList onEdit={setSelectedBudget} onReload={handleSave} />

      <ExpenseForm onSave={handleSave} />
      <ExpenseList expenses={expenses} />

      <h2>전체 예산/지출 현황</h2>
      {chartData.length > 0 && <BudgetPieChart chartData={chartData} />}
    </div>
  );
}

export default App;
