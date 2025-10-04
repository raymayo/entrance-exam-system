import Course from '../models/Course.js'


export const createCourse = async (req, res) => {
    try {
        const course = new Course(req.body)
        await course.save()
        res.status(201).json(course);
    } catch (error) {
        console.error(error)
    }
}

export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().sort({ createdAt: -1 })
        res.json(courses)
    } catch (error) {
        console.error("getAllCourses error:", error)
        res.status(500).json({ message: "Failed to fetch courses", error: error.message })
    }
}
