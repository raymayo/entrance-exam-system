import React, { useState, useEffect } from "react";
import { Eye, SquarePen } from "lucide-react";
import Tooltip from "../admin-components/Tooltip";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/student");
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        const data = await response.json();
        console.log(data);
        setStudents(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <h1 className="w-full text-2xl font-semibold">Manage Students</h1>
      {/* <button
        className="flex cursor-pointer items-center gap-2 self-end rounded-md border border-zinc-300 bg-white px-3 py-2 text-xs font-medium"
        // onClick={() => setRegisterModalOpen(true)}
      >
        <Plus size={16} />
        Register
      </button> */}
      <div className="h-fit rounded-md border border-zinc-300 bg-white">
        <table className="h-full w-full">
          <thead>
            <tr>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500">
                #
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500">
                ID
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500">
                Name
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500">
                Email
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500">
                Phone
              </th>
              {/* <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500">
                Year Level
              </th> */}
              <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td className="border-t border-zinc-300 px-4 py-3 text-left text-sm">
                  {index + 1}
                </td>
                <td className="border-t border-zinc-300 px-4 py-3 text-left text-sm">
                  {student.regNo}
                </td>
                <td className="border-t border-zinc-300 px-4 py-3 text-left text-sm">
                  {student.name}
                </td>
                <td className="border-t border-zinc-300 px-4 py-3 text-left text-sm">
                  {student.email}
                </td>
                <td className="border-t border-zinc-300 px-4 py-3 text-left text-sm">
                  {student.phone}
                </td>
                {/* <td className="border-t border-zinc-300 px-4 py-3 text-left text-sm">
                  {student.yearLevel}
                </td> */}
                <td className="w-fit border-t border-zinc-300 px-4 py-3 text-left text-sm">
                  <div className="flex gap-2">
                    <Tooltip text="View Student" position="top">
                      <button
                        // onClick={() => openModal(student)}
                        className="cursor-pointer rounded-md border border-zinc-300 p-2 shadow-2xs transition-all duration-200 hover:bg-zinc-100"
                      >
                        <Eye size={16} className="text-zinc-900" />
                      </button>
                    </Tooltip>
                    <Tooltip text="Edit Student" position="top">
                      <button
                        // onClick={() => openModal(student)}
                        className="cursor-pointer rounded-md border border-zinc-300 p-2 shadow-2xs transition-all duration-200 hover:bg-zinc-100"
                      >
                        <SquarePen size={16} className="text-zinc-900" />
                      </button>
                    </Tooltip>
                    {/* <button className="border border-zinc-300 rounded-md cursor-pointer">E</button>
                                        <button className="border border-zinc-300 rounded-md cursor-pointer">D</button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Component */}
      {/* <ScheduleModal
        isOpen={isModalOpen}
        onClose={closeModal}
        student={selectedStudent}
        schedules={schedules}
      />
      <StudentRegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setRegisterModalOpen(false)}
      /> */}
    </div>
  );
};

export default StudentList;

// {
//   students.map((student, index) => (
//     <tr key={index}>
//       <td className="border-t border-zinc-300 px-4 py-3 text-left text-sm">
//         {index + 1}
//       </td>
//       <td className="border-t border-zinc-300 px-4 py-3 text-left text-sm">
//         {student.studentId}
//       </td>
//       <td className="border-t border-zinc-300 px-4 py-3 text-left text-sm">
//         {student.name}
//       </td>
//       <td className="border-t border-zinc-300 px-4 py-3 text-left text-sm">
//         {student.email}
//       </td>
//       <td className="border-t border-zinc-300 px-4 py-3 text-left text-sm">
//         {student.areaOfStudy}
//       </td>
//       <td className="border-t border-zinc-300 px-4 py-3 text-left text-sm">
//         {student.yearLevel}
//       </td>
//       <td className="w-fit border-t border-zinc-300 px-4 py-3 text-left text-sm">
//         <div className="flex gap-2">
//           <Tooltip text="Assign Schedule" position="top">
//             <button
//               // onClick={() => openModal(student)}
//               className="cursor-pointer rounded-md border border-zinc-300 p-2 shadow-2xs transition-all duration-200 hover:bg-zinc-100"
//             >
//               <SquarePen size={16} className="text-zinc-900" />
//             </button>
//           </Tooltip>
//           {/* <button className="border border-zinc-300 rounded-md cursor-pointer">E</button>
//                                         <button className="border border-zinc-300 rounded-md cursor-pointer">D</button> */}
//         </div>
//       </td>
//     </tr>
//   ));
// }
