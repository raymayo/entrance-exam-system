import React from "react";
import TotalRegisteredStudent from "../dashboard-components/TotalRegisteredStudent.jsx";
import LineChartComponent from "../dashboard-components/LineChartComponent.jsx";
import PieChartComponent from "../dashboard-components/PieChartComponent.jsx";
import FinalGradeChart from "../dashboard-components/FinalGradeChart.jsx";

const AdminDashboard = () => {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <TotalRegisteredStudent />
      <div className="flex w-full gap-4">
        <div className="rounded-md border border-zinc-200 p-4 shadow-2xs">
          <LineChartComponent />
        </div>
        <div className="rounded-md border border-zinc-200 p-4 shadow-2xs">
          <PieChartComponent />
        </div>
        <div>
          <FinalGradeChart />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
