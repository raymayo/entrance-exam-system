import Exam from '../models/Exam.js';

export const createExam = async (req, res) => {
    try {
        const exam = new Exam(req.body);
        await exam.save();
        res.status(201).json(exam);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
