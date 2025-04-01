import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./components/Registration.jsx";
import GenerateQR from "./components/GenerateQR.jsx";
import Entrance from "./components/Entrance.jsx";
import UpdateDetails from "./components/UpdateDetails.jsx";
import ExamSelection from "./components/ExamSelection.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/student/:id" element={<GenerateQR />} />
        <Route path="/" element={<Registration />} />
        <Route path="/entrance" element={<Entrance />} />

        {/* Protected Route for UpdateDetails */}
        <Route
          path="/student/:id/details"
          element={<ProtectedRoute element={<UpdateDetails />} />}
        />

        <Route
          path="/student/:id/exam"
          element={<ProtectedRoute element={<ExamSelection />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
