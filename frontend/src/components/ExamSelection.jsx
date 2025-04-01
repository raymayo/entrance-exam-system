import React from "react";
import { useLocation } from "react-router-dom";

const ExamSelection = () => {
  const location = useLocation();
  const student = location.state;
  return <div>ExamSelection</div>;
};

export default ExamSelection;
