import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ExamSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [studentData, setStudent] = useState(null);

  // Using useEffect to avoid infinite re-renders
  useEffect(() => {
    if (location.state) {
      setStudent(location.state); // Set studentData once when location.state changes
    }
  }, [location.state]);

  // Only destructure `key` if `studentData` is not null
  const key = studentData?.key;

  console.log(key); // Logs the `key` from studentData

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
      id: "socialstudy",
      name: "Social Study",
      img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    },
  ];

  const handleStart = (subjectId) => {
    navigate(`/student/${key}/exam/${subjectId}`, { state: { studentData } });
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center border p-8 lg:justify-center">
      <main className="grid h-full max-h-[400px] w-full gap-8 border border-red-500 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5">
        {subjects.map((subject, index) => (
          <div
            key={index}
            className="flex h-full w-full flex-col justify-between gap-4 rounded-xl border p-8 text-center"
          >
            <img src={subject.img} className="rounded-lg" alt={subject.name} />
            {subject.name}
            <button
              className="cursor-pointer rounded-lg border px-4 py-2"
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
