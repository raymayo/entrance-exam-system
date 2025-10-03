import express from 'express';
import { examTakers, getStrandSummary, getExamStats, getQuestionStats, getSchoolStats } from '../controllers/reportController.js';

const router = express.Router();

router.get('/', examTakers)
router.get('/summary', getStrandSummary);
router.get("/subject-performance", getExamStats);
router.get("/question-stats", getQuestionStats);
router.get("/school-stats", getSchoolStats);


export default router;
