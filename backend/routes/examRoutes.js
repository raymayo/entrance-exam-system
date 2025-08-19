import express from "express";
import {
    createExam, getAllExam, getExam
} from "../controllers/examController.js";


const router = express.Router();

router.post("/", createExam);
router.get("/", getAllExam)
router.get("/:id", getExam);


export default router;
