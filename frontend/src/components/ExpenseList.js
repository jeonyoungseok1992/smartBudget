import React from "react";

export default function ExpenseList({ expenses }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <h3>등록된 지출 목록</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>카테고리</th>
            <th>금액</th>
            <th>설명</th>
            <th>등록일</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(e => (
            <tr key={e.id}>
              <td>{e.category}</td>
              <td>{e.amount}</td>
              <td>{e.description}</td>
              <td>{new Date(e.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
