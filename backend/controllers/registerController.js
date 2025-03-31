import Student from '../models/Student.js';
import Counter from '../models/Counter.js';
import crypto from 'crypto';

// Create a new student
export const createStudent = async (req, res) => {
    try {
        // Log the request body
        console.log('Request body:', req.body);

        // Create a new student instance with the request body excluding the regNo
        const studentData = { ...req.body }; // Clone the body to avoid mutation

        // Generate regNo manually from the Counter collection
        const counter = await Counter.findOneAndUpdate(
            { name: 'registration' },
            { $inc: { value: 1 } },
            { new: true, upsert: true, setDefaultsOnInsert: true } // This will insert with the default value of 1000 if no counter exists
        );

        // If counter value is 1, reset it to 1000 to ensure the first regNo starts from 1000
        if (counter.value === 1) {
            counter.value = 1000;
            await counter.save(); // Save the updated counter value
        }

        const regNo = `reg-${counter.value}`; // Create regNo using the counter value
        studentData.regNo = regNo; // Assign regNo to studentData

        // Ensure password is generated if not provided
        if (!studentData.password) {
            studentData.password = crypto.randomBytes(4).toString('hex');
        }

        // Create a new Student instance
        const student = new Student(studentData);

        console.log('Student object before saving:', student);

        // Save the student to the database
        await student.save();

        // Send a response with the created student
        res.status(201).json(student);
    } catch (error) {
        console.error('Error:', error);
        // Handle error and send a response
        res.status(400).json({ error: error.message });
    }
};




// Get all students
export const getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
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

// Get a single student by ID
export const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ error: "Student not found" });
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a student by ID
export const updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!student) return res.status(404).json({ error: "Student not found" });
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a student by ID
export const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).json({ error: "Student not found" });
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
