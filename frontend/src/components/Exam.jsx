import React from "react";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

const Exam = () => {
  const { subjectId } = useParams();
  const location = useLocation();
  const { student, key } = location.state || {};

  console.log(student);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold">{subjectId.toUpperCase()} Exam</h1>
      <p className="mt-4">This is the exam page for {subjectId}.</p>
      <button className="cursor-pointer rounded-md bg-zinc-900 px-4 py-2 text-sm text-white">
        Set Score
      </button>
    </div>
  );
};

export default Exam;
