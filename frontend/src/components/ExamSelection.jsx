import { useNavigate, useParams } from "react-router-dom";
import { useStudent } from "../context/StudentContext.jsx";
import {
  Sigma, // Mathematics
  BookText, // English
  Atom, // Science
  PenLine, // Filipino
  Globe2, // Social Studies
} from "lucide-react";

const ExamSelection = () => {
  const navigate = useNavigate();
  const { student } = useStudent();
  const { id } = useParams();

  const subjects = [
    {
      id: "math",
      name: "Mathematics",
      icon: Sigma,
    },
    {
      id: "english",
      name: "English",
      icon: BookText,
    },
    {
      id: "science",
      name: "Science",
      icon: Atom,
    },
    {
      id: "filipino",
      name: "Filipino",
      icon: PenLine,
    },
    {
      id: "socialstudies",
      name: "Social Study",
      icon: Globe2,
    },
  ];

  const handleStart = (subjectId) => {
    navigate(`/student/${id}/exam/${subjectId}`);
  };

  if (!student) {
    return <p>Loading student data...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!student || !student.examScores) return;

    try {
      const response = await fetch(`http://localhost:5000/api/register/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examScores: student.examScores,
        }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to submit exam results.");
      }

      // navigate("/success");
    } catch (err) {
      console.error("Submission error:", err.message);
      alert("Failed to save exam results. Try again.");
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center border p-8 lg:justify-center">
      <main className="grid h-full max-h-[300px] w-full max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5">
        {subjects.map(({ id, name, icon: Icon }) => (
          <div
            key={id}
            className="flex h-full w-full flex-col justify-evenly gap-4 rounded-xl border border-zinc-200 p-8 text-center shadow-2xs"
          >
            <Icon className="mx-auto p-4 text-zinc-800" size={100} />
            <h1 className="text-xl font-semibold">{name}</h1>
            <p>Score: {student.examScores[id]}</p>
            <button
              className="cursor-pointer rounded-md border border-zinc-300 bg-zinc-900 p-2 text-sm text-zinc-100 shadow-2xs hover:bg-zinc-800 disabled:bg-zinc-300 disabled:text-zinc-500"
              disabled={student.examScores[id] !== 0}
              onClick={() => handleStart(id)}
            >
              {student.examScores[id] !== 0 ? "Finished" : "Start Exam"}
            </button>
          </div>
        ))}
        <button
          disabled={Object.values(student.examScores).some(
            (score) => score === 0,
          )}
          onClick={handleSubmit}
          className="col-span-5 w-full cursor-pointer rounded-md border border-zinc-300 bg-zinc-900 p-2 text-sm text-zinc-100 shadow-2xs hover:bg-zinc-800 disabled:bg-zinc-300 disabled:text-zinc-500"
        >
          Submit Result
        </button>
      </main>
    </div>
  );
};

export default ExamSelection;
