import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../admin-pages/AdminDashboard.jsx";
import StudentList from "../admin-pages/StudentList.jsx";
import AdminList from "../admin-pages/AdminList.jsx";
import ManageExam from "../admin-pages/ManageExam.jsx";
import CreateExam from "../admin-pages/CreateExam.jsx";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/students" element={<StudentList />} />
      <Route path="/admin-list" element={<AdminList />} />
      <Route path="/exam-list" element={<ManageExam />} />
      <Route path="/create-exam" element={<CreateExam />} />
    </Routes>
  );
};

export default AdminRoutes;
