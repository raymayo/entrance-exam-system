import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
    {
        // Subdocument questionId (from Exam.questions array)
        questionId: { type: mongoose.Schema.Types.ObjectId, required: true },

        // store TEXT instead of Number
        selected: { type: String, default: null },

        // optional: keep the index user clicked (useful for analytics/debugging)
        selectedIndex: { type: Number, default: null },

        isCorrect: { type: Boolean, default: false },
    },
    { _id: false }
);

const examResultSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },
        examId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam",
            required: true,
        },
        score: { type: Number, default: 0 },
        answers: [answerSchema],
    },
    { timestamps: true }
);

export default mongoose.model("ExamResult", examResultSchema);
