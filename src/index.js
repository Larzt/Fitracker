import app from './app.js';
import { connectDB } from './db.js';
import path from 'path';
import express from 'express'; // Asegúrate de importar express

const PORT = process.env.PORT || 4000;

// Conexión a la base de datos
connectDB();

// Servir archivos estáticos del frontend
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'client', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
