import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UpdateDetails = ({ studentId }) => {
  const { regNo } = useParams();

  const [student, setStudent] = useState({
    regNo: "",
    email: "",
    phone: "",
    name: "",
    gender: "",
    address: "",
    birthday: "",
    birthplace: "",
    guardian: "",
    lastSchool: "",
    lastSchoolAddress: "",
    course1st: "",
    course2nd: "",
    transfereeCourse: "",
    examDate: Date(),
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!regNo) return;
    // Fetch the student data
    const fetchStudentData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/student/${regNo}`,
        );
        const data = await response.json();

        setStudent({
          regNo: data.regNo,
          email: data.email,
          phone: data.phone,
          name: data.name,
          gender: "",
          address: "",
          birthday: "",
          birthplace: "",
          guardian: "",
          lastSchool: "",
          lastSchoolAddress: "",
          course1st: "",
          course2nd: "",
          transfereeCourse: "",
          examDate: "",
        });

        // Set the state with fetched data (null fields will stay empty)
        if (response.ok) {
        } else {
          setErrorMessage("Error fetching student data");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
        setErrorMessage("An error occurred while fetching the data");
      }
    };

    fetchStudentData();
  }, [studentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/students/${studentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(student),
        },
      );

      if (response.ok) {
        alert("Student data updated successfully!");
      } else {
        const data = await response.json();
        setErrorMessage(data.message || "Failed to update student data.");
      }
    } catch (error) {
      console.error("Error updating student data:", error);
      setErrorMessage("An error occurred while updating the student data.");
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col place-items-center">
      <h1>Student Details</h1>
      <form
        onSubmit={handleSubmit}
        className="shadow-2 w-full max-w-4xl rounded-md border border-zinc-200 p-6"
      >
        <div className="grid w-full grid-cols-6 gap-x-2.5 gap-y-4">
          <label className="flex flex-col gap-1 text-sm font-medium">
            Registration No.
            <input
              className="cursor-pointer rounded-md border border-zinc-200 px-4 py-2 text-sm shadow-2xs disabled:bg-zinc-200 disabled:text-zinc-500"
              type="text"
              name="regNo"
              placeholder="e.g. 20-4567"
              value={student.regNo}
              onChange={handleChange}
              required
              disabled
            />
          </label>
          <label className="col-span-4 flex flex-col gap-1 text-sm font-medium">
            Name
            <input
              className="cursor-pointer rounded-md border border-zinc-200 px-4 py-2 text-sm shadow-2xs disabled:bg-zinc-200 disabled:text-zinc-500"
              type="text"
              name="name"
              placeholder="e.g. Dela Cruz, Juan, M."
              value={student.name}
              onChange={handleChange}
              required
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
              value={student.phone}
              onChange={handleChange}
              required
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
              value={student.email}
              onChange={handleChange}
              required
              disabled
            />
          </label>

          <label className="col-span-2 flex flex-col gap-1 text-sm font-medium">
            Sex
            <select
              className="cursor-pointer rounded-md border border-zinc-200 px-4 py-2 text-sm shadow-2xs disabled:bg-zinc-200 disabled:text-zinc-500"
              name="genderSelect"
              id="genderSelect"
              onChange={handleChange}
              value={student.genderSelect}
              required
            >
              <option value="" disabled>
                Select Sex
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>
          <label className="col-span-6 flex flex-col gap-1 text-sm font-medium">
            Address
            <input
              className="cursor-pointer rounded-md border border-zinc-200 px-4 py-2 text-sm shadow-2xs disabled:bg-zinc-200 disabled:text-zinc-500"
              type="text"
              name="address"
              placeholder="e.g. 0123 Rizal St. Matain, Subic, Zambales"
              value={student.address}
              onChange={handleChange}
              required
            />
          </label>
          <label className="col-span-2 flex flex-col gap-1 text-sm font-medium">
            Birthday
            <input
              className="cursor-pointer rounded-md border border-zinc-200 px-4 py-2 text-sm shadow-2xs disabled:bg-zinc-200 disabled:text-zinc-500"
              type="text"
              name="birthday"
              placeholder="MM/DD/YYYY"
              value={student.birthday}
              onChange={handleChange}
              required
            />
          </label>
          <label className="col-span-2 flex flex-col gap-1 text-sm font-medium">
            Birthplace
            <input
              className="cursor-pointer rounded-md border border-zinc-200 px-4 py-2 text-sm shadow-2xs disabled:bg-zinc-200 disabled:text-zinc-500"
              type="text"
              name="birthplace"
              placeholder="Matain, Subic, Zambales"
              value={student.birthplace}
              onChange={handleChange}
              required
            />
          </label>

          <label className="col-span-2 flex flex-col gap-1 text-sm font-medium">
            Guardian/Parent Name
            <input
              className="cursor-pointer rounded-md border border-zinc-200 px-4 py-2 text-sm shadow-2xs disabled:bg-zinc-200 disabled:text-zinc-500"
              type="text"
              name="guardianName"
              placeholder="e.g. Juan Dela Cruz"
              value={student.guardianName}
              onChange={handleChange}
              required
            />
          </label>
          <label className="col-span-3 flex flex-col gap-1 text-sm font-medium">
            Last School Attended
            <input
              className="cursor-pointer rounded-md border border-zinc-200 px-4 py-2 text-sm shadow-2xs disabled:bg-zinc-200 disabled:text-zinc-500"
              type="text"
              name="lastSchool"
              value={student.lastSchool}
              onChange={handleChange}
              placeholder="Name of Previous School"
              required
            />
          </label>
          <label className="col-span-3 flex flex-col gap-1 text-sm font-medium">
            Last School Address
            <input
              className="cursor-pointer rounded-md border border-zinc-200 px-4 py-2 text-sm shadow-2xs disabled:bg-zinc-200 disabled:text-zinc-500"
              type="text"
              name="lastSchoolAddress"
              value={student.lastSchoolAddress}
              onChange={handleChange}
              placeholder="Address of Previous School"
              required
            />
          </label>
          <label className="col-span-3 flex flex-col gap-1 text-sm font-medium">
            1st Choice Course
            <select
              className="cursor-pointer rounded-md border border-zinc-200 px-4 py-2 text-sm shadow-2xs disabled:bg-zinc-200 disabled:text-zinc-500"
              name="course1st"
              value={student.course1st}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Course
              </option>
              <option value="BSBA HRM">BSBA HRM</option>
              <option value="BSBA FM">BSBA FM</option>
              <option value="BSA">BSA</option>
              <option value="BSCS">BSCS</option>
              <option value="BSED MATH & FIL">BSED MATH & FIL</option>
              <option value="BSED SOCSTUD">BSED SOCSTUD</option>
              <option value="BEED">BEED</option>
              <option value="CPE">CPE</option>
              <option value="BSHM">BSHM</option>
            </select>
          </label>
          <label className="col-span-3 flex flex-col gap-1 text-sm font-medium">
            2nd Choice Course
            <select
              className="cursor-pointer rounded-md border border-zinc-200 px-4 py-2 text-sm shadow-2xs disabled:bg-zinc-200 disabled:text-zinc-500"
              name="course2nd"
              value={student.course2nd}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Course
              </option>
              <option value="BSBA HRM">BSBA HRM</option>
              <option value="BSBA FM">BSBA FM</option>
              <option value="BSA">BSA</option>
              <option value="BSCS">BSCS</option>
              <option value="BSED MATH & FIL">BSED MATH & FIL</option>
              <option value="BSED SOCSTUD">BSED SOCSTUD</option>
              <option value="BEED">BEED</option>
              <option value="CPE">CPE</option>
              <option value="BSHM">BSHM</option>{" "}
            </select>
          </label>
          <label className="col-span-6 flex flex-col gap-1 text-sm font-medium">
            Course Taken (Transferee Only)
            <input
              className="cursor-pointer rounded-md border border-zinc-200 px-4 py-2 text-sm shadow-2xs disabled:bg-zinc-200 disabled:text-zinc-500"
              type="text"
              name="transfereeCourse"
              placeholder="Course Taken from Previous School"
              value={student.transfereeCourse}
              onChange={handleChange}
            />
          </label>
        </div>

        <button
          type="submit"
          className="mt-6 w-full cursor-pointer rounded-md border border-zinc-200 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-100 shadow-2xs disabled:bg-zinc-200 disabled:text-zinc-500"
        >
          Register
        </button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default UpdateDetails;
