import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema(
    {
        regNo: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        phone: {
            type: String,
            unique: true,
            required: true,
        },
        examDate: { type: Date, default: null },
        name: { type: String, default: null },
        gender: { type: String, enum: ['MALE', 'FEMALE', 'OTHER'], default: null },
        address: { type: String, default: null },
        birthday: { type: Date, default: null },
        birthplace: { type: String, default: null },
        guardian: { type: String, default: null },
        lastSchool: { type: String, default: null },
        lastSchoolAddress: { type: String, default: null },
        course1st: { type: String, default: null },
        course2nd: { type: String, default: null },
        transfereeCourse: { type: String, default: null },

        // Exam scores as an object
        examScores: {
            english: { type: Number, min: 0, default: null },
            filipino: { type: Number, min: 0, default: null },
            math: { type: Number, min: 0, default: null },
            science: { type: Number, min: 0, default: null },
            socialstudies: { type: Number, min: 0, default: null },
        },


    },
    { timestamps: true }
);

const Student = mongoose.model('Student', StudentSchema);

export default Student;
