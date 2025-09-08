import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Entrance = () => {
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [auth, setAuth] = useState(null);

  const navigate = useNavigate();

  // Fetch student data when regNo is valid (length >= 8)
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/student/${regNo}`,
        );
        if (!response.ok) throw new Error("Student not found");

        const data = await response.json();
        setAuth(data);
      } catch (error) {
        console.error("Error fetching student data:", error);
        setErrorMessage("Invalid registration number");
      }
    };

    if (regNo.length >= 8) {
      fetchStudentData();
    }
  }, [regNo]);

  // Handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors

    try {
      const response = await fetch("http://localhost:5000/api/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ regNo, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Invalid credentials");

      if (!auth) return;

      // Store user session in sessionStorage
      sessionStorage.setItem("authUser", JSON.stringify(auth));

      toast.success("Login successful");

      setTimeout(() => {
        navigate(`/student/${auth._id}/details`, { replace: true });
      }, 1500);

    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center p-8 lg:justify-center">
      <div className="pattern flex h-full max-h-fit w-full max-w-xl flex-col gap-8 rounded-xl border border-zinc-200 p-1.5 text-center shadow-md">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-6"
        >
          <h1 className="text-2xl font-semibold">Entrance Exam</h1>

          <label className="flex flex-col gap-1.5 text-left">
            Registration No.
            <input
              className="rounded-md border border-zinc-200 p-2 text-base shadow-2xs"
              type="text"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              placeholder="reg-1023"
              required
            />
          </label>

          <label className="flex flex-col gap-1.5 text-left">
            Password
            <input
              className="rounded-md border border-zinc-200 p-2 text-base shadow-2xs"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button
            className="mt-6 cursor-pointer rounded-md border bg-zinc-900 p-2 text-sm font-medium text-zinc-100 hover:bg-zinc-800"
            type="submit"
          >
            Enter
          </button>
        </form>


      </div>
    </div>
  );
};

export default Entrance;
