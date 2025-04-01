import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [nameParts, setNameParts] = useState({ first: "", last: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "first" || name === "last") {
      // Update first/last name separately
      const updatedNameParts = { ...nameParts, [name]: value };
      setNameParts(updatedNameParts);
      setFormData((prev) => ({
        ...prev,
        name: `${updatedNameParts.first} ${updatedNameParts.last}`.trim(),
      }));
    } else {
      // Update phone/email directly
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setSuccess("Registration successful!");
      setFormData({ name: "", phone: "", email: "" });
      setNameParts({ first: "", last: "" }); // Reset name parts too
      navigate(`/student/${data._id}`);
    } catch (err) {
      setError(err.message);
    }
  };
  console.log(formData);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center p-6">
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
          Name
          <div className="flex gap-2">
            {["first", "last"].map((key) => (
              <input
                key={key}
                type="text"
                name={key}
                placeholder={`${key.charAt(0).toUpperCase() + key.slice(1)} Name`}
                value={nameParts[key]}
                onChange={handleChange}
                className="mb-2 w-full rounded border p-2"
              />
            ))}
          </div>
        </label>

        <label className="flex flex-col gap-1 text-left text-sm">
          Phone Number
          <input
            className="rounded-md border p-2 text-base"
            type="tel"
            name="phone"
            placeholder="09XXXXXXXXX"
            maxLength={11}
            pattern="^09[0-9]{9}$"
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
