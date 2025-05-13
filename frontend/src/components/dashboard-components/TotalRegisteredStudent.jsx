import { useState, useEffect } from "react";

const TotalRegisteredStudent = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [registeredStudent, setRegisteredStudents] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/student/all");
        const data = await response.json();
        console.log(data.count);
        setTotalStudents(data.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchRegistered = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/student/registered",
        );
        const data = await response.json();
        console.log(data.count);
        setRegisteredStudents(data.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    fetchRegistered();
  }, []);

  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <div>
        <h2 className="mb-4 text-lg font-semibold">Total Exam Takers</h2>
        <p className="text-3xl font-bold">{totalStudents}</p>
      </div>
      <div>
        <h2 className="mb-4 text-lg font-semibold">
          Total Registered Examiners
        </h2>
        <p className="text-3xl font-bold">{registeredStudent}</p>
      </div>
    </div>
  );
};

export default TotalRegisteredStudent;
