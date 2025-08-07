import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// Function to group scores into ranges
function groupScores(scores, step = 10) {
  const bins = [];

  // Determine max score to know how many bins we need
  const maxScore = Math.max(...scores);
  const binCount = Math.ceil(maxScore / step);

  for (let i = 0; i < binCount; i++) {
    const min = i * step;
    const max = min + step;
    const label = `${min}-${max}`;
    const count = scores.filter((score) => score >= min && score <= max).length;
    bins.push({ range: label, students: count });
  }

  return bins;
}

// Example student scores
const studentScores = [
  5, 12, 18, 22, 29, 29, 29, 35, 35, 35, 37, 42, 42, 42, 42, 42, 42, 48, 51, 51,
  51, 51, 56, 61, 61, 61, 73, 77, 85,
];
const gradeData = groupScores(studentScores, 10);

export default function FinalGradeChart() {
  return (
    <BarChart
      width={700}
      height={500}
      data={gradeData}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="range"
        label={{ value: "Score Range", position: "insideBottom", offset: -5 }}
      />
      <YAxis
        label={{
          value: "Number of Students",
          angle: -90,
          position: "insideLeft",
        }}
      />
      <Tooltip />
      <Legend />
      <Bar dataKey="students" fill="#82ca9d" />
    </BarChart>
  );
}
