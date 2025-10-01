import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./components/Registration.jsx";
import GenerateQR from "./components/GenerateQR.jsx";
import Entrance from "./components/Entrance.jsx";
import UpdateDetails from "./components/UpdateDetails.jsx";
import ExamSelection from "./components/ExamSelection.jsx";
import Exam from "./components/Exam.jsx";
import Success from "./components/Success.jsx";
import Scanner from "./components/CodeScanner.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { StudentProvider } from "./context/StudentContext.jsx"; // Import your context provider
import AdminLogin from "./components/AdminLogin.jsx";

import AdminProtectedRoute from "./components/AdminProtectedRoute.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import Test from "./components/report/Test.jsx";

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <StudentProvider>
      {/* Context should wrap the entire Router */}
      <Router>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/test" element={<Test />} />
          <Route path="/entrance" element={<Entrance />} />
          <Route path="/student/:id" element={<GenerateQR />} />
          <Route path="/scan" element={<Scanner />} />
          <Route path="/admin" element={<AdminLogin />} />

          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin/*" element={<AdminPanel />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/student/:id/details" element={<UpdateDetails />} />
            <Route path="/student/:id/exam" element={<ExamSelection />} />
            <Route path="/student/:id/exam/:subjectId" element={<Exam />} />
            <Route path="/student/:id/success" element={<Success />} />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </StudentProvider>
  );
}

export default App;
