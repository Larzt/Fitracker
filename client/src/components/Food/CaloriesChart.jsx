import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useAuth } from '../../context/AuthContext';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const CaloriesChart = () => {
  const { user } = useAuth();

  // Array de calorías diarias del usuario
  const caloriesByDay = user.caloriesByDay || [1000, 1400, 1800, 1200, 1500]; // Ejemplo: [1000, 1400, 1800, 1200, 1500]

  // Generar las etiquetas de días automáticamente
  const days = caloriesByDay.map((_, index) => `Día ${index + 1}`);

  // Datos para el gráfico
  const data = {
    labels: days, // Eje X: Días
    datasets: [
      {
        label: 'Calorías Diarias',
        data: caloriesByDay, // Eje Y: Calorías
        backgroundColor: '#3B82F6', // Color de las barras
        borderColor: '#3B82F6', // Color del borde
        borderWidth: 1, // Ancho del borde
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // Mostrar leyenda
        position: 'top', // Posición de la leyenda
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Días',
          color: '#e4e4f0',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Calorías',
          color: '#e4e4f0',
        },
        suggestedMin: Math.min(...caloriesByDay) - 100, // Sugerir un valor mínimo más bajo
        suggestedMax: Math.max(...caloriesByDay) + 100, // Sugerir un valor máximo más alto
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};
