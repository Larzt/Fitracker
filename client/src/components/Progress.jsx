import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useAuth } from '../context/AuthContext';

ChartJS.register(ArcElement, Tooltip, Legend);

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
