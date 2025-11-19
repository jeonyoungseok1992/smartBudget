export default function BudgetList({ budgets, onEdit, onReload, onDelete }) {
  const handleDelete = async (id) => {
    try {
      await deleteBudget(id);
      onReload(); // 부모(App.js) 상태 갱신
    } catch (error) {
      console.error("삭제 실패", error);
    }
  };

  return (
    <div>
      <h2>예산 목록</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>카테고리</th>
            <th>금액</th>
            <th>설명</th>
            <th>액션</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((b) => (
            <tr key={b.id}>
              <td>{b.categoryDescription}</td>
              <td>{b.amount}</td>
              <td>{b.budgetDescription}</td>
              <td>
                <button onClick={() => onEdit(b)}>수정</button>
                <button onClick={() => onDelete(b.id)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
