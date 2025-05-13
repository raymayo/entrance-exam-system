import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Eye, SquarePen } from "lucide-react";
import Tooltip from "../admin-components/Tooltip";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const openModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setIsModalOpen(false);
  };

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
                        onClick={() => openModal(student)}
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
      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/75">
          <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Student Details</h2>
            <div className="space-y-2 text-sm">
              {/* <p>
                <strong>ID:</strong> {selectedStudent.regNo}
              </p>
              <p>
                <strong>Name:</strong> {selectedStudent.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedStudent.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedStudent.phone}
              </p> */}
              <div className="grid w-full grid-cols-6 gap-x-2.5 gap-y-4">
                <label className="flex flex-col gap-1 text-sm font-medium">
                  Registration No.
                  <input
                    className="cursor-pointer rounded-md border border-zinc-200 px-4 py-2 text-sm shadow-2xs disabled:bg-zinc-200 disabled:text-zinc-500"
                    type="text"
                    name="regNo"
                    value={selectedStudent?.regNo || ""}
                    disabled
                  />
                </label>
                <label className="col-span-5 flex flex-col gap-1 text-sm font-medium">
                  Name
                  <input
                    className="cursor-pointer rounded-md border border-zinc-200 px-4 py-2 text-sm shadow-2xs disabled:bg-zinc-200 disabled:text-zinc-500"
                    type="text"
                    name="name"
                    placeholder="e.g. Dela Cruz, Juan, M."
                    value={selectedStudent?.name || ""}
                    disabled
                  />
                </label>
                <label className="col-span-2 flex flex-col gap-1 text-sm font-medium">
                  Phone
                  <input
                    className="cursor-pointer rounded-md border border-zinc-200 px-4 py-2 text-sm shadow-2xs disabled:bg-zinc-200 disabled:text-zinc-500"
                    type="number"
                    name="phone"
                    placeholder="e.g. 09123456789"
                    value={selectedStudent?.phone || ""}
                    disabled
                  />
                </label>
                <label className="col-span-2 flex flex-col gap-1 text-sm font-medium">
                  Email
                  <input
                    className="cursor-pointer rounded-md border border-zinc-200 px-4 py-2 text-sm shadow-2xs disabled:bg-zinc-200 disabled:text-zinc-500"
                    type="email"
                    name="email"
                    placeholder="e.g. 09123456789"
                    value={selectedStudent?.email || ""}
                    disabled
                  />
                </label>

                <label className="col-span-2 flex flex-col gap-1 text-sm font-medium">
                  Sex
                  <input
                    className="cursor-pointer rounded-md border border-zinc-200 px-4 py-2 text-sm shadow-2xs disabled:bg-zinc-200 disabled:text-zinc-500"
                    type="text"
                    name="gender"
                    placeholder="e.g. 09123456789"
                    value={selectedStudent?.gender || ""}
                    disabled
                  />
                </label>
                <label className="col-span-6 flex flex-col gap-1 text-sm font-medium">
                  Address
                  <input
                    className="cursor-text rounded-md border border-zinc-200 px-4 py-2 text-sm shadow-2xs disabled:bg-zinc-200 disabled:text-zinc-500"
                    type="text"
                    name="address"
                    placeholder="e.g. 0123 Rizal St. Matain, Subic, Zambales"
                    value={selectedStudent?.address || ""}
                    disabled
                  />
                </label>
                <label className="col-span-2 flex flex-col gap-1 text-sm font-medium">
                  Birthday
                  <input
                    className="cursor-pointer rounded-md border border-zinc-200 px-4 py-2 text-sm shadow-2xs disabled:bg-zinc-200 disabled:text-zinc-500"
                    type="text"
                    name="birthday"
                    value={
                      dayjs(selectedStudent?.birthday).format("MMMM D, YYYY") ||
                      ""
                    }
                    disabled
                  />
                </label>
                <label className="col-span-2 flex flex-col gap-1 text-sm font-medium">
                  Birthplace
                  <input
                    className="cursor-pointer rounded-md border border-zinc-200 px-4 py-2 text-sm shadow-2xs disabled:bg-zinc-200 disabled:text-zinc-500"
                    type="text"
                    name="birthplace"
                    placeholder="Matain, Subic, Zambales"
                    value={selectedStudent?.birthplace || ""}
                    disabled
                  />
                </label>

                <label className="col-span-2 flex flex-col gap-1 text-sm font-medium">
                  Guardian/Parent Name
                  <input
                    className="cursor-pointer rounded-md border border-zinc-200 px-4 py-2 text-sm shadow-2xs disabled:bg-zinc-200 disabled:text-zinc-500"
                    type="text"
                    name="guardian"
                    placeholder="e.g. Juan Dela Cruz"
                    value={selectedStudent?.guardian || ""}
                    disabled
                  />
                </label>
                <label className="col-span-3 flex flex-col gap-1 text-sm font-medium">
                  Last School Attended
                  <input
                    className="cursor-text rounded-md border border-zinc-200 px-4 py-2 text-sm shadow-2xs disabled:bg-zinc-200 disabled:text-zinc-500"
                    type="text"
                    name="lastSchool"
                    value={selectedStudent?.lastSchool || ""}
                    placeholder="Name of Previous School"
                    disabled
                  />
                </label>
                <label className="col-span-3 flex flex-col gap-1 text-sm font-medium">
                  Last School Address
                  <input
                    className="cursor-text rounded-md border border-zinc-200 px-4 py-2 text-sm shadow-2xs disabled:bg-zinc-200 disabled:text-zinc-500"
                    type="text"
                    name="lastSchoolAddress"
                    value={selectedStudent?.lastSchoolAddress || ""}
                    placeholder="Address of Previous School"
                    disabled
                  />
                </label>
                <label className="col-span-3 flex flex-col gap-1 text-sm font-medium">
                  1st Choice Course
                  <input
                    className="cursor-text rounded-md border border-zinc-200 px-4 py-2 text-sm shadow-2xs disabled:bg-zinc-200 disabled:text-zinc-500"
                    type="text"
                    name="course1st"
                    value={selectedStudent?.course1st || ""}
                    disabled
                  />
                </label>
                <label className="col-span-3 flex flex-col gap-1 text-sm font-medium">
                  2nd Choice Course
                  <input
                    className="cursor-text rounded-md border border-zinc-200 px-4 py-2 text-sm shadow-2xs disabled:bg-zinc-200 disabled:text-zinc-500"
                    type="text"
                    name="course2nd"
                    value={selectedStudent?.course2nd || ""}
                    disabled
                  />
                </label>
                <label className="col-span-6 flex flex-col gap-1 text-sm font-medium">
                  Course Taken (Transferee Only)
                  <input
                    className="cursor-text rounded-md border border-zinc-200 px-4 py-2 text-sm shadow-2xs disabled:bg-zinc-200 disabled:text-zinc-500"
                    type="text"
                    name="transfereeCourse"
                    placeholder="Course Taken from Previous School"
                    value={selectedStudent?.transfereeCourse || ""}
                    disabled
                  />
                </label>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="cursor-pointer rounded-md bg-zinc-800 px-4 py-2 text-sm text-white hover:bg-zinc-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
