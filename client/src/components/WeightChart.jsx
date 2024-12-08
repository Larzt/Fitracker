import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useAuth } from '../context/AuthContext';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const WeightChart = () => {
  const { user } = useAuth();

  // Datos de ejemplo, con el objetivo de peso y el peso actual
  const weightObjective = 80; // Peso objetivo
  const currentWeight = user.weight; // Peso actual del usuario

  // Suponiendo que el peso del usuario cambia a lo largo del tiempo, usaremos datos ficticios
  const weightData = [
    { time: 'Semana 1', weight: 85 },
    { time: 'Semana 2', weight: 84 },
    { time: 'Semana 3', weight: 83 },
    { time: 'Semana 4', weight: 82 },
    { time: 'Semana 5', weight: 81 },
    { time: 'Semana 6', weight: currentWeight }, // Peso actual
  ];

  // Datos para el gráfico
  const data = {
    labels: weightData.map((point) => point.time), // Eje X: Semanas
    datasets: [
      {
        label: 'Progreso de Peso',
        data: weightData.map((point) => point.weight), // Eje Y: Peso
        fill: true, // Rellenar el área bajo la línea
        backgroundColor: 'rgba(56, 189, 248, 0.2)', // Color de relleno (azul claro)
        borderColor: '#3B82F6', // Color de la línea
        borderWidth: 2, // Ancho de la línea
        tension: 0.4, // Curvatura de la línea
      },
      {
        label: 'Objetivo de Peso',
        data: new Array(weightData.length).fill(weightObjective), // Línea del objetivo
        fill: false, // No rellenar área para la línea del objetivo
        borderColor: '#EF4444', // Color de la línea del objetivo (rojo)
        borderWidth: 2, // Ancho de la línea
        borderDash: [5, 5], // Línea punteada
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
          text: 'Tiempo',
          color: '#e4e4f0',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Peso (kg)',
          color: '#e4e4f0',
        },
        suggestedMin: weightObjective - 5, // Sugerir un valor mínimo por debajo del objetivo
        suggestedMax: weightObjective + 5, // Sugerir un valor máximo por encima del objetivo
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <Line data={data} options={options} />
    </div>
  );
};
