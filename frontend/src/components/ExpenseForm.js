import React, { useState } from 'react';
import { createExpense } from '../api/expenseApi';

// BudgetForm과 동일한 카테고리 코드 목록
const categories = [
  { code: 'FOOD', name: '식비' },
  { code: 'TRANSPORT', name: '교통비' },
  { code: 'HOUSING', name: '주거비' },
  { code: 'ENTERTAIN', name: '여가/취미' },
  { code: 'OTHER', name: '기타' }
];

export default function ExpenseForm({ onSave }) {
  const [form, setForm] = useState({
    category: '',
    amount: '',
    description: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category || !form.amount || !form.date) {
      return alert('카테고리, 금액, 날짜는 필수입니다.');
    }

    try {
      await createExpense({
        category: form.category,
        amount: parseInt(form.amount),
        description: form.description,
        date: form.date
      });
      setForm({ category: '', amount: '', description: '', date: '' });
      onSave();
    } catch (err) {
      console.error('지출 등록 실패', err);
    }
  };

  return (
    <div>
      <h2>지출 등록</h2>
      <form onSubmit={handleSubmit}>
        {/* BudgetForm과 동일한 카테고리 셀렉트 */}
        <select name="category" value={form.category} onChange={handleChange} required>
          <option value="">카테고리 선택</option>
          {categories.map(c => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="amount"
          placeholder="금액"
          value={form.amount}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="설명"
          value={form.description}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <button type="submit">등록</button>
      </form>
    </div>
  );
}
