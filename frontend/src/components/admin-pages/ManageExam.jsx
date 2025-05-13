import React from "react";
import {
  Sigma, // Mathematics
  BookText, // English
  Atom, // Science
  PenLine, // Filipino
  Globe2, // Social Studies
  SquarePen,
} from "lucide-react";

const ManageExam = () => {
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

  return (
    <div className="my-auto flex w-full flex-col items-center border p-8 lg:justify-center">
      <main className="grid h-full max-h-[300px] w-full max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5">
        {subjects.map(({ id, name, icon: Icon }) => (
          <div
            key={id}
            className="flex h-full w-full flex-col justify-evenly gap-4 rounded-xl border border-zinc-200 p-8 text-center shadow-2xs"
          >
            <Icon className="mx-auto p-4 text-zinc-800" size={100} />
            <h1 className="text-xl font-semibold">{name}</h1>
            {/* <p>Score: {student.examScores[id]}</p> */}
            <div className="flex w-full items-center justify-center gap-2">
              <button
                className="cursor-pointer rounded-md border border-zinc-300 bg-zinc-900 p-2 text-sm text-zinc-100 shadow-2xs hover:bg-zinc-800 disabled:bg-zinc-300 disabled:text-zinc-500"
                //   disabled={student.examScores[id] !== 0}
                //   onClick={() => handleStart(id)}
              >
                View
              </button>
              <button className="cursor-pointer rounded-md border border-zinc-200 p-1.5 shadow-2xs transition-all duration-200 hover:bg-zinc-100">
                <SquarePen />
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default ManageExam;
