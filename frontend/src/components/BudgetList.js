import React, { useEffect, useState } from 'react';
import { getBudgets, deleteBudget } from '../api/budgetApi';

export default function BudgetList({ onEdit }) {
  const [budgets, setBudgets] = useState([]);

  const fetchBudgets = async () => {
    try {
      const response = await getBudgets();
      setBudgets(response.data);
    } catch (error) {
      console.error('예산 조회 실패', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBudget(id);
      fetchBudgets(); // 삭제 후 다시 목록 갱신
    } catch (error) {
      console.error('삭제 실패', error);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  return (
    <div>
      <h2>예산 목록</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>카테고리</th>
            <th>금액</th>
            <th>월</th>
            <th>설명</th>
            <th>액션</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((b) => (
            <tr key={b.id}>
              <td>{b.category}</td>
              <td>{b.amount}</td>
              <td>{b.month}</td>
              <td>{b.budgetDescription}</td>
              <td>
                <button onClick={() => onEdit(b)}>수정</button>
                <button onClick={() => handleDelete(b.id)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
