
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import goalRoutes from './routes/goalRoutes';
import { notFound, errorHandler } from './middleware/errorMiddleware';

// Initialize environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
// Explicitly cast express.json() to any to fix overload issues in this environment
app.use(express.json() as any); // Body parser

// Root route
app.get('/', (req, res) => {
  res.send('FocusEd API is running...');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/goals', goalRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
