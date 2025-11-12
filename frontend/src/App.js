import React, { useState, useEffect } from "react";
import BudgetList from "./components/BudgetList";
import BudgetForm from "./components/BudgetForm";
import Login from "./components/Login";

function App() {
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [reload, setReload] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 앱 시작 시 localStorage 체크
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setIsLoggedIn(true); // 토큰 있으면 로그인 상태 유지
    }
  }, []);

  const handleEdit = (budget) => setSelectedBudget(budget);
  const handleSave = () => {
    setSelectedBudget(null);
    setReload(prev => !prev);
  };

  const handleLoginSuccess = (token) => {
    // localStorage.setItem("jwtToken", token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    // localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) return <Login onLoginSuccess={handleLoginSuccess} />;

  return (
    <div>
      <h1>SmartBudget</h1>
      <button onClick={handleLogout}>로그아웃</button>
      <BudgetForm selectedBudget={selectedBudget} onSave={handleSave} />
      <BudgetList key={reload} onEdit={handleEdit} />
    </div>
  );
}

export default App;
