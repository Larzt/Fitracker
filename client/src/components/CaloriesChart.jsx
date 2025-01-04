import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(ArcElement, Title, Tooltip, Legend);

export const CaloriesDoughnut = ({ currentValue, targetCalories }) => {
  const remainingValue = Math.max(targetCalories - currentValue, 0);

  const data = {
    labels: ['Consumido', 'Restante'],
    datasets: [
      {
        data: [currentValue, remainingValue],
        backgroundColor: ['#34d399', '#131318'],
        borderColor: ['#fff', '#fff'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Gráfico de Calorías consumidas',
        color: '#fff', // Blanco para el título
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#fff', // Blanco para el texto de la leyenda
          font: {
            weight: 'bold',
          },
          generateLabels: (chart) => {
            const dataset = chart.data.datasets[0];
            return chart.data.labels.map((label, index) => ({
              text: `${label}: ${dataset.data[index]} calorías`,
              fillStyle: dataset.backgroundColor[index],
              strokeStyle: dataset.borderColor[index],
              lineWidth: dataset.borderWidth,
              fontColor: '#fff', // Garantiza que el texto sea blanco
            }));
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const label = data.labels[tooltipItem.dataIndex];
            const value = data.datasets[0].data[tooltipItem.dataIndex];
            return `${label}: ${value} calorías`;
          },
        },
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#fff',
        borderWidth: 1,
      },
    },
    elements: {
      arc: {
        borderColor: '#fff',
      },
    },
    animation: {
      duration: 1000,
    },
  };

  return (
    <div
      style={{
        width: '100%',
        height: '250px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Doughnut data={data} options={options} />
    </div>
  );
};
