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

  // ✔ 추가된 yearMonth 상태
  const [yearMonth, setYearMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  const [year, month] = yearMonth.split("-");


  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) setIsLoggedIn(true);
  }, []);

  // 기존 데이터 조회는 그대로 유지
  useEffect(() => {
    async function fetchData() {
      const budgetsRes = await getBudgets(year, month);
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

  // ✔ 년/월 이동 함수 추가
  const moveMonth = (diff) => {
    const date = new Date(yearMonth + "-01");
    date.setMonth(date.getMonth() + diff);
    const newYm = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    setYearMonth(newYm);
  };

  return (
    <div>
      <h1>SmartBudget</h1>
      <button onClick={handleLogout}>로그아웃</button>

      {/* ✔ 상단 년/월 페이징 UI */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "20px 0" }}>
        <button onClick={() => moveMonth(-1)}>◀ 이전달</button>
        <strong>{yearMonth}</strong>
        <button onClick={() => moveMonth(1)}>다음달 ▶</button>
      </div>

      {/* 기존 구조 그대로 */}
      <BudgetForm selectedBudget={selectedBudget} onSave={handleSave} year={year} month={month}/>
      <BudgetList onEdit={setSelectedBudget} onReload={handleSave} year={year} month={month}/>

      <ExpenseForm onSave={handleSave} />
      <ExpenseList expenses={expenses} />

      <h2>전체 예산/지출 현황</h2>
      {chartData.length > 0 && <BudgetPieChart chartData={chartData} />}
    </div>
  );
}

export default App;
