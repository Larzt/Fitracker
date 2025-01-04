import { BaseDashboardPage } from '../BaseDashboardPage';
import { useExers } from '../../context/Exercise/ExerciseContext';
import { useRoutine } from '../../context/Exercise/RoutineContext';
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

function ExerCalendarPage() {
  const { exers, getExers } = useExers();
  const { routines, getRoutinesByDate } = useRoutine();
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await getRoutinesByDate(today);
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (routines && routines.length > 0) {
      const events = routines.map((routine) => ({
        title: routine.exer.name,
        //la fecha viene en el timestamp de la base de datos
        start: moment(routine.date).toDate(),
        end: moment(routine.date).add(1, 'hour').toDate(),
        allDay: true,
      }));
      setEvents(events);
      console.log(events);
    }
  }, [exers]);

  const handleSelectSlot = () => {
  };

  return (
    <BaseDashboardPage
      content={
        <div className="display-content">
          <h1>Exercise Calendar</h1>
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

export default ExerCalendarPage;
