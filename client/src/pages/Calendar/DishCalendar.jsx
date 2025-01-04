import { BaseDashboardPage } from '../BaseDashboardPage';
import { useDish } from '../../context/Food/DishContext';
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../css/calendar.css';

const localizer = momentLocalizer(moment);

function DishCalendarPage() {
  const { dishes, getDishes } = useDish();
  const [events, setEvents] = useState([]);
  const [view, setView] = useState('month'); // Estado para controlar la vista actual
  const [date, setDate] = useState(new Date()); // Estado para controlar la fecha seleccionada

  useEffect(() => {
    const fetchData = async () => {
      await getDishes();
    };
    fetchData();
  }, []);
  console.log(dishes);

  useEffect(() => {
    if (dishes && dishes.length > 0) {
      const events = dishes.map((dish) => {
        console.log(dish);

        const startDate = moment(dish.createdAt).toDate(); // Asegurarte de que la fecha sea correcta
        return {
          id: dish.id,
          title: dish.food.name,
          start: startDate,
          end: moment(startDate).add(1, 'hour').toDate(), // Aquí le das 1 hora como duración al evento
          allDay: true, // Cambiar esto a false si no es un evento todo el día
          details: dish.details,
        };
      });
      setEvents(events);
    }
  }, [dishes]);

  const handleSelectEvent = (event) => {
    setView('day');
    setDate(event.start);
  };

  return (
    <BaseDashboardPage
      content={
        <div className="display-content">
          <h1>Dish Calendar</h1>
          <div className="remove-time">
            <Calendar
              localizer={localizer}
              events={events}
              style={{ height: 750 }}
              views={['month', 'week', 'day']}
              selectable={true}
              onSelectSlot={handleSelectEvent}
              onSelectEvent={handleSelectEvent} // Evento para manejar clics en eventos
              onView={setView} // Cambiar la vista desde el calendario
              view={view} // Vista actual
              date={date} // Fecha actual
              onNavigate={(newDate) => setDate(newDate)} // Actualizar fecha al navegar
            />
          </div>
        </div>
      }
    />
  );
}

export default DishCalendarPage;
