import app from './app.js';
import { connectDB } from './db.js';
import path from 'path';

const PORT = process.env.PORT || 4000;

// Conexión a la base de datos
connectDB();

// Middleware para servir archivos estáticos del frontend
const __dirname = path.resolve(); // Asegura que funcione correctamente
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Manejo de cualquier otra solicitud para el frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
