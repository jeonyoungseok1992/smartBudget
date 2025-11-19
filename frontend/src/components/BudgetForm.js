import React, { useState, useEffect } from 'react';
import { createBudget, updateBudget } from '../api/budgetApi';

export default function BudgetForm({ selectedBudget, onSave, year, month}) {
  const [form, setForm] = useState({
    category: '',
    amount: '',
    month: '',
    budgetDescription: ''
  });

  // 카테고리 코드 목록 (DB에서 불러오게 바꿔도 됨)
  const categories = [
    { code: 'FOOD', name: '식비' },
    { code: 'TRANSPORT', name: '교통비' },
    { code: 'HOUSING', name: '주거비' },
    { code: 'ENTERTAIN', name: '여가/취미' },
    { code: 'OTHER', name: '기타' }
  ];

  useEffect(() => {
    if (selectedBudget) {
      setForm(selectedBudget);
    } else {
      setForm({ category: '', amount: '', month: '', budgetDescription: '' });
    }
  }, [selectedBudget]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      year,
      month
    };

    try {
      if (form.id) {
        await updateBudget(payload);
      } else {
        await createBudget(payload);
      }
      onSave();
      setForm({ category: '', amount: '', month: '', budgetDescription: '' });
    } catch (error) {
      console.error('저장 실패', error);
    }
  };

  return (
    <div>
      <h2>{form.id ? '예산 수정' : '예산 등록'}</h2>
      <form onSubmit={handleSubmit}>
        {/* ✅ 셀렉트 박스로 변경 */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">카테고리 선택</option>
          {categories.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          name="amount"
          type="number"
          placeholder="금액"
          value={form.amount}
          onChange={handleChange}
          required
        />
        <input
          name="budgetDescription"
          placeholder="설명"
          value={form.budgetDescription}
          onChange={handleChange}
        />
        <button type="submit">{form.id ? '수정' : '등록'}</button>
      </form>
    </div>
  );
}
