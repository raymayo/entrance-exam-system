import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./components/Registration.jsx";
import GenerateQR from "./components/GenerateQR.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:id" element={<GenerateQR />} />
        <Route path="/" element={<Registration />} />
      </Routes>
    </Router>
  );
}

export default App;
