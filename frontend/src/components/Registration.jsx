import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ phone: "", email: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setSuccess("Registration successful!");
      //   console.log(data.regNo);
      navigate(`/${data.regNo}`); // Redirect to QR code page with regNo

      setFormData({ phone: "", email: "" }); // Reset form
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-xl flex-col gap-2 rounded-md border p-6 shadow-md"
      >
        <h1 className="text-center text-xl font-medium">
          Register For Entrance Exam
        </h1>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && <p className="text-sm text-green-500">{success}</p>}

        <label className="flex flex-col gap-1 text-left text-sm">
          Phone Number
          <input
            className="rounded-md border p-2 text-base"
            type="tel"
            name="phone"
            placeholder="09XXXXXXXXX"
            pattern="09[0-9]{9}"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>

        <label className="flex flex-col gap-1 text-left text-sm">
          Email
          <input
            className="rounded-md border p-2 text-base"
            type="email"
            name="email"
            placeholder="example@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <button className="mt-6 cursor-pointer rounded-md border bg-zinc-900 p-2 text-sm font-medium text-zinc-300">
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;
