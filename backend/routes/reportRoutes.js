import express from 'express';
import { examTakers } from '../controllers/reportController.js';

const router = express.Router();

router.get('/', examTakers)


export default router;
