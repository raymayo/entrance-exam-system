import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({

    questionText: { type: String, required: true },
    options: {
        type: [string],
        required: true,
    },
    correctAnswer: { type: String, required: true }
});


const ExamSchema = new Schema({
    examName: { type: String, required: true, unique: true },
    questions: [QuestionSchema]
})



const Exam = mongoose.model('Exam', ExamSchema);

export default Exam;
