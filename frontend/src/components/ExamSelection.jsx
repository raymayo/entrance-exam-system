import { useNavigate, useParams } from "react-router-dom";
import { useStudent } from "../context/StudentContext.jsx";
import { useEffect, useState } from "react";
import {
  Sigma, // Mathematics
  BookText, // English
  Atom, // Science
  PenLine, // Filipino
  Globe2, // Social Studies
} from "lucide-react";

// Map exam titles to icons
const icons = {
  math: Sigma,
  english: BookText,
  science: Atom,
  filipino: PenLine,
  socialstudies: Globe2,
};

const ExamSelection = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { student } = useStudent();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch subjects/exams from backend
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/exams");
        if (!res.ok) throw new Error("Failed to fetch exams.");
        const data = await res.json();
        setSubjects(data); // expect array of { id, title, description? }
      } catch (err) {
        console.error("Error fetching subjects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const handleStart = (subjectId) => {
    navigate(`/student/${id}/exam/${subjectId}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!student || !student.examScores) return;

    try {
      const response = await fetch(`http://localhost:5000/api/register/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ examScores: student.examScores }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to submit exam results.");
      }

      navigate(`/student/${id}/success`);
    } catch (err) {
      console.error("Submission error:", err.message);
      alert("Failed to save exam results. Try again.");
    }
  };

  if (!student) return <p>Loading student data...</p>;

  return (
    <div className="flex h-screen w-screen flex-col items-center border p-8 lg:justify-center">
      <main className="grid h-full max-h-[300px] w-full max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5">
        {loading ? (
          <p>Loading exams...</p>
        ) : (
            subjects.map((exam) => {
              const Icon = icons[exam.title] || Globe2; // fallback icon
              const score = student.examScores?.[exam.title] ?? null;
              const finished = score !== null;

              return (
                <div
                  key={exam._id || exam.id}
                  className="flex h-full w-full flex-col justify-evenly gap-4 rounded-xl border border-zinc-200 p-8 text-center shadow-2xs"
                >
                  <Icon className="mx-auto p-4 text-zinc-800" size={100} />
                  <h1 className="text-xl font-semibold">{exam.title}</h1>
                  <p>Score: {score !== null ? score : "Not Taken"}</p>
                  <button
                    className="cursor-pointer rounded-md border border-zinc-300 bg-zinc-900 p-2 text-sm text-zinc-100 shadow-2xs hover:bg-zinc-800 disabled:bg-zinc-300 disabled:text-zinc-500"
                    disabled={finished}
                    onClick={() => handleStart(exam.title)}
                  >
                    {finished ? "Finished" : "Start Exam"}
                  </button>
                </div>
              );
            })

        )}

        <button
          disabled={Object.values(student.examScores || {}).some(
            (score) => score === null
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
