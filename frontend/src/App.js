import React, { useState, useEffect } from "react";
import BudgetList from "./components/BudgetList";
import BudgetForm from "./components/BudgetForm";
import Login from "./components/Login";
import { getBudgets, deleteBudget } from "./api/budgetApi";

function App() {
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [reload, setReload] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [budgets, setBudgets] = useState([]);

  // 상단 년/월 페이징 상태
  const [yearMonth, setYearMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  const [year, month] = yearMonth.split("-");

  // 로그인 체크
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) setIsLoggedIn(true);
  }, []);

  // 예산 조회
  useEffect(() => {
    async function fetchBudgets() {
      try {
        const res = await getBudgets(year, month);
        setBudgets(res.data);
      } catch (error) {
        console.error("예산 조회 실패", error);
      }
    }
    fetchBudgets();
  }, [reload, year, month]);

  const handleSave = () => setReload(prev => !prev);

  const handleLoginSuccess = () => setIsLoggedIn(true);
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setIsLoggedIn(false);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBudget(id);
      setReload(prev => !prev); // 리스트 갱신
    } catch (err) {
      console.error("삭제 실패", err);
    }
  };

  // 년/월 이동
  const moveMonth = (diff) => {
    const date = new Date(yearMonth + "-01");
    date.setMonth(date.getMonth() + diff);
    const newYm = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    setYearMonth(newYm);
  };

  if (!isLoggedIn) return <Login onLoginSuccess={handleLoginSuccess} />;

  return (
    <div>
      <h1>SmartBudget</h1>
      <button onClick={handleLogout}>로그아웃</button>

      {/* 상단 년/월 페이징 */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "20px 0" }}>
        <button onClick={() => moveMonth(-1)}>◀ 이전달</button>
        <strong>{yearMonth}</strong>
        <button onClick={() => moveMonth(1)}>다음달 ▶</button>
      </div>

      {/* 예산 등록/수정 폼 */}
      <BudgetForm
        selectedBudget={selectedBudget}
        onSave={handleSave}
        budgets={budgets}
        year={year}
        month={month}
      />

      {/* 예산 리스트 */}
      <BudgetList
        budgets={budgets}
        onEdit={setSelectedBudget}
        onReload={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
