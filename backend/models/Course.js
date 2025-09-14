import mongoose, { Mongoose } from "mongoose";

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        default: ""
    },
    passingScore: {
        type: Number,
        required: true,
        min: 0,
    },
    durationYears: {
        type: String,
        default: "4",
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
},
    { timestamps: true }
)

export default mongoose.model("Course", CourseSchema)