import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useStudent } from "../context/StudentContext.jsx";

const Exam = () => {
  // Destructure both `id` and `subjectId` from useParams
  const { id, subjectId } = useParams();
  const { student, setStudent } = useStudent();
  const navigate = useNavigate();

  const score = 10;

  // Early return if student or student.examScores is not available
  if (!student || !student.examScores) {
    return <p>Loading or missing student data...</p>;
  }

  const submitScore = () => {
    // Check if the subjectId is valid
    if (typeof subjectId !== "string" || !(subjectId in student.examScores)) {
      console.error("Invalid subjectId:", subjectId);
      return;
    }

    // Update the exam score
    setStudent((prevStudent) => ({
      ...prevStudent,
      examScores: {
        ...prevStudent.examScores,
        [subjectId]: score,
      },
    }));

    console.log(`Updated ${subjectId} score to: ${score}`);
    navigate(`/student/${id}/exam/`);
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold">{subjectId.toUpperCase()} Exam</h1>
      <p className="mt-4">This is the exam page for {subjectId}.</p>
      <p>
        Test: your score in {subjectId} is {student.examScores[subjectId]}
      </p>
      <button
        className="cursor-pointer rounded-md bg-zinc-900 px-4 py-2 text-sm text-white"
        onClick={submitScore}
      >
        Set Score to {score}
      </button>
    </div>
  );
};

export default Exam;
