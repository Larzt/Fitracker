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
      title: {
        display: true,
        text: 'Gráfico de Calorias consumidas', // Título del gráfico
        color: '#fff', // Color blanco para el título
      },
      legend: {
        display: true, // Mostrar leyenda
        position: 'top', // Posición de la leyenda
        labels: {
          color: '#fff', // Color blanco para las etiquetas de la leyenda
          font: {
            weight: 'bold', // Poner en negrita
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
        titleColor: '#fff', // Color blanco para el título del tooltip
        bodyColor: '#fff', // Color blanco para el cuerpo del tooltip
        borderColor: '#fff', // Color blanco para el borde del tooltip
        borderWidth: 1, // Ancho del borde del tooltip
      },
    },
    elements: {
      arc: {
        borderColor: '#fff', // Color blanco para los bordes de las secciones
      },
    },
    scales: {
      // Configuración para las escalas (si fuese necesario)
      // Puede añadirse más configuraciones si se desea cambiar estilos para las escalas
    },
    animation: {
      duration: 1000, // Duración de la animación
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
