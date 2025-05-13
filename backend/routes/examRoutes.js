import express from "express";
import {
    createExam, getAllExam
} from "../controllers/examController.js";


const router = express.Router();

router.post("/", createExam);
router.get("/", getAllExam)


export default router;
