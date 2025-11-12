// src/api/budgetApi.js
import api from "./api";

export const getBudgets = (params) => api.get("/budgets/search", { params });
export const createBudget = (budget) => api.post("/budgets", budget);
export const updateBudget = (budget) => api.put(`/budgets/${budget.id}`, budget);
export const deleteBudget = (id) => api.delete(`/budgets/${id}`);eeeeeeeeeee
