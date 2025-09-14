import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStudent } from "../context/StudentContext.jsx";
import { Circle, CheckCircle } from "lucide-react";
import axios from "axios";

const Exam = () => {
  const { id, subjectId } = useParams();
  const { student, setStudent } = useStudent();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({}); // { questionIndex: choiceIndex }

  // Fetch exam details
  useEffect(() => {
    if (!subjectId) return;

    axios
      .get(`http://localhost:5000/api/exams/title/${subjectId}`)
      .then((res) => setExam(res.data))
      .catch((err) => console.error("Failed to fetch exam:", err));
  }, [subjectId]);

  // Prevent retake if student already has score
  useEffect(() => {
    const existingScore = student?.examScores?.[subjectId] ?? 0;
    if (existingScore !== 0) {
      navigate(`/student/${id}/exam/`);
    }
  }, [student, subjectId, id, navigate]);

  if (!student) return null;
  if (!student.examScores) return <p>Loading student exam data...</p>;

  const handleAnswerChange = (questionIndex, choiceIndex) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: choiceIndex }));
  };

  const submitExam = () => {
    if (!exam?.questions) return;

    const correctCount = exam.questions.reduce(
      (count, q, idx) => (answers[idx] === q.correctAnswer ? count + 1 : count),
      0
    );

    setStudent((prev) => ({
      ...prev,
      examScores: { ...prev.examScores, [subjectId]: correctCount },
    }));

    console.log(`Updated ${subjectId} score to: ${correctCount} correct answers`);
    navigate(`/student/${id}/exam/`);
  };


  return (
    <div className="flex h-screen w-screen flex-col items-center justify-start p-8 overflow-y-auto bg-zinc-50">
      <h1 className="text-2xl font-bold uppercase">{subjectId.toUpperCase()} Exam</h1>

      {exam ? (
        <div className="mt-6 w-full max-w-2xl space-y-6">
          {exam.questions.map((q, qIdx) => (
            <div key={q._id?.$oid || qIdx} className="rounded-lg border border-zinc-200 p-4 shadow-2xs bg-white">
              <p className="font-medium border-b pb-2 border-zinc-200">{qIdx + 1}. {q.questionText}</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {q.choices.map((choice, cIdx) => {
                  const isSelected = answers[qIdx] === cIdx;

                  return (
                    <label
                      key={cIdx}
                      className={`flex items-center gap-2 cursor-pointer rounded py-1 px-2 transition-all  duration-150 border-2 border-black/0  ${isSelected
                          ? "border-green-600 bg-green-600/25"
                          : "hover:bg-zinc-100"
                        }`}
                      onClick={() => handleAnswerChange(qIdx, cIdx)}
                    >
                      {isSelected ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-zinc-400" />
                      )}
                      <span>{choice}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}

          <button
            className="mt-6 w-full rounded-md bg-zinc-900 px-4 py-2 text-sm text-white disabled:bg-zinc-500 hover:bg-zinc-800/95 transition-all duration-200 cursor-pointer"
            onClick={submitExam}
          >
            Submit Exam
          </button>
        </div>
      ) : (
        <p className="mt-4">Loading exam details...</p>
      )}
    </div>
  );
};

export default Exam;
