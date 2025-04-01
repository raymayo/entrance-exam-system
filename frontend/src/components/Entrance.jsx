import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Entrance = () => {
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [auth, setAuth] = useState();

  const navigate = useNavigate();

  // Fetch student ID when regNo is valid (length >= 8)
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/student/${regNo}`,
        );
        const data = await response.json();
        setAuth(data);
      } catch (error) {
        console.error("Error fetching student data:", error);
        setErrorMessage("An error occurred while fetching the data");
      }
    };

    if (regNo.length >= 8) {
      fetchStudentData();
    }
  }, [regNo]);

  // Handle form submission
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

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      if (!auth) return;

      localStorage.setItem("authUser", JSON.stringify(auth));
      alert("Login successful");
      navigate(`/student/${auth._id}/details/`, { replace: true });
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Entrance Exam</h1>

        <label>
          Registration No.
          <input
            type="text"
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit">Enter</button>
      </form>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default Entrance;
