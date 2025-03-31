import express from 'express';
import { removeExpiresAtOnLogin, getStudentByRegNo } from '../controllers/studentController.js';

const router = express.Router();

router.post('/', removeExpiresAtOnLogin);
router.get('/:regNo', getStudentByRegNo)


export default router;
