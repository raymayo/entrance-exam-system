import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    examDate: {
        type: Date,
        required: false,
        default: null,
    },
    name: {
        type: String,
        required: false,
        default: null,
    },
    gender: {
        type: String,
        enum: ['MALE', 'FEMALE', 'OTHER'],
        required: false,
        default: null,
    },
    address: {
        type: String,
        required: false,
        default: null,
    },
    birthday: {
        type: Date,
        required: false,
        default: null,
    },
    birthplace: {
        type: String,
        required: false,
        default: null,
    },
    guardian: {
        type: String,
        required: false,
        default: null,
    },
    lastSchool: {
        type: String,
        required: false,
        default: null,
    },
    lastSchoolAddress: {
        type: String,
        required: false,
        default: null,
    },
    course1st: {
        type: String,
        required: false,
        default: null,
    },
    course2nd: {
        type: String,
        required: false,
        default: null,
    },
    transfereeCourse: {
        type: String,
        required: false,
        default: null,
    },
    english: {
        type: Number,
        min: 0,
        required: false,
        default: null,
    },
    filipino: {
        type: Number,
        min: 0,
        required: false,
        default: null,
    },
    math: {
        type: Number,
        min: 0,
        required: false,
        default: null,
    },
    science: {
        type: Number,
        min: 0,
        required: false,
        default: null,
    },
    socialstudies: {
        type: Number,
        min: 0,
        required: false,
        default: null,
    },
    expiresAt: {
        type: Date,
        expires: '30d', // Auto-delete after 30 days
        default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
}, { timestamps: true });

const Student = mongoose.model('Student', StudentSchema);

export default Student;
