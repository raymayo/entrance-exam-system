import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    choices: [{ type: String, required: true }],
    correctAnswer: { type: Number, required: true }, // Index of correct choice
});

const examSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        questions: [questionSchema],
    },
    { timestamps: true }
);

export default mongoose.model("Exam", examSchema);
