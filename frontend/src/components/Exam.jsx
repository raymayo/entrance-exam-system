import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStudent } from "../context/StudentContext.jsx";

const Exam = () => {
  const { id, subjectId } = useParams();
  const { student, setStudent } = useStudent();
  const navigate = useNavigate();

  const score = 10;

  // Check if student data is available
  if (!student) {
    return;
  }

  // Early return if examScores is not available
  if (!student.examScores) {
    return <p>Loading or missing student exam data...</p>;
  }

  // Redirect if the exam is already finished (score is set)
  useEffect(() => {
    if (student.examScores[subjectId] !== 0) {
      navigate(`/student/${id}/exam/`);
    }
  }, [student, subjectId, id, navigate]);

  const submitScore = () => {
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
        Test: your score in {subjectId} is{" "}
        {student.examScores[subjectId] ?? "Not yet set"}
      </p>
      <button
        className="cursor-pointer rounded-md bg-zinc-900 px-4 py-2 text-sm text-white disabled:bg-zinc-500"
        onClick={submitScore}
        disabled={student.examScores[subjectId] !== 0}
      >
        Set Score to {score}
      </button>
    </div>
  );
};

export default Exam;
