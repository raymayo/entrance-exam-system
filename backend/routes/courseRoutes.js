import express from "express";
import { createCourse, getAllCourses } from "../controllers/courseController.js";

const router = express.Router();

router.get('/', getAllCourses)
router.post('/', createCourse)




export default router;
