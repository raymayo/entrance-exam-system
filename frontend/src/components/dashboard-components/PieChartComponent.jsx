import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "Computer Science Dept", value: 143 },
  { name: "Hotel Management Dept", value: 342 },
  { name: "Teacher Education Dept", value: 320 },
  { name: "Business Administration Dept", value: 245 },
];

const COLORS = ["#6A4C93", "#E63946", "#118AB2", "#FFD166"];

export default function PieChartComponent() {
  return (
    <PieChart width={700} height={500}>
      <Tooltip />
      <Legend />
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={200}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
