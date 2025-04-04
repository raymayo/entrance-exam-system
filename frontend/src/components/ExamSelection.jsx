import { useNavigate, useParams } from "react-router-dom";
import { useStudent } from "../context/StudentContext.jsx";

const ExamSelection = () => {
  const navigate = useNavigate();
  const { student } = useStudent(); // Use student context
  const { id } = useParams();

  const subjects = [
    {
      id: "math",
      name: "Mathematics",
      img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    },
    {
      id: "english",
      name: "English",
      img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    },
    {
      id: "science",
      name: "Science",
      img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    },
    {
      id: "filipino",
      name: "Filipino",
      img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    },
    {
      id: "socialstudies",
      name: "Social Study",
      img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    },
  ];

  const handleStart = (subjectId) => {
    navigate(`/student/${id}/exam/${subjectId}`);
  };

  if (!student) {
    return <p>Loading student data...</p>; // Or show a fallback UI if student is not available
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center border p-8 lg:justify-center">
      <main className="grid h-full max-h-[400px] w-full gap-8 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5">
        {subjects.map((subject, index) => (
          <div
            key={index}
            className="flex h-full w-full flex-col justify-between gap-4 rounded-xl border border-zinc-200 p-8 text-center shadow-2xs"
          >
            <img src={subject.img} className="rounded-lg" alt={subject.name} />
            <h1 className="text-xl font-semibold">{subject.name}</h1>
            <p>Score: {student.examScores[subject.id]}</p>
            <button
              className="cursor-pointer rounded-md border bg-zinc-900 p-2 text-sm text-zinc-100 hover:bg-zinc-800 disabled:bg-zinc-300 disabled:text-zinc-500"
              disabled={student.examScores[subject.id] !== 0}
              onClick={() => handleStart(subject.id)}
            >
              Start
            </button>
          </div>
        ))}
      </main>
    </div>
  );
};

export default ExamSelection;
