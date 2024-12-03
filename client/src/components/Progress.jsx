import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { useAuth } from '../context/AuthContext';

export const RingsChart = () => {
  const { user } = useAuth();
  const weightObjetive = 80;
  const weightProgress = weightObjetive - user.weight;

  const caloriesObjetive = 1700;
  const caloriesProgress = caloriesObjetive - 1500;

  const data = {
    labels: ['Weight', 'Calories'], // Etiquetas
    datasets: [
      {
        label: 'Weight',
        data: [user.weight, weightProgress], // Valor actual y objetivo
        backgroundColor: ['#34D399', '#1E293B'], // Verde neon (fill) y gris oscuro (back)
        hoverBackgroundColor: ['#10B981', '#1E293B'], // Hover
        borderWidth: 0, // Sin bordes
        cutout: '75%', // Grosor del anillo
      },
      {
        label: 'Calories',
        data: [caloriesObjetive, caloriesProgress],
        backgroundColor: ['#3B82F6', '#1E293B'], // Azul neon (fill) y gris oscuro (back)
        hoverBackgroundColor: ['#2563EB', '#1E293B'],
        borderWidth: 0,
        cutout: '55%',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Ocultar leyenda dentro del gráfico
      },
    },
  };

  return (
    <div style={{ width: '150px', height: '150px', position: 'relative' }}>
      <Doughnut data={data} options={options} />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: '#E4E4F0', // Texto claro para resaltar
          fontSize: '18px',
        }}
      >
        <p style={{ margin: 0, fontWeight: 'bold' }}>Metas</p>
      </div>
    </div>
  );
};

export const BarChart = ({ exerciseName, dataPoints }) => {
  const data = {
    labels: dataPoints.map((point) => point.time), // Eje X: Tiempo
    datasets: [
      {
        label: exerciseName, // Cambiado a exerciseName
        data: dataPoints.map((point) => point.weight), // Eje Y: Peso
        backgroundColor: '#34d399', // Color principal
        borderColor: '#22c55e', // Color de borde
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: 'Tiempo',
          color: '#e4e4f0',
        },
      },
      y: {
        grid: {
          color: '#3b3b48',
        },
        title: {
          display: true,
          text: 'Peso (kg)',
          color: '#e4e4f0',
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '200px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};
