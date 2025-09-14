import Course from '../models/Course.js'


export const createCourse = async (req, res) => {
    try{
        const course = new Course(req.body)
        await course.save()
        res.status(201).json(course);
    }catch(error){
        console.error(error)
    }
}