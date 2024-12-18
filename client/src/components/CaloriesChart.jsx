import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(ArcElement, Title, Tooltip, Legend);

export const CaloriesDoughnut = ({ currentValue, targetCalories }) => {
  // Calcular el restante para alcanzar el total
  const remainingValue = Math.max(targetCalories - currentValue, 0); // Evitar valores negativos

  // Datos para el gráfico
  const data = {
    labels: ['Consumido', 'Restante'], // Etiquetas para las porciones
    datasets: [
      {
        data: [currentValue, remainingValue], // Valores del gráfico
        backgroundColor: ['#34d399', '#131318'], // Colores de las porciones
        borderColor: ['#fff', '#fff'], // Colores de los bordes
        borderWidth: 1, // Ancho de los bordes
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
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const label = data.labels[tooltipItem.dataIndex];
            const value = data.datasets[0].data[tooltipItem.dataIndex];
            return `${label}: ${value} calorías`;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};
