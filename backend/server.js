import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'; // Import CORS
import registerRoutes from './routes/registerRoutes.js';
import studentRoutes from './routes/studentRoutes.js'
import adminRoutes from './routes/adminRoutes.js';


const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json());

// Routes
app.use('/api/register', registerRoutes);
app.use('/api/student', studentRoutes)
app.use('/api/admin', adminRoutes)

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
