import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStudent } from "../context/StudentContext.jsx";

const Exam = () => {
  const { id, subjectId } = useParams();
  const { student, setStudent } = useStudent();
  const navigate = useNavigate();

  // Random score between 30 and 45 (memoized so it doesn't change on every render)
  const score = useMemo(
    () => Math.floor(Math.random() * (45 - 30 + 1)) + 30,
    [],
  );

  if (!student) return;

  if (!student.examScores) {
    return <p>Loading or missing student exam data...</p>;
  }

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
