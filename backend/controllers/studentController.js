import Student from '../models/Student.js';

export const removeExpiresAtOnLogin = async (req, res) => {
    const { regNo, password } = req.body;

    try {
        const student = await Student.findOne({ regNo });

        // Compare password directly if it's stored as plain text
        if (student && password === student.password) {
            // If the expiresAt field exists, remove it
            if (student.expiresAt) {
                console.log('Before deleting expiresAt:', student.expiresAt);
                await Student.updateOne(
                    { regNo },
                    { $unset: { expiresAt: "" } } // This removes the expiresAt field
                );
                console.log('After deleting expiresAt:', student.expiresAt);
            } else {
                console.log('No expiresAt field to delete.');
            }

            res.status(200).json({ message: 'Login successful.' });
        } else {
            res.status(400).json({ message: 'Invalid credentials.' });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Server error.' });
    }
};


export const getStudentByRegNo = async (req, res) => {
    try {
        const student = await Student.findOne({ regNo: req.params.regNo });
        if (!student) return res.status(404).json({ error: "Student not found" });
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const getAllStudents = async (req, res) => {
    try {
        const count = await Student.countDocuments({
            expiresAt: { $exists: false }
        });
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllStudentData = async (req, res) => {
    try {
        const students = await Student.find({
            expiresAt: { $exists: false }
        })
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getRegisteredStudent = async (req, res) => {
    try {
        const count = await Student.countDocuments({
            expiresAt: { $exists: true }
        });
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const editStudent = async (req, res) => {
    const { regNo, ...updateData } = req.body;

    try {
        const student = await Student.findOneAndUpdate(
            { regNo },
            {
                ...updateData,
                $unset: { expiredAt: "" } // removes the expiredAt field
            },
            { new: true }
        );

        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
