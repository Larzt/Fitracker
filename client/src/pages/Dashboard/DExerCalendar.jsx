import { DashboardPage } from '../DashboardPage';
import { useExers } from '../../context/ExerciseContext';

import React, { useEffect, useMemo, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../css/calendar.css';
import { useNavigate } from 'react-router-dom';
import { all } from 'axios';
import CustomDateCell from './CustomDateCell';

const localizer = momentLocalizer(moment);

function CalendarPage() {
  const { exers, getExers } = useExers();
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await getExers();
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (exers && exers.length > 0) {
      const events = exers.map((exer) => ({
        title: exer.name,
        //la fecha viene en el timestamp de la base de datos
        start: moment(exer.date).toDate(),
        end: moment(exer.date).add(1, 'hour').toDate(),
        allDay: true,
      }));
      setEvents(events);
      console.log(events);
    }
  }, [exers]);

  const handleSelectSlot = () => {
    navigate('/dashboard/exercise/');
  };

  return (
    <DashboardPage
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

export default CalendarPage;
