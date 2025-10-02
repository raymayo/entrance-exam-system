import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    choices: [{ type: String, required: true }],
    correctAnswer: { type: Number, required: true }, // Index of correct choice
});

const examSchema = new mongoose.Schema(
    {
        title: { type: String, required: true }, // e.g., "Math"
        passingScore: { type: Number, default: 0 },
        highestScore: { type: Number, default: 0 },
        lowestScore: { type: Number, default: 0 },
        questions: [questionSchema],
    },
    { timestamps: true }
);

export default mongoose.model("Exam", examSchema);
