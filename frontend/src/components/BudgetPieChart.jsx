import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function BudgetPieChart({ chartData }) {
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f", "#8dd1e1"];

  const pieData = chartData.map((item) => ({
    name: item.category,
    value: item.budget,
    expense: item.expense,
  }));

  return (
    <PieChart width={400} height={300}>
      {/* 예산 Pie */}
      <Pie
        data={pieData}
        dataKey="value"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label={(entry) => entry.name}
      >
        {pieData.map((entry, idx) => (
          <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
        ))}
      </Pie>

      {/* 지출 Pie */}
      <Pie
        data={pieData}
        dataKey="expense"
        cx="50%"
        cy="50%"
        innerRadius={50}
        outerRadius={100}
        fill="rgba(0,0,0,0.2)"
      />

      <Tooltip />
      <Legend />
    </PieChart>
  );
}

export default BudgetPieChart;
