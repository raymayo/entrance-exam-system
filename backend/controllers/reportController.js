import Student from "../models/Student.js";

export const examTakers = async (req, res) => {
    try {
        const registeredOnly = await Student.find({ examDate: null });

        const examTakers = await Student.find({ examDate: { $ne: null } });

        res.status(200).json([
            { name: "Registered Only", value: registeredOnly.length },
            { name: "Exam Takers", value: examTakers.length },
        ]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
