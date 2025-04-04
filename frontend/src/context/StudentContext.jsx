import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
const StudentContext = createContext();

// Provide context
export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState(() => {
    // Check sessionStorage on initial load
    const storedStudent = sessionStorage.getItem("student");
    return storedStudent ? JSON.parse(storedStudent) : null;
  });

  useEffect(() => {
    // Persist the student data in sessionStorage whenever it changes
    if (student) {
      sessionStorage.setItem("student", JSON.stringify(student));
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
