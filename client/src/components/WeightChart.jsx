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
import { useAuth } from '../context/AuthContext';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const WeightChart = () => {
  const { user } = useAuth();

  const weightObjective = 80; // Peso objetivo

  // Datos de ejemplo, suponiendo que user.weightDate contiene varios valores de peso
  const weightData = user.weightDate?.map((item) => {
    const [weight, date] = item.split('-');
    return {
      weight: parseFloat(weight),
      date: date,
    };
  });

  // Generamos etiquetas para todas las fechas disponibles
  const labels = weightData?.map((point) => point.date);

  // Datos para el gráfico
  const data = {
    labels: labels, // Fechas como etiquetas en el eje X
    datasets: [
      {
        label: 'Progreso de Peso',
        data: weightData?.map((point) => point.weight), // Eje Y: Peso
        backgroundColor: 'rgba(56, 189, 248, 0.8)', // Color de las barras
        borderColor: '#3B82F6', // Color de las barras
        borderWidth: 2, // Ancho del borde
        barThickness: 30, // Ancho de la barra
        categoryPercentage: 0.6, // Controla el ancho total ocupado por las barras dentro de cada categoría
        barPercentage: 0.8, // Controla el tamaño relativo de las barras dentro del espacio de la categoría
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Gráfico de Progreso de Peso', // Título del gráfico
        color: '#fff', // Color blanco para el título
      },
      legend: {
        labels: {
          color: '#fff', // Color blanco para las etiquetas de la leyenda
        },
      },
    },
    scales: {
      x: {
        type: 'category', // Usamos 'category' para que cada fecha sea una categoría
        title: {
          display: true,
          text: 'Fecha',
          color: '#fff', // Color blanco para el título del eje X
        },
        ticks: {
          color: '#fff', // Color blanco para los ticks en el eje X
        },
        grid: {
          color: '#36363e', // Línea de la cuadrícula del eje X en blanco
        },
        // Habilitar el desplazamiento horizontal
        offset: true,
        min: 0,
        max: 10, // Limita las barras que se muestran al principio
        // Permite scroll si hay demasiados datos
        beginAtZero: true,
      },
      y: {
        title: {
          display: true,
          text: 'Peso (kg)',
          color: '#fff', // Color blanco para el título del eje Y
        },
        stacked: true, // Activar las barras apiladas en el eje Y
        suggestedMin: weightObjective - 5, // Sugerir un valor mínimo por debajo del objetivo
        suggestedMax: weightObjective + 10, // Sugerir un valor máximo por encima del objetivo
        ticks: {
          color: '#fff', // Color blanco para los ticks en el eje Y
          stepSize: 5, // Tamaño de paso de los valores del eje Y
        },
        grid: {
          color: '#36363e', // Línea de la cuadrícula del eje Y en blanco
        },
      },
    },
    elements: {
      bar: {
        borderColor: '#fff', // Bordes blancos para las barras
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '300px', overflowX: 'auto' }}>
      <Bar data={data} options={options} />
    </div>
  );
};
