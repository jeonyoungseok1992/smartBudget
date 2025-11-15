import api from "./api";

// 예산별 지출 조회
export const getExpenses = (budgetId) => {
  if (budgetId) return api.get(`/expenses/budget/${budgetId}`);
  return api.get("/expenses/all");
};

export const createExpense = (expense) => api.post("/expenses", expense);
export const updateExpense = (expense) => api.put("/expenses", expense);
export const deleteExpense = (id) => api.delete(`/expenses/${id}`);
