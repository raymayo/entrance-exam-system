import React, { useState, useEffect } from "react";
import { Eye, SquarePen } from "lucide-react";
import Tooltip from "../admin-components/Tooltip";
import PrintPage from "./PrintPage.jsx";
import StudentDetailsModal from "./StudentDetailsModal.jsx";
import EditStudentModal from "./EditStudentModal.jsx";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/student");
      if (!response.ok) throw new Error("Failed to fetch students");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error(error);
    }
  };

  const saveStudentDetails = async (updatedStudent) => {
    try {
      const res = await fetch(`http://localhost:5000/api/student/${updatedStudent.regNo}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedStudent),
      });

      if (!res.ok) {
        throw new Error("Failed to save student details");
      }

      const savedStudent = await res.json();
      console.log("Saved:", savedStudent);
      alert("Student details saved successfully!");

      setIsEditModalOpen(false) // Close modal
      fetchStudents();
    } catch (error) {
      console.error(error);
      alert("Error saving student details.");
    }
  };

  const openModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setIsModalOpen(false);
  };

  const openEditModal = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedStudent(null);
    setIsEditModalOpen(false);
  };

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <h1 className="w-full text-2xl font-semibold">Manage Students</h1>
      <div className="h-full rounded-md border border-zinc-300 bg-white">
        <table className="h-fit w-full overflow-y-auto">
          <thead>
            <tr>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500">#</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500">ID</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500">Name</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500">Email</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500">Phone</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td className="border-y border-zinc-300/50 px-4 py-3">{index + 1}</td>
                <td className="border-y border-zinc-300/50 px-4 py-3">{student.regNo}</td>
                <td className="border-y border-zinc-300/50 px-4 py-3">{student.name}</td>
                <td className="border-y border-zinc-300/50 px-4 py-3">{student.email}</td>
                <td className="border-y border-zinc-300/50 px-4 py-3">{student.phone}</td>
                <td className="w-fit border-y border-zinc-300/50 px-4 py-3">
                  <div className="flex gap-2">
                    <Tooltip text="View Student" position="top">
                      <button
                        onClick={() => openModal(student)}
                        className="cursor-pointer rounded-md border border-zinc-300 p-2 hover:bg-zinc-100"
                      >
                        <Eye size={16} className="text-zinc-900" />
                      </button>
                    </Tooltip>
                    <Tooltip text="Edit Student" position="top">
                      <button onClick={() => openEditModal(student)} className="cursor-pointer rounded-md border border-zinc-300 p-2 hover:bg-zinc-100">
                        <SquarePen size={16} className="text-zinc-900" />
                      </button>
                    </Tooltip>
                    <PrintPage student={student} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <StudentDetailsModal
        student={selectedStudent}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      <EditStudentModal
        student={selectedStudent}
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSave={saveStudentDetails}
      />
    </div>
  );
};

export default StudentList;
