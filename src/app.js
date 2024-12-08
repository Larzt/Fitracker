import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

import authRoutes from './routes/auth.routes.js';
import foodRoutes from './routes/food.routes.js';
import exerRoutes from './routes/exercise.routes.js';
import goalRoutes from './routes/goals.routes.js';
import dishRoutes from './routes/dish.routes.js';
import routineRoutes from './routes/routine.routes.js';
import objetiveRoutes from './routes/objetive.routes.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Configuración del middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Rutas de la API
app.use('/api', authRoutes);
app.use('/api', foodRoutes);
app.use('/api', exerRoutes);
app.use('/api', goalRoutes);
app.use('/api', dishRoutes);
app.use('/api', routineRoutes);
app.use('/api', objetiveRoutes);

// Servir frontend en producción
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve(); // Asegurar ruta absoluta
  app.use(express.static(path.join(__dirname, 'client', 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  });
}

export default app;
