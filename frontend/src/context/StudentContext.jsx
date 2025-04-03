import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
const StudentContext = createContext();

// Provide context
export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState(() => {
    // Check localStorage on initial load
    const storedStudent = localStorage.getItem("student");
    return storedStudent ? JSON.parse(storedStudent) : null;
  });

  useEffect(() => {
    // Persist the student data in localStorage whenever it changes
    if (student) {
      localStorage.setItem("student", JSON.stringify(student));
    }
  }, [student]);

  return (
    <StudentContext.Provider value={{ student, setStudent }}>
      {children}
    </StudentContext.Provider>
  );
};

// Custom hook to use the student context
export const useStudent = () => useContext(StudentContext);
