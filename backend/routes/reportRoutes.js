import express from 'express';
import { examTakers, getStrandSummary } from '../controllers/reportController.js';

const router = express.Router();

router.get('/', examTakers)
router.get('/summary', getStrandSummary);


export default router;
