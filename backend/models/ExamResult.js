import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam.questions" },
    selected: Number, // chosen answer index
    isCorrect: Boolean,
});

const examResultSchema = new mongoose.Schema(
    {
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
        examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
        score: { type: Number, default: 0 },
        answers: [answerSchema],
    },
    { timestamps: true }
);

export default mongoose.model("ExamResult", examResultSchema);
