import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateExam = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", choices: ["", "", "", ""], correctAnswer: 0 },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    if (field === "questionText") updated[index].questionText = value;
    else if (field === "correctAnswer")
      updated[index].correctAnswer = parseInt(value);
    setQuestions(updated);
  };

  const handleChoiceChange = (qIndex, cIndex, value) => {
    const updated = [...questions];
    updated[qIndex].choices[cIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", choices: ["", "", "", ""], correctAnswer: 0 },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, questions }),
      });

      if (!res.ok) throw new Error("Failed to create exam");
      navigate("/admin/exams");
    } catch (err) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-3xl rounded-lg border border-gray-200 bg-white p-6 shadow">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Create Exam</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium">Title</label>
          <input
            className="mt-1 w-full rounded border p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            className="mt-1 w-full rounded border p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {questions.map((q, index) => (
          <div key={index} className="space-y-3 rounded border bg-gray-50 p-4">
            <div>
              <label className="block font-medium">Question {index + 1}</label>
              <input
                className="mt-1 w-full rounded border p-2"
                value={q.questionText}
                onChange={(e) =>
                  handleQuestionChange(index, "questionText", e.target.value)
                }
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {q.choices.map((choice, cIndex) => (
                <input
                  key={cIndex}
                  className="rounded border p-2"
                  value={choice}
                  placeholder={`Choice ${cIndex + 1}`}
                  onChange={(e) =>
                    handleChoiceChange(index, cIndex, e.target.value)
                  }
                  required
                />
              ))}
            </div>
            <div>
              <label className="block font-medium">Correct Answer</label>
              <select
                className="mt-1 w-full rounded border p-2"
                value={q.correctAnswer}
                onChange={(e) =>
                  handleQuestionChange(index, "correctAnswer", e.target.value)
                }
              >
                {q.choices.map((_, i) => (
                  <option key={i} value={i}>
                    Choice {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          + Add Question
        </button>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Exam"}
        </button>
      </form>
    </div>
  );
};

export default CreateExam;
