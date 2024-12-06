import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../css/calendar.css';
import { useExers } from '../../context/ExerciseContext';
import { Navbar } from '../../components/Navbar';
import { all } from 'axios';

const localizer = momentLocalizer(moment);

function CalendarPage() {
  const { exers, getExers } = useExers();
  const [events, setEvents] = useState([]);

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

  return (
    <div className="calendar-container">
      <h1>Exercise Calendar</h1>
      <div className="remove-time">
        <Calendar
          localizer={localizer}
          events={events}
          style={{ height: 500 }}
        />
        <Navbar />
      </div>
    </div>
  );
}

export default CalendarPage;
