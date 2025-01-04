import { BaseDashboardPage } from '../BaseDashboardPage';
import { useDish } from '../../context/Food/DishContext';
import React, { useEffect, useMemo, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../css/calendar.css';
import { useNavigate } from 'react-router-dom';
import { all } from 'axios';
import CustomDateCell from './CustomDateCell';
import { set } from 'mongoose';

const localizer = momentLocalizer(moment);
const today = new Date().toISOString().split('T')[0];

function DishCalendarPage() {
  const { dishes, getDishesByDate } = useDish();
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await getDishesByDate(today);
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (dishes && dishes.length > 0) {
      const events = dishes.map((dish) => ({
        title: dish.food.name,
        //la fecha viene en el timestamp de la base de datos
        start: moment(dish.date).toDate(),
        end: moment(dish.date).add(1, 'hour').toDate(),
        allDay: true,
      }));
      setEvents(events);
      console.log(events);
    }
  }, [dishes]);

  const handleSelectSlot = () => {
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
              style={{ height: 500 }}
              views={['month', 'week', 'day']}
              selectable={true}
              onSelectSlot={handleSelectSlot}
            />
          </div>
        </div>
      }
    />
  );
}

export default DishCalendarPage;
